"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Sparkles,
  ArrowRight,
  Play,
  Clock,
  CheckCircle,
  Receipt,
  ChevronRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

export const HeroSection = () => {
  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-between px-6 py-20 md:py-32 md:px-10 max-w-7xl mx-auto relative overflow-hidden">
      <HeroContent />
      <ReceiptVisualization />
    </div>
  );
};

const HeroContent = () => {
  return (
    <div className="md:w-1/2 space-y-12 text-center md:text-left z-10">
      <div className="space-y-6">
        <Badge
          variant="outline"
          className="px-4 py-1.5 rounded-full border-emerald-800/40 bg-emerald-950/30 text-emerald-300 flex items-center gap-2 w-fit mx-auto md:mx-0"
        >
          <Sparkles size={16} className="text-emerald-300" />
          <span className="font-medium">AI-Powered Receipt Scanning</span>
        </Badge>

        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-emerald-300 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
            Transform Receipts
          </span>
          <br />
          <span className="bg-gradient-to-r from-teal-400 via-emerald-300 to-teal-200 bg-clip-text text-transparent">
            Into Insights
          </span>
        </h1>

        <p className="text-lg bg-gradient-to-r from-[#FDFDFD] to-[#B7B9BE]/80 bg-clip-text text-transparent leading-relaxed max-w-lg mx-auto md:mx-0">
          Our AI instantly scans and converts your receipts and bills into
          organized expenses. No more manual data entry — just snap, scan, and
          track.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 md:justify-start justify-center mx-auto">
        <Button
          asChild
          size="lg"
          className="bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white rounded-[8px] px-8 font-medium shadow-lg shadow-emerald-900/30 w-[80%] md:w-[300px] text-center mx-auto md:mx-0"
        >
          <Link href="/sign-in" className="flex items-center gap-2">
            Try For Free
            <ArrowRight size={16} />
          </Link>
        </Button>
      </div>
    </div>
  );
};

