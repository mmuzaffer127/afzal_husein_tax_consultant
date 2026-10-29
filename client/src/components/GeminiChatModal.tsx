import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  X,
  Send,
  MessageSquare,
  Bot,
  User,
  RotateCcw,
  ArrowRight,
  ShieldCheck,
  Minimize2,
  ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { sendChatMessage } from '../lib/api';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

const INITIAL_SUGGESTIONS = [
  'What documents are needed for ITR?',
  'How do I register for GST?',
  'What accounting services do you offer?',
  'Old vs. New Tax Regime: Which is better?',
  'How can I consult Afzal Husein?',
];

export default function GeminiChatModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: "Hello! I am **Afzal Husein's AI Assistant**. Ask me any question about Income Tax, GST, bookkeeping, business registrations, or our professional services.",
      timestamp: 'Just now',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen, messages, loading]);

  const handleSend = async (messageText?: string) => {
    const textToSend = (messageText || input).trim();
    if (!textToSend || loading) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      // Format chat history for Gemini API
      const history = messages
        .filter((m) => m.id !== 'welcome')
        .map((m) => ({
          role: m.sender === 'user' ? ('user' as const) : ('model' as const),
          parts: [{ text: m.text }],
        }));

      const res = await sendChatMessage(textToSend, history);

      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: res.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      const errorMsg: Message = {
        id: `err-${Date.now()}`,
        sender: 'ai',
        text: "I'm having a momentary connection issue. You can always submit a quick consultation request directly through our [Contact Page](/contact) or call our office.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'welcome',
        sender: 'ai',
        text: "Chat cleared! How can I assist you with your tax or accounts today?",
        timestamp: 'Just now',
      },
    ]);
  };

  // Simple Markdown renderer for bold, lists, and links
  const renderFormattedText = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      // Empty line
      if (!line.trim()) {
        return <div key={idx} className="h-2" />;
      }

      // Bullet points
      const isBullet = line.trim().startsWith('•') || line.trim().startsWith('-');
      let content = isBullet ? line.trim().substring(1).trim() : line;

      // Handle bold text **bold**
      const parts = content.split(/(\*\*.*?\*\*)/g);

      const renderedParts = parts.map((part, pIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={pIdx} className="font-semibold text-slate-900">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return part;
      });

      if (isBullet) {
        return (
          <div key={idx} className="flex items-start gap-2 my-1 text-slate-700">
            <span className="text-amber-600 font-bold leading-5">•</span>
            <span className="flex-1">{renderedParts}</span>
          </div>
        );
      }

      return (
        <p key={idx} className="my-1 text-slate-700 leading-relaxed">
          {renderedParts}
        </p>
      );
    });
  };

  return (
    <>
      {/* Floating Action Button */}
      {!isOpen && (
        <div className="fixed bottom-20 lg:bottom-6 right-5 z-50 flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg border border-amber-200/80 text-xs font-medium text-slate-800 animate-bounce duration-1000">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
            <span>Have a Tax or GST question?</span>
          </div>
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Open AI Tax Assistant"
            className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-[#0B2730] via-[#164A52] to-[#C7A55B] text-white shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-amber-400/40"
          >
            <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-400 to-teal-400 opacity-40 blur-sm group-hover:opacity-75 transition duration-300" />
            <div className="relative flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-amber-300 group-hover:rotate-12 transition-transform duration-300" />
            </div>
            <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full" />
          </button>
        </div>
      )}

      {/* Chat Modal Window */}
      {isOpen && (
        <div className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 sm:w-[420px] sm:h-[620px] z-50 flex flex-col bg-white sm:rounded-2xl shadow-2xl border border-slate-200/80 overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-200">
          {/* Header */}
          <div className="relative bg-gradient-to-r from-[#0B2730] via-[#164A52] to-[#10333B] text-white px-4 py-3.5 flex items-center justify-between border-b border-amber-500/30">
            <div className="flex items-center gap-3">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-[#C7A55B] to-amber-200 text-[#0B2730] shadow-md">
                <Bot className="w-6 h-6" />
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-[#0B2730] rounded-full" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-semibold text-sm tracking-wide text-white">Afzal Husein Assistant</h3>
                  <span className="bg-amber-400/20 text-amber-300 text-[10px] font-semibold px-1.5 py-0.5 rounded-full border border-amber-400/30">
                    Gemini AI
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  Tax & Accounts Advisory
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleClearChat}
                title="Restart conversation"
                className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close chat"
                className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/60 text-sm">
            {messages.map((msg) => {
              const isAi = msg.sender === 'ai';
              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 ${isAi ? '' : 'flex-row-reverse'}`}
                >
                  <div
                    className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-semibold shrink-0 ${
                      isAi
                        ? 'bg-[#164A52] text-amber-300 border border-amber-300/30'
                        : 'bg-slate-700 text-white'
                    }`}
                  >
                    {isAi ? <Sparkles className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                  </div>

                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm ${
                      isAi
                        ? 'bg-white text-slate-800 border border-slate-200/90 rounded-tl-sm'
                        : 'bg-[#0B2730] text-white rounded-tr-sm'
                    }`}
                  >
                    {isAi ? renderFormattedText(msg.text) : <p className="leading-relaxed">{msg.text}</p>}

                    <div
                      className={`text-[10px] mt-1.5 ${
                        isAi ? 'text-slate-400' : 'text-slate-300'
                      } text-right`}
                    >
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Typing Loader */}
            {loading && (
              <div className="flex items-start gap-2.5">
                <div className="flex items-center justify-center w-7 h-7 rounded-full bg-[#164A52] text-amber-300 border border-amber-300/30 text-xs shrink-0">
                  <Sparkles className="w-3.5 h-3.5 animate-spin" />
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                  <div className="flex items-center gap-1.5 py-1">
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                    <span className="w-2 h-2 rounded-full bg-teal-600 animate-pulse delay-150" />
                    <span className="w-2 h-2 rounded-full bg-[#0B2730] animate-pulse delay-300" />
                    <span className="text-xs text-slate-500 ml-1">Analyzing tax guidance...</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick suggestions pills */}
          {messages.length <= 2 && (
            <div className="p-2.5 bg-white border-t border-slate-100 flex flex-wrap gap-1.5">
              {INITIAL_SUGGESTIONS.map((sug, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(sug)}
                  disabled={loading}
                  className="text-xs bg-slate-100 hover:bg-amber-50 hover:text-amber-800 hover:border-amber-300 text-slate-700 px-2.5 py-1 rounded-full border border-slate-200 transition-colors text-left"
                >
                  {sug}
                </button>
              ))}
            </div>
          )}

          {/* Action Callout Bar */}
          <div className="bg-amber-50/70 border-t border-amber-200/60 px-4 py-2 flex items-center justify-between text-xs text-amber-900">
            <span className="font-medium flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-amber-700" />
              Need personalized filing assistance?
            </span>
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center gap-1 font-semibold text-amber-800 hover:text-amber-950 underline underline-offset-2"
            >
              Consult Now <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Input Footer */}
          <div className="p-3 bg-white border-t border-slate-200">
            <div className="flex items-center gap-2 bg-slate-100 rounded-xl p-1.5 focus-within:ring-2 focus-within:ring-amber-500/50 focus-within:bg-white transition-all border border-slate-200">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about ITR, GST, bookkeeping..."
                disabled={loading}
                className="flex-1 bg-transparent px-2.5 py-1 text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || loading}
                aria-label="Send message"
                className={`p-2 rounded-lg transition-all ${
                  input.trim() && !loading
                    ? 'bg-[#164A52] text-amber-300 hover:bg-[#0B2730] shadow-sm'
                    : 'text-slate-400 bg-slate-200/70 cursor-not-allowed'
                }`}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <div className="text-[10px] text-center text-slate-400 mt-1.5">
              Informational guidance. For official representation, submit an enquiry.
            </div>
          </div>
        </div>
      )}
    </>
  );
}
