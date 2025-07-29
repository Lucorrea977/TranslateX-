const axios = require("axios");

exports.translateWithAPI = async (text, targetLang) => {
  try {
    const response = await axios.post(
      "https://libretranslate.com/translate",
      {
        q: text,
        source: "auto",
        target: targetLang,
        format: "text"
      },
      { headers: { "Content-Type": "application/json" } }
    );

    return response.data.translatedText;
  } catch (error) {
    console.error("❌ Error llamando a la API de traducción:", error.message);
    return "Error en traducción";
  }
};
