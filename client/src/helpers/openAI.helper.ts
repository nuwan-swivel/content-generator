import OpenAI from "openai";

let openAiInstance: OpenAI;

export const getOpenAIInstance = () => {
  if (!openAiInstance) {
    openAiInstance = new OpenAI({
      apiKey: process.env.REACT_APP_OPEN_AI_API_KEY,
      dangerouslyAllowBrowser: true,
    });
  }
  return openAiInstance;
};

export const getChatCompletions = async (
  prompt: string,
  delimiterRegex: RegExp
) => {
  const openAi = getOpenAIInstance();

  const result = await openAi.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.3,
  });

  const matches = result.choices.pop()?.message?.content?.match(delimiterRegex);
  return matches;
};
