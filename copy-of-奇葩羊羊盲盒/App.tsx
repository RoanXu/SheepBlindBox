
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { generateSheep } from './services/geminiService';
import { SheepVisual } from './components/SheepVisual';
import { SheepData } from './types';
import { Trash2, X, Sparkles, BookOpen, Gift, RotateCcw } from 'lucide-react';

// --- Components defined outside App for performance ---

const RarityBadge: React.FC<{ rarity: string }> = ({ rarity }) => {
  const badgeConfig: Record<string, { label: string; color: string; ring: string }> = {
    Common: { label: "常规款", color: "bg-blue-400", ring: "ring-blue-200" },
    Rare: { label: "稀有款", color: "bg-purple-400", ring: "ring-purple-200" },
    Epic: { label: "典藏款", color: "bg-pink-500", ring: "ring-pink-300" },
    Legendary: { label: "梦幻款", color: "bg-yellow-400", ring: "ring-yellow-200" },
    Glitch: { label: "隐藏款", color: "bg-slate-800", ring: "ring-red-500" },
  };

  const config = badgeConfig[rarity] || badgeConfig["Common"];

  return (
    <span className={`${config.color} text-white text-xs px-3 py-1 rounded-full uppercase tracking-wider font-bold shadow-md ring-2 ${config.ring} transform -rotate-2`}>
      {config.label}
    </span>
  );
};

// --- Main App ---

