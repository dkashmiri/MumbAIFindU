import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { motion } from "motion/react";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { 
  Target, 
  Calendar, 
  TrendingUp, 
  Brain, 
  Moon, 
  Sun, 
  Sparkles,
  Plus,
  CheckCircle,
  Circle
} from "lucide-react";
import { DISCResults } from "./disc-assessment";
import { KundliData } from "./kundli-input";

interface DashboardProps {
  discResults: DISCResults;
  kundliData: KundliData;
  onCreateHabit: () => void;
}

interface Habit {
  id: string;
  name: string;
  category: string;
  streak: number;
  completedToday: boolean;
  totalDays: number;
  successRate: number;
}

const mockHabits: Habit[] = [
  {
    id: '1',
    name: 'Morning Meditation',
    category: 'Spiritual',
    streak: 7,
    completedToday: true,
    totalDays: 21,
    successRate: 85
  },
  {
    id: '2',
    name: 'Drink 8 Glasses of Water',
    category: 'Health',
    streak: 12,
    completedToday: false,
    totalDays: 30,
    successRate: 73
  },
  {
    id: '3',
    name: 'Read for 30 Minutes',
    category: 'Learning',
    streak: 5,
    completedToday: true,
    totalDays: 14,
    successRate: 92
  }
];

const colorThemes = {
  red: {
    gradient: 'from-red-400 to-orange-400',
    bg: 'from-red-50 to-orange-50',
    text: 'text-red-600',
    border: 'border-red-200'
  },
  yellow: {
    gradient: 'from-yellow-400 to-orange-400',
    bg: 'from-yellow-50 to-orange-50',
    text: 'text-yellow-600',
    border: 'border-yellow-200'
  },
  green: {
    gradient: 'from-green-400 to-teal-400',
    bg: 'from-green-50 to-teal-50',
    text: 'text-green-600',
    border: 'border-green-200'
  },
  blue: {
    gradient: 'from-blue-400 to-purple-400',
    bg: 'from-blue-50 to-purple-50',
    text: 'text-blue-600',
    border: 'border-blue-200'
  }
};

const astrologicalInsights = [
  "🌟 Jupiter is favorably placed - excellent time for learning habits",
  "🌙 Moon phase supports emotional balance and consistency",
  "⚡ Mercury retrograde ends tomorrow - communication habits will flow better",
  "🔥 Mars energy peak - perfect for physical activity habits"
];

