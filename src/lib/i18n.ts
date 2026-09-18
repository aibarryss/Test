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
      continue: 'Продолжить',
      demo: 'Попробовать демо',
      continueAsGuest: 'Продолжить как гость'
    },

    // Navigation
    nav: {
      home: 'Главная',
      profile: 'Профиль',
      diagnosis: 'Диагностика',
      recommendations: 'Рекомендации',
      comparison: 'Сравнение',
      roadmap: 'Дорожная карта',
      sources: 'Источники',
      dataAndSources: 'Данные и источники · методология',
      diagnose: 'Диагн.',
      matches: 'Матчи'
    },

    topbar: {
      homeTitle: 'Главная',
      brandSub: 'Маршрут поступления',
      readinessTitle: 'Полнота профиля и прогресс дорожной карты',
      readiness: 'готовность',
      aiTitle: 'AI-объяснения можно выключить — детерминированный шаблон всегда работает',
      aiLabel: 'ИИ'
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
      noGaps: 'Ничего критического не выявлено.',
      pointers: 'Подсказки по диагностике',
      advisoryDiscipline: 'Рекомендуемая специальность',
      advisoryDestinations: 'Рекомендуемые страны',
      profileCompleteness: 'Полнота профиля',
      open: 'Открыто',
      profileChoiceStays: 'Ваш текущий выбор профиля: {field}.',
      advisoryHint: 'Это влияет только на оценку, а не на жесткую фильтрацию.',
      complete: 'Заполнено',
      gapsCount: '{count} пробелов',
      allKeyFieldsFilled: 'Все ключевые поля заполнены',
      missingPrefix: 'Не заполнено:',
      missingImpact: 'Рекомендации будут построены, но уверенность по этим факторам снизится.',
      seeRecommendations: 'Показать рекомендации',
      editProfile: 'Изменить профиль'
    },

    // Recommendations Screen
    recommendations: {
      step: 'Рекомендации',
      title: 'Университеты, подходящие вашему профилю',
      subtitle: 'Каждое совпадение вычисляется на основе ваших восьми входных параметров, затем объясняется по факторам. Измените любой критерий ниже, и список пересчитается в реальном времени.',
      strongFit: 'Сильное совпадение',
      moderateFit: 'Умеренное совпадение',
      stretch: 'Амбициозный вариант',
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
      resetProfile: 'Сбросить профиль',
      confidence: 'уверенность',
      newEntry: 'новая позиция',
      yearsShort: 'г.',
      perYearShort: '/год',
      fitScore: 'оценка соответствия',
      whyFits: 'Почему подходит',
      template: 'шаблон',
      fitBreakdown: 'Разбор оценки',
      top3Only: 'Только топ-3',
      allFactors: 'Все факторы',
      inComparison: 'В сравнении',
      addToCompare: 'Добавить к сравнению',
      hideDetails: 'Скрыть детали',
      details: 'Детали',
      requirements: 'Требования',
      noExamRequirement: 'Требования по экзаменам не указаны',
      minGpaLanguage: 'Мин. GPA: {gpa} · Язык: {lang}',
      teachingLanguage: 'Язык обучения',
      livingCostApprox: 'Проживание ≈ {cost}/год',
      deadlines: 'Дедлайны',
      noDeadlineRecorded: 'Дедлайн не указан — уточните на официальной странице.',
      universitySite: 'Сайт университета',
      sourcesCount: '{count} источник(а)',
      sensitivityTitle: 'Живая чувствительность',
      sensitivityHint: 'измените параметр → список изменится',
      destinations: 'Страны',
      tuitionBudget: 'Бюджет на обучение',
      discipline: 'Специальность',
      grant: 'Грант',
      unlockTitle: 'Как открыть больше вариантов',
      deterministicRemedies: 'Детерминированные действия',
      derivedFromData: 'получено из данных',
      relaxedPrograms: 'Другие программы из датасета, пока не открытые: {list}.',
      stickySelectPrograms: 'Выберите программы для сравнения',
      stickySelected: 'Выбрано: {count}',
      readyToCompare: 'Готово к сравнению.',
      pickAtLeastTwo: 'Нужно выбрать минимум две программы.',
      compare: 'Сравнить',
      roadmap: 'Дорожная карта',
      recommendationNotesRemoved: '{count} программ исключено: стоимость сильно выше бюджета и нет стипендии.',
      recommendationNotesFound: 'Найдено только {count} сильных совпадений — ниже показаны смягченные варианты.',
      suggestionBudget: 'Увеличение бюджета примерно на {gap}/год откроет самый доступный заблокированный вариант.',
      suggestionCountry: 'Добавьте страну {country} — появятся сильные варианты (лучший локальный балл {score}%).',
      suggestionExam: 'Улучшение экзаменных баллов поднимет несколько программ — начните с {program}.'
    },

    // Comparison Screen
    comparison: {
      step: 'Сравнение',
      title: 'Сравните варианты',
      subtitle: 'Сравнение по критериям, которые реально влияют на решение: стоимость, требования, язык и дедлайны.',
      needTwoTitle: 'Выберите минимум две программы',
      needTwoText: 'Вернитесь к рекомендациям и отметьте 2–3 программы для сравнения.',
      backToRecommendations: 'Назад к рекомендациям',
      criterion: 'Критерий',
      remove: 'Убрать',
      university: 'Университет',
      program: 'Программа',
      fitScore: 'Оценка соответствия',
      netTuition: 'Обучение / год',
      livingCost: 'Проживание / год',
      totalCost: 'Итого / год',
      examRequirements: 'Экзамены',
      noneListed: 'Не указано',
      minGpa: 'Мин. GPA',
      teachingLanguage: 'Язык обучения',
      duration: 'Длительность',
      years: 'лет',
      deadlines: 'Дедлайны',
      demo: 'демо',
      notRecorded: 'Нет данных',
      mainConstraint: 'Ключевое ограничение',
      noneFlagged: 'Без критичных ограничений',
      buildRoadmap: 'Построить дорожную карту',
      addOrRemove: 'Добавить или убрать программы'
    },

    // Roadmap Screen
    roadmap: {
      step: 'Дорожная карта',
      title: 'Ваша дорожная карта поступления',
      subtitle: 'Пять фаз, собранных из вашего шортлиста и пробелов диагностики. Отметьте шаг — и следующее действие обновится сразу.',
      noRoadmapTitle: 'Дорожная карта еще не построена',
      noRoadmapText: 'Сначала получите рекомендации, затем Pathly соберет поэтапный план.',
      getRecommendations: 'Получить рекомендации',
      nextAction: 'Следующее действие',
      priority: 'приоритет',
      due: 'срок',
      demoDate: 'демо-дата',
      progress: 'Прогресс',
      roadmapComplete: 'Дорожная карта завершена',
      stepsDone: 'Шагов выполнено',
      programsInPlan: 'Программ в плане',
      deadlineSteps: 'Шагов с дедлайном',
      readiness: 'Готовность',
      completed: 'Завершено',
      inProgress: 'В процессе',
      todo: 'К выполнению',
      markAsDone: 'Отметить как выполнено',
      admissionPhases: 'Фазы траектории поступления',
      cycleHint: 'нажмите на узел, чтобы сменить статус',
      cycleTitle: 'Сменить статус: к выполнению → в процессе → завершено',
      source: 'источник',
      warningDemo: 'Даты с пометкой demo data являются демонстрационными и должны быть проверены на официальных страницах вузов перед подачей.',
      backToComparison: 'Назад к сравнению',
      printPdf: 'Печать / сохранить в PDF',
      adjustRecommendations: 'Изменить рекомендации',
      done: 'завершено',
      demoData: 'демо-данные',
      phases: {
        exams: 'Экзамены и тесты',
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
      step: 'Прозрачность',
      title: 'Источники данных',
      description: 'Все данные о вузах и программах взяты из официальных источников. Демонстрационные данные помечены синим бейджем.',
      universitiesInDataset: 'Университетов в датасете',
      programsInDataset: 'Программ',
      officialLinks: 'Официальных ссылок',
      demoEntries: 'Демонстрационных записей',
      valuesDemoNotice: 'Числовые значения в MVP (стоимость, пороги экзаменов, дедлайны) демонстрационные. Перед подачей сверяйте каждое значение по официальным разделам admissions.',
      officialSourcesTitle: 'Официальные источники',
      verifiedLinks: 'проверенные ссылки',
      notAvailable: 'н/д',
      demoEntriesTitle: 'Демонстрационные записи',
      methodology: 'Методология',
      methodology1: 'Каждая рекомендация строится детерминированной 7-факторной моделью, а не языковой моделью.',
      methodology2: 'Модель только перефразирует уже вычисленные факты и всегда имеет шаблонный fallback.',
      methodology3: 'Жесткие фильтры убирают только явно невозможные варианты; страна, направление и цена остаются взвешенными факторами.',
      methodology4: 'При нехватке данных снижается бейдж уверенности, а не выдумываются значения.',
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
      template: 'Шаблонный текст',
      noData: 'нет данных',
      freeGrant: 'Бесплатно / грант'
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
    },

    // Landing — добор хардкодных строк
    landingExtra: {
      heroHighlight: '— персональный путь поступления',
      step1Title: 'Профиль',
      step1Sub: 'Учеба и бюджет',
      step2Title: 'Подбор',
      step2Sub: 'Диагностика',
      step3Title: 'Сравнение',
      step3Sub: 'Стоимость и требования',
      step4Title: 'План',
      step4Sub: 'Дорожная карта',
      panelTitle: 'Мой профиль поступления',
      panelReady: 'Готовность к поступлению',
      panelLevel: 'Уровень: продвинутый',
      panelRegion: 'Регион: первый уровень',
      deterministicTitle: 'Детерминированный скоринг',
      deterministicDesc: 'Каждая рекомендация воспроизводима и проверяема.',
      featuresTitle: 'Что делает Pathly особенным',
      feature1Title: 'Прозрачные факторы оценки',
      feature1Desc: 'Каждый вариант показывает свои веса: бюджет, специальность, страна, успеваемость, язык, сроки и финансирование.',
      feature2Title: 'Без лишних обещаний',
      feature2Desc: 'Нет кликбейта с процентами принятия. Только оценка соответствия, которую можно объяснить строка за строкой.',
      feature3Title: 'Проверенные источники',
      feature3Desc: 'Факты имеют ссылки на источники; все непроверенное помечено как демонстрационные данные.',
      audienceLabel: 'Для студентов и родителей',
      closingTitle: 'Создано для школьников, которые ценят ясность информации.',
      closingText: 'Начните рано, сохраняйте здравомыслие и организуйте все требования в одном месте.',
      footerNote: 'Pathly на базе детерминированного скоринга · демонстрационный датасет'
    },

    // Profile — сообщения валидации
    profileErrors: {
      grade: 'Выберите класс',
      graduationYear: 'Введите корректный год',
      field: 'Выберите специальность',
      gpa: 'Введите GPA от 0 до 5',
      targetCountries: 'Выберите хотя бы одну страну',
      budgetUsdPerYear: 'Введите бюджет (0 для только грант)'
    },

    // Diagnosis — вопросы диагностики (JSON хранит только ключи)
    questions: {
      'q-routine': {
        prompt: 'Насколько стабильно вы занимаетесь в обычной неделе?',
        helper: 'Вспомните последний месяц, а не идеальную неделю.',
        high: 'Очень стабильно — планирую и следую плану',
        mid: 'В основном стабильно, бывают срывы',
        low: 'Занимаюсь в основном перед дедлайнами'
      },
      'q-math': {
        prompt: 'Насколько вам комфортно с продвинутой математикой?',
        strong: 'Сильно — нравится и получаю высокие баллы',
        ok: 'Нормально — справляюсь с усилием',
        weak: 'Это мой самый сложный предмет'
      },
      'q-english': {
        prompt: 'Насколько вы уверены в устном и письменном английском?',
        b2: 'Уверен(а) — могу учиться полностью на английском',
        b1: 'Справляюсь с повседневными темами',
        a2: 'Еще укрепляю базу'
      },
      'q-exam-ready': {
        prompt: 'Уже сдавали стандартизированный экзамен (IELTS / SAT / ENT)?',
        yes: 'Да, балл уже есть',
        planned: 'Еще нет, но дата назначена',
        no: 'Еще нет и плана нет'
      },
      'q-project': {
        prompt: 'Есть ли у вас проект, портфолио или результат соревнования?',
        helper: 'Что-то, что можно показать в заявке.',
        yes: 'Да, сильный результат',
        small: 'Что-то небольшое',
        no: 'Пока ничего'
      },
      'q-mobility': {
        prompt: 'Насколько вы готовы учиться за границей, вдали от дома?',
        ready: 'Очень готов(а) — это моя цель',
        mixed: 'Открыт(а) к этому, но с осторожностью',
        home: 'Предпочел(а) бы остаться в своей стране'
      }
    },

    // Roadmap — шаблоны шагов (JSON хранит только ключи)
    templates: {
      'doc-transcript': {
        title: 'Подготовьте академическую справку и отчет о GPA',
        description: 'Запросите официальную справку в школе и подтвердите GPA по требуемой шкале.'
      },
      'doc-motivation': {
        title: 'Напишите мотивационное письмо',
        description: 'Черновик на одну страницу, связывающий ваш интерес к направлению с конкретной программой.'
      },
      'doc-recommendations': {
        title: 'Запросите два рекомендательных письма',
        description: 'Попросите двух преподавателей, которые знают вашу учебу по профилю, минимум за три недели до дедлайна.'
      },
      'doc-passport': {
        title: 'Подготовьте паспорт и документы, удостоверяющие личность',
        description: 'Проверьте сроки действия — действующий паспорт нужен для каждой международной заявки.'
      },
      'exams-gap': {
        title: 'Закройте экзаменационный разрыв',
        description: 'Вы ниже требуемого балла хотя бы по одному экзамену, который нужен программам из шортлиста. Составьте план подготовки и запишитесь на ближайшую дату.'
      },
      'exams-always': {
        title: 'Сдайте требуемый стандартизированный экзамен',
        description: 'Сдайте экзамен, чтобы балл появился до закрытия окон подачи.'
      },
      'academic-gap': {
        title: 'Поднимите GPA до целевого диапазона',
        description: 'Сфокусируйтесь на предметах, которые больше всего весят для выбранных программ.'
      },
      'academic-always': {
        title: 'Углубляйте знания по профильному предмету',
        description: 'Выходите за рамки школьной программы по выбранному направлению — так будет легче с эссе и интервью.'
      },
      'act-project': {
        title: 'Сделайте один проект для портфолио',
        description: 'Завершите небольшой презентабельный проект по вашему направлению и задокументируйте результат.'
      },
      'act-competition': {
        title: 'Участвуйте в соревновании или олимпиаде',
        description: 'Региональный или национальный результат усилит академическую часть заявки.'
      },
      'act-volunteering': {
        title: 'Продолжайте волонтерство или роль в клубе',
        description: 'Постоянство в течение месяцев важнее разовых активностей.'
      },
      'deadlines-scholarship': {
        title: 'Рассмотрите заявку на стипендию',
        description: 'Ваш бюджет ниже стоимости обучения в программе из шортлиста, поэтому без финансирования не обойтись.'
      }
    },

    // Дедлайны программ
    deadlines: {
      'application-deadline': 'Срок подачи заявлений',
      'documents-submission': 'Сдача документов',
      'application-window-closes': 'Окно подачи закрывается',
      'document-review': 'Проверка документов',
      'application-deadline-non-eu': 'Срок подачи заявок (не ЕС)',
      'priority-application-deadline': 'Приоритетный срок подачи',
      'scholarship-consideration-deadline': 'Срок рассмотрения стипендии',
      'ucas-equal-consideration-deadline': 'Срок равного рассмотрения UCAS',
      'non-eu-application-deadline': 'Срок подачи заявок не из ЕС',
      'holland-scholarship-deadline': 'Срок стипендии Holland Scholarship'
    },

    // Тексты, генерируемые движком
    engine: {
      // scoring.ts — предупреждения
      wConfirmExam: 'Подтвердите балл {exam} — требуется {min}',
      wExamRequired: '{exam} {min} требуется, у вас {cur}',
      wGpaBelow: 'GPA {gpa} ниже ожидаемого минимума {min}',
      wNoEnglishTrack: 'Программа ведется на {langs} — без англоязычного трека',
      wDeadlineSoon: 'Окно подачи закрывается менее чем через 3 месяца',
      wDeadlinePassed: 'Срок подачи заявлений уже прошел',
      wOverBudget: 'Стоимость на {amount} в год превышает ваш бюджет',
      // diagnosisEngine — отсутствующие поля
      missingGrade: 'Класс',
      missingGraduationYear: 'Год выпуска',
      missingCitizenship: 'Гражданство',
      missingField: 'Целевая специальность',
      missingGpa: 'GPA',
      missingTargetCountries: 'Целевые страны',
      missingBudget: 'Бюджет на обучение',
      missingExamScores: 'Баллы экзаменов',
      // diagnosisEngine — сигналы
      sRoutineStrength: 'Стабильная учебная рутина в течение недели',
      sRoutineGap: 'Учеба зависит от дедлайнов',
      sMathStrength: 'Сильная база по математике',
      sMathGap: 'Математика — узкое место, она нужна для большинства STEM-программ',
      sEnglishStrength: 'Готовы учиться полностью на английском',
      sEnglishGap: 'Уровень английского ниже обычного порога поступления',
      sExamYes: 'Балл стандартизированного экзамена уже есть',
      sExamPlanned: 'Дата экзамена назначена, но балла еще нет',
      sExamNo: 'Стандартизированный экзамен еще не запланирован',
      sProjectYes: 'Есть презентабельный проект или результат соревнования',
      sProjectNo: 'Пока нет работы для усиления заявки',
      sMobilityReady: 'Четкое намерение учиться за границей',
      sMobilityHome: 'Желание остаться в стране сужает выбор',
      // roadmapEngine — заголовки и описания шагов
      rsExamGapWithScore: 'Достигните {exam} {min} (у вас {cur})',
      rsExamGapNoScore: 'Достигните {exam} {min} (пока нет балла)',
      rsExamAlways: 'Сдать требуемый стандартизированный экзамен',
      rsExamAlwaysDesc: 'Сдайте экзамен, чтобы балл появился до закрытия окон подачи.',
      rsExamGapDesc: 'Закройте разрыв между текущим баллом и требуемым.',
      rsSubmitDocuments: 'Подать документы — {uni} ({program})',
      rsSubmitApplication: 'Подать заявление — {uni} ({program})',
      rsApplyFunding: 'Подать заявку на финансирование — {uni}',
      rsDemoDateNote: 'Демонстрационная дата — проверьте на официальной странице.',
      rsVerifiedDateNote: 'Проверенная дата.',
      rsRaiseGpa: 'Повышайте GPA до {target} (сейчас {current})',
      rsScholarshipFallbackTitle: 'Подать заявку на стипендию',
      rsScholarshipFallbackDesc: 'Ваш бюджет ниже стоимости обучения программы из шортлиста.'
    }
  },

  en: {
    // Landing Screen
    landing: {
      title: 'Pathly',
      subtitle: 'Your personal admission route',
      description: 'Fill in your profile, take the diagnostic, and get a personalized list of universities with a step-by-step roadmap',
      start: 'Start',
      continue: 'Continue',
      demo: 'Try demo',
      continueAsGuest: 'Continue as guest'
    },

    // Navigation
    nav: {
      home: 'Home',
      profile: 'Profile',
      diagnosis: 'Diagnosis',
      recommendations: 'Recommendations',
      comparison: 'Comparison',
      roadmap: 'Roadmap',
      sources: 'Sources',
      dataAndSources: 'Data & sources · methodology',
      diagnose: 'Diagnose',
      matches: 'Matches'
    },

    topbar: {
      homeTitle: 'Home',
      brandSub: 'Admissions dossier',
      readinessTitle: 'Profile completeness and roadmap progress',
      readiness: 'readiness',
      aiTitle: 'AI explanations can be turned off — the deterministic fallback always works',
      aiLabel: 'AI'
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
      noGaps: 'Nothing critical flagged.',
      pointers: 'Diagnostic pointers',
      advisoryDiscipline: 'Advisory discipline',
      advisoryDestinations: 'Advisory destinations',
      profileCompleteness: 'Profile completeness',
      open: 'Open',
      profileChoiceStays: 'Your profile choice stays {field}.',
      advisoryHint: 'These only nudge scoring, they do not filter.',
      complete: 'Complete',
      gapsCount: '{count} gaps',
      allKeyFieldsFilled: 'All key fields filled',
      missingPrefix: 'Missing:',
      missingImpact: 'Recommendations still generate, but confidence is reduced for those factors.',
      seeRecommendations: 'See my recommendations',
      editProfile: 'Edit profile'
    },

    // Recommendations Screen
    recommendations: {
      step: 'Recommendations',
      title: 'Universities that fit your profile',
      subtitle: 'Every match is computed from your eight inputs, then explained factor by factor. Edit anything below and the shortlist recomputes live.',
      strongFit: 'Strong fit',
      moderateFit: 'Moderate fit',
      stretch: 'Stretch',
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
      resetProfile: 'Reset profile',
      confidence: 'confidence',
      newEntry: 'new entry',
      yearsShort: 'yrs',
      perYearShort: '/yr',
      fitScore: 'fit score',
      whyFits: 'Why this fits',
      template: 'template',
      fitBreakdown: 'Fit breakdown',
      top3Only: 'Top 3 only',
      allFactors: 'All factors',
      inComparison: 'In comparison',
      addToCompare: 'Add to compare',
      hideDetails: 'Hide details',
      details: 'Details',
      requirements: 'Requirements',
      noExamRequirement: 'No exam requirement listed',
      minGpaLanguage: 'Min GPA: {gpa} · Language: {lang}',
      teachingLanguage: 'Teaching language',
      livingCostApprox: 'Living cost ≈ {cost}/yr',
      deadlines: 'Deadlines',
      noDeadlineRecorded: 'No deadline recorded — confirm on the official page.',
      universitySite: 'University site',
      sourcesCount: '{count} source(s)',
      sensitivityTitle: 'Live sensitivity',
      sensitivityHint: 'change a parameter -> shortlist moves',
      destinations: 'Destinations',
      tuitionBudget: 'Tuition budget',
      discipline: 'Discipline',
      grant: 'Grant',
      unlockTitle: 'How to unlock more options',
      deterministicRemedies: 'Deterministic remedies',
      derivedFromData: 'derived from data',
      relaxedPrograms: 'Other programs in the dataset you have not unlocked yet: {list}.',
      stickySelectPrograms: 'Select programs to compare',
      stickySelected: '{count} selected',
      readyToCompare: 'Ready to compare side by side.',
      pickAtLeastTwo: 'Pick at least two programs.',
      compare: 'Compare',
      roadmap: 'Roadmap',
      recommendationNotesRemoved: '{count} programs were removed: net cost is far above your budget with no scholarship path.',
      recommendationNotesFound: 'Only {count} strong matches found — relaxed options are shown below.',
      suggestionBudget: 'Raising your budget by about {gap}/year unlocks the cheapest blocked option.',
      suggestionCountry: 'Adding {country} to your target countries would surface strong options (best local score {score}%).',
      suggestionExam: 'Improving your exam scores would lift several programs — start with {program}.'
    },

    // Comparison Screen
    comparison: {
      step: 'Comparison',
      title: 'Compare your options',
      subtitle: 'Side by side on criteria that actually change a decision: cost, requirements, language and deadlines.',
      needTwoTitle: 'Select at least two programs',
      needTwoText: 'Go back to recommendations and tick two or three programs to compare them side by side.',
      backToRecommendations: 'Back to recommendations',
      criterion: 'Criterion',
      remove: 'Remove',
      university: 'University',
      program: 'Program',
      fitScore: 'Fit score',
      netTuition: 'Net tuition / year',
      livingCost: 'Living cost / year',
      totalCost: 'Est. total / year',
      examRequirements: 'Exam requirements',
      noneListed: 'None listed',
      minGpa: 'Min GPA',
      teachingLanguage: 'Teaching language',
      duration: 'Duration',
      years: 'years',
      deadlines: 'Deadlines',
      demo: 'demo',
      notRecorded: 'Not recorded',
      mainConstraint: 'Main constraint',
      noneFlagged: 'None flagged',
      buildRoadmap: 'Build my roadmap',
      addOrRemove: 'Add or remove programs'
    },

    // Roadmap Screen
    roadmap: {
      step: 'Roadmap',
      title: 'Your admission roadmap',
      subtitle: 'Five phases built from your shortlist and the gaps your diagnosis flagged. Tick a step and the next action updates immediately.',
      noRoadmapTitle: 'No roadmap yet',
      noRoadmapText: 'Get your recommendations first, then Pathly builds a phased plan from your shortlist and profile gaps.',
      getRecommendations: 'Get recommendations',
      nextAction: 'Next Action',
      priority: 'priority',
      due: 'due',
      demoDate: 'demo date',
      progress: 'Progress',
      roadmapComplete: 'Roadmap complete',
      stepsDone: 'Steps done',
      programsInPlan: 'Programs in plan',
      deadlineSteps: 'Deadline steps',
      readiness: 'Readiness',
      completed: 'Completed',
      inProgress: 'In Progress',
      todo: 'To Do',
      markAsDone: 'Mark as Done',
      admissionPhases: 'Admission trajectory phases',
      cycleHint: 'tap a node to cycle status',
      cycleTitle: 'Cycle status: to do -> in progress -> done',
      source: 'source',
      warningDemo: 'Deadline dates marked demo data are demonstrative and must be verified on official university pages before submission.',
      backToComparison: 'Back to comparison',
      printPdf: 'Print / save as PDF',
      adjustRecommendations: 'Adjust recommendations',
      done: 'done',
      demoData: 'demo data',
      phases: {
        exams: 'Exams & testing',
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
      step: 'Transparency',
      title: 'Data Sources',
      description: 'All university and program data comes from official sources. Demo data is marked with a blue badge.',
      universitiesInDataset: 'Universities in dataset',
      programsInDataset: 'Programs',
      officialLinks: 'Official source links',
      demoEntries: 'Demonstrative entries',
      valuesDemoNotice: 'Numeric values in this MVP (tuition, exam thresholds, deadlines) are demonstrative. Verify each figure on official admissions pages before submission.',
      officialSourcesTitle: 'Official sources',
      verifiedLinks: 'verified links',
      notAvailable: 'n/a',
      demoEntriesTitle: 'Demonstrative entries',
      methodology: 'Methodology',
      methodology1: 'Every recommendation is produced by a deterministic 7-factor weighted score, not by a language model.',
      methodology2: 'The model only rephrases facts the engine already computed, and always has a template fallback.',
      methodology3: 'Hard filters remove only what is clearly impossible; country, subject and cost stay as weighted factors.',
      methodology4: 'Missing data lowers confidence instead of inventing values.',
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
      template: 'Template text',
      noData: 'no data',
      freeGrant: 'Free / grant'
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
    },

    // Landing — hardcoded strings moved into the dictionary
    landingExtra: {
      heroHighlight: '— your personal admission route',
      step1Title: 'Profile',
      step1Sub: 'Studies & budget',
      step2Title: 'Matching',
      step2Sub: 'Diagnostic',
      step3Title: 'Compare',
      step3Sub: 'Cost & requirements',
      step4Title: 'Plan',
      step4Sub: 'Roadmap',
      panelTitle: 'My admission profile',
      panelReady: 'Admission readiness',
      panelLevel: 'Level: advanced',
      panelRegion: 'Region: first tier',
      deterministicTitle: 'Deterministic scoring',
      deterministicDesc: 'Every recommendation is reproducible and verifiable.',
      featuresTitle: 'What makes Pathly different',
      feature1Title: 'Transparent scoring factors',
      feature1Desc: 'Every option shows its weights: budget, subject, country, academics, language, timeline and funding.',
      feature2Title: 'No empty promises',
      feature2Desc: 'No clickbait acceptance percentages. Just a fit score that can be explained line by line.',
      feature3Title: 'Verified sources',
      feature3Desc: 'Facts link to their sources; anything unverified is labelled as demonstrative data.',
      audienceLabel: 'For students and parents',
      closingTitle: 'Built for students who value clarity of information.',
      closingText: 'Start early, stay sane, and keep every requirement in one place.',
      footerNote: 'Pathly powered by deterministic scoring · demo dataset'
    },

    // Profile — validation messages
    profileErrors: {
      grade: 'Choose your grade',
      graduationYear: 'Enter a valid year',
      field: 'Choose a discipline',
      gpa: 'Enter a GPA between 0 and 5',
      targetCountries: 'Pick at least one destination',
      budgetUsdPerYear: 'Enter a budget (0 for grant only)'
    },

    // Diagnosis — diagnostic questions (JSON stores keys only)
    questions: {
      'q-routine': {
        prompt: 'How consistent are your study habits across a normal week?',
        helper: 'Think about the last month, not an ideal week.',
        high: 'Very consistent — I plan and follow through',
        mid: 'Mostly consistent with some slips',
        low: 'I study mostly before deadlines'
      },
      'q-math': {
        prompt: 'How comfortable are you with advanced mathematics?',
        strong: 'Strong — I enjoy it and score high',
        ok: 'Okay — I manage with effort',
        weak: 'It is my hardest subject'
      },
      'q-english': {
        prompt: 'How confident are you speaking and writing in English?',
        b2: 'Confident — I can study fully in English',
        b1: 'I manage everyday topics',
        a2: 'Still building basics'
      },
      'q-exam-ready': {
        prompt: 'Have you already taken a standardised exam (IELTS / SAT / ENT)?',
        yes: 'Yes, I have a score',
        planned: 'Not yet, but I have a date planned',
        no: 'Not yet and no plan'
      },
      'q-project': {
        prompt: 'Do you have a project, portfolio or competition result?',
        helper: 'Anything you could show on an application.',
        yes: 'Yes, a strong one',
        small: 'Something small',
        no: 'Nothing yet'
      },
      'q-mobility': {
        prompt: 'How ready are you to study abroad, away from home?',
        ready: 'Very ready — that is my goal',
        mixed: 'Open to it, but cautious',
        home: 'I would prefer to stay in my country'
      }
    },

    // Roadmap — step templates (JSON stores keys only)
    templates: {
      'doc-transcript': {
        title: 'Prepare your academic transcript and GPA report',
        description: 'Request an official transcript from your school and confirm your GPA on the required scale.'
      },
      'doc-motivation': {
        title: 'Write your motivation letter',
        description: 'Draft a one-page statement linking your subject interest to the specific program you are applying to.'
      },
      'doc-recommendations': {
        title: 'Request two recommendation letters',
        description: 'Ask two teachers who know your subject work well, at least three weeks before the deadline.'
      },
      'doc-passport': {
        title: 'Prepare your passport and ID documents',
        description: 'Check validity dates — a valid passport is required for every international application.'
      },
      'exams-gap': {
        title: 'Close your exam gap',
        description: 'You are below the required score on at least one exam your shortlisted programs ask for. Build a study plan and book the next test date.'
      },
      'exams-always': {
        title: 'Take the required standardised exam',
        description: 'Sit the exam so your score is available before the application deadlines close.'
      },
      'academic-gap': {
        title: 'Raise your GPA to the target band',
        description: 'Focus on the subjects that carry the most weight for your chosen programs.'
      },
      'academic-always': {
        title: 'Deepen your core subject knowledge',
        description: 'Go beyond the school curriculum in the discipline you are applying to, so interviews and essays are easier.'
      },
      'act-project': {
        title: 'Ship one portfolio project',
        description: 'Finish a small, presentable project in your intended field and document the outcome.'
      },
      'act-competition': {
        title: 'Join a relevant competition or olympiad',
        description: 'A regional or national result strengthens the academic part of your application.'
      },
      'act-volunteering': {
        title: 'Keep a sustained volunteering or club role',
        description: 'Consistency over months matters more than a single one-off activity.'
      },
      'deadlines-scholarship': {
        title: 'Consider a scholarship application',
        description: 'Your budget is below the tuition cost of a shortlisted program, so applying for funding is not optional.'
      }
    },

    // Program deadlines
    deadlines: {
      'application-deadline': 'Application deadline',
      'documents-submission': 'Documents submission',
      'application-window-closes': 'Application window closes',
      'document-review': 'Document review',
      'application-deadline-non-eu': 'Application deadline (non-EU)',
      'priority-application-deadline': 'Priority application deadline',
      'scholarship-consideration-deadline': 'Scholarship consideration deadline',
      'ucas-equal-consideration-deadline': 'UCAS equal consideration deadline',
      'non-eu-application-deadline': 'Non-EU application deadline',
      'holland-scholarship-deadline': 'Holland Scholarship deadline'
    },

    // Engine-generated texts
    engine: {
      // scoring.ts — warnings
      wConfirmExam: 'Confirm your {exam} score — {min} is required',
      wExamRequired: '{exam} {min} required, you have {cur}',
      wGpaBelow: 'GPA {gpa} is below the {min} typically expected',
      wNoEnglishTrack: 'This program is taught in {langs} — no English track',
      wDeadlineSoon: 'The application window closes in under 3 months',
      wDeadlinePassed: 'The application deadline has already passed',
      wOverBudget: 'Costs {amount} per year above your budget',
      // diagnosisEngine — missing fields
      missingGrade: 'Grade',
      missingGraduationYear: 'Graduation year',
      missingCitizenship: 'Citizenship',
      missingField: 'Target discipline',
      missingGpa: 'GPA',
      missingTargetCountries: 'Target countries',
      missingBudget: 'Tuition budget',
      missingExamScores: 'Exam scores',
      // diagnosisEngine — signals
      sRoutineStrength: 'Consistent weekly study routine',
      sRoutineGap: 'Study routine depends on deadlines',
      sMathStrength: 'Strong quantitative foundation',
      sMathGap: 'Mathematics is a bottleneck — most STEM programs require it',
      sEnglishStrength: 'Ready to study fully in English',
      sEnglishGap: 'English level below the usual admission threshold',
      sExamYes: 'A standardised exam score is already in hand',
      sExamPlanned: 'Exam date planned but no score yet',
      sExamNo: 'No standardised exam booked yet',
      sProjectYes: 'A presentable project or competition result',
      sProjectNo: 'No portfolio piece to strengthen the application',
      sMobilityReady: 'Clear intent to study abroad',
      sMobilityHome: 'Preference to stay in-country narrows the option set',
      // roadmapEngine — step titles and descriptions
      rsExamGapWithScore: 'Reach {exam} {min} (you have {cur})',
      rsExamGapNoScore: 'Reach {exam} {min} (no score yet)',
      rsExamAlways: 'Take the required standardised exam',
      rsExamAlwaysDesc: 'Sit the exam so your score is available before the application deadlines close.',
      rsExamGapDesc: 'Close the gap between your current exam score and the requirement.',
      rsSubmitDocuments: 'Submit documents — {uni} ({program})',
      rsSubmitApplication: 'Submit application — {uni} ({program})',
      rsApplyFunding: 'Apply for funding — {uni}',
      rsDemoDateNote: 'Demonstrative date — verify on the official page.',
      rsVerifiedDateNote: 'Verified date.',
      rsRaiseGpa: 'Raise your GPA to {target} (now {current})',
      rsScholarshipFallbackTitle: 'Apply for a scholarship',
      rsScholarshipFallbackDesc: 'Your budget is below the tuition cost of a shortlisted program.'
    }
  }
} as const

