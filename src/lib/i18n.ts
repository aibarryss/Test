// Pathly — internationalization system (Russian support)

export type Language = 'ru' | 'en'

const translations = {
  ru: {
    // Landing Screen
    landing: {
      title: 'Pathly',
      subtitle: 'Ваш персональный путь к поступлению',
      description: 'Заполните профиль, пройдите диагностику и получите индивидуальный список университетов с пошаговой дорожной картой',
      start: 'Начать',
      demo: 'Попробовать демо',
      continueAsGuest: 'Продолжить как гость'
    },

    // Navigation
    nav: {
      profile: 'Профиль',
      diagnosis: 'Диагностика',
      recommendations: 'Рекомендации',
      comparison: 'Сравнение',
      roadmap: 'Дорожная карта',
      sources: 'Источники',
      dataAndSources: 'Данные и источники · методология'
    },

    // Profile Screen
    profile: {
      step: 'Заполнение профиля',
      title: 'Расскажите о своих целях',
      subtitle: 'Восемь пунктов управляют всем. Измените любой из них позже, и список рекомендаций пересчитается автоматически.',
      aboutYou: 'О вас',
      nameLabel: 'Имя (опционально)',
      namePlaceholder: 'Например: Алия',
      citizenshipLabel: 'Гражданство',
      gradeLabel: 'Класс',
      grade9: 'Класс 9',
      grade10: 'Класс 10',
      grade11: 'Класс 11',
      graduationYearLabel: 'Год выпуска',
      academicBaseline: 'Академический уровень',
      disciplineLabel: 'Целевая специальность',
      gpaLabel: 'GPA (шкала 0–5)',
      gpaHelper: 'С шагом 0.1, например 4.3',
      englishLevelLabel: 'Уровень английского (опционально)',
      notSpecified: 'Не указан',
      examScoresLabel: 'Результаты стандартизированных экзаменов (опционально)',
      scorePlaceholder: 'балл',
      whereAndHow: 'Где и сколько',
      destinationsLabel: 'Целевые страны для поступления',
      budgetLabel: 'Годовой бюджет на обучение (USD)',
      budgetHelper: 'Чистая стоимость обучения в год, без расходов на проживание',
      grantOnly: 'Только грант',
      scholarshipToggle: 'Мне нужна стипендия или бюджетный вариант',
      errorMessage: 'Исправьте пожалуйста',
      errorField: 'поле',
      errorFields: 'полей',
      continueButton: 'Перейти к диагностике',
      dataStorageInfo: 'Данные хранятся в вашем браузере (localStorage)'
    },

    // Diagnosis Screen
    diagnosis: {
      step: 'Диагностика',
      title: 'Краткая диагностика готовности',
      subtitle: 'Шесть вопросов без неправильных ответов. Они уточнят ваш список и сформируют учебную и внеучебную фазы дорожной карты.',
      questionOf: 'Вопрос',
      of: 'из',
      back: 'Назад',
      nextQuestion: 'Следующий вопрос',
      skip: 'Пропустить диагностику',
      resultComplete: 'Диагностика завершена',
      resultTitle: 'Ваш профиль поступления',
      resultSubtitle: 'Вот что диагностика определила по вашим ответам, перед началом подбора вузов.',
      strengths: 'Сильные стороны',
      signals: 'сигнала/сигналов',
      positive: 'Положительно',
      noStrengths: 'Нет явных сильных сторон — и это нормально на данном этапе.',
      gaps: 'Пробелы для закрытия',
      attention: 'Внимание',
      noGaps: 'Ничего критического не выявлено.'
    },

    // Recommendations Screen
    recommendations: {
      step: 'Рекомендации',
      title: 'Университеты, подходящие вашему профилю',
      subtitle: 'Каждое совпадение вычисляется на основе ваших восьми входных параметров, затем объясняется по факторам. Измените любой критерий ниже, и список пересчитается в реальном времени.',
      recommended: 'рекомендуемых',
      program: 'программа',
      programs: 'программ',
      askingModel: 'Запрашиваю модель…',
      aiExplanation: 'AI объяснение',
      aiTemplate: 'AI + шаблон',
      templateExplanation: 'Шаблонное объяснение',
      fewerMatches: 'Менее трех сильных совпадений. Альтернативные варианты и конкретные решения показаны ниже.',
      noMatch: 'Нет подходящих вариантов',
      noMatchText: 'Ваши текущие критерии слишком ограничены. Попробуйте одно из предложений ниже и запустите снова.',
      resetProfile: 'Сбросить профиль'
    },

    // Comparison Screen
    comparison: {
      title: 'Сравнение',
      university: 'Университет',
      program: 'Программа',
      tuition: 'Стоимость в год',
      requirements: 'Требования',
      deadline: 'Дедлайн',
      budget: 'Бюджет подходит',
      scholarship: 'Стипендия доступна',
      language: 'Язык обучения',
      back: 'Назад',
      toRoadmap: 'К дорожной карте'
    },

    // Roadmap Screen
    roadmap: {
      title: 'Дорожная карта поступления',
      nextAction: 'Следующее действие',
      progress: 'Прогресс',
      readiness: 'Готовность',
      completed: 'Завершено',
      inProgress: 'В процессе',
      todo: 'К выполнению',
      markAsDone: 'Отметить как выполнено',
      phases: {
        exams: 'Экзамены',
        documents: 'Документы',
        deadlines: 'Дедлайны',
        academic: 'Учебные достижения',
        activities: 'Внеучебная деятельность'
      },
      congratulations: 'Поздравляем! Вы завершили дорожную карту.',
      back: 'Назад',
      toRecommendations: 'К рекомендациям'
    },

    // Sources Screen
    sources: {
      title: 'Источники данных',
      description: 'Все данные о вузах и программах взяты из официальных источников. Демонстрационные данные помечены синим бейджем.',
      official: 'Официальный источник',
      demo: 'Демонстрационные данные',
      demoNote: 'Эти значения используются в демо. Проверьте официальные сайты вузов перед подачей заявления.',
      sources: 'Источники',
      verified: 'Проверено',
      accessedAt: 'Дата обращения'
    },

    // Common
    common: {
      loading: 'Загрузка...',
      error: 'Ошибка',
      success: 'Успешно',
      cancel: 'Отмена',
      delete: 'Удалить',
      edit: 'Редактировать',
      close: 'Закрыть',
      yes: 'Да',
      no: 'Нет',
      required: 'Обязательно',
      optional: 'Опционально',
      allData: 'Все данные сохранены локально в вашем браузере',
      noInternet: 'Работает без интернета',
      aiPowered: 'На основе ИИ',
      template: 'Шаблонный текст'
    },

    // Scoring factors
    factors: {
      budget: 'Финансовая подходимость',
      field: 'Соответствие специальности',
      country: 'Целевая страна',
      academic: 'Академическая подготовка',
      language: 'Знание языка',
      deadline: 'Сроки подачи',
      scholarship: 'Доступность стипендии'
    },

    // Countries
    countries: {
      KZ: 'Казахстан',
      RU: 'Россия',
      US: 'США',
      UK: 'Великобритания',
      DE: 'Германия',
      IT: 'Италия',
      CA: 'Канада',
      TR: 'Турция',
      KR: 'Южная Корея',
      NL: 'Нидерланды'
    },

    // Fields
    fields: {
      cs: 'Информатика',
      engineering: 'Инженерия',
      business: 'Бизнес и Экономика',
      medicine: 'Науки о жизни и Медицина',
      humanities: 'Гуманитарные науки',
      design: 'Дизайн'
    }
  },

  en: {
    // Landing Screen
    landing: {
      title: 'Pathly',
      subtitle: 'Your personal admission route',
      description: 'Fill in your profile, take the diagnostic, and get a personalized list of universities with a step-by-step roadmap',
      start: 'Start',
      demo: 'Try demo',
      continueAsGuest: 'Continue as guest'
    },

    // Navigation
    nav: {
      profile: 'Profile',
      diagnosis: 'Diagnosis',
      recommendations: 'Recommendations',
      comparison: 'Comparison',
      roadmap: 'Roadmap',
      sources: 'Sources',
      dataAndSources: 'Data & sources · methodology'
    },

    // Profile Screen
    profile: {
      step: 'Profile intake',
      title: 'Tell us about your goals',
      subtitle: 'Eight inputs drive everything that follows. Change any of them later and the shortlist and roadmap recompute immediately.',
      aboutYou: 'About you',
      nameLabel: 'Name (optional)',
      namePlaceholder: 'e.g. Aliya',
      citizenshipLabel: 'Citizenship',
      gradeLabel: 'Grade',
      grade9: 'Grade 9',
      grade10: 'Grade 10',
      grade11: 'Grade 11',
      graduationYearLabel: 'Graduation year',
      academicBaseline: 'Academic baseline',
      disciplineLabel: 'Target discipline',
      gpaLabel: 'GPA (0–5 scale)',
      gpaHelper: '0.1 steps, e.g. 4.3',
      englishLevelLabel: 'English level (optional)',
      notSpecified: 'Not specified',
      examScoresLabel: 'Standardised exam scores (optional, but they change eligibility)',
      scorePlaceholder: 'score',
      whereAndHow: 'Where and how much',
      destinationsLabel: 'Target study destinations',
      budgetLabel: 'Annual tuition budget (USD)',
      budgetHelper: 'Net tuition you can cover per year, before living costs.',
      grantOnly: 'Grant only',
      scholarshipToggle: 'I need a scholarship or a low-cost option',
      errorMessage: 'Please fix',
      errorField: 'field',
      errorFields: 'fields',
      continueButton: 'Continue to diagnosis',
      dataStorageInfo: 'Data stays in your browser (localStorage)'
    },

    // Diagnosis Screen
    diagnosis: {
      step: 'Diagnosis',
      title: 'A short readiness diagnostic',
      subtitle: 'Six questions, no wrong answers. They refine your shortlist and shape the academic and activity phases of your roadmap.',
      questionOf: 'Question',
      of: 'of',
      back: 'Back',
      nextQuestion: 'Next question',
      skip: 'Skip diagnosis',
      resultComplete: 'Diagnosis complete',
      resultTitle: 'Your admission profile',
      resultSubtitle: 'Here is what the diagnostic reads from your answers, before any matching happens.',
      strengths: 'Strengths',
      signals: 'signals',
      positive: 'Positive',
      noStrengths: 'No strong signals yet — that is fine at this stage.',
      gaps: 'Gaps to close',
      attention: 'Attention',
      noGaps: 'Nothing critical flagged.'
    },

    // Recommendations Screen
    recommendations: {
      step: 'Recommendations',
      title: 'Universities that fit your profile',
      subtitle: 'Every match is computed from your eight inputs, then explained factor by factor. Edit anything below and the shortlist recomputes live.',
      recommended: 'recommended',
      program: 'program',
      programs: 'programs',
      askingModel: 'Asking the model…',
      aiExplanation: 'AI explanation',
      aiTemplate: 'AI + template',
      templateExplanation: 'Template explanation',
      fewerMatches: 'Fewer than three strong matches. Relaxed options and concrete remedies are shown below.',
      noMatch: 'No strong match yet',
      noMatchText: 'Your current constraints are too tight. Try one of the remedies below, then re-run.',
      resetProfile: 'Reset profile'
    },

    // Comparison Screen
    comparison: {
      title: 'Comparison',
      university: 'University',
      program: 'Program',
      tuition: 'Annual Tuition',
      requirements: 'Requirements',
      deadline: 'Deadline',
      budget: 'Budget Fit',
      scholarship: 'Scholarship Available',
      language: 'Language of Instruction',
      back: 'Back',
      toRoadmap: 'To Roadmap'
    },

    // Roadmap Screen
    roadmap: {
      title: 'Admission Roadmap',
      nextAction: 'Next Action',
      progress: 'Progress',
      readiness: 'Readiness',
      completed: 'Completed',
      inProgress: 'In Progress',
      todo: 'To Do',
      markAsDone: 'Mark as Done',
      phases: {
        exams: 'Exams',
        documents: 'Documents',
        deadlines: 'Deadlines',
        academic: 'Academic',
        activities: 'Activities'
      },
      congratulations: 'Congratulations! You completed your roadmap.',
      back: 'Back',
      toRecommendations: 'To Recommendations'
    },

    // Sources Screen
    sources: {
      title: 'Data Sources',
      description: 'All university and program data comes from official sources. Demo data is marked with a blue badge.',
      official: 'Official Source',
      demo: 'Demo Data',
      demoNote: 'These values are used in the demo. Check official university websites before submitting your application.',
      sources: 'Sources',
      verified: 'Verified',
      accessedAt: 'Date Accessed'
    },

    // Common
    common: {
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      close: 'Close',
      yes: 'Yes',
      no: 'No',
      required: 'Required',
      optional: 'Optional',
      allData: 'All data is saved locally in your browser',
      noInternet: 'Works offline',
      aiPowered: 'AI-powered',
      template: 'Template text'
    },

    // Scoring factors
    factors: {
      budget: 'Budget fit',
      field: 'Subject match',
      country: 'Destination',
      academic: 'Academic fit',
      language: 'Language readiness',
      deadline: 'Timeline feasibility',
      scholarship: 'Funding available'
    },

    // Countries
    countries: {
      KZ: 'Kazakhstan',
      RU: 'Russia',
      US: 'United States',
      UK: 'United Kingdom',
      DE: 'Germany',
      IT: 'Italy',
      CA: 'Canada',
      TR: 'Turkey',
      KR: 'South Korea',
      NL: 'Netherlands'
    },

    // Fields
    fields: {
      cs: 'Computer Science',
      engineering: 'Engineering',
      business: 'Business & Economics',
      medicine: 'Life Sciences & Medicine',
      humanities: 'Humanities',
      design: 'Design'
    }
  }
} as const

let currentLanguage: Language = 'ru'

export function setLanguage(lang: Language) {
  currentLanguage = lang
  localStorage.setItem('pathly:language', lang)
}

export function getLanguage(): Language {
  const saved = localStorage.getItem('pathly:language') as Language | null
  if (saved && (saved === 'ru' || saved === 'en')) {
    return saved
  }
  return 'ru'
}

export function t<K extends keyof typeof translations.ru>(key: K): typeof translations.ru[K] {
  currentLanguage = getLanguage()
  return (translations[currentLanguage] as typeof translations.ru)[key]
}

export function tValue(path: string, defaultValue: string = ''): string {
  currentLanguage = getLanguage()
  const keys = path.split('.')
  let obj: any = translations[currentLanguage]
  for (const key of keys) {
    obj = obj?.[key]
    if (obj === undefined) return defaultValue
  }
  return typeof obj === 'string' ? obj : defaultValue
}

export { translations }
