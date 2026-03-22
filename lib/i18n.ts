export type Language = 'eng' | 'rus' | 'heb';

export const LANGUAGE_STORAGE_KEY = 'nurit-language';

export const languageMeta: Record<
  Language,
  { label: string; htmlLang: string; dir: 'ltr' | 'rtl' }
> = {
  eng: { label: 'ENG', htmlLang: 'en', dir: 'ltr' },
  rus: { label: 'RUS', htmlLang: 'ru', dir: 'ltr' },
  heb: { label: 'HEB', htmlLang: 'he', dir: 'rtl' },
};

export const languages = Object.keys(languageMeta) as Language[];

export const defaultLanguage: Language = 'eng';

export function isLanguage(value: string): value is Language {
  return value in languageMeta;
}

export const translations = {
  eng: {
    nav: {
      home: 'Home',
      about: 'About Us',
      partners: 'Partners',
      team: 'Team',
      annualEvent: 'Annual Event',
      gallery: 'Gallery',
      sponsors: 'Sponsors',
      donate: 'Donate',
      contact: 'Contact',
      register: 'Register',
      privacy: 'Privacy',
      developerContact: 'Developer Contact',
    },
    hero: {
      title: "Russian Junior N'shei Chabad",
      taglineLine1: 'A warm community for women of all ages.',
      taglineLine2: 'Gatherings, inspiration, and connection.',
      register: 'Register',
      donate: 'Donate',
    },
    home: {
      welcomeTitle: 'Welcome to Our Community',
      welcomeText:
        'We are a warm and close-knit community of Russian-speaking Jewish women in Brooklyn. We organize gatherings, holiday celebrations, learning programs, and support one another as a family.',
      registerTitle: 'Register',
      registerText: 'Join our community — simple and quick registration',
      annualTitle: 'Annual Event',
      annualText: "Our annual women's gathering — see details and program",
      donateTitle: 'Donate',
      donateText: 'Support our community programs and events',
      programsTitle: 'Our Programs',
      gatheringTitle: 'Community Gatherings',
      gatheringText:
        "Regular women's farbrengens with food, talks, and togetherness",
      learningTitle: 'Learning Programs',
      learningText:
        'Torah classes, holiday preparation, and inspirational talks',
      farbrengenTitle: 'Annual Farbrengen',
      farbrengenText:
        'Our biggest event of the year — a grand celebration for all women',
      supportTitle: 'Volunteer Support',
      supportText:
        'Community outreach, helping families, and supporting those in need',
      ctaTitle: 'Join Us Today',
      ctaText:
        'Become part of a warm and welcoming community. Registration is simple and takes just a minute.',
      contact: 'Contact Us',
    },
    about: {
      title: 'About Us',
      missionTitle: 'Our Mission',
      missionText:
        "Russian Junior N'shei Chabad is a warm community of Russian-speaking Jewish women in Brooklyn. We support, inspire, and connect women through meaningful events, education, and community care.",
      whatWeDoTitle: 'What We Do',
      whatWeDoText:
        'We organize gatherings, holiday celebrations, Torah learning programs, and volunteer initiatives. Our annual farbrengen brings hundreds of women together for an evening of inspiration.',
      whoWeServeTitle: 'Who We Serve',
      whoWeServeText:
        'Women of all ages from the Russian-speaking Jewish community. Whether you are new to the neighborhood or a longtime resident, you are welcome here.',
      inspirationEyebrow: 'Mission of Jewish Women',
      inspirationTitle: 'A woman carries a unique spiritual strength that brings light to the whole world.',
      inspirationLead:
        'This message should inspire every Jewish woman with dignity, inner strength, and a deep sense of purpose.',
      quote:
        'In the merit of righteous women our ancestors left Egypt, and in the merit of righteous women the final Redemption will come.',
      quoteSource:
        'Words of the Lubavitcher Rebbe — Rabbi Menachem Mendel Schneerson',
      pillarsTitle: 'Three pillars of a great mission',
      pillars: [
        {
          title: 'To Study',
          text: 'To study Torah, Chassidus, and the teachings of the Rebbe, filling the soul with light.',
        },
        {
          title: 'To Share',
          text: 'To bring inspiration, warmth, and Jewish strength to every woman, near and far.',
        },
        {
          title: 'To Uplift',
          text: 'To help build strong Jewish homes, strong children, and a stronger generation.',
        },
      ],
      closingTitle: 'Your light can warm a home, a family, and an entire community.',
      closingText:
        'When a Jewish woman strengthens faith, kindness, modesty, Torah, and holiness in daily life, she does not change only herself. She raises the people around her and brings redemption closer.',
      quotesTitle: "Words that strengthen a woman's mission",
      quotes: [
        {
          text: 'Righteous women of the final generation of exile carry the merit of the righteous women who left Egypt. In their merit, redemption comes closer.',
          source: 'Sefer HaSichot 5752',
        },
        {
          text: 'At the giving of the Torah, G-d first addressed the women. In the building of the Mishkan, women were among the foremost contributors. Their merit reflects a unique spiritual greatness.',
          source: 'Toras Menachem 5752',
        },
        {
          text: 'In our generation, the woman is a central force of the Jewish home and of the Jewish world.',
          source: 'Simchat Torah 5713',
        },
      ],
    },
    annual: {
      title: "Annual Women's Gathering",
      detailsTitle: 'Event Details',
      date: 'Date',
      dateValue: 'To be announced',
      location: 'Location',
      locationValue: 'Brooklyn, New York',
      focus: 'Focus',
      focusValue: 'Inspiration, connection, and community',
      register: 'Register Now',
      expectTitle: 'What to Expect',
      expectText:
        'An evening of warmth, inspiration, and community. Delicious food, special guests, raffles, and meaningful connections.',
      questionsTitle: 'Questions?',
      questionsText:
        'Contact us by phone or email for any questions about the event. We are happy to help with transportation, seating, and special needs.',
    },
    contact: {
      title: 'Contact Us',
      touchTitle: 'Get in Touch',
      visitTitle: 'Visit Us',
      visitText:
        'We welcome you to our gatherings and events. Reach out by phone or email — we are happy to answer your questions.',
      location: 'Brooklyn, New York',
    },
    donate: {
      title: 'Donate',
      panelTitle: 'Support Our Community',
      text:
        'Your donation helps us organize gatherings, learning programs, holiday celebrations, and provide support to women in our community. Every contribution makes a difference.',
      amount36: 'Donate $36',
      amount72: 'Donate $72',
      amount180: 'Donate $180',
    },
    gallery: {
      title: 'Photo Gallery',
    },
    register: {
      title: 'Register',
      panelTitle: 'Join Our Community',
      text:
        'Fill out this simple form to register for our events and programs. It only takes a minute.',
      benefits: [
        'Receive event invitations',
        'Stay connected with the community',
        'Be the first to know about new programs',
      ],
      nameLabel: 'Your name',
      emailLabel: 'Email',
      birthdayLabel: 'Date of birth',
      submitButton: 'Subscribe',
      successMessage: 'Thank you for subscribing! You will receive updates about our events.',
      errorMessage: 'Something went wrong. Please try again.',
      hebrewBirthdayLabel: 'Your Hebrew birthday',
    },
    services: {
      title: 'Our Services',
      gatheringTitle: 'Community Gatherings',
      gatheringText:
        "Regular women's farbrengens with delicious food, inspiring talks, and warm togetherness. Everyone is welcome.",
      learningTitle: 'Learning Programs',
      learningText:
        'Torah classes, holiday preparation workshops, and inspirational talks by guest speakers.',
      annualTitle: 'Annual Farbrengen',
      annualText:
        'Our biggest event of the year — a grand celebration bringing together hundreds of women for an evening of inspiration.',
      supportTitle: 'Volunteer Support',
      supportText:
        'Community outreach, helping families in need, and supporting women through difficult times.',
    },
    team: {
      eyebrow: 'Team',
      title: 'Meet the women behind NURIT.',
      text:
        'This page introduces the leadership and the women who help organize the community with warmth, care, and dedication.',
      leadRole: 'Head and organizer of the organization',
      memberRole: 'Team member',
    },
    thankYou: {
      eyebrow: 'Thank You',
      title: 'Your registration has been received.',
      text: 'We can customize this page later with email confirmation details.',
      returnHome: 'Return Home',
    },
    privacy: {
      eyebrow: 'Privacy Policy',
      title: 'Privacy information will be placed here before launch.',
      text:
        'This page should explain what visitor data is collected, how forms are handled, and who can be contacted about privacy questions.',
    },
    notFound: {
      eyebrow: 'Page Not Found',
      title: 'This page could not be found.',
      text: 'Use the main navigation to return to the website.',
    },
    footer: {
      title: "RJ N'shei Chabad",
      rights: "All rights reserved.",
      developerLabel: 'Development and maintenance:',
    },
    form: {
      firstName: 'First name',
      lastName: 'Last name',
      phone: 'Phone',
      email: 'Email',
      guests: 'Number of guests',
      notes: 'Notes',
      send: 'Send Registration',
    },
    developerContact: {
      title: 'Message the developer',
      subtitle: 'Use this form to send a private message to Levi Dombrovsky.',
      name: 'Your name',
      email: 'Your email',
      message: 'Your message',
      send: 'Send message',
      success: 'Your message has been sent.',
      error: 'Something went wrong. Please try again.',
    },
    partners: {
      title: 'Partners',
      introTitle: 'Education On The Go',
      introText:
        'A partner educational project sharing meaningful Jewish reading, inspiration, and family-friendly publications online.',
      visitSite: 'Visit edonthego.org',
      subscribeTitle: 'Subscribe to the newspapers',
      subscribeText:
        'Choose the edition you would like to receive and leave your email.',
      russianTitle: 'Chevrutah24x7 (RUS)',
      russianText:
        'Russian-language edition with inspiring reading and community content.',
      kidsTitle: 'Chevrutah KIDS',
      kidsText:
        "A children's edition with warm Jewish content for young readers and families.",
      emailPlaceholder: 'Your email',
      subscribeButton: 'Subscribe',
      success: 'Subscription request sent.',
      error: 'Could not send subscription request.',
    },
    shabbat: {
      parashat: 'Parashat',
      candleLighting: 'Candle lighting',
      havdalah: 'Havdalah',
    },
  },
  rus: {
    nav: {
      home: 'Главная',
      about: 'О нас',
      partners: 'Партнеры',
      team: 'Команда',
      annualEvent: 'Ежегодное событие',
      gallery: 'Галерея',
      sponsors: '\u0421\u043f\u043e\u043d\u0441\u043e\u0440\u044b',
      donate: 'Пожертвовать',
      contact: 'Контакты',
      register: 'Регистрация',
      privacy: 'Конфиденциальность',
      developerContact: 'Связь с разработчиком',
    },
    hero: {
      title: "Russian Junior N'shei Chabad",
      taglineLine1: 'Теплое сообщество для женщин всех возрастов.',
      taglineLine2: 'Встречи, вдохновение и связь между людьми.',
      register: 'Регистрация',
      donate: 'Пожертвовать',
    },
    home: {
      welcomeTitle: 'Добро пожаловать в наше сообщество',
      welcomeText:
        'Мы теплое и дружное сообщество русскоязычных еврейских женщин в Бруклине. Мы организуем встречи, праздники, обучающие программы и поддерживаем друг друга как семья.',
      registerTitle: 'Регистрация',
      registerText: 'Присоединяйтесь к нашему сообществу — просто и быстро',
      annualTitle: 'Ежегодное событие',
      annualText: 'Наш ежегодный женский вечер — подробности и программа',
      donateTitle: 'Пожертвовать',
      donateText: 'Поддержите наши программы и мероприятия',
      programsTitle: 'Наши программы',
      gatheringTitle: 'Встречи сообщества',
      gatheringText: 'Женские фарбренгены, еда, выступления и теплое общение',
      learningTitle: 'Обучающие программы',
      learningText: 'Уроки Торы, подготовка к праздникам и вдохновляющие лекции',
      farbrengenTitle: 'Ежегодный фарбренген',
      farbrengenText: 'Наше главное событие года — большой праздник для женщин',
      supportTitle: 'Волонтерская помощь',
      supportText: 'Поддержка сообщества, помощь семьям и забота о нуждающихся',
      ctaTitle: 'Присоединяйтесь к нам',
      ctaText:
        'Станьте частью теплого и гостеприимного сообщества. Регистрация простая и занимает всего минуту.',
      contact: 'Связаться с нами',
    },
    about: {
      title: 'О нас',
      missionTitle: 'Наша миссия',
      missionText:
        `Организация русскоговорящих еврейских женщин Хабада была основана в Рош Ходеш Шват 1999 года в Краун-Хайтс, Бруклин, Нью-Йорк. Уже более 26 лет она объединяет и вдохновляет женщин по всему Нью-Йорку и за его пределами через изучение Торы и хасидской традиции.

Каждую неделю проходят четыре урока по Хасидусу, Галахе, Рамбаму и Пиркей Овос. Уроки также транслируются онлайн и достигают русскоговорящих женщин по всему миру, вдохновляя их укреплять свою связь с Торой и еврейской жизнью.

Ежемесячно на Рош Ходеш проводится фарбренген, а раз в год — большой юбилейный фарбренген, продолжающий традицию уже 26 лет.

Наша организация также оказывает практическую помощь: поддержку роженицам, больным и семьям, нуждающимся в материальной помощи и домашней еде.

Наша цель — укреплять еврейский дух женщин, вдохновлять их быть настоящими акерес габайс — сердцем и основой еврейского дома, учить, объединять и поддерживать друг друга. Особое внимание уделяется подготовке женщин к приходу Мошиаха — зажигать в сердцах женщин живую веру и ожидание Освобождения, что, в свою очередь, ускоряет его для всего еврейского народа. Ведь в заслугу праведных еврейских женщин еврейский народ был освобождён из Египта, и в их заслугу произойдёт и окончательное Освобождение.`,
      whatWeDoTitle: 'Что мы делаем',
      whatWeDoText:
        'Мы организуем встречи, праздничные программы, уроки Торы и волонтерские инициативы. Наш ежегодный фарбренген собирает сотни женщин на вдохновляющий вечер.',
      whoWeServeTitle: 'Для кого мы работаем',
      whoWeServeText:
        'Для женщин всех возрастов из русскоязычного еврейского сообщества. Если вы недавно переехали или живете здесь давно — вам здесь рады.',
      inspirationEyebrow: 'Миссия еврейской женщины',
      inspirationTitle:
        'Еврейская женщина несет в себе особую духовную силу, которая приносит свет всему миру.',
      inspirationLead:
        'Этот раздел должен вдохновлять каждую еврейскую женщину достоинством, внутренней силой и глубоким ощущением своей миссии.',
      quote:
        'В заслугу праведных женщин вышли наши предки из Египта, и в заслугу праведных женщин наступит окончательное Избавление.',
      quoteSource:
        'Слова Любавического Ребе — Рабби Менахема-Мендла Шнеерсона',
      pillarsTitle: 'Три столпа великой миссии',
      pillars: [
        {
          title: 'Изучать',
          text: 'Изучать Тору, хасидус и слова Ребе, наполняя душу светом.',
        },
        {
          title: 'Распространять',
          text: 'Нести вдохновение, тепло и еврейскую силу каждой женщине — близко и далеко.',
        },
        {
          title: 'Возвышать',
          text: 'Строить крепкие еврейские дома, сильных детей и более светлое поколение.',
        },
      ],
      closingTitle:
        'Ваш свет может согреть дом, семью и целое сообщество.',
      closingText:
        'Когда еврейская женщина укрепляет веру, доброту, скромность, Тору и святость в повседневной жизни, она меняет не только себя. Она поднимает окружающих и приближает Избавление.',
      quotesTitle: 'Слова, укрепляющие миссию женщины',
      quotes: [
        {
          text: 'Праведные женщины последнего поколения галута несут в себе заслугу праведных женщин, которые вышли из Египта. Именно в их заслугу приближается Избавление.',
          source: 'Сефер ГаСихот 5752',
        },
        {
          text: 'При даровании Торы Всевышний обратился сначала к женщинам. При постройке Мишкана женщины были среди главных жертвователей. Эта заслуга отражает уникальную духовную высоту еврейской женщины.',
          source: 'Торас Менахем 5752',
        },
        {
          text: 'В нашем поколении женщина является одной из главных движущих сил еврейского дома и всего еврейского мира.',
          source: 'Симхат Тора 5713',
        },
        {
          text: 'Это не просто женская организация — это духовная армия последнего поколения.',
          source: 'Игрот Кодеш',
        },
      ],
    },
    annual: {
      title: 'Ежегодный женский вечер',
      detailsTitle: 'Информация о событии',
      date: 'Дата',
      dateValue: 'Будет объявлено',
      location: 'Место',
      locationValue: 'Бруклин, Нью-Йорк',
      focus: 'Тема',
      focusValue: 'Вдохновение, общение и сообщество',
      register: 'Зарегистрироваться',
      expectTitle: 'Что вас ждет',
      expectText:
        'Вечер тепла, вдохновения и общения. Вкусная еда, специальные гости, розыгрыши и важные знакомства.',
      questionsTitle: 'Есть вопросы?',
      questionsText:
        'Свяжитесь с нами по телефону или email по любым вопросам. Мы с радостью поможем с транспортом, рассадкой и особыми потребностями.',
    },
    contact: {
      title: 'Контакты',
      touchTitle: 'Свяжитесь с нами',
      visitTitle: 'Приходите к нам',
      visitText:
        'Мы будем рады видеть вас на наших встречах и мероприятиях. Позвоните или напишите — мы с радостью ответим на ваши вопросы.',
      location: 'Бруклин, Нью-Йорк',
    },
    donate: {
      title: 'Пожертвовать',
      panelTitle: 'Поддержите наше сообщество',
      text:
        'Ваше пожертвование помогает нам организовывать встречи, обучающие программы, праздники и поддерживать женщин в нашем сообществе. Каждый вклад имеет значение.',
      amount36: 'Пожертвовать $36',
      amount72: 'Пожертвовать $72',
      amount180: 'Пожертвовать $180',
    },
    gallery: {
      title: 'Фотогалерея',
    },
    register: {
      title: 'Регистрация',
      panelTitle: 'Присоединяйтесь к нашему сообществу',
      text:
        'Заполните эту простую форму, чтобы зарегистрироваться на наши события и программы. Это займет всего минуту.',
      benefits: [
        'Получать приглашения на мероприятия',
        'Оставаться на связи с сообществом',
        'Первыми узнавать о новых программах',
      ],
      nameLabel: 'Ваше имя',
      emailLabel: 'Email',
      birthdayLabel: 'Дата рождения',
      submitButton: 'Подписаться',
      successMessage: 'Спасибо за подписку! Вы будете получать обновления о наших мероприятиях.',
      errorMessage: 'Произошла ошибка. Попробуйте снова.',
      hebrewBirthdayLabel: 'Ваш еврейский день рождения',
    },
    services: {
      title: 'Наши программы',
      gatheringTitle: 'Встречи сообщества',
      gatheringText:
        'Женские фарбренгены с вкусной едой, вдохновляющими словами и теплой атмосферой. Добро пожаловать всем.',
      learningTitle: 'Обучающие программы',
      learningText:
        'Уроки Торы, мастер-классы к праздникам и вдохновляющие лекции приглашенных гостей.',
      annualTitle: 'Ежегодный фарбренген',
      annualText:
        'Наше самое большое событие года — большой праздник, который объединяет сотни женщин на вдохновляющий вечер.',
      supportTitle: 'Волонтерская помощь',
      supportText:
        'Помощь семьям, забота о нуждающихся и поддержка женщин в сложные периоды.',
    },
    team: {
      eyebrow: 'Команда',
      title: 'Познакомьтесь с женщинами, которые стоят за NURIT.',
      text:
        'На этой странице представлены руководители и женщины, которые с теплом, заботой и преданностью помогают организовывать сообщество.',
      leadRole: 'Глава и организатор организации',
      memberRole: 'Участница команды',
    },
    thankYou: {
      eyebrow: 'Спасибо',
      title: 'Ваша регистрация получена.',
      text: 'Позже мы сможем добавить сюда детали подтверждения по email.',
      returnHome: 'Вернуться на главную',
    },
    privacy: {
      eyebrow: 'Политика конфиденциальности',
      title: 'Информация о конфиденциальности будет добавлена до запуска сайта.',
      text:
        'На этой странице будет объяснено, какие данные собираются, как обрабатываются формы и к кому обращаться по вопросам конфиденциальности.',
    },
    notFound: {
      eyebrow: 'Страница не найдена',
      title: 'Эта страница не найдена.',
      text: 'Используйте главное меню, чтобы вернуться на сайт.',
    },
    footer: {
      title: "RJ N'shei Chabad",
      rights: 'Все права защищены.',
      developerLabel: 'Разработка и обслуживание:',
    },
    form: {
      firstName: 'Имя',
      lastName: 'Фамилия',
      phone: 'Телефон',
      email: 'Email',
      guests: 'Количество гостей',
      notes: 'Комментарий',
      send: 'Отправить регистрацию',
    },
    developerContact: {
      title: 'Написать разработчику',
      subtitle: 'Используйте эту форму, чтобы отправить личное сообщение Levi Dombrovsky.',
      name: 'Ваше имя',
      email: 'Ваш email',
      message: 'Ваше сообщение',
      send: 'Отправить сообщение',
      success: 'Ваше сообщение отправлено.',
      error: 'Что-то пошло не так. Попробуйте еще раз.',
    },
    partners: {
      title: 'Партнеры',
      introTitle: 'Education On The Go',
      introText:
        'Партнерский образовательный проект, который делится содержательными еврейскими материалами для чтения, вдохновением и семейными изданиями онлайн.',
      visitSite: 'Перейти на edonthego.org',
      subscribeTitle: 'Подписка на газеты',
      subscribeText:
        'Выберите нужное издание и оставьте свой email.',
      russianTitle: 'Chevrutah24x7 (RUS)',
      russianText:
        'Русскоязычное издание с вдохновляющим чтением и материалами для сообщества.',
      kidsTitle: 'Chevrutah KIDS',
      kidsText:
        'Детское издание с теплым еврейским содержанием для детей и семей.',
      emailPlaceholder: 'Ваш email',
      subscribeButton: 'Подписаться',
      success: 'Заявка на подписку отправлена.',
      error: 'Не удалось отправить заявку на подписку.',
    },
    shabbat: {
      parashat: 'Недельная глава',
      candleLighting: 'Зажигание свечей',
      havdalah: 'Авдала',
    },
  },
  heb: {
    nav: {
      home: 'ראשי',
      about: 'אודות',
      partners: 'שותפים',
      team: 'צוות',
      annualEvent: 'אירוע שנתי',
      gallery: 'גלריה',
      sponsors: 'נותני חסות',
      donate: 'תרומה',
      contact: 'צור קשר',
      register: 'הרשמה',
      privacy: 'פרטיות',
      developerContact: 'יצירת קשר עם המפתח',
    },
    hero: {
      title: "Russian Junior N'shei Chabad",
      taglineLine1: 'קהילה חמה לנשים בכל הגילאים.',
      taglineLine2: 'מפגשים, השראה וקשר אנושי.',
      register: 'להרשמה',
      donate: 'לתרומה',
    },
    home: {
      welcomeTitle: 'ברוכות הבאות לקהילה שלנו',
      welcomeText:
        'אנחנו קהילה חמה ומגובשת של נשים יהודיות דוברות רוסית בברוקלין. אנו מארגנות מפגשים, חגים, תוכניות לימוד ותמיכה הדדית כמו משפחה.',
      registerTitle: 'הרשמה',
      registerText: 'הצטרפי לקהילה שלנו בתהליך פשוט ומהיר',
      annualTitle: 'אירוע שנתי',
      annualText: 'המפגש השנתי לנשים — פרטים ותוכנית',
      donateTitle: 'תרומה',
      donateText: 'תמכי בתוכניות ובאירועים של הקהילה',
      programsTitle: 'התוכניות שלנו',
      gatheringTitle: 'מפגשי קהילה',
      gatheringText: 'פרבריינגנס לנשים עם אוכל, דברי חיזוק ואווירה חמה',
      learningTitle: 'תוכניות לימוד',
      learningText: 'שיעורי תורה, הכנה לחגים והרצאות מעוררות השראה',
      farbrengenTitle: 'הפרבריינגן השנתי',
      farbrengenText: 'האירוע הגדול ביותר של השנה — חגיגה גדולה לנשים',
      supportTitle: 'תמיכה והתנדבות',
      supportText: 'סיוע למשפחות, תמיכה בקהילה ודאגה לנזקקות',
      ctaTitle: 'הצטרפי אלינו היום',
      ctaText:
        'היי חלק מקהילה חמה ומזמינה. ההרשמה פשוטה ואורכת רק דקה.',
      contact: 'צרי קשר',
    },
    about: {
      title: 'אודות',
      missionTitle: 'השליחות שלנו',
      missionText:
        "Russian Junior N'shei Chabad היא קהילה חמה של נשים יהודיות דוברות רוסית בברוקלין. אנו תומכות, מעוררות השראה ומחברות נשים דרך אירועים משמעותיים, לימוד ודאגה לקהילה.",
      whatWeDoTitle: 'מה אנחנו עושות',
      whatWeDoText:
        'אנו מארגנות מפגשים, תוכניות חג, שיעורי תורה ויוזמות התנדבות. הפרבריינגן השנתי שלנו מאחד מאות נשים לערב מעורר השראה.',
      whoWeServeTitle: 'למי זה מיועד',
      whoWeServeText:
        'לנשים בכל הגילאים מהקהילה היהודית דוברת הרוסית. אם את חדשה בשכונה או גרה כאן שנים — את מוזמנת באהבה.',
      inspirationEyebrow: 'שליחות האישה היהודייה',
      inspirationTitle:
        'לאישה היהודייה יש כוח רוחני מיוחד שמביא אור לעולם כולו.',
      inspirationLead:
        'החלק הזה נועד לעורר בכל אישה יהודייה תחושת כבוד, עוצמה פנימית ותודעה עמוקה של שליחות.',
      quote:
        'בזכות נשים צדקניות נגאלו אבותינו ממצרים, ובזכות נשים צדקניות תבוא הגאולה השלמה.',
      quoteSource:
        'מדברי הרבי מליובאוויטש — רבי מנחם מנדל שניאורסון',
      pillarsTitle: 'שלושה עמודים של שליחות גדולה',
      pillars: [
        {
          title: 'ללמוד',
          text: 'ללמוד תורה, חסידות ודברי הרבי, ולמלא את הנשמה באור.',
        },
        {
          title: 'להפיץ',
          text: 'להביא השראה, חום ועוצמה יהודית לכל אישה, מקרוב ומרחוק.',
        },
        {
          title: 'לרומם',
          text: 'לבנות בתים יהודיים חזקים, ילדים חזקים ודור מאיר יותר.',
        },
      ],
      closingTitle: 'האור שלך יכול לחמם בית, משפחה וקהילה שלמה.',
      closingText:
        'כאשר אישה יהודייה מחזקת אמונה, חסד, צניעות, תורה וקדושה בחיי היום־יום, היא אינה משנה רק את עצמה. היא מרוממת את הסובבים אותה ומקרבת את הגאולה.',
      quotesTitle: 'מילים המחזקות את שליחות האישה',
      quotes: [
        {
          text: 'הנשים הצדקניות של הדור האחרון נושאות את זכותן של הנשים הצדקניות שיצאו ממצרים, ובזכותן מתקרבת הגאולה.',
          source: 'ספר השיחות תשנ"ב',
        },
        {
          text: 'במתן תורה פנה הקב"ה תחילה אל הנשים. גם בהקמת המשכן היו הנשים מן התורמות המרכזיות. זכות זו מבטאת את מעלתה הרוחנית המיוחדת של האישה היהודייה.',
          source: 'תורת מנחם תשנ"ב',
        },
        {
          text: 'בדור שלנו האישה היא מן הכוחות המרכזיים של הבית היהודי ושל העולם היהודי כולו.',
          source: 'שמחת תורה תשי"ג',
        },
        {
          text: 'זו איננה רק ארגון נשים — זו צבא רוחני של הדור האחרון.',
          source: 'אגרות קודש',
        },
      ],
    },
    annual: {
      title: 'המפגש השנתי לנשים',
      detailsTitle: 'פרטי האירוע',
      date: 'תאריך',
      dateValue: 'יפורסם בהמשך',
      location: 'מיקום',
      locationValue: 'ברוקלין, ניו יורק',
      focus: 'נושא',
      focusValue: 'השראה, קשר וקהילה',
      register: 'להרשמה עכשיו',
      expectTitle: 'מה מחכה לכן',
      expectText:
        'ערב של חום, השראה וקהילה. אוכל טוב, אורחות מיוחדות, הגרלות וחיבורים משמעותיים.',
      questionsTitle: 'יש שאלות?',
      questionsText:
        'פנו אלינו בטלפון או באימייל לכל שאלה על האירוע. נשמח לעזור בנושא הגעה, ישיבה וצרכים מיוחדים.',
    },
    contact: {
      title: 'צור קשר',
      touchTitle: 'דברי איתנו',
      visitTitle: 'בואי לבקר',
      visitText:
        'נשמח לראות אותך במפגשים ובאירועים שלנו. התקשרי או כתבי לנו — נשמח לענות על כל שאלה.',
      location: 'ברוקלין, ניו יורק',
    },
    donate: {
      title: 'תרומה',
      panelTitle: 'תמכי בקהילה שלנו',
      text:
        'התרומה שלך מסייעת לנו לארגן מפגשים, תוכניות לימוד, חגים ולתת תמיכה לנשים בקהילה. כל תרומה עושה הבדל.',
      amount36: 'תרומה $36',
      amount72: 'תרומה $72',
      amount180: 'תרומה $180',
    },
    gallery: {
      title: 'גלריית תמונות',
    },
    register: {
      title: 'הרשמה',
      panelTitle: 'הצטרפי לקהילה שלנו',
      text:
        'מלאי את הטופס הפשוט כדי להירשם לאירועים ולתוכניות שלנו. זה לוקח רק דקה.',
      benefits: [
        'לקבל הזמנות לאירועים',
        'להישאר מחוברת לקהילה',
        'להיות הראשונה לדעת על תוכניות חדשות',
      ],
      nameLabel: 'השם שלך',
      emailLabel: 'אימייל',
      birthdayLabel: 'תאריך לידה',
      submitButton: 'להרשמה',
      successMessage: 'תודה על ההרשמה! תקבלי עדכונים על האירועים שלנו.',
      errorMessage: 'משהו השתבש. אנא נסי שוב.',
      hebrewBirthdayLabel: 'יום ההולדת העברי שלך',
    },
    services: {
      title: 'השירותים שלנו',
      gatheringTitle: 'מפגשי קהילה',
      gatheringText:
        'פרבריינגנס לנשים עם אוכל טוב, דברי השראה ואווירה חמה. כולן מוזמנות.',
      learningTitle: 'תוכניות לימוד',
      learningText:
        'שיעורי תורה, סדנאות הכנה לחגים והרצאות מעוררות השראה של אורחות מיוחדות.',
      annualTitle: 'פרבריינגן שנתי',
      annualText:
        'האירוע הגדול ביותר של השנה — חגיגה גדולה שמביאה מאות נשים לערב מעורר השראה.',
      supportTitle: 'תמיכה והתנדבות',
      supportText:
        'סיוע לקהילה, עזרה למשפחות ותמיכה בנשים ברגעים מורכבים.',
    },
    team: {
      eyebrow: 'צוות',
      title: 'הכירו את הנשים שמאחורי NURIT.',
      text:
        'בדף זה מוצגות המנהיגות והנשים המסייעות בארגון הקהילה באכפתיות, בחום ובמסירות.',
      leadRole: 'מנהלת ומארגנת הארגון',
      memberRole: 'חברת צוות',
    },
    thankYou: {
      eyebrow: 'תודה',
      title: 'ההרשמה שלך התקבלה.',
      text: 'בהמשך נוכל להוסיף כאן פרטי אישור בדוא״ל.',
      returnHome: 'חזרה לעמוד הראשי',
    },
    privacy: {
      eyebrow: 'מדיניות פרטיות',
      title: 'מידע על פרטיות יתווסף לכאן לפני העלייה לאוויר.',
      text:
        'עמוד זה יסביר אילו נתונים נאספים, כיצד מטופלים טפסים ולמי ניתן לפנות בשאלות על פרטיות.',
    },
    notFound: {
      eyebrow: 'העמוד לא נמצא',
      title: 'העמוד הזה לא נמצא.',
      text: 'השתמשי בתפריט הראשי כדי לחזור לאתר.',
    },
    footer: {
      title: "RJ N'shei Chabad",
      rights: 'כל הזכויות שמורות.',
      developerLabel: 'פיתוח ותחזוקה:',
    },
    form: {
      firstName: 'שם פרטי',
      lastName: 'שם משפחה',
      phone: 'טלפון',
      email: 'אימייל',
      guests: 'מספר אורחות',
      notes: 'הערות',
      send: 'שלחי הרשמה',
    },
    developerContact: {
      title: 'שליחת הודעה למפתח',
      subtitle: 'אפשר להשתמש בטופס זה כדי לשלוח הודעה אישית ל-Levi Dombrovsky.',
      name: 'השם שלך',
      email: 'האימייל שלך',
      message: 'ההודעה שלך',
      send: 'שליחת הודעה',
      success: 'ההודעה נשלחה בהצלחה.',
      error: 'אירעה שגיאה. נסי שוב.',
    },
    partners: {
      title: 'שותפים',
      introTitle: 'Education On The Go',
      introText:
        'פרויקט חינוכי שותף המפיץ תוכן יהודי מעשיר, השראה ועלוני משפחה לקוראים אונליין.',
      visitSite: 'מעבר ל-edonthego.org',
      subscribeTitle: 'הרשמה לעלונים',
      subscribeText:
        'בחרי את המהדורה הרצויה והשאירי את האימייל שלך.',
      russianTitle: 'Chevrutah24x7 (RUS)',
      russianText:
        'מהדורה ברוסית עם חומרי קריאה מעוררי השראה ותוכן קהילתי.',
      kidsTitle: 'Chevrutah KIDS',
      kidsText:
        'מהדורת ילדים עם תוכן יהודי חם לילדים ולמשפחות.',
      emailPlaceholder: 'האימייל שלך',
      subscribeButton: 'הרשמה',
      success: 'בקשת ההרשמה נשלחה.',
      error: 'לא ניתן היה לשלוח את הבקשה.',
    },
    shabbat: {
      parashat: 'פרשת',
      candleLighting: 'הדלקת נרות',
      havdalah: 'הבדלה',
    },
  },
} as const;
