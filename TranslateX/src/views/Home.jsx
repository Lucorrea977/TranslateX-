import React, { useState } from 'react';
import TranslatorBox from '../components/TranslatorBox';
import VoiceTranslator from '../components/VoiceTranslator';
import ClipboardWatcher from '../components/ClipboardWatcher';

const Home = () => {
  const [lang, setLang] = useState('es');

  return (
    <div className="fixed top-4 right-4 w-full max-w-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-xl shadow-2xl z-50 p-6">
      <TranslatorBox targetLang={lang} setTargetLang={setLang} />
      <VoiceTranslator targetLang={lang} />
      <ClipboardWatcher targetLang={lang} />
    </div>
  );
};

export default Home;
