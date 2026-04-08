export type PrivacyBlock =
  | { kind: "paragraph"; text: string }
  | { kind: "list"; items: string[] };

export type PrivacySection = {
  title: string;
  blocks: PrivacyBlock[];
};

export type PrivacyDoc = {
  pageTitle: string;
  effectiveDateLabel: string;
  effectiveDate: string;
  breadcrumbHome: string;
  breadcrumbVyon: string;
  breadcrumbCurrent: string;
  langSwitcherEn: string;
  langSwitcherRu: string;
  sections: PrivacySection[];
};

export const VYON_PRIVACY_EN: PrivacyDoc = {
  pageTitle: "Privacy Policy",
  effectiveDateLabel: "Effective date",
  effectiveDate: "April 8, 2026",
  breadcrumbHome: "Home",
  breadcrumbVyon: "VYON",
  breadcrumbCurrent: "Privacy Policy",
  langSwitcherEn: "English",
  langSwitcherRu: "Russian",
  sections: [
    {
      title: "1. General Provisions",
      blocks: [
        {
          kind: "paragraph",
          text: 'This Privacy Policy describes how personal data of users is collected, processed, and protected when using the virtual try-on service (the "Service").',
        },
        {
          kind: "paragraph",
          text: "By using the Service, you agree to this Privacy Policy.",
        },
      ],
    },
    {
      title: "2. Data Controller",
      blocks: [
        {
          kind: "paragraph",
          text: 'The data controller is the entity operating the Service (the "Controller").',
        },
        {
          kind: "paragraph",
          text: "Contact email: contact@ketly.app",
        },
      ],
    },
    {
      title: "3. Personal Data Collected",
      blocks: [
        {
          kind: "paragraph",
          text: "The Service may collect and process the following data:",
        },
        {
          kind: "list",
          items: [
            "images (photos) uploaded by the user;",
            "Telegram ID;",
            "Telegram username;",
            "display name (if available);",
            "technical data and metadata (such as timestamps, usage logs, etc.).",
          ],
        },
      ],
    },
    {
      title: "4. Purpose of Data Processing",
      blocks: [
        {
          kind: "paragraph",
          text: "Personal data is processed for the following purposes:",
        },
        {
          kind: "list",
          items: [
            "providing virtual try-on functionality;",
            "ensuring proper operation of the Service;",
            "storing user images for repeated use;",
            "improving algorithms and service quality;",
            "ensuring security and preventing abuse.",
          ],
        },
      ],
    },
    {
      title: "5. Image Processing",
      blocks: [
        {
          kind: "paragraph",
          text: "User-uploaded images are processed automatically using machine learning technologies.",
        },
        {
          kind: "paragraph",
          text: "During the testing phase, authorized developers may access images strictly for the purpose of improving the Service.",
        },
      ],
    },
    {
      title: "6. Data Storage",
      blocks: [
        {
          kind: "paragraph",
          text: "Personal data is stored using cloud infrastructure, including Google Cloud.",
        },
        {
          kind: "paragraph",
          text: "Data may be stored on servers located outside the user's country, including outside the Russian Federation.",
        },
        {
          kind: "paragraph",
          text: "User images are stored:",
        },
        {
          kind: "list",
          items: [
            "until deleted by the user;",
            "or automatically deleted after 30 (thirty) days of inactivity.",
          ],
        },
      ],
    },
    {
      title: "7. Cross-Border Data Transfer",
      blocks: [
        {
          kind: "paragraph",
          text: "By using the Service, the user agrees that their personal data may be transferred to and processed in foreign jurisdictions, including countries that may not provide an adequate level of data protection (including the United States).",
        },
      ],
    },
    {
      title: "8. Data Sharing",
      blocks: [
        {
          kind: "paragraph",
          text: "The Controller does not sell or disclose personal data to third parties, except where necessary for the operation of the Service (including cloud providers and data processing services).",
        },
      ],
    },
    {
      title: "9. User Rights",
      blocks: [
        {
          kind: "paragraph",
          text: "The user has the right to:",
        },
        {
          kind: "list",
          items: [
            "request information about their personal data;",
            "request deletion of their data;",
            "withdraw consent to data processing.",
          ],
        },
        {
          kind: "paragraph",
          text: "Data deletion can be performed via the Service interface or by contacting: contact@ketly.app",
        },
      ],
    },
    {
      title: "10. Data Security",
      blocks: [
        {
          kind: "paragraph",
          text: "The Controller implements reasonable measures to protect personal data from unauthorized access, alteration, disclosure, or destruction.",
        },
      ],
    },
    {
      title: "11. Limitations",
      blocks: [
        {
          kind: "paragraph",
          text: "Users are strongly advised not to upload sensitive content, including nudity or private images.",
        },
      ],
    },
    {
      title: "12. Changes to This Policy",
      blocks: [
        {
          kind: "paragraph",
          text: "The Controller may update this Privacy Policy at any time. The current version will always be available to users.",
        },
      ],
    },
    {
      title: "13. Consent",
      blocks: [
        {
          kind: "paragraph",
          text: "By using the Service, the user confirms their consent to this Privacy Policy.",
        },
      ],
    },
  ],
};

