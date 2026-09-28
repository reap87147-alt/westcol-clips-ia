export default function handler(req, res) {
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

  return res.status(200).json({
    mensaje: "Enlace recibido correctamente",
    enlace: enlace
  });
}
