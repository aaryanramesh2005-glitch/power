import React, { useState } from 'react';
import { SparklesIcon, CardIcon } from './components/icons';

interface CardData {
  imageUrl: string;
  message: string;
}

const App: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [card, setCard] = useState<CardData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateClick = async () => {
    if (!prompt.trim()) {
      setError('Please enter a description for the card.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setCard(null);

    // Mock API call to simulate generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    setCard({
        imageUrl: `https://source.unsplash.com/500x500/?${encodeURIComponent(prompt)}`,
        message: `This is a beautiful, AI-generated card inspired by your idea: "${prompt}".`,
    });
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-sans flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <header className="w-full max-w-2xl mb-8 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white">AI Greeting Card Generator</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">Describe an occasion, and let AI create a unique card for you.</p>
      </header>
      
      <main className="w-full max-w-2xl">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              value={prompt}
              onChange={(e) => {
                setPrompt(e.target.value);
                if(error) setError(null);
              }}
              placeholder="e.g., A birthday card with a cat in space"
              className="w-full bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 border border-slate-300 dark:border-slate-600 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
              disabled={isLoading}
              onKeyDown={(e) => e.key === 'Enter' && handleGenerateClick()}
            />
            <button
              onClick={handleGenerateClick}
              disabled={isLoading || !prompt.trim()}
              className="flex items-center justify-center gap-2 bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-indigo-500 disabled:bg-slate-500 dark:disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-slate-50 dark:focus:ring-offset-slate-900"
            >
              <SparklesIcon className="h-5 w-5" />
              <span>{isLoading ? 'Generating...' : 'Generate'}</span>
            </button>
          </div>
          {error && <p className="text-red-500 text-sm mt-2 px-1">{error}</p>}
        </div>

        <div className="mt-8">
          {isLoading && (
            <div className="flex flex-col items-center justify-center h-96 bg-slate-100 dark:bg-slate-800/50 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 animate-pulse">
                <SparklesIcon className="h-12 w-12 text-slate-400 dark:text-slate-500" />
                <p className="mt-4 text-slate-500 dark:text-slate-400">Creating your masterpiece...</p>
            </div>
          )}
          {!isLoading && card && (
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden animate-fade-in">
                <img src={card.imageUrl} alt={prompt} className="w-full h-80 object-cover" />
                <div className="p-6">
                    <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed">{card.message}</p>
                </div>
            </div>
          )}
           {!isLoading && !card && (
            <div className="flex flex-col items-center justify-center h-96 bg-slate-100 dark:bg-slate-800/50 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700">
                <CardIcon className="h-16 w-16 text-slate-400 dark:text-slate-500" />
                <p className="mt-4 text-slate-500 dark:text-slate-400">Your generated card will appear here</p>
            </div>
          )}
        </div>
        <style>{`
          @keyframes fade-in {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
          .animate-fade-in {
            animation: fade-in 0.5s ease-out forwards;
          }
        `}</style>
      </main>
    </div>
  );
};

export default App;
