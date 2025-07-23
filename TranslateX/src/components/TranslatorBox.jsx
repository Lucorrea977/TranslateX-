import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TranslatorBox = () => {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [targetLang, setTargetLang] = useState('es'); // Español por defecto
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    if (inputText.trim()) {
      const delay = setTimeout(() => {
        translate(inputText);
      }, 500);
      return () => clearTimeout(delay);
    } else {
      setTranslatedText('');
    }
  }, [inputText, targetLang]);

  const translate = async (text) => {
    try {
      const response = await axios.post('https://libretranslate.de/translate', {
        q: text,
        source: 'auto',
        target: targetLang,
        format: 'text',
      }, {
        headers: { 'accept': 'application/json' }
      });

      setTranslatedText(response.data.translatedText);
    } catch (error) {
      console.error(error);
      setTranslatedText('⚠️ Error al traducir');
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`max-w-md w-full mx-auto p-6 rounded-xl shadow-md transition-all duration-300 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">TranslateX</h1>
        <button onClick={toggleTheme} className="text-sm px-3 py-1 bg-gray-300 dark:bg-gray-700 rounded hover:opacity-80">
          {theme === 'light' ? 'Modo Oscuro' : 'Modo Claro'}
        </button>
      </div>

      <select
        value={targetLang}
        onChange={(e) => setTargetLang(e.target.value)}
        className="w-full p-2 mb-4 rounded border dark:bg-gray-800"
      >
        <option value="es">Español</option>
        <option value="en">Inglés</option>
        <option value="fr">Francés</option>
        <option value="pt">Portugués</option>
        <option value="de">Alemán</option>
        <option value="it">Italiano</option>
        <option value="ja">Japonés</option>
      </select>

      <textarea
        placeholder="Escribí o pegá texto..."
        className="w-full h-32 p-3 rounded border resize-none dark:bg-gray-800"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />

      <div className="mt-4 p-3 h-32 rounded border bg-gray-100 dark:bg-gray-800 overflow-auto whitespace-pre-wrap">
        {translatedText}
      </div>
    </div>
  );
};

export default TranslatorBox;
