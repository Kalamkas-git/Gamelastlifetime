
import React, { useState } from "react";

// Fix: Define props with an interface to ensure compatibility with standard React component expectations
interface ConsentScreenProps {
  onComplete: (agreed: boolean) => void;
}

// Fix: Using React.FC<ConsentScreenProps> ensures that standard React props like 'key' are correctly handled
// and not flagged as missing in the custom Props definition.
export const ConsentScreen: React.FC<ConsentScreenProps> = ({ onComplete }) => {
  const [choice, setChoice] = useState<"yes" | "no" | null>(null);

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 bg-void-900/50"
      style={{
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div
        className="w-full max-w-[560px] bg-[#0a0a0a]/90 border border-white/10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl"
      >
        {/* CONTENT (scrollable) */}
        <div
          className="p-8 max-h-[70vh] overflow-y-auto"
        >
          <div className="text-center mb-6">
            <div className="text-4xl mb-4">📜</div>
            <h2 className="text-xl font-bold text-[#d4af37] uppercase tracking-widest">
              Информированное согласие
            </h2>
          </div>

          <div className="space-y-4 text-gray-300 leading-relaxed text-sm text-center">
            <p>
              Эта игра является частью социологического исследования. Во время
              прохождения игры могут анализироваться ваши игровые решения и ответы.
            </p>

            <p>
              Игра не собирает имя (за пределами игрового контекста), контактные данные или другую персональную
              информацию. Все данные используются только в учебных и научных целях
              и анализируются в обобщённом виде.
            </p>

            <p>
              Участие в исследовании является добровольным. Вы можете отказаться
              от участия в исследовании и всё равно пройти игру.
            </p>
          </div>

          <div
            className="mt-8 pt-6 border-t border-white/10 text-center font-semibold text-white"
          >
            Согласны ли вы на участие в исследовании и анализ ваших игровых данных?
          </div>
        </div>

        {/* ACTIONS (always visible) */}
        <div
          className="sticky bottom-0 bg-[#050505]/95 p-6 border-t border-white/10"
        >
          <div className="flex gap-3 mb-4">
            <button
              className={`flex-1 py-3 px-2 rounded-xl border transition-all duration-300 font-semibold text-sm ${
                choice === "yes" 
                  ? "border-[#d4af37] bg-[#d4af37]/20 text-white" 
                  : "border-white/10 bg-transparent text-gray-400 hover:border-white/30"
              }`}
              onClick={() => setChoice("yes")}
            >
              Да, согласен(на)
            </button>

            <button
              className={`flex-1 py-3 px-2 rounded-xl border transition-all duration-300 font-semibold text-sm ${
                choice === "no" 
                  ? "border-[#d4af37] bg-[#d4af37]/20 text-white" 
                  : "border-white/10 bg-transparent text-gray-400 hover:border-white/30"
              }`}
              onClick={() => setChoice("no")}
            >
              Нет, не согласен(на)
            </button>
          </div>

          <button
            className={`w-full py-4 rounded-xl font-black uppercase tracking-widest text-sm transition-all duration-500 ${
              choice 
                ? "bg-[#d4af37] text-black shadow-[0_0_20px_rgba(212,175,55,0.4)] cursor-pointer" 
                : "bg-white/5 text-gray-600 cursor-not-allowed"
            }`}
            disabled={!choice}
            onClick={() => choice && onComplete(choice === "yes")}
          >
            Продолжить
          </button>
        </div>
      </div>
    </div>
  );
}
