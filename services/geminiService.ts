import { GoogleGenAI, Type } from "@google/genai";
import { QuizQuestion, Flashcard } from '../types';

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const MODEL_NAME = 'gemini-2.5-flash';

export const generateSummary = async (text: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: `다음 텍스트를 간결하고 이해하기 쉽게 요약해주세요:\n\n---\n${text}\n---`,
    });
    return response.text;
  } catch (error) {
    console.error('Error generating summary:', error);
    throw new Error('AI 요약 서비스에 연결하지 못했습니다.');
  }
};

export const generateQuiz = async (text: string): Promise<QuizQuestion[]> => {
  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: `다음 텍스트를 기반으로 5개의 객관식 퀴즈를 만들어주세요. 각 질문에는 4개의 선택지를 제공하고, 정답의 인덱스(0-3)를 명확하게 표시해주세요.\n\n---\n${text}\n---`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: {
                type: Type.STRING,
                description: '퀴즈 질문'
              },
              options: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: '4개의 가능한 답변 배열'
              },
              correctAnswerIndex: {
                type: Type.INTEGER,
                description: 'options 배열에서 정답의 인덱스 (0-3)'
              },
            },
            required: ["question", "options", "correctAnswerIndex"],
          },
        },
      },
    });
    
    const jsonStr = response.text.trim();
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error('Error generating quiz:', error);
    throw new Error('AI 퀴즈 생성 서비스에 연결하지 못했습니다.');
  }
};


export const generateFlashcards = async (text: string): Promise<Flashcard[]> => {
  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: `다음 텍스트에서 최소 5개의 핵심 용어와 그 정의를 추출하여 플래시카드를 만들어주세요.\n\n---\n${text}\n---`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              term: {
                type: Type.STRING,
                description: "핵심 용어 또는 개념"
              },
              definition: {
                type: Type.STRING,
                description: "용어에 대한 간결한 정의"
              },
            },
            required: ["term", "definition"],
          },
        },
      },
    });

    const jsonStr = response.text.trim();
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error('Error generating flashcards:', error);
    throw new Error('AI 플래시카드 생성 서비스에 연결하지 못했습니다.');
  }
};
