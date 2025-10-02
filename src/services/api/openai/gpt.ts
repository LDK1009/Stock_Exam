import { isValidJson } from '@/utils/json'
import OpenAI from 'openai'

const client = new OpenAI({
  apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY,
})

async function chatGPT(prompt: string, message: string, jsonFormat?: string) {
  try {
    const response = await client.responses.create({
      model: 'gpt-5-nano',
      reasoning: { effort: 'low' },
      input: [
        {
          role: 'assistant',
          content: jsonFormat ? `${prompt} [필수] 아래 JSON 형식으로 반환해 ${jsonFormat}` : prompt,
        },
        {
          role: 'user',
          content: message,
        },
      ],
    })

    if (jsonFormat) {
      if (!isValidJson(response.output_text)) {
        return response.output_text
      }

      return JSON.parse(response.output_text)
    }

    return response.output_text
  } catch (error) {
    console.error('OpenAI API 호출 실패:', error)
    return null
  }
}

export { chatGPT }

