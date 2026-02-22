import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { message, history } = await req.json();

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Clé API non configurée." },
      { status: 500 }
    );
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const chat = ai.chats.create({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: `Tu es Cyna, un assistant support IA professionnel et utile pour une entreprise de cybersécurité SaaS premium.
        Ton ton est à la Apple : calme, concis, professionnel et rassurant.
        Tu aides les utilisateurs à comprendre des produits comme EDR, XDR et SOC Managé.
        Réponds toujours en Français. Garde les réponses courtes et bien formatées.`,
      },
      history,
    });

    const result = await chat.sendMessage({ message });
    return NextResponse.json({ text: result.text });
  } catch (error) {
    console.error("Gemini Error:", error);
    return NextResponse.json(
      {
        error:
          "J'ai du mal à me connecter au serveur sécurisé pour le moment. Veuillez réessayer plus tard.",
      },
      { status: 500 }
    );
  }
}
