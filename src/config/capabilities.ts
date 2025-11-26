import { LucideIcon, TrendingUp, Briefcase, Sliders, Database, Monitor, AlertTriangle, Sparkles, Rocket } from 'lucide-react';

export interface Capability {
  title: string;
  icon: LucideIcon;
  payload: string;
  description: string;
  color?: string;
}

export const capabilities: Capability[] = [
  {
    title: "Преимущества внедрения",
    icon: TrendingUp,
    payload: "В чем твои главные преимущества перед живыми сотрудниками? Зачем мне это внедрять?",
    description: "Зачем моему бизнесу нужен AI-агент и в чем конкретная выгода?",
    color: "violet"
  },
  {
    title: "Кому это подходит",
    icon: Briefcase,
    payload: "Для каких сфер бизнеса подходят ваши агенты? Есть ли ниши, хочу понять подойдет ли это мне?",
    description: "Подойдет ли автоматизация именно для моей ниши и специфики?",
    color: "indigo"
  },
  {
    title: "Индивидуальная настройка",
    icon: Sliders,
    payload: "Можно ли настроить твой стиль общения?",
    description: "Можешь ли ты общаться в нашем фирменном стиле?",
    color: "purple"
  },
  {
    title: "Интеграции и CRM",
    icon: Database,
    payload: "Расскажи, как ты работаешь с CRM, базами данных, таблицами?",
    description: "Можешь ли ты работать с нашей CRM-системой?",
    color: "sky"
  },
  {
    title: "Контроль за агентом",
    icon: Monitor,
    payload: "Расскажи, как я могу следить за твоей работой и брать контроль в случае необходимости?",
    description: "Каким образом я могу отслеживать твою работу?",
    color: "cyan"
  },
  {
    title: "Нестандартные ситуации",
    icon: AlertTriangle,
    payload: "А если ты не знаешь ответ или клиент начнет ругаться? Что ты будешь делать?",
    description: "Что будешь делать ты, если не будешь знать ответа на вопрос?",
    color: "orange"
  },
  {
    title: "Запустить Тест-Драйв",
    icon: Sparkles,
    payload: "Я хочу посмотреть демонстрацию. Покажи, как ты мог бы работать в моём бизнесе.",
    description: "Превратите меня в сотрудника вашего бизнеса прямо сейчас.",
    color: "blue"
  },
  {
    title: "Хочу!",
    icon: Rocket,
    payload: "Свяжите меня с менеджером для обсуждения деталей.",
    description: "Связаться с нами чтобы обсудить детали.",
    color: "emerald"
  },
];


