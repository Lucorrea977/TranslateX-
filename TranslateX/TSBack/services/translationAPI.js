const axios = require("axios");

exports.translateWithAPI = async (text, sourceLang, targetLang) => {
  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLang}|${targetLang}`;
    const response = await axios.get(url);
    const translated = response.data.responseData.translatedText;
    return translated || "No se pudo traducir";
  } catch (error) {
    console.error("❌ Error llamando a MyMemory API:", error.response?.data || error.message);
    return "Error en traducción";
  }
};