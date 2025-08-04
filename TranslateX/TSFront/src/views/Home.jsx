import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToHistory } from "../redux/slices/historySlice";

const idiomas = [
  { code: "es", label: "Español" },
  { code: "en", label: "Inglés" },
  { code: "fr", label: "Francés" },
  { code: "de", label: "Alemán" },
  { code: "it", label: "Italiano" },
  { code: "pt", label: "Portugués" },
  { code: "zh", label: "Chino" },
  { code: "ja", label: "Japonés" },
];

const Home = () => {
  const [input, setInput] = useState("");
  const [inputLang, setInputLang] = useState("es");
  const [outputLang, setOutputLang] = useState("en");
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState(""); // Estado local
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Home montado");
  }, []);

  // Log en cada render
  console.log("Renderizando Home, output:", output);

  const handleTranslate = async () => {
    if (input.trim() === "") return;
    console.log("Click traducir");
    setLoading(true);
    try {
      console.log("Enviando a backend:", { text: input, sourceLang: inputLang, targetLang: outputLang });
      const res = await fetch("http://localhost:5000/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input, sourceLang: inputLang, targetLang: outputLang })
      });

      const data = await res.json();
      console.log("Traducción recibida:", data.translated);
      setOutput(data.translated);

      // Guardar en historial
      dispatch(addToHistory({
        id: Date.now(),
        original: input,
        translated: data.translated,
        date: new Date().toLocaleString(),
        sourceLang: inputLang,
        targetLang: outputLang,
      }));

    } catch (error) {
      console.error("❌ Error al traducir:", error);
    }
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">🌍 TranslateX</h1>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Panel de entrada */}
        <div className="flex-1 bg-white rounded shadow p-4 flex flex-col">
          <div className="flex items-center mb-2">
            <label className="mr-2 font-semibold">Idioma de entrada:</label>
            <select
              value={inputLang}
              onChange={e => {
                setInputLang(e.target.value);
                setOutput(""); // Limpiar traducción solo al cambiar idioma
                console.log("Idioma de entrada cambiado, output limpiado");
              }}
              className="border rounded px-2 py-1"
            >
              {idiomas.map(lang => (
                <option key={lang.code} value={lang.code}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe el texto a traducir..."
            className="w-full p-2 border rounded mb-3 flex-1 resize-none"
            rows={6}
          />
        </div>

        {/* Panel de acciones */}
        <div className="flex flex-col justify-center items-center">
          <button
            onClick={handleTranslate}
            className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700 transition font-bold mb-4"
            style={{ minWidth: "120px" }}
            disabled={loading}
          >
            {loading ? "Traduciendo..." : "Traducir →"}
          </button>
        </div>

        {/* Panel de salida */}
        <div className="flex-1 bg-blue-50 rounded shadow p-4 flex flex-col">
          <div className="flex items-center mb-2">
            <label className="mr-2 font-semibold">Idioma de salida:</label>
            <select
              value={outputLang}
              onChange={e => {
                setOutputLang(e.target.value);
                setOutput(""); // Limpiar traducción solo al cambiar idioma
                console.log("Idioma de salida cambiado, output limpiado");
              }}
              className="border rounded px-2 py-1"
            >
              {idiomas.map(lang => (
                <option
                  key={lang.code}
                  value={lang.code}
                  disabled={lang.code === inputLang}
                >
                  {lang.label}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full p-2 border rounded bg-white flex-1 min-h-[120px]">
            {loading ? (
              <span className="text-gray-400">Traduciendo...</span>
            ) : output ? (
              <span>{output}</span>
            ) : (
              <span className="text-gray-400">La traducción aparecerá aquí...</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;