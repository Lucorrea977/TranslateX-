const { translateWithAPI } = require("../services/translationAPI");

exports.translateText = async (req, res) => {
  try {
    const { text, targetLang } = req.body;
    if (!text) {
      return res.status(400).json({ error: "El campo 'text' es obligatorio" });
    }

    const translation = await translateWithAPI(text, targetLang || "es");
    res.json({ translated: translation });
  } catch (err) {
    console.error("❌ Error en el controlador:", err.message);
    res.status(500).json({ error: "Error al traducir el texto" });
  }
};
