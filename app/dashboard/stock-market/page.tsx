"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  TrendingUp,
  RefreshCw,
  Zap,
  AlertTriangle,
  Flame,
  Plus,
  Minus,
  Award,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { useNexusStore } from "@/lib/store";

// Dynamic import for react-apexcharts to avoid Next.js SSR build errors
const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[380px] w-full items-center justify-center bg-black/40 border border-white/5 rounded-xl">
      <div className="flex flex-col items-center gap-3 font-mono">
        <RefreshCw className="h-8 w-8 text-cyan animate-spin" />
        <span className="text-xs text-ghost/60">Initializing Tactical Charts...</span>
      </div>
    </div>
  )
});

interface CandlestickPoint {
  x: string;
  y: number[]; // [Open, High, Low, Close]
}

interface TrendMarketData {
  id: string;
  trendName: string;
  fatigueScore: number;
  viralityPrediction: string;
  candlestickData: CandlestickPoint[];
}

interface NarrativeStock {
  id: string;
  narrativeName: string;
  targetTrend: string;
  price: number;
  changePercent: number;
  sharesBought: number;
}

export default function StockMarketPage() {
  const { fatigueThreshold } = useNexusStore();
  const [selectedTrendId, setSelectedTrendId] = useState<string>("t1");
  const [isClient, setIsClient] = useState<boolean>(false);
  const [tickerNotification, setTickerNotification] = useState<string | null>(null);

  // Community-voted AI suggestions ranking list
  const [narrativeStocks, setNarrativeStocks] = useState<NarrativeStock[]>([
    {
      id: "n1",
      narrativeName: "The Human Restitution: Banning AI to Reclaim Trust",
      targetTrend: "Faceless AI Slop",
      price: 148.50,
      changePercent: 24.8,
      sharesBought: 12840
    },
    {
      id: "n2",
      narrativeName: "The Rise of Silent Competence: Quiet Building",
      targetTrend: "LinkedIn Cry Selfies",
      price: 94.20,
      changePercent: 12.5,
      sharesBought: 8410
    },
    {
      id: "n3",
      narrativeName: "The Curated Mess: Spontaneous Dump Exposed",
      targetTrend: "Staged Photo Dumps",
      price: 62.80,
      changePercent: -4.6,
      sharesBought: 4290
    }
  ]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Real-world 2026 Saturated Trend market data
  const marketTrends: TrendMarketData[] = [
    {
      id: "t1",
      trendName: "Faceless AI Slop",
      fatigueScore: 94,
      viralityPrediction: "98%",
      candlestickData: [
        { "x": "Week 1", "y": [40, 48, 38, 45] },
        { "x": "Week 2", "y": [45, 62, 42, 58] },
        { "x": "Week 3", "y": [58, 80, 55, 76] },
        { "x": "Week 4", "y": [76, 96, 74, 94] },
        { "x": "Week 5", "y": [94, 95, 20, 22] } // Sharp crash on Week 5
      ]
    },
    {
      id: "t2",
      trendName: "LinkedIn Cry Selfies",
      fatigueScore: 89,
      viralityPrediction: "92%",
      candlestickData: [
        { "x": "Week 1", "y": [30, 38, 28, 35] },
        { "x": "Week 2", "y": [35, 52, 32, 48] },
        { "x": "Week 3", "y": [48, 70, 46, 68] },
        { "x": "Week 4", "y": [68, 91, 66, 89] },
        { "x": "Week 5", "y": [89, 90, 40, 45] } // Smashed threshold crash
      ]
    },
    {
      id: "t3",
      trendName: "Staged Photo Dumps",
      fatigueScore: 82,
      viralityPrediction: "86%",
      candlestickData: [
        { "x": "Week 1", "y": [20, 32, 18, 28] },
        { "x": "Week 2", "y": [28, 48, 26, 45] },
        { "x": "Week 3", "y": [45, 66, 42, 62] },
        { "x": "Week 4", "y": [62, 84, 58, 82] },
        { "x": "Week 5", "y": [82, 83, 48, 52] } // Drop below threshold
      ]
    }
  ];

  const selectedTrend =
    marketTrends.find((t) => t.id === selectedTrendId) || marketTrends[0];

  // Voting action: Buy / Long (increases price, capital shares, and profit percentage)
  const handleBuyVote = (id: string) => {
    setNarrativeStocks((prev) =>
      prev.map((stock) => {
        if (stock.id === id) {
          const updatedShares = stock.sharesBought + 1;
          // Dynamically ticks price upward
          const priceTick = Number((stock.price + 1.25).toFixed(2));
          const basePercent = stock.changePercent >= 0 ? stock.changePercent : stock.changePercent + 5.0;
          const updatedPercent = Number((basePercent + 0.8).toFixed(1));
          
          triggerTickerMessage(`Secured BUY vote for "${stock.narrativeName.substring(0, 24)}..." Value rising!`);
          return {
            ...stock,
            price: priceTick,
            sharesBought: updatedShares,
            changePercent: updatedPercent
          };
        }
        return stock;
      })
    );
  };

  // Voting action: Sell / Short (decreases price, capital shares, and profit percentage)
  const handleSellShort = (id: string) => {
    setNarrativeStocks((prev) =>
      prev.map((stock) => {
        if (stock.id === id) {
          const updatedShares = Math.max(0, stock.sharesBought - 1);
          // Dynamically ticks price downward
          const priceTick = Number(Math.max(1, stock.price - 1.50).toFixed(2));
          const updatedPercent = Number((stock.changePercent - 1.1).toFixed(1));
          
          triggerTickerMessage(`Secured SHORT vote for "${stock.narrativeName.substring(0, 24)}..." Value dropping!`);
          return {
            ...stock,
            price: priceTick,
            sharesBought: updatedShares,
            changePercent: updatedPercent
          };
        }
        return stock;
      })
    );
  };

  const triggerTickerMessage = (msg: string) => {
    setTickerNotification(msg);
    setTimeout(() => setTickerNotification(null), 3000);
  };

  // Sort narrative stocks by price (Current Capitalization) to create a real dynamic leaderboard!
  const sortedNarratives = [...narrativeStocks].sort((a, b) => b.price - a.price);

  // ApexCharts Configurations - with beautifully thin professional candles
  const chartOptions: ApexCharts.ApexOptions = {
    chart: {
      type: "candlestick",
      height: 380,
      background: "transparent",
      toolbar: {
        show: false
      },
      animations: {
        enabled: true,
        speed: 800
      }
    },
    theme: {
      mode: "dark"
    },
    xaxis: {
      type: "category",
      axisBorder: {
        color: "rgba(255,255,255,0.05)"
      },
      axisTicks: {
        color: "rgba(255,255,255,0.05)"
      },
      labels: {
        style: {
          colors: "#94A3B8",
          fontSize: "11px",
          fontFamily: "var(--font-mono), monospace"
        }
      }
    },
    yaxis: {
      tooltip: {
        enabled: true
      },
      labels: {
        style: {
          colors: "#94A3B8",
          fontSize: "11px",
          fontFamily: "var(--font-mono), monospace"
        }
      }
    },
    grid: {
      borderColor: "rgba(255, 255, 255, 0.02)",
      xaxis: {
        lines: {
          show: true
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      }
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: "#00FFDD", // Neon green/cyan
          downward: "#FF3366" // Neon red/magenta
        },
        wick: {
          useFillColor: true
        }
      },
      // This makes the candles thin, sleek, and authentic like a real stock terminal!
      bar: {
        columnWidth: "15%"
      }
    },
    annotations: {
      points: [
        {
          x: "Week 4",
          y: selectedTrend.fatigueScore,
          marker: {
            size: 5,
            fillColor: "#00FFFF",
            strokeColor: "#000"
          },
          label: {
            borderColor: "rgba(0,255,255,0.3)",
            borderWidth: 1,
            style: {
              color: "#000000",
              background: "#00FFFF",
              fontSize: "10px",
              fontWeight: 700,
              fontFamily: "var(--font-mono), monospace",
              padding: {
                left: 8,
                right: 8,
                top: 4,
                bottom: 4
              }
            },
            text: `BURNOUT CEILING MET: ${selectedTrend.fatigueScore}`
          }
        }
      ]
    }
  };

  const chartSeries = [
    {
      name: selectedTrend.trendName,
      data: selectedTrend.candlestickData.map((d) => ({
        x: d.x,
        y: d.y
      }))
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Ticker Notifications */}
      {tickerNotification && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-[#0A0A0A] border border-cyan/30 text-cyan rounded-lg px-4 py-2 text-xs font-mono shadow-[0_0_15px_rgba(0,255,255,0.1)] transition-all">
          <Zap className="h-3.5 w-3.5 fill-cyan text-cyan animate-pulse" />
          <span>{tickerNotification}</span>
        </div>
      )}

      {/* Header section */}
      <div>
        <h2 className="text-xl font-bold tracking-tight md:text-2xl uppercase">
          Creator Stock Market
        </h2>
        <p className="text-xs text-ghost">
          Trade narrative capital. Vote by BUYING/LONGING counter-strategies to dynamically drive them into profit or shorting to decrease their indexing.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_450px]">
        {/* Left Side: Candlestick Trend Burnout Chart */}
        <div className="space-y-6">
          <div className="rounded-xl border border-white/5 bg-[#0A0A0A]/50 p-6 backdrop-blur-md space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/5 pb-5">
              <div className="space-y-1">
                <h3 className="text-sm font-bold tracking-tight flex items-center gap-2 font-mono">
                  <TrendingUp className="h-4 w-4 text-cyan" />
                  TREND LIFECYCLE BURNOUT (THIN CANDLES)
                </h3>
                <span className="text-[10px] font-mono text-ghost/40">AUDIENCE ATTENTION GAP INDEX</span>
              </div>

              {/* Selector list */}
              <div className="flex items-center gap-1.5 bg-black p-1 border border-white/5 rounded-lg self-start">
                {marketTrends.map((trend) => (
                  <button
                    key={trend.id}
                    onClick={() => setSelectedTrendId(trend.id)}
                    className={`rounded-md px-3 py-1.5 text-[10px] font-mono font-semibold transition-all duration-300 ${
                      selectedTrendId === trend.id
                        ? "bg-cyan text-black"
                        : "text-ghost hover:text-white"
                    }`}
                  >
                    {trend.trendName}
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic ApexChart */}
            <div className="relative">
              <div className="absolute top-2 left-2 z-10 flex items-center gap-2 rounded bg-black/80 border border-cyan/20 px-3 py-1.5 font-mono text-[9px] text-cyan">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse" />
                INDEX VECTOR: {selectedTrend.trendName.toUpperCase()}
              </div>

              <div className="min-h-[380px]">
                {isClient && (
                  <Chart
                    options={chartOptions}
                    series={chartSeries}
                    type="candlestick"
                    height={380}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Diagnostic details grid */}
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-white/5 bg-[#0A0A0A]/50 p-4 font-mono text-center space-y-1">
              <span className="text-ghost/40 text-[9px] tracking-wider block">FATIGUE INDEX</span>
              <span className="text-base font-bold text-cyan">{selectedTrend.fatigueScore} / 100</span>
            </div>
            
            <div className="rounded-xl border border-white/5 bg-[#0A0A0A]/50 p-4 font-mono text-center space-y-1">
              <span className="text-ghost/40 text-[9px] tracking-wider block">VIRALITY DISRUPT RATIO</span>
              <span className="text-base font-bold text-cyan">{selectedTrend.viralityPrediction}</span>
            </div>

            <div className="rounded-xl border border-white/5 bg-[#0A0A0A]/50 p-4 font-mono text-center space-y-1">
              <span className="text-ghost/40 text-[9px] tracking-wider block">THRESHOLD STATUS</span>
              <span
                className={`text-sm font-bold flex items-center justify-center gap-1.5 ${
                  selectedTrend.fatigueScore >= fatigueThreshold
                    ? "text-red-500 animate-pulse"
                    : "text-cyan"
                }`}
              >
                <AlertTriangle className="h-4.5 w-4.5" />
                {selectedTrend.fatigueScore >= fatigueThreshold ? "BURNED OUT" : "MONITORED"}
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: AI Suggestion Strategy Leaderboard & Creator Voting (Buy/Short) */}
        <div className="space-y-6">
          <div className="rounded-xl border border-white/5 bg-[#0A0A0A]/50 p-6 backdrop-blur-md flex flex-col min-h-[500px]">
            <div className="border-b border-white/5 pb-4 mb-5">
              <h3 className="text-sm font-bold tracking-tight flex items-center gap-2">
                <Flame className="h-4 w-4 text-cyan" />
                AI STRATEGY PERFORMANCE LEADERBOARD
              </h3>
              <p className="text-[10px] font-mono text-ghost/50 uppercase tracking-widest mt-1">
                Ranked by Creator Capitalization & Profitability
              </p>
            </div>

            <div className="space-y-4 flex-1">
              {sortedNarratives.map((stock, index) => {
                const isProfit = stock.changePercent >= 0;
                
                return (
                  <div
                    key={stock.id}
                    className="rounded-lg border border-white/5 bg-black/40 p-4 space-y-3 hover:border-white/10 transition-all"
                  >
                    {/* Rank, Title & Subtitle */}
                    <div className="flex items-start gap-3">
                      <div className="flex h-7 w-7 items-center justify-center rounded bg-white/5 border border-white/10 text-xs font-bold font-mono text-ghost shrink-0">
                        #{index + 1}
                      </div>
                      
                      <div className="space-y-1 flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-white leading-tight truncate">
                          {stock.narrativeName}
                        </h4>
                        <span className="text-[9px] font-mono text-ghost/40 block uppercase">
                          Targeting: {stock.targetTrend}
                        </span>
                      </div>
                    </div>

                    {/* Stock Metrics (Price, Profit Change, Community Shares) */}
                    <div className="flex items-center justify-between border-t border-white/5 pt-3">
                      <div className="flex items-center gap-4">
                        {/* Price Shares */}
                        <div className="font-mono">
                          <span className="text-[9px] text-ghost/40 block">SHARE VALUE</span>
                          <span className="text-sm font-bold text-cyan">${stock.price.toFixed(2)}</span>
                        </div>

                        {/* Percent Change */}
                        <div className="font-mono">
                          <span className="text-[9px] text-ghost/40 block">NET IMPACT</span>
                          <span
                            className={`text-xs font-bold flex items-center gap-0.5 ${
                              isProfit ? "text-emerald-400" : "text-rose-500"
                            }`}
                          >
                            {isProfit ? (
                              <ArrowUpRight className="h-3 w-3" />
                            ) : (
                              <ArrowDownRight className="h-3 w-3" />
                            )}
                            {isProfit ? "+" : ""}
                            {stock.changePercent.toFixed(1)}%
                          </span>
                        </div>

                        {/* Votes Pool */}
                        <div className="font-mono hidden sm:block">
                          <span className="text-[9px] text-ghost/40 block">VOTES POOL</span>
                          <span className="text-xs text-ghost/80">{stock.sharesBought.toLocaleString()} votes</span>
                        </div>
                      </div>

                      {/* Vote Buttons (BUY / SHORT) */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleSellShort(stock.id)}
                          className="flex h-7 w-7 items-center justify-center rounded border border-rose-500/20 bg-rose-500/5 text-rose-500 transition-all hover:bg-rose-500/10 hover:border-rose-500/40 active:scale-90"
                          title="Vote SHORT (Decreases dynamic value/impact)"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleBuyVote(stock.id)}
                          className="flex h-7 w-7 items-center justify-center rounded border border-emerald-500/20 bg-emerald-500/5 text-emerald-500 transition-all hover:bg-emerald-500/10 hover:border-emerald-500/40 active:scale-90"
                          title="Vote BUY/LONG (Increases dynamic value/impact)"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Performance analysis panel footer */}
            <div className="mt-6 rounded-lg bg-black border border-white/5 p-4 text-[10px] font-mono text-ghost/60 leading-relaxed flex gap-3 items-center">
              <Award className="h-5 w-5 text-cyan shrink-0 animate-pulse" />
              <span>
                <strong>Tactical Tip:</strong> BUY voting long positions demonstrate high audience adoption on suggestions. Ranks shift instantly as votes accrue.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
