import { useState, useEffect } from 'react';

// Simulated price data with realistic fluctuations
const generatePrice = (base: number, volatility: number) => {
  const change = (Math.random() - 0.5) * volatility;
  return base + change;
};

interface PriceData {
  price: number;
  change24h: number;
  high24h: number;
  low24h: number;
  volume: string;
}

interface Tweet {
  id: string;
  handle: string;
  username: string;
  content: string;
  time: string;
  likes: number;
  retweets: number;
}

const generateMockTweets = (): Tweet[] => {
  const tweets = [
    { handle: '@OilTrader_Pro', username: 'Oil Trading Pro', content: '$OIL looking bullish! Breaking through resistance at $82. Next target $85. OPEC meeting could be the catalyst. 🛢️📈 #CrudeOil #Trading' },
    { handle: '@CryptoBarrel', username: 'Crypto Barrel', content: 'Just aped into $OIL on @base. This is the commodity play of 2025. Real world assets meeting DeFi. LFG! 🔵🛢️' },
    { handle: '@EnergyAlpha', username: 'Energy Alpha', content: 'Brent crude futures showing strength. $OIL token tracking perfectly. The correlation is beautiful. 📊' },
    { handle: '@BaseDegenPro', username: 'Base Degen', content: '$OIL pumping while everything else dumps. Commodity-backed tokens are the future. @Basecrude called it first!' },
    { handle: '@PetroFinance', username: 'Petro Finance', content: 'Middle East tensions rising = oil prices rising = $OIL holders winning. Simple thesis. 🛢️💰' },
    { handle: '@DeFiOilRig', username: 'DeFi Oil Rig', content: 'Stacking $OIL like it\'s 1973. Energy crisis narrative incoming. Base chain is the way. 🔵' },
    { handle: '@CommodityKing', username: 'Commodity King', content: 'WTI just broke $80. $OIL token holders eating good tonight. This is what real utility looks like.' },
    { handle: '@BaseMaxi_', username: 'Base Maxi', content: '$OIL is the most interesting token on Base rn. Actual price correlation to crude. Not another dog coin.' },
  ];

  const shuffled = [...tweets].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 5).map((tweet, i) => ({
    ...tweet,
    id: `tweet-${Date.now()}-${i}`,
    time: `${Math.floor(Math.random() * 59) + 1}m`,
    likes: Math.floor(Math.random() * 500) + 10,
    retweets: Math.floor(Math.random() * 100) + 5,
  }));
};

