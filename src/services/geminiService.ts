export const chatWithCyna = async (
  message: string,
  history: { role: 'user' | 'model'; parts: { text: string }[] }[]
): Promise<string> => {
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, history }),
    });
    const data = await res.json();
    if (!res.ok) return data.error || "Désolé, je n'ai pas pu générer de réponse.";
    return data.text || "Désolé, je n'ai pas pu générer de réponse.";
  } catch (error) {
    console.error("Chat Error:", error);
    return "J'ai du mal à me connecter au serveur sécurisé pour le moment. Veuillez réessayer plus tard.";
  }
};