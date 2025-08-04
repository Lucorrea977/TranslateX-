const { translateWithAPI } = require("../services/translationAPI");

exports.translateText = async (req, res) => {
  try {
    const { text, sourceLang, targetLang } = req.body;
    console.log("Recibido en backend:", { text, sourceLang, targetLang });

    if (!text || !sourceLang || !targetLang) {
      return res.status(400).json({ error: "Faltan datos para traducir" });
    }
    if (sourceLang === targetLang) {
      return res.json({ translated: "Por favor, elige idiomas diferentes" });
    }

    const translation = await translateWithAPI(text, sourceLang, targetLang);

    res.json({ translated: translation });
  } catch (err) {
    console.error("❌ Error en el controlador:", err.message);
    res.status(500).json({ error: "Error al traducir el texto" });
  }
};