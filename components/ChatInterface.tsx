import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { SendIcon, BotIcon, UserIcon } from './icons';

interface ChatInterfaceProps {
  messages: Message[];
  onSendMessage: (text: string) => void;
  isLoading: boolean;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ messages, onSendMessage, isLoading }) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  return (
    <div className="fixed bottom-0 right-0 w-full sm:w-96 p-4 z-20">
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-slate-200 dark:border-slate-700 rounded-xl shadow-2xl flex flex-col h-[28rem] max-h-[70vh]">
        <div className="p-4 border-b border-slate-200 dark:border-slate-700">
          <h3 className="font-bold text-lg text-center text-slate-800 dark:text-white">AI Assistant</h3>
        </div>
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map(msg => (
            <div key={msg.id} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
              {msg.sender === 'ai' && (
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-cyan-500 flex items-center justify-center">
                  <BotIcon className="h-5 w-5 text-white" />
                </div>
              )}
              <div className={`max-w-xs md:max-w-sm rounded-lg px-4 py-2 ${msg.sender === 'user' ? 'bg-slate-600 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200'}`}>
                <p className="text-sm">{msg.text}</p>
              </div>
               {msg.sender === 'user' && (
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-slate-600 flex items-center justify-center">
                  <UserIcon className="h-5 w-5 text-white" />
                </div>
              )}
            </div>
          ))}
          {isLoading && (
             <div className="flex items-start gap-3">
                 <div className="flex-shrink-0 h-8 w-8 rounded-full bg-cyan-500 flex items-center justify-center">
                    <BotIcon className="h-5 w-5 text-white" />
                </div>
                <div className="max-w-xs md:max-w-sm rounded-lg px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200">
                   <div className="flex items-center justify-center gap-1">
                       <span className="h-2 w-2 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                       <span className="h-2 w-2 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                       <span className="h-2 w-2 bg-cyan-400 rounded-full animate-bounce"></span>
                   </div>
                </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="p-4 border-t border-slate-200 dark:border-slate-700">
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your command..."
              className="w-full bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 border border-slate-300 dark:border-slate-600 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-shadow"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-cyan-600 text-white p-3 rounded-lg hover:bg-cyan-500 disabled:bg-slate-500 dark:disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors"
            >
              <SendIcon className="h-5 w-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;