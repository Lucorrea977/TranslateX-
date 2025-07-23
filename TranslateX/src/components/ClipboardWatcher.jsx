// src/components/ClipboardWatcher.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ClipboardWatcher = ({ targetLang }) => {
  const [translated, setTranslated] = useState('');

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const text = await navigator.clipboard.readText();
        if (text.length > 3 && text !== translated) {
          const res = await axios.post('https://libretranslate.de/translate', {
            q: text,
            source: 'auto',
            target: targetLang,
            format: 'text',
          });
          setTranslated(res.data.translatedText);
        }
      } catch (err) {
        console.error('No se pudo leer el portapapeles:', err);
      }
    }, 3000); // cada 3 seg

    return () => clearInterval(interval);
  }, [translated, targetLang]);

  return (
    <div className="mt-6">
      <h3 className="font-bold mb-1">📋 Traducción del portapapeles:</h3>
      <p className="p-2 bg-gray-100 dark:bg-gray-800 rounded">{translated}</p>
    </div>
  );
};

export default ClipboardWatcher;
