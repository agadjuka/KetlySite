export type Language = 'ru' | 'en';

export const dictionaries = {
  ru: {
    meta: {
      description: 'KETLY - AI-агент для вашего бизнеса',
    },
    chat: {
      stopKeyword: 'Стоп',
      stopButton: 'Остановить демонстрацию',
      inputPlaceholder: 'Введите сообщение...',
      quickActionsTitle: 'Быстрые сообщения',
      contactUs: 'Связаться с нами',
      agentSubtitle: 'ИИ Администратор для вашего бизнеса',
      onlineStatus: 'Online 24/7',
      toggleDemo: 'Переключить демо',
      database: 'База Данных',
      backToHome: 'На главную',
      carRental: 'АРЕНДА АВТО',
      velvetSpa: 'СПА-САЛОН',
      examples: 'Кейсы',
      managerNotificationTitle: 'Сообщение отправлено менеджеру',
    },
    welcomeInfo: {
      title: 'Демонстрация возможностей Ketly',
      description: 'Вы находитесь в интерфейсе умного бизнес-ассистента. Здесь вы можете протестировать работу нейросети перед её внедрением в ваш проект.',
      capabilities: {
        consult: 'Консультировать: Отвечу на любые вопросы по условиям, особенностям работы и техническим возможностям.',
        demonstrate: 'Демонстрировать: Включу режим симуляции и отработаю диалог с клиентом именно для вашего бизнеса (будь то ресторан, аренда авто или онлайн-школа).',
        connect: 'Соединять: Если вы готовы к сотрудничеству, я помогу связаться с менеджером для обсуждения проекта либо уточнения деталей.',
      },
      footer: 'Начните диалог с любого вопроса или выберите действие из списка быстрых сообщений.',
      button: 'Начать работу',
    },
    capabilities: [
      {
        id: 'benefits',
        title: 'Преимущества внедрения',
        description: 'Зачем моему бизнесу нужен AI-агент и в чем конкретная выгода?',
        payload:
          'В чем твои главные преимущества перед живыми сотрудниками? Зачем мне это внедрять?',
      },
      {
        id: 'audience',
        title: 'Кому это подходит',
        description: 'Подойдет ли автоматизация именно для моей ниши и специфики?',
        payload:
          'В каких сферах ты можешь работать? Хотел бы узнать подойдёт ли это для моей ниши?',
      },
      {
        id: 'customization',
        title: 'Индивидуальная настройка',
        description: 'Можешь ли ты общаться в нашем фирменном стиле?',
        payload: 'Можно ли настроить твой стиль общения?',
      },
      {
        id: 'integrations',
        title: 'Интеграции и CRM',
        description: 'Можешь ли ты работать с нашей CRM-системой?',
        payload: 'Расскажи, как ты работаешь с CRM, базами данных, таблицами?',
      },
      {
        id: 'control',
        title: 'Контроль за агентом',
        description: 'Каким образом я могу отслеживать твою работу?',
        payload:
          'Расскажи, как я могу следить за твоей работой и брать контроль в случае необходимости?',
      },
      {
        id: 'edgeCases',
        title: 'Нестандартные ситуации',
        description: 'Что будешь делать ты, если не будешь знать ответа на вопрос?',
        payload: 'А если ты не знаешь ответ или клиент начнет ругаться? Что ты будешь делать?',
      },
      {
        id: 'testDrive',
        title: 'Запустить Тест-Драйв',
        description: 'Превратите меня в сотрудника вашего бизнеса прямо сейчас.',
        payload:
          'Я хочу посмотреть демонстрацию. Покажи, как ты мог бы работать в моём бизнесе.',
      },
      {
        id: 'contact',
        title: 'Хочу!',
        description: 'Связаться с нами чтобы обсудить детали.',
        payload: 'Свяжите меня с менеджером для обсуждения деталей.',
      },
    ],
    demo: {
      startMessages: {
        acknowledgement:
          'Отлично! Сейчас я буду играть роль администратора ${niche}. Если захотите остановить демонстрацию и снова обсудить мои услуги— просто напишите «Стоп».',
        disclaimer:
          'Важный момент: сейчас я импровизирую.  Стиль общения, тон и данные о работе организации я подобрала сама для примера. При реальной работе я буду общаться строго в стиле вашего бренда, а также использовать данные вашей системы.',
        error: 'Ошибка связи',
      },
      instructions: {
        desktop:
          'Вы можете общаться со мной простым человеческим языком — я всё понимаю. Или используйте быстрые сообщения, которые видите справа.',
        mobile:
          'Вы можете общаться со мной простым человеческим языком — я всё понимаю. Или используйте быстрые сообщения, нажав на кнопку ✨ слева от поля ввода.',
      },
      scenarios: [
        'Здравствуйте! ||| Меня зовут Ketly. Я ИИ-администратор, и, кажется, Вы ищете идеального сотрудника для своего бизнеса ||| Я могу рассказать подробности своей работы, или прямо сейчас провести для Вас живую демонстрацию, побыв в роли администратора Вашей компании ||| {{INSTRUCTION}}',
        'Добрый день! 👋 ||| Я Ketly. Если Вы открыли этот сайт, значит, Вам, скорее всего, нужен администратор, который никогда не устает ||| Хотите, я расскажу о своих функциях подробнее? Либо я могу прямо сейчас побыть вашим сотрудником и показать как это может выглядеть на практике ||| {{INSTRUCTION}}',
        'Здравствуйте! ||| Рада видеть вас. Я Ketly, цифровой администратор. Думаю, я именно то, что нужно вашему проекту ||| Вы можете расспросить меня о подробностях моей работы, либо я могу прямо сейчас показать себя в деле и побыть администратором Вашей компании ||| {{INSTRUCTION}}',
        'Добрый день! ||| Меня зовут Ketly. Я умею общаться с клиентами, консультировать и продавать Ваши услуги. И, видимо, Вы хотели бы чтобы я работала на Вас ||| Просто спросите, что я умею. Также я могу прямо сейчас показать как я могла бы работать у Вас, для этого мне нужно знать чем занимается ваша компания. ||| {{INSTRUCTION}}',
        'Приветствую! ||| Я Ketly. Я здесь, чтобы взять на себя общение с вашими клиентами и полностью разгрузить вас. ||| Могу подробнее показать, чем я занимаюсь, или прямо сейчас устроить вам мини-демо, сыграв роль администратора вашей компании. ||| {{INSTRUCTION}}',
      ],
    },
  },
  en: {
    meta: {
      description: 'KETLY — AI agent for your business',
    },
    chat: {
      stopKeyword: 'Stop',
      stopButton: 'Stop demo',
      inputPlaceholder: 'Type a message...',
      quickActionsTitle: 'Quick messages',
      contactUs: 'Contact us',
      agentSubtitle: 'AI Administrator for your business',
      onlineStatus: 'Online 24/7',
      toggleDemo: 'Toggle demo',
      database: 'Database',
      backToHome: 'Home',
      carRental: 'CAR RENTAL',
      velvetSpa: 'SPA',
      examples: 'Cases',
      managerNotificationTitle: 'Message sent to manager',
    },
    welcomeInfo: {
      title: 'Ketly Capabilities Demo',
      description: 'You are in the smart business assistant interface. Here you can test how the AI works before integrating it into your project.',
      capabilities: {
        consult: 'Consult: I will answer any questions about terms, features, and technical capabilities.',
        demonstrate: 'Demonstrate: I can switch to simulation mode and walk through tailored to your business — whether it\'s a restaurant, car rental service, or online school.',
        connect: 'Connect: If you\'re ready to collaborate, I can help you get in touch with a manager to discuss your project or clarify any details.',
      },
      footer: 'Start a conversation with any question or choose an option from the quick actions list.',
      button: 'Get Started',
    },
    capabilities: [
      {
        id: 'benefits',
        title: 'Key benefits',
        description: 'Why does my business need an AI agent and what ROI will it bring?',
        payload:
          'What are your main advantages over human employees? Why should I implement this?',
      },
      {
        id: 'audience',
        title: 'Who is it for',
        description: 'Will automation fit my specific niche and workflow?',
        payload:
          'Which industries can your agents support? Does it cover my niche? I want to understand if it suits me.',
      },
      {
        id: 'customization',
        title: 'Customization',
        description: 'Can you speak in our brand voice?',
        payload: 'Is it possible to adjust your communication style?',
      },
      {
        id: 'integrations',
        title: 'Integrations & CRM',
        description: 'Can you work with our CRM system?',
        payload: 'Explain how you connect with CRMs, databases, or spreadsheets.',
      },
      {
        id: 'control',
        title: 'Monitoring & Control',
        description: 'How exactly can I monitor your work?',
        payload:
          'How can I keep track of what you are doing and take over if I need to?',
      },
      {
        id: 'edgeCases',
        title: 'Edge cases',
        description: 'What do you do if you do not know the answer?',
        payload:
          'What happens if you do not know the answer or the customer gets angry? What will you do?',
      },
      {
        id: 'testDrive',
        title: 'Start a test-drive',
        description: 'Turn me into your employee right now.',
        payload:
          'I want to see a demo. Show how you would operate inside my business.',
      },
      {
        id: 'contact',
        title: "I'm in!",
        description: 'Get in touch with us to discuss the details.',
        payload: 'Connect me with a manager so we can go over the details.',
      },
    ],
    demo: {
      startMessages: {
        acknowledgement:
          'Great! I will now act as an administrator for ${niche}. If you want to stop the demo and get back to discussing my services, just type "Stop".',
        disclaimer:
          'One note: I am improvising right now. I picked the tone of voice and business data myself purely for the example. When working for real, I will speak strictly in your brand voice and pull data from your systems.',
        error: 'Connection error',
      },
      instructions: {
        desktop:
          'You can talk to me in plain human language — I understand everything. Or use the quick prompts on the right.',
        mobile:
          'You can talk to me in plain human language — I understand everything. Or tap the ✨ button to open quick prompts.',
      },
      scenarios: [
        'Hello! ||| My name is Ketly. I am an AI administrator and it looks like you are searching for the perfect team member. ||| I can explain how I work in detail or run a live demo right now acting as the administrator of your company. ||| {{INSTRUCTION}}',
        'Good afternoon! 👋 ||| I am Ketly. If you opened this site, you probably need an administrator who never gets tired. ||| Want me to walk you through my functions? Or I can act as your employee right now and show what it looks like in practice. ||| {{INSTRUCTION}}',
        'Greetings! ||| Happy to see you. I am Ketly, a digital administrator, and I am pretty sure I am exactly what your project needs. ||| Ask me anything about my work or let me jump into a quick demo acting as your company administrator. ||| {{INSTRUCTION}}',
        'Good afternoon! ||| My name is Ketly. I can talk to clients, consult, and sell your services — and it seems you would like me on your team. ||| Just ask what I can do. I can also show how I would work for you right now, I only need to know what your business does. ||| {{INSTRUCTION}}',
        'Welcome! ||| I am Ketly. I am here to handle all client communication and free up your time completely. ||| I can describe my scope in detail or run a mini-demo right now by acting as your company administrator. ||| {{INSTRUCTION}}',
      ],
    },
  },
} as const;

export type Dictionary = typeof dictionaries[Language];

