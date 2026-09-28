import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Método no permitido"
    });
  }

  const { enlace } = req.body || {};

  if (!enlace) {
    return res.status(400).json({
      error: "Falta el enlace del video"
    });
  }

  try {
    const respuesta = await openai.responses.create({
      model: "gpt-5.6-luna",
      input: [
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: `Analiza este enlace de TikTok:

${enlace}

Por ahora no necesitas descargar el video. Quiero que prepares una respuesta indicando que recibiste el enlace y que estás listo para analizar su contenido.`
            }
          ]
        }
      ]
    });

    return res.status(200).json({
      mensaje: respuesta.output_text,
      enlace: enlace
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "No se pudo conectar con la inteligencia artificial."
    });
  }
}