function App() {
  const [oilPrice, setOilPrice] = useState<PriceData>({
    price: 82.45,
    change24h: 2.34,
    high24h: 83.12,
    low24h: 80.23,
    volume: '1.2M',
  });

  const [goldPrice, setGoldPrice] = useState<PriceData>({
    price: 2648.30,
    change24h: 0.87,
    high24h: 2655.00,
    low24h: 2635.50,
    volume: '890K',
  });

  const [tweets, setTweets] = useState<Tweet[]>(generateMockTweets());
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Price updates every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setOilPrice(prev => ({
        ...prev,
        price: generatePrice(prev.price, 0.5),
        change24h: prev.change24h + (Math.random() - 0.5) * 0.1,
      }));
      setGoldPrice(prev => ({
        ...prev,
        price: generatePrice(prev.price, 5),
        change24h: prev.change24h + (Math.random() - 0.5) * 0.05,
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Tweet refresh every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsRefreshing(true);
      setTimeout(() => {
        setTweets(generateMockTweets());
        setLastUpdate(new Date());
        setIsRefreshing(false);
      }, 500);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">
      {/* Animated background grid */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0,82,255,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,82,255,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }} />
      </div>

      {/* Oil derrick silhouette decoration */}
      <div className="fixed right-0 top-0 w-64 h-screen opacity-5 pointer-events-none hidden lg:block">
        <svg viewBox="0 0 200 600" className="h-full w-full" fill="currentColor">
          <path d="M100 50 L120 50 L130 200 L150 200 L150 220 L130 220 L140 500 L60 500 L70 220 L50 220 L50 200 L70 200 L80 50 Z" />
          <rect x="85" y="0" width="30" height="50" />
          <rect x="40" y="500" width="120" height="20" />
          <circle cx="100" cy="25" r="15" fill="none" stroke="currentColor" strokeWidth="3" />
        </svg>
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-[#0052FF]/30 bg-gradient-to-r from-[#0a0a0f] via-[#0d1020] to-[#0a0a0f]">
        <div className="max-w-7xl mx-auto px-4 py-3">
          {/* Top bar with CA */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3 pb-3 border-b border-white/10">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[#0052FF] font-bold text-sm tracking-wider">BASE.MEME</span>
              <span className="text-amber-500 font-bold">$OIL</span>
              <span className="text-white/50 text-xs sm:text-sm font-mono break-all">CA: 0x21FD44bE608F1D18689CDcC8861AE74571Ae8888</span>
            </div>
            <a
              href="https://base.meme/coin/base:0x21FD44bE608F1D18689CDcC8861AE74571Ae8888?referrer=0xFCE86e6A615B40A620b1a666ff4B866Cd273c476"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#0052FF] hover:bg-[#0066FF] px-4 py-2 rounded-lg font-bold text-sm transition-all hover:scale-105 hover:shadow-lg hover:shadow-[#0052FF]/30 w-fit"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
              </svg>
              BUY $OIL
            </a>
          </div>

          {/* Main header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Logo - Oil drop with Base blue */}
              <div className="relative">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#0052FF] to-[#0033AA] rounded-xl flex items-center justify-center shadow-lg shadow-[#0052FF]/30">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2c0 0-6 8-6 13a6 6 0 1 0 12 0c0-5-6-13-6-13z"/>
                  </svg>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-black tracking-tight">
                  <span className="text-[#0052FF]">BASE</span>
                  <span className="text-amber-500">CRUDE</span>
                </h1>
                <p className="text-[10px] sm:text-xs text-white/50 tracking-widest uppercase">Real-Time Commodity Tracker</p>
              </div>
            </div>

            {/* X/Twitter link */}
            <a
              href="https://x.com/Basecrude"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-3 py-2 rounded-lg transition-all border border-white/10 hover:border-white/20"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              <span className="text-sm font-medium hidden sm:inline">@Basecrude</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 py-6 sm:py-8">
        {/* Price Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* OIL Card - Featured */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1a1a2e] to-[#0d0d15] border border-amber-500/30 p-4 sm:p-6 group hover:border-amber-500/50 transition-all">
            {/* Animated oil flow background */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 bg-gradient-to-t from-amber-900/50 to-transparent animate-pulse" style={{ animationDuration: '3s' }} />
            </div>

            <div className="relative">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-amber-500 to-amber-700 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/30">
                    <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2c0 0-6 8-6 13a6 6 0 1 0 12 0c0-5-6-13-6-13z"/>
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-amber-500">$OIL</h2>
                    <p className="text-xs text-white/50">Crude Oil / USDT</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-green-500/20 px-2 py-1 rounded-full">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs text-green-400 font-medium">LIVE</span>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl lg:text-5xl font-black tabular-nums">${oilPrice.price.toFixed(2)}</span>
                  <span className={`text-base sm:text-lg font-bold ${oilPrice.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {oilPrice.change24h >= 0 ? '+' : ''}{oilPrice.change24h.toFixed(2)}%
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
                <div className="bg-white/5 rounded-lg p-2 sm:p-3">
                  <p className="text-[10px] sm:text-xs text-white/50 mb-1">24H HIGH</p>
                  <p className="text-sm sm:text-base font-bold text-green-400">${oilPrice.high24h.toFixed(2)}</p>
                </div>
                <div className="bg-white/5 rounded-lg p-2 sm:p-3">
                  <p className="text-[10px] sm:text-xs text-white/50 mb-1">24H LOW</p>
                  <p className="text-sm sm:text-base font-bold text-red-400">${oilPrice.low24h.toFixed(2)}</p>
                </div>
                <div className="bg-white/5 rounded-lg p-2 sm:p-3">
                  <p className="text-[10px] sm:text-xs text-white/50 mb-1">VOLUME</p>
                  <p className="text-sm sm:text-base font-bold text-white">{oilPrice.volume}</p>
                </div>
              </div>

              {/* TradingView link */}
              <a
                href="https://www.tradingview.com/chart/oyxQRAhY/?symbol=XTCOM%3AOILUSDT.P"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center justify-center gap-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 px-4 py-2 sm:py-3 rounded-lg transition-all font-medium text-sm w-full"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 3v18h18" />
                  <path d="M18 9l-5 5-4-4-3 3" />
                </svg>
                View on TradingView
              </a>
            </div>
          </div>

          {/* GOLD Card */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1a1a2e] to-[#0d0d15] border border-yellow-500/30 p-4 sm:p-6 group hover:border-yellow-500/50 transition-all">
            <div className="relative">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg shadow-yellow-500/30">
                    <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-yellow-500">$GOLD</h2>
                    <p className="text-xs text-white/50">Gold / USDT</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-green-500/20 px-2 py-1 rounded-full">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs text-green-400 font-medium">LIVE</span>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl lg:text-5xl font-black tabular-nums">${goldPrice.price.toFixed(2)}</span>
                  <span className={`text-base sm:text-lg font-bold ${goldPrice.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {goldPrice.change24h >= 0 ? '+' : ''}{goldPrice.change24h.toFixed(2)}%
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
                <div className="bg-white/5 rounded-lg p-2 sm:p-3">
                  <p className="text-[10px] sm:text-xs text-white/50 mb-1">24H HIGH</p>
                  <p className="text-sm sm:text-base font-bold text-green-400">${goldPrice.high24h.toFixed(2)}</p>
                </div>
                <div className="bg-white/5 rounded-lg p-2 sm:p-3">
                  <p className="text-[10px] sm:text-xs text-white/50 mb-1">24H LOW</p>
                  <p className="text-sm sm:text-base font-bold text-red-400">${goldPrice.low24h.toFixed(2)}</p>
                </div>
                <div className="bg-white/5 rounded-lg p-2 sm:p-3">
                  <p className="text-[10px] sm:text-xs text-white/50 mb-1">VOLUME</p>
                  <p className="text-sm sm:text-base font-bold text-white">{goldPrice.volume}</p>
                </div>
              </div>

              <a
                href="https://www.tradingview.com/chart/oyxQRAhY/?symbol=XTCOM%3AOILUSDT.P"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center justify-center gap-2 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 px-4 py-2 sm:py-3 rounded-lg transition-all font-medium text-sm w-full"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 3v18h18" />
                  <path d="M18 9l-5 5-4-4-3 3" />
                </svg>
                View on TradingView
              </a>
            </div>
          </div>
        </div>

        {/* Live News Feed */}
        <div className="rounded-2xl bg-gradient-to-br from-[#1a1a2e] to-[#0d0d15] border border-[#0052FF]/30 overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-4 sm:p-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                <h2 className="text-lg sm:text-xl font-black">LIVE $OIL FEED</h2>
              </div>
              <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${isRefreshing ? 'bg-[#0052FF]/30' : 'bg-green-500/20'}`}>
                <div className={`w-2 h-2 rounded-full ${isRefreshing ? 'bg-[#0052FF] animate-spin' : 'bg-green-500 animate-pulse'}`} />
                <span className={`text-xs font-medium ${isRefreshing ? 'text-[#0052FF]' : 'text-green-400'}`}>
                  {isRefreshing ? 'REFRESHING' : 'LIVE'}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs text-white/50">
                Updated: {lastUpdate.toLocaleTimeString()}
              </span>
              <a
                href="https://x.com/search?q=%24OIL&src=typed_query&f=live"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#0052FF] hover:underline"
              >
                View all on X →
              </a>
            </div>
          </div>

          <div className={`divide-y divide-white/5 transition-opacity duration-300 ${isRefreshing ? 'opacity-50' : 'opacity-100'}`}>
            {tweets.map((tweet, index) => (
              <div
                key={tweet.id}
                className="p-4 sm:p-6 hover:bg-white/5 transition-all"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#0052FF] to-[#0033AA] rounded-full flex-shrink-0 flex items-center justify-center text-base sm:text-lg font-bold">
                    {tweet.username.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-1">
                      <span className="font-bold text-sm sm:text-base truncate">{tweet.username}</span>
                      <span className="text-white/40 text-xs sm:text-sm truncate">{tweet.handle}</span>
                      <span className="text-white/30">·</span>
                      <span className="text-white/40 text-xs sm:text-sm">{tweet.time}</span>
                    </div>
                    <p className="text-white/80 text-sm sm:text-base mb-3 break-words">{tweet.content}</p>
                    <div className="flex items-center gap-4 sm:gap-6 text-white/40 text-xs sm:text-sm">
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                        </svg>
                        <span>{Math.floor(Math.random() * 50)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M17 1l4 4-4 4"/>
                          <path d="M3 11V9a4 4 0 0 1 4-4h14"/>
                          <path d="M7 23l-4-4 4-4"/>
                          <path d="M21 13v2a4 4 0 0 1-4 4H3"/>
                        </svg>
                        <span>{tweet.retweets}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                        </svg>
                        <span>{tweet.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Refresh indicator */}
          <div className="p-4 border-t border-white/10 text-center">
            <div className="flex items-center justify-center gap-2 text-white/40 text-sm">
              <svg className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M23 4v6h-6"/>
                <path d="M1 20v-6h6"/>
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
              </svg>
              <span>Auto-refreshes every 10 seconds</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 mt-8 sm:mt-12 py-4 sm:py-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-white/30 text-xs">
            Requested by{' '}
            <a href="https://x.com/Basecrude" target="_blank" rel="noopener noreferrer" className="hover:text-white/50 transition-colors">
              @BASECRUDE
            </a>
            {' '}·{' '}
            Built by{' '}
            <a href="https://x.com/clonkbot" target="_blank" rel="noopener noreferrer" className="hover:text-white/50 transition-colors">
              @clonkbot
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
