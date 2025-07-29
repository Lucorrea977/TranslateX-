
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setInput, setOutput } from "../redux/slices/translationSlice";
import { addToHistory } from "../redux/slices/historySlice";

const Home = () => {
  const { input, output } = useSelector((state) => state.translation);
  const dispatch = useDispatch();

  const handleTranslate = () => {
    if (input.trim() === "") return;
    const translated = "Traducción simulada: " + input;
    dispatch(setOutput(translated));

    // Guardar en historial con fecha y hora
    const newEntry = {
      id: Date.now(),
      original: input,
      translated,
      date: new Date().toLocaleString(),
    };
    dispatch(addToHistory(newEntry));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Traductor de Texto</h2>
      <textarea
        value={input}
        onChange={(e) => dispatch(setInput(e.target.value))}
        className="w-full p-3 border rounded mb-4 text-black"
        placeholder="Escribe o pega el texto aquí..."
        rows={4}
      />
      <button
        onClick={handleTranslate}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Traducir
      </button>
      {output && (
        <div className="mt-4 p-3 bg-gray-200 rounded">
          <h3 className="font-semibold">Resultado:</h3>
          <p>{output}</p>
        </div>
      )}
    </div>
  );
};

export default Home;
