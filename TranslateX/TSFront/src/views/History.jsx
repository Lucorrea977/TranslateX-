import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearHistory } from "../redux/slices/historySlice";

const History = () => {
  const history = useSelector((state) => state.history.items);
  const dispatch = useDispatch();

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Historial de Traducciones</h2>
      
      {history.length === 0 ? (
        <p className="text-gray-700">No hay traducciones guardadas.</p>
      ) : (
        <div className="space-y-3">
          {history.map((entry) => (
            <div key={entry.id} className="p-3 bg-gray-100 border rounded shadow-sm">
              <p className="text-sm text-gray-500">{entry.date}</p>
              <p className="font-semibold">Original: {entry.original}</p>
              <p className="text-blue-700">Traducción: {entry.translated}</p>
            </div>
          ))}
        </div>
      )}

      {history.length > 0 && (
        <button
          onClick={() => dispatch(clearHistory())}
          className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Borrar Historial
        </button>
      )}
    </div>
  );
};

export default History;
