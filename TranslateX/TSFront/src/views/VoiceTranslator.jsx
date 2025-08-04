import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToHistory } from "../redux/slices/historySlice";

const VoiceTranslator = () => {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [translated, setTranslated] = useState("");
  const dispatch = useDispatch();

  let recognition;

  // Configuración de reconocimiento de voz
  if ("webkitSpeechRecognition" in window) {
    recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US"; // idioma de entrada
  }

  const startListening = () => {
    if (!recognition) {
      alert("Tu navegador no soporta reconocimiento de voz.");
      return;
    }
    setListening(true);
    recognition.start();

    recognition.onresult = async (event) => {
      const text = event.results[0][0].transcript;
      setTranscript(text);

      try {
        // ✅ Enviar texto al backend para traducir
        const res = await fetch("http://localhost:5000/api/translate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text, targetLang: "es" })
        });

        const data = await res.json();
        const translatedText = data.translated;

        // ✅ Actualizar estado con la traducción real
        setTranslated(translatedText);

        // ✅ Guardar en historial Redux
        dispatch(addToHistory({
          id: Date.now(),
          original: text,
          translated: translatedText,
          date: new Date().toLocaleString(),
        }));

      } catch (err) {
        console.error("❌ Error al traducir voz:", err);
        setTranslated("⚠️ Error al traducir.");
      }
    };

    recognition.onend = () => setListening(false);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Traductor de Voz</h2>

      <button
        onClick={startListening}
        disabled={listening}
        className={`px-4 py-2 rounded ${listening ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"} text-white`}
      >
        {listening ? "Escuchando..." : "🎤 Hablar"}
      </button>

      {transcript && (
        <div className="mt-4 p-3 bg-gray-200 rounded">
          <h3 className="font-semibold">Detectado:</h3>
          <p>{transcript}</p>
        </div>
      )}

      {translated && (
        <div className="mt-4 p-3 bg-blue-100 border-l-4 border-blue-600 rounded">
          <h3 className="font-semibold">Traducción:</h3>
          <p>{translated}</p>
        </div>
      )}
    </div>
  );
};

export default VoiceTranslator;