export const VYON_PRIVACY_RU: PrivacyDoc = {
  pageTitle: "Политика обработки персональных данных",
  effectiveDateLabel: "Дата вступления в силу",
  effectiveDate: "8 апреля 2026 г.",
  breadcrumbHome: "Главная",
  breadcrumbVyon: "VYON",
  breadcrumbCurrent: "Политика конфиденциальности",
  langSwitcherEn: "English",
  langSwitcherRu: "Русский",
  sections: [
    {
      title: "1. Общие положения",
      blocks: [
        {
          kind: "paragraph",
          text: 'Настоящая политика обработки персональных данных (далее — «Политика») определяет порядок обработки и защиты персональных данных пользователей сервиса виртуальной примерки (далее — «Сервис»).',
        },
        {
          kind: "paragraph",
          text: "Используя Сервис, пользователь выражает согласие с данной Политикой.",
        },
      ],
    },
    {
      title: "2. Оператор персональных данных",
      blocks: [
        {
          kind: "paragraph",
          text: 'Оператором персональных данных является лицо, управляющее Сервисом (далее — «Оператор»).',
        },
        {
          kind: "paragraph",
          text: "Контактный email: contact@ketly.app",
        },
      ],
    },
    {
      title: "3. Персональные данные, которые обрабатываются",
      blocks: [
        {
          kind: "paragraph",
          text: "Оператор может обрабатывать следующие данные:",
        },
        {
          kind: "list",
          items: [
            "изображения (фотографии), загружаемые пользователем;",
            "Telegram ID;",
            "имя пользователя (username);",
            "имя (если указано в Telegram);",
            "технические данные и метаданные (время действий, логирование операций и др.).",
          ],
        },
      ],
    },
    {
      title: "4. Цели обработки данных",
      blocks: [
        {
          kind: "paragraph",
          text: "Персональные данные обрабатываются в следующих целях:",
        },
        {
          kind: "list",
          items: [
            "предоставление функционала виртуальной примерки одежды;",
            "обеспечение корректной работы Сервиса;",
            "хранение пользовательских изображений для повторного использования пользователем;",
            "улучшение качества работы алгоритмов и сервисных функций;",
            "обеспечение безопасности и предотвращение злоупотреблений.",
          ],
        },
      ],
    },
    {
      title: "5. Обработка изображений",
      blocks: [
        {
          kind: "paragraph",
          text: "Загружаемые пользователем изображения обрабатываются автоматически с использованием алгоритмов машинного обучения.",
        },
        {
          kind: "paragraph",
          text: "В период тестирования доступ к изображениям могут иметь уполномоченные разработчики Сервиса исключительно для целей улучшения качества работы Сервиса.",
        },
      ],
    },
    {
      title: "6. Хранение данных",
      blocks: [
        {
          kind: "paragraph",
          text: "Персональные данные хранятся в облачной инфраструктуре (включая Google Cloud).",
        },
        {
          kind: "paragraph",
          text: "Данные могут храниться на серверах, расположенных за пределами Российской Федерации.",
        },
        {
          kind: "paragraph",
          text: "Изображения пользователя хранятся:",
        },
        {
          kind: "list",
          items: [
            "до момента их удаления пользователем;",
            "либо автоматически удаляются при отсутствии активности пользователя в течение 30 (тридцати) дней.",
          ],
        },
      ],
    },
    {
      title: "7. Трансграничная передача данных",
      blocks: [
        {
          kind: "paragraph",
          text: "Пользователь соглашается с тем, что его персональные данные могут передаваться и обрабатываться в иностранных государствах, включая страны, не обеспечивающие адекватную защиту персональных данных (в том числе США).",
        },
      ],
    },
    {
      title: "8. Передача третьим лицам",
      blocks: [
        {
          kind: "paragraph",
          text: "Оператор не передает персональные данные третьим лицам, за исключением случаев, когда это необходимо для функционирования Сервиса (включая облачные и технологические сервисы обработки данных).",
        },
      ],
    },
    {
      title: "9. Права пользователя",
      blocks: [
        {
          kind: "paragraph",
          text: "Пользователь имеет право:",
        },
        {
          kind: "list",
          items: [
            "запросить информацию о своих данных;",
            "требовать удаления своих данных;",
            "отозвать согласие на обработку персональных данных.",
          ],
        },
        {
          kind: "paragraph",
          text: "Удаление данных может быть осуществлено через интерфейс Сервиса или путем обращения на email: contact@ketly.app",
        },
      ],
    },
    {
      title: "10. Безопасность данных",
      blocks: [
        {
          kind: "paragraph",
          text: "Оператор принимает разумные меры для защиты персональных данных от несанкционированного доступа, изменения, раскрытия или уничтожения.",
        },
      ],
    },
    {
      title: "11. Ограничения",
      blocks: [
        {
          kind: "paragraph",
          text: "Пользователю не рекомендуется загружать изображения, содержащие чувствительный контент, включая обнаженное тело или иные материалы личного характера.",
        },
      ],
    },
    {
      title: "12. Изменения политики",
      blocks: [
        {
          kind: "paragraph",
          text: "Оператор вправе изменять настоящую Политику. Актуальная версия всегда доступна пользователю.",
        },
      ],
    },
    {
      title: "13. Согласие пользователя",
      blocks: [
        {
          kind: "paragraph",
          text: "Использование Сервиса означает согласие пользователя с настоящей Политикой обработки персональных данных.",
        },
      ],
    },
  ],
};