const LANG_KEY = 'pathly:language'

/**
 * Resolve the active language once and cache it. `localStorage` may be
 * unavailable (SSR, the vitest node environment) — in that case we fall back
 * to the default language instead of throwing.
 */
function readSavedLanguage(): Language {
  try {
    const saved =
      typeof localStorage !== 'undefined' ? (localStorage.getItem(LANG_KEY) as Language | null) : null
    if (saved === 'ru' || saved === 'en') return saved
  } catch {
    /* storage unavailable — default language is used */
  }
  return 'ru'
}

let currentLanguage: Language = readSavedLanguage()

export function setLanguage(lang: Language) {
  if (lang === currentLanguage) return
  currentLanguage = lang
  try {
    localStorage.setItem(LANG_KEY, lang)
  } catch {
    /* ignore — preference stays in memory for this session */
  }
  listeners.forEach((l) => l())
}

type LangListener = () => void
const listeners = new Set<LangListener>()

/** Subscribe to language changes (used to re-render the tree without a page reload). */
export function subscribeLanguage(listener: LangListener): () => void {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export function getLanguage(): Language {
  return currentLanguage
}

export function t<K extends keyof typeof translations.ru>(key: K): typeof translations.ru[K] {
  return (translations[currentLanguage] as typeof translations.ru)[key]
}

export function tr(path: string, params: Record<string, string | number> = {}, defaultValue: string = ''): string {
  const template = tValue(path, defaultValue)
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(params[key] ?? `{${key}}`))
}

export function tValue(path: string, defaultValue: string = ''): string {
  const keys = path.split('.')
  let obj: any = translations[currentLanguage]
  for (const key of keys) {
    obj = obj?.[key]
    if (obj === undefined) return defaultValue
  }
  return typeof obj === 'string' ? obj : defaultValue
}

export function getCountryLabel(code: keyof typeof translations.ru.countries): string {
  return tValue(`countries.${code}`, code)
}

export function getFieldLabel(code: keyof typeof translations.ru.fields): string {
  return tValue(`fields.${code}`, code)
}

export { translations }