export function Dashboard({ discResults, kundliData, onCreateHabit }: DashboardProps) {
  const [habits, setHabits] = useState<Habit[]>(mockHabits);
  const theme = colorThemes[discResults.dominant];
  
  const toggleHabit = (habitId: string) => {
    setHabits(prev => prev.map(habit => 
      habit.id === habitId 
        ? { ...habit, completedToday: !habit.completedToday }
        : habit
    ));
  };

  const completedToday = habits.filter(h => h.completedToday).length;
  const totalHabits = habits.length;
  const completionRate = totalHabits > 0 ? (completedToday / totalHabits) * 100 : 0;

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.bg} p-6`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="flex justify-between items-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <h1 className="text-3xl mb-2">Welcome back! ✨</h1>
            <p className="text-slate-600">
              Your {discResults.dominant.toUpperCase()} personality thrives on{' '}
              {discResults.dominant === 'red' && 'challenges and quick wins'}
              {discResults.dominant === 'yellow' && 'social connection and variety'}
              {discResults.dominant === 'green' && 'steady progress and support'}
              {discResults.dominant === 'blue' && 'detailed tracking and analysis'}
            </p>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              onClick={onCreateHabit}
              className={`bg-gradient-to-r ${theme.gradient} hover:shadow-lg text-white px-6 py-3 rounded-full`}
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Habit
            </Button>
          </motion.div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Stats & Habits */}
          <div className="lg:col-span-2 space-y-6">
            {/* Daily Progress Ring */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="p-8 bg-white/80 backdrop-blur border-slate-200 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl">Today's Progress</h2>
                  <Badge variant="secondary" className={`${theme.text} bg-white/50`}>
                    {completedToday} / {totalHabits} Complete
                  </Badge>
                </div>
                
                <div className="flex items-center gap-8">
                  {/* Progress Ring */}
                  <div className="relative w-32 h-32">
                    <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="#e5e7eb"
                        strokeWidth="8"
                        fill="none"
                      />
                      <motion.circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="url(#gradient)"
                        strokeWidth="8"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 40}`}
                        initial={{ strokeDashoffset: 2 * Math.PI * 40 }}
                        animate={{ 
                          strokeDashoffset: 2 * Math.PI * 40 * (1 - completionRate / 100)
                        }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" className={theme.gradient.split(' ')[0].replace('from-', 'stop-')} />
                          <stop offset="100%" className={theme.gradient.split(' ')[2].replace('to-', 'stop-')} />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold">{Math.round(completionRate)}%</span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex-1 grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{completedToday}</div>
                      <div className="text-sm text-slate-600">Completed Today</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {habits.reduce((sum, h) => sum + h.streak, 0)}
                      </div>
                      <div className="text-sm text-slate-600">Total Streak Days</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        {Math.round(habits.reduce((sum, h) => sum + h.successRate, 0) / habits.length)}%
                      </div>
                      <div className="text-sm text-slate-600">Success Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">{totalHabits}</div>
                      <div className="text-sm text-slate-600">Active Habits</div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Habits List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-6 bg-white/80 backdrop-blur border-slate-200 shadow-lg">
                <h3 className="text-xl mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Today's Habits
                </h3>
                
                <div className="space-y-4">
                  {habits.map((habit, index) => (
                    <motion.div
                      key={habit.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="flex items-center gap-4 p-4 bg-white rounded-lg border border-slate-200 hover:shadow-md transition-all"
                    >
                      <motion.button
                        onClick={() => toggleHabit(habit.id)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="flex-shrink-0"
                      >
                        {habit.completedToday ? (
                          <CheckCircle className="w-6 h-6 text-green-500" />
                        ) : (
                          <Circle className="w-6 h-6 text-slate-400" />
                        )}
                      </motion.button>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className={`font-medium ${habit.completedToday ? 'line-through text-slate-500' : ''}`}>
                            {habit.name}
                          </h4>
                          <Badge variant="outline" className="text-xs">
                            {habit.category}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-slate-600">
                          <span>🔥 {habit.streak} day streak</span>
                          <span>📊 {habit.successRate}% success rate</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Right Column - Insights & Profile */}
          <div className="space-y-6">
            {/* Personality Profile */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="p-6 bg-white/80 backdrop-blur border-slate-200 shadow-lg">
                <h3 className="text-lg mb-4 flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  Your Profile
                </h3>
                
                <div className="space-y-4">
                  <div className="text-center">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${theme.gradient} mx-auto mb-2 flex items-center justify-center text-white text-xl font-bold`}>
                      {discResults.dominant.toUpperCase()[0]}
                    </div>
                    <h4 className="font-medium">{discResults.dominant.toUpperCase()} Dominant</h4>
                    <p className="text-sm text-slate-600">
                      {discResults.dominant === 'red' && 'Direct & Results-Driven'}
                      {discResults.dominant === 'yellow' && 'Enthusiastic & Social'}
                      {discResults.dominant === 'green' && 'Steady & Supportive'}
                      {discResults.dominant === 'blue' && 'Analytical & Precise'}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    {Object.entries(discResults).filter(([key]) => key !== 'dominant').map(([color, score]) => (
                      <div key={color} className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${colorThemes[color as keyof typeof colorThemes].gradient}`} />
                        <span className="text-sm flex-1 capitalize">{color}</span>
                        <span className="text-sm font-medium">{score}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Astrological Insights */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="p-6 bg-white/80 backdrop-blur border-slate-200 shadow-lg">
                <h3 className="text-lg mb-4 flex items-center gap-2">
                  <Moon className="w-5 h-5" />
                  Cosmic Insights
                </h3>
                
                <div className="space-y-3">
                  {astrologicalInsights.map((insight, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="text-sm p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-100"
                    >
                      {insight}
                    </motion.div>
                  ))}
                </div>
                
                <div className="mt-4 pt-4 border-t border-slate-200">
                  <p className="text-xs text-slate-500 text-center">
                    Based on your birth chart: {kundliData.birthPlace}
                    <br />
                    Born: {new Date(kundliData.birthDate).toLocaleDateString()}
                  </p>
                </div>
              </Card>
            </motion.div>

            {/* Weekly Overview */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="p-6 bg-white/80 backdrop-blur border-slate-200 shadow-lg">
                <h3 className="text-lg mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  This Week
                </h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Habits Completed</span>
                    <span className="text-sm font-bold">12/21</span>
                  </div>
                  <Progress value={57} className="h-2" />
                  
                  <div className="grid grid-cols-7 gap-1 mt-4">
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
                      <div key={index} className="text-center">
                        <div className="text-xs text-slate-600 mb-1">{day}</div>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                          index < 5 ? `bg-gradient-to-r ${theme.gradient} text-white` : 'bg-slate-100 text-slate-400'
                        }`}>
                          {index + 10}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}