const ReceiptVisualization = () => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("scanning");

  // Simulate receipt scanning process
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(30);
      setTimeout(() => {
        setProgress(65);
        setTimeout(() => {
          setProgress(100);
          setStatus("complete");
        }, 2000);
      }, 1500);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="hidden md:block w-1/2 z-10 pl-10">
      <div className="relative h-[500px] w-full max-w-md mx-auto perspective-1000">
        <motion.div
          initial={{ rotateY: 5, rotateX: 5 }}
          animate={{ rotateY: 0, rotateX: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          whileHover={{ rotateY: -5, rotateX: -5 }}
          className="absolute inset-0"
        >
          <Card className="relative h-full w-full bg-gradient-to-br from-gray-900 to-gray-950 border-gray-800 shadow-2xl overflow-hidden rounded-3xl transform-gpu">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-36 h-6 bg-gray-950 rounded-b-xl z-50"></div>

            <CardContent className="p-0 h-full relative">
              <div className="absolute inset-0 p-4">
                <div className="h-full flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8 bg-gradient-to-br from-emerald-500 to-teal-600">
                        <AvatarFallback className="text-white text-xs">
                          FS
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-emerald-300">
                          FinSync AI
                        </h3>
                        <p className="text-xs text-gray-400">Receipt Scanner</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className="bg-emerald-950/30 border-emerald-900/30 text-emerald-300 text-xs"
                      >
                        PRO
                      </Badge>
                    </div>
                  </div>

                  <Tabs defaultValue="scan" className="mb-2">
                    <TabsList className="grid grid-cols-3 bg-gray-900/50 backdrop-blur-sm">
                      <TabsTrigger
                        value="scan"
                        className="data-[state=active]:bg-emerald-950/50 data-[state=active]:text-emerald-300"
                      >
                        Scan
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="scan" className="mt-2">
                      <Card className="relative h-64 bg-gray-950 border-gray-800 overflow-hidden">
                        <CardContent className="p-0 h-full flex items-center justify-center">
                          <div className="relative z-10 w-3/4 h-3/4 border-2 border-emerald-400/30 rounded-md flex items-center justify-center">
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.5 }}
                              className="absolute inset-0 flex items-center justify-center"
                            >
                              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-emerald-400"></div>
                              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-emerald-400"></div>
                              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-emerald-400"></div>
                              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-emerald-400"></div>
                            </motion.div>

                            <motion.div
                              initial={{ y: 50, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ delay: 0.8, type: "spring" }}
                              className="w-[85%] h-[85%] bg-white rounded-md shadow-lg transform rotate-2 relative z-20"
                            >
                              <div className="h-full w-full p-2 flex flex-col">
                                <div className="border-b border-gray-300 pb-1">
                                  <div className="text-gray-900 text-xs font-medium text-center">
                                    COFFEE SHOP
                                  </div>
                                  <div className="text-gray-500 text-[8px] text-center">
                                    123 Main Street
                                  </div>
                                </div>
                                <div className="flex-1 py-1 space-y-2">
                                  <div className="flex justify-between items-center">
                                    <div className="bg-gray-200 h-1.5 w-20 rounded-full"></div>
                                    <div className="bg-gray-200 h-1.5 w-10 rounded-full"></div>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <div className="bg-gray-300 h-1.5 w-24 rounded-full"></div>
                                    <div className="bg-gray-300 h-1.5 w-8 rounded-full"></div>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <div className="bg-gray-200 h-1.5 w-16 rounded-full"></div>
                                    <div className="bg-gray-200 h-1.5 w-12 rounded-full"></div>
                                  </div>
                                  <div className="mt-2 border-t border-gray-200 pt-1"></div>
                                  <div className="flex justify-between items-center">
                                    <div className="bg-gray-300 h-1.5 w-10 rounded-full"></div>
                                    <div className="bg-gray-300 h-1.5 w-12 rounded-full"></div>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <div className="bg-gray-800 h-1.5 w-16 rounded-full"></div>
                                    <div className="bg-gray-800 h-1.5 w-12 rounded-full"></div>
                                  </div>
                                </div>
                                <div className="border-t border-gray-300 pt-1 flex justify-between items-center">
                                  <div className="flex flex-col gap-0.5">
                                    <div className="bg-gray-300 h-1 w-12 rounded-full"></div>
                                    <div className="bg-gray-200 h-1 w-16 rounded-full"></div>
                                  </div>
                                  <div className="bg-gray-800 h-1.5 w-14 rounded-full"></div>
                                </div>
                              </div>
                            </motion.div>
                          </div>

                          <motion.div
                            initial={{ top: "-10%" }}
                            animate={{
                              top: ["0%", "100%", "0%"],
                              opacity: [0.8, 0.6, 0.8],
                            }}
                            transition={{
                              repeat: Infinity,
                              duration: 3,
                              ease: "easeInOut",
                            }}
                            className="absolute inset-x-0 h-12 bg-gradient-to-b from-emerald-400/20 via-emerald-400/30 to-transparent rounded-full blur-md"
                          ></motion.div>

                          <div className="absolute inset-0">
                            <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="mt-4 bg-gray-900/70 border-gray-800/50">
                        <CardContent className="p-3 space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {status === "scanning" ? (
                                <Clock
                                  size={16}
                                  className="text-emerald-300 animate-pulse"
                                />
                              ) : (
                                <CheckCircle
                                  size={16}
                                  className="text-emerald-400"
                                />
                              )}
                              <span className="text-sm font-medium text-emerald-300">
                                {status === "scanning"
                                  ? "Processing Receipt..."
                                  : "Receipt Processed"}
                              </span>
                            </div>
                            <Badge
                              variant={
                                status === "complete" ? "default" : "outline"
                              }
                              className={`text-xs ${
                                status === "complete"
                                  ? "bg-emerald-600"
                                  : "bg-emerald-950/30 border-emerald-900/30"
                              }`}
                            >
                              {status === "complete"
                                ? "Complete"
                                : "In Progress"}
                            </Badge>
                          </div>

                          <Progress
                            value={progress}
                            className="h-1.5 bg-gray-800"
                          >
                            <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"></div>
                          </Progress>

                          {status === "complete" && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.2 }}
                              className="space-y-2"
                            >
                              <div className="flex items-center justify-between text-xs text-gray-300">
                                <div className="flex items-center gap-1.5">
                                  <Receipt size={14} />
                                  <span>Coffee Shop</span>
                                </div>
                                <span className="font-medium text-emerald-300">
                                  $12.45
                                </span>
                              </div>

                              <div className="flex items-center justify-between text-xs text-gray-400">
                                <div className="flex items-center gap-1.5">
                                  <Sparkles size={14} />
                                  <span>
                                    Auto-categorized as "Food & Drink"
                                  </span>
                                </div>
                                <ChevronRight size={14} />
                              </div>
                            </motion.div>
                          )}
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>

                  {status === "complete" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="mt-2"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium text-gray-300">
                          Recent Receipts
                        </h4>
                        <Badge
                          variant="outline"
                          className="text-xs bg-transparent border-gray-700/50 text-gray-400"
                        >
                          View All
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        {[
                          {
                            name: "Grocery Store",
                            amount: "$67.35",
                            color: "bg-blue-500/20",
                          },
                          {
                            name: "Gas Station",
                            amount: "$45.20",
                            color: "bg-purple-500/20",
                          },
                        ].map((item, i) => (
                          <Card
                            key={i}
                            className={`${item.color} border-gray-800/30 hover:border-gray-700/50 transition-all duration-200 cursor-pointer`}
                          >
                            <CardContent className="p-2 flex flex-col">
                              <span className="text-xs font-medium text-gray-300">
                                {item.name}
                              </span>
                              <span className="text-lg font-semibold text-white">
                                {item.amount}
                              </span>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </CardContent>

            <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-gray-800/10 to-transparent pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
          </Card>
        </motion.div>

        <div className="absolute -bottom-12 -right-12 w-36 h-36 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 opacity-20 blur-2xl"></div>
        <div className="absolute -top-8 -left-8 w-36 h-36 rounded-full bg-gradient-to-br from-teal-600 to-emerald-500 opacity-10 blur-3xl"></div>

        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-4 bg-black/30 blur-md rounded-full"></div>
      </div>
    </div>
  );
};

export default ReceiptVisualization;
