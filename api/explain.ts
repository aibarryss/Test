// Vercel Edge Function — the only backend endpoint in Pathly.
// It exists for one reason: keep the LLM key off the client. The product works
// fully without it (the client falls back to deterministic template text).
// Uses Google Gemini API for explanations.

export const config = { runtime: 'edge' }

const SYSTEM_PROMPT = `You are the explanation layer of "Pathly", a university admissions planner.
You will receive JSON with a student profile and a list of already-computed recommendations.
Each recommendation includes a deterministic score breakdown.

HARD RULES:
- You must NOT invent universities, programs, tuition numbers, deadlines, exam thresholds or statistics.
- Only use facts present in the input JSON.
- You must return an entry for every programId in the input, and only those programIds.
- Keep "whyItFits" to 1-3 sentences. "concerns" holds 0-3 short strings. "nextStepHint" is one concrete action.
- Refer to factors qualitatively (budget fit, subject match, academic fit, language readiness, timeline, funding).
- Never state an admission probability or a chance of acceptance.

Respond with JSON only, exactly in this shape:
{"items":[{"programId":"string","whyItFits":"string","concerns":["string"],"nextStepHint":"string"}]}`

export default async function handler(req: Request): Promise<Response> {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: cors() })
  }
  if (req.method !== 'POST') {
    return json({ error: 'Method not allowed' }, 405)
  }

  const apiKey = process.env.GOOGLE_AI_KEY
  if (!apiKey) {
    return json({ error: 'AI is not configured on this deployment' }, 501)
  }

  let payload: unknown
  try {
    payload = await req.json()
  } catch {
    return json({ error: 'Invalid JSON body' }, 400)
  }

  const allowed = new Set<string>(
    ((payload as any)?.recommendations ?? []).map((r: any) => String(r?.programId ?? '')).filter(Boolean)
  )
  if (allowed.size === 0) return json({ error: 'No recommendations provided' }, 400)

  try {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 15000)

    const requestBody = {
      system_instruction: {
        parts: { text: SYSTEM_PROMPT }
      },
      contents: {
        parts: {
          text: JSON.stringify(payload)
        }
      },
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 900,
        responseMimeType: 'application/json'
      }
    }

    const upstream = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
        signal: controller.signal
      }
    )
    clearTimeout(timer)

    if (!upstream.ok) {
      return json({ error: `Upstream model error (${upstream.status})` }, 502)
    }

    const data = (await upstream.json()) as any
    const content = data?.candidates?.[0]?.content?.parts?.[0]?.text
    if (typeof content !== 'string') return json({ error: 'Empty model response' }, 502)

    let parsed: any
    try {
      parsed = JSON.parse(content)
    } catch {
      return json({ error: 'Model did not return valid JSON' }, 502)
    }

    const items = Array.isArray(parsed?.items) ? parsed.items : []
    const safe = items
      .filter((i: any) => allowed.has(String(i?.programId ?? '')) && typeof i?.whyItFits === 'string')
      .map((i: any) => ({
        programId: String(i.programId),
        whyItFits: String(i.whyItFits).slice(0, 400),
        concerns: Array.isArray(i.concerns) ? i.concerns.map((c: unknown) => String(c)).slice(0, 3) : [],
        nextStepHint: typeof i.nextStepHint === 'string' ? String(i.nextStepHint).slice(0, 200) : ''
      }))

    if (safe.length === 0) return json({ error: 'No valid items in model output' }, 502)
    return json({ items: safe }, 200)
  } catch (error) {
    console.error('AI request error:', error)
    return json({ error: 'AI unavailable' }, 502)
  }
}

function cors(): HeadersInit {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  }
}

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...cors() }
  })
}


declare const process: { env: Record<string, string | undefined> }