export default function App() {
  const [isPressing, setIsPressing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentSheep, setCurrentSheep] = useState<SheepData | null>(null);
  const [collection, setCollection] = useState<SheepData[]>([]);
  const [view, setView] = useState<'summon' | 'result' | 'collection'>('summon');
  const [isLoading, setIsLoading] = useState(false);

  // Refs for animation and timers
  const requestRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  
  const PRESS_DURATION = 1500; // ms to trigger

  // Load collection from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('sheep_collection');
    if (saved) {
      try {
        setCollection(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse collection", e);
      }
    }
  }, []);

  // Save collection
  useEffect(() => {
    localStorage.setItem('sheep_collection', JSON.stringify(collection));
  }, [collection]);

  const handleSummon = useCallback(async () => {
    setIsLoading(true);
    setView('result'); // Switch view immediately to show loading state there or overlay
    
    try {
      const data = await generateSheep();
      const newSheep: SheepData = {
        id: crypto.randomUUID(),
        ...data,
        timestamp: Date.now()
      };
      
      setCurrentSheep(newSheep);
      setCollection(prev => [newSheep, ...prev]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Animation Loop for Progress
  const animate = (time: number) => {
    if (!startTimeRef.current) startTimeRef.current = time;
    const elapsed = time - startTimeRef.current;
    const newProgress = Math.min((elapsed / PRESS_DURATION) * 100, 100);
    
    setProgress(newProgress);

    if (elapsed < PRESS_DURATION) {
      requestRef.current = requestAnimationFrame(animate);
    } else {
      // Completed
      setIsPressing(false);
      setProgress(0);
      handleSummon();
    }
  };

  const startPress = (e: React.TouchEvent | React.MouseEvent) => {
    setIsPressing(true);
    startTimeRef.current = 0;
    // Cancel any existing loop
    if (requestRef.current) cancelAnimationFrame(requestRef.current);
    requestRef.current = requestAnimationFrame(animate);
  };

  const endPress = () => {
    setIsPressing(false);
    setProgress(0);
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
    }
  };

  const clearCollection = () => {
    if (window.confirm("确定要放生所有小羊吗？（此操作不可恢复）")) {
      setCollection([]);
    }
  };

  // --- Views ---

  const SummonView = () => (
    <div className="flex flex-col items-center justify-center h-full w-full relative bg-amber-50">
       {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#F59E0B 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

      <div className="z-10 text-center space-y-10">
        <div>
           <h1 className="text-4xl font-black text-slate-800 drop-shadow-sm tracking-tight mb-2">
            奇葩羊羊盲盒
          </h1>
          <p className="text-slate-500 font-medium">Pop Mart Style Collector</p>
        </div>
        
        {/* Interaction Circle */}
        <div 
          className={`relative w-56 h-56 rounded-full border-8 border-white bg-white shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] flex items-center justify-center 
            transition-all duration-200 transform ${isPressing ? 'scale-95 shadow-inner' : 'scale-100 hover:scale-105'}`}
          onTouchStart={startPress}
          onTouchEnd={endPress}
          onMouseDown={startPress}
          onMouseUp={endPress}
          onMouseLeave={endPress}
          style={{ cursor: 'pointer', userSelect: 'none', WebkitTapHighlightColor: 'transparent' }}
        >
          {/* Progress Fill */}
          <div 
            className="absolute inset-0 rounded-full bg-gradient-to-tr from-yellow-300 to-orange-400 opacity-100 transition-all duration-75 ease-linear"
            style={{ 
              clipPath: `circle(${progress}% at 50% 50%)`
            }}
          />
          
          {isPressing ? (
             <Sparkles className="w-16 h-16 text-white animate-spin" />
          ) : (
             <div className="flex flex-col items-center text-slate-300">
                <Gift size={48} className="mb-2" />
                <span className="font-bold text-sm text-slate-400">长按拆盒</span>
             </div>
          )}
        </div>

        <div className="h-6">
            {isPressing && (
                <p className="text-orange-400 font-bold animate-pulse tracking-widest">
                正在打开盲盒...
                </p>
            )}
        </div>
      </div>

      <button 
        onClick={() => setView('collection')}
        className="absolute bottom-10 right-8 bg-white p-4 rounded-full text-slate-600 shadow-lg hover:shadow-xl active:scale-95 transition-all z-20"
      >
        <BookOpen size={24} />
      </button>
    </div>
  );

  const ResultView = () => (
    <div className="flex flex-col items-center justify-center h-full w-full p-6 animate-fadeIn bg-slate-900/80 backdrop-blur-md z-50 absolute inset-0">
      {isLoading ? (
        <div className="text-center">
          <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center animate-bounce shadow-lg mx-auto">
             <Gift size={48} className="text-orange-400" />
          </div>
          <p className="mt-8 text-2xl text-white font-bold animate-pulse">正在寻找奇葩羊...</p>
        </div>
      ) : currentSheep ? (
        <div className="bg-white p-2 rounded-[2rem] shadow-2xl w-full max-w-sm relative transform transition-all duration-500 hover:scale-[1.02]">
          
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-[1.5rem] p-6 flex flex-col items-center text-center space-y-4 border border-slate-100 overflow-hidden relative">
            
            {/* Spotlight effect */}
            <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-to-b from-white/40 to-transparent pointer-events-none rounded-full blur-3xl"></div>

            <div className="absolute top-4 right-4 z-10">
                 <RarityBadge rarity={currentSheep.rarity} />
            </div>
            
            <div className="py-8 z-0">
               <SheepVisual color={currentSheep.color} skinColor={currentSheep.skinColor} />
            </div>

            <div className="z-10 w-full">
                <h2 className="text-3xl font-black text-slate-800 mb-1">{currentSheep.name}</h2>
                <div className="h-1 w-12 bg-slate-200 rounded-full mx-auto mb-4"></div>
                <p className="text-slate-500 text-sm leading-relaxed px-4">"{currentSheep.description}"</p>
            </div>
            
            <div className="w-full grid grid-cols-2 gap-3 text-xs mt-4">
               <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100">
                  <span className="block text-slate-400 mb-1">装饰配件</span>
                  <span className="font-bold text-slate-700">{currentSheep.accessory}</span>
               </div>
               <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100">
                  <span className="block text-slate-400 mb-1">专属色号</span>
                  <div className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 rounded-full shadow-inner border border-black/10" style={{backgroundColor: currentSheep.color}}></span>
                    <span className="font-mono text-slate-600">{currentSheep.color}</span>
                  </div>
               </div>
            </div>

            <button 
              onClick={() => setView('summon')}
              className="mt-6 w-full bg-slate-900 py-4 rounded-xl font-bold text-white shadow-xl shadow-slate-900/20 active:scale-95 transition-transform flex items-center justify-center gap-2"
            >
              <RotateCcw size={18} />
              再抽一次
            </button>
            
            <button 
                onClick={() => setView('collection')}
                className="mt-2 text-slate-400 text-sm font-medium hover:text-slate-600"
            >
                查看图鉴
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );

  const CollectionView = () => (
    <div className="flex flex-col h-full w-full bg-slate-50">
      <div className="p-6 pt-12 flex items-center justify-between bg-white shadow-sm z-10">
        <h2 className="text-2xl font-black text-slate-800 flex items-center gap-2">
          <BookOpen size={24} className="text-orange-400"/> 我的羊圈 
          <span className="text-sm font-normal text-slate-400 ml-1">({collection.length})</span>
        </h2>
        <div className="flex gap-4">
          <button onClick={clearCollection} className="p-2 rounded-full bg-red-50 text-red-400 hover:bg-red-100 transition-colors">
            <Trash2 size={20} />
          </button>
          <button onClick={() => setView('summon')} className="p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors">
            <X size={20} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 pb-24">
        {collection.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-4">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center">
                <Gift size={40} className="text-slate-300" />
            </div>
            <p>还没有小羊哦</p>
            <button onClick={() => setView('summon')} className="px-6 py-2 bg-orange-400 text-white rounded-full font-bold shadow-lg shadow-orange-400/30">
              去开盲盒
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
              {collection.map((sheep) => (
                <div key={sheep.id} className="bg-white rounded-2xl p-3 flex flex-col items-center shadow-sm border border-slate-100 relative overflow-hidden">
                   <div className="absolute top-2 right-2">
                      <div className={`w-2 h-2 rounded-full ${
                          sheep.rarity === 'Legendary' ? 'bg-yellow-400' : 
                          sheep.rarity === 'Glitch' ? 'bg-red-500' : 
                          sheep.rarity === 'Epic' ? 'bg-pink-400' : 'bg-slate-200'
                      }`}></div>
                   </div>
                   
                   <div className="w-full aspect-square flex items-center justify-center bg-slate-50 rounded-xl mb-3">
                        <div className="w-28 h-28 transform scale-90">
                            <SheepVisual color={sheep.color} skinColor={sheep.skinColor} className="w-full h-full" />
                        </div>
                   </div>
                   
                   <h3 className="text-slate-800 font-bold text-sm truncate w-full text-center">{sheep.name}</h3>
                   <p className="text-slate-400 text-xs mt-1 truncate w-full text-center">{sheep.description}</p>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <main className="h-full w-full overflow-hidden bg-slate-50 font-sans">
      {view === 'summon' && <SummonView />}
      {view === 'result' && <ResultView />}
      {view === 'collection' && <CollectionView />}
    </main>
  );
}
