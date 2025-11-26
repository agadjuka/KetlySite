import { dictionaries, type Language } from './dictionary';

const PLACEHOLDER = '{{INSTRUCTION}}';
const DELIMITER = ' ||| ';

const getDemoConfig = (language: Language) => dictionaries[language] ?? dictionaries.ru;

const pickRandomScenario = (language: Language): string => {
  const { demo } = getDemoConfig(language);
  const scenarios = demo?.scenarios?.length ? demo.scenarios : dictionaries.ru.demo.scenarios;
  const randomIndex = Math.floor(Math.random() * scenarios.length);
  return scenarios[randomIndex] ?? dictionaries.ru.demo.scenarios[0];
};

const pickInstruction = (language: Language, isMobile: boolean): string => {
  const { demo } = getDemoConfig(language);
  const instructions = demo?.instructions ?? dictionaries.ru.demo.instructions;
  return isMobile ? instructions.mobile : instructions.desktop;
};

export const getRandomWelcomeMessage = (
  isMobile: boolean,
  language: Language = 'ru',
): string[] => {
  const scenarioTemplate = pickRandomScenario(language);
  const instruction = pickInstruction(language, isMobile);

  const finalString = scenarioTemplate.replace(PLACEHOLDER, instruction);

  return finalString
    .split(DELIMITER)
    .map((part) => part.trim())
    .filter(Boolean);
};