import { GoogleGenAI } from "@google/genai";

const systemInstruction = `
Você é o assistente virtual inteligente da "Dario Eletricidade", uma empresa de serviços elétricos de alta qualidade.
Seu objetivo é ajudar clientes com dúvidas básicas sobre eletricidade, sugerir os serviços da empresa e encorajá-los a agendar uma visita.

Serviços oferecidos pela empresa:
1. Instalação Residencial (Fiação, tomadas, iluminação).
2. Manutenção Industrial (Painéis, motores).
3. Energia Solar (Instalação e limpeza de placas).
4. Laudos e Projetos (ART, regularização).
5. Orçamento (Avaliação técnica e cotação detalhada).

Tom de voz: Profissional, amigável, seguro e especialista.
Idioma: Português do Brasil.

Se o cliente quiser agendar, oriente-o a clicar no botão "Agendar Agora" no site.
Não invente preços exatos, dê apenas estimativas ou diga que depende de avaliação técnica.
`;

export const sendMessageToGemini = async (message: string, history: {role: string, parts: {text: string}[]}[]): Promise<string> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      return "Desculpe, o sistema de chat está indisponível no momento (Chave API não configurada).";
    }

    const ai = new GoogleGenAI({ apiKey });
    
    // Transform formatting for history if needed, or maintain simple chat structure
    // Since the SDK manages history in Chat sessions, we will create a new chat 
    // or just generate content if it's a single turn. 
    // For simplicity in this stateless service, we'll append history to the prompt 
    // or use the chat model if we were maintaining state here.
    // Here we will use generateContent with system instruction.

    const model = 'gemini-2.5-flash';
    
    // Construct the full prompt context
    const chatHistoryText = history.map(h => `${h.role === 'user' ? 'Cliente' : 'Assistente'}: ${h.parts[0].text}`).join('\n');
    const fullPrompt = `${chatHistoryText}\nCliente: ${message}\nAssistente:`;

    const response = await ai.models.generateContent({
      model: model,
      contents: fullPrompt,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    return response.text || "Desculpe, não entendi. Poderia reformular?";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Ocorreu um erro ao processar sua mensagem. Tente novamente mais tarde.";
  }
};