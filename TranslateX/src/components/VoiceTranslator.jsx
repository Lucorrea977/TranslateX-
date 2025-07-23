// src/components/VoiceTranslator.jsx
import React, { useState } from 'react';
import axios from 'axios';

const VoiceTranslator = ({ targetLang }) => {
  const [listening, setListening] = useState(false);
  const [translated, setTranslated] = useState('');

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.continuous = false;
  recognition.interimResults = false;

  const startListening = () => {
    setListening(true);
    recognition.start();

    recognition.onresult = async (event) => {
      const speechText = event.results[0][0].transcript;
      try {
        const res = await axios.post('https://libretranslate.de/translate', {
          q: speechText,
          source: 'auto',
          target: targetLang,
          format: 'text',
        });
        setTranslated(res.data.translatedText);
      } catch (error) {
        setTranslated('Error al traducir voz.');
      }
    };

    recognition.onend = () => setListening(false);
  };

  return (
    <div className="mt-6">
      <button onClick={startListening} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        🎤 Traducir por voz
      </button>
      {translated && <p className="mt-3 p-2 bg-gray-100 dark:bg-gray-700 rounded">{translated}</p>}
    </div>
  );
};

export default VoiceTranslator;
