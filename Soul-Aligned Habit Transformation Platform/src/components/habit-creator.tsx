import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { motion } from "motion/react";
import { Badge } from "./ui/badge";
import { 
  Target, 
  Calendar, 
  Clock, 
  Brain, 
  Moon, 
  Sparkles,
  CheckCircle,
  ArrowLeft
} from "lucide-react";
import { DISCResults } from "./disc-assessment";

interface HabitCreatorProps {
  discResults: DISCResults;
  onComplete: (habit: NewHabit) => void;
  onBack: () => void;
}

export interface NewHabit {
  name: string;
  description: string;
  category: string;
  frequency: string;
  difficulty: number;
  goal: string;
  personalizedStrategy: string;
}

const categories = [
  { id: 'physical', name: 'Physical Health', icon: '💪', color: 'from-red-400 to-orange-400' },
  { id: 'mental', name: 'Mental Wellness', icon: '🧠', color: 'from-blue-400 to-purple-400' },
  { id: 'spiritual', name: 'Spiritual Growth', icon: '🧘', color: 'from-purple-400 to-pink-400' },
  { id: 'learning', name: 'Learning & Skills', icon: '📚', color: 'from-green-400 to-teal-400' },
  { id: 'creativity', name: 'Creative Expression', icon: '🎨', color: 'from-yellow-400 to-orange-400' },
  { id: 'relationships', name: 'Relationships', icon: '💝', color: 'from-pink-400 to-red-400' },
  { id: 'productivity', name: 'Productivity', icon: '⚡', color: 'from-indigo-400 to-blue-400' },
  { id: 'finance', name: 'Financial', icon: '💰', color: 'from-emerald-400 to-green-400' }
];

const discStrategies = {
  red: {
    approach: "Challenge-Based Tracking",
    tips: [
      "Set ambitious daily targets",
      "Create competitive elements",
      "Track immediate results",
      "Quick wins and rapid progress"
    ],
    timing: "Morning - high energy periods",
    motivation: "Beat yesterday's performance"
  },
  yellow: {
    approach: "Social & Fun Tracking",
    tips: [
      "Share progress with friends",
      "Gamify with rewards",
      "Variety in execution",
      "Celebrate small wins publicly"
    ],
    timing: "Peak social hours",
    motivation: "Social recognition and variety"
  },
  green: {
    approach: "Steady & Supportive",
    tips: [
      "Start small and build gradually",
      "Consistent daily routines",
      "Gentle reminders",
      "Focus on progress, not perfection"
    ],
    timing: "Consistent daily schedule",
    motivation: "Steady progress and support"
  },
  blue: {
    approach: "Data-Driven Analysis",
    tips: [
      "Detailed tracking metrics",
      "Analyze patterns and trends",
      "Systematic approach",
      "Quality over quantity"
    ],
    timing: "Planned optimal windows",
    motivation: "Detailed insights and improvement"
  }
};

const astrologicalTiming = [
  "🌟 Jupiter influence: Excellent for learning and spiritual habits",
  "🌙 Waxing moon: Perfect for building and growing habits",
  "⚡ Mars energy: Ideal timing for physical and action-oriented habits",
  "💫 Mercury alignment: Great for communication and mental habits"
];

export function HabitCreator({ discResults, onComplete, onBack }: HabitCreatorProps) {
  const [step, setStep] = useState(1);
  const [habitData, setHabitData] = useState<Partial<NewHabit>>({});
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const strategy = discStrategies[discResults.dominant];

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setHabitData(prev => ({ ...prev, category: categoryId }));
    setStep(2);
  };

  const handleHabitDetails = (data: Partial<NewHabit>) => {
    setHabitData(prev => ({ ...prev, ...data }));
    setStep(3);
  };

  const handleComplete = () => {
    const completeHabit: NewHabit = {
      name: habitData.name || '',
      description: habitData.description || '',
      category: habitData.category || '',
      frequency: habitData.frequency || 'daily',
      difficulty: habitData.difficulty || 3,
      goal: habitData.goal || '',
      personalizedStrategy: strategy.approach
    };
    onComplete(completeHabit);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div 
          className="flex items-center gap-4 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Button variant="outline" onClick={onBack} className="p-2">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-3xl mb-2">Create Your Perfect Habit</h1>
            <p className="text-slate-600">
              Designed specifically for your {discResults.dominant.toUpperCase()} personality type
            </p>
          </div>
        </motion.div>

        {/* Progress Steps */}
        <motion.div 
          className="flex items-center justify-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {[1, 2, 3].map((stepNum) => (
            <div key={stepNum} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                step >= stepNum 
                  ? 'bg-purple-600 border-purple-600 text-white' 
                  : 'bg-white border-slate-300 text-slate-400'
              }`}>
                {step > stepNum ? <CheckCircle className="w-5 h-5" /> : stepNum}
              </div>
              {stepNum < 3 && (
                <div className={`w-16 h-0.5 ${
                  step > stepNum ? 'bg-purple-600' : 'bg-slate-300'
                }`} />
              )}
            </div>
          ))}
        </motion.div>

        {/* Step 1: Category Selection */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
          >
            <Card className="p-8 bg-white/80 backdrop-blur border-slate-200 shadow-xl">
              <h2 className="text-2xl text-center mb-8">Choose Your Habit Category</h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {categories.map((category) => (
                  <motion.button
                    key={category.id}
                    onClick={() => handleCategorySelect(category.id)}
                    className="p-6 text-center rounded-xl border-2 border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 transition-all duration-200 group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center mx-auto mb-4 text-2xl group-hover:shadow-lg transition-shadow`}>
                      {category.icon}
                    </div>
                    <h3 className="font-medium text-slate-800 group-hover:text-slate-900">
                      {category.name}
                    </h3>
                  </motion.button>
                ))}
              </div>
            </Card>
          </motion.div>
        )}

        {/* Step 2: Habit Details */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
          >
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Form */}
              <Card className="p-8 bg-white/80 backdrop-blur border-slate-200 shadow-xl">
                <h2 className="text-xl mb-6">Habit Details</h2>
                
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="habitName">Habit Name</Label>
                    <Input
                      id="habitName"
                      placeholder="e.g., Morning Meditation, Daily Reading"
                      className="mt-2"
                      value={habitData.name || ''}
                      onChange={(e) => setHabitData(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe what this habit involves and why it's important to you"
                      className="mt-2"
                      value={habitData.description || ''}
                      onChange={(e) => setHabitData(prev => ({ ...prev, description: e.target.value }))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="frequency">Frequency</Label>
                    <Select onValueChange={(value) => setHabitData(prev => ({ ...prev, frequency: value }))}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="How often?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="3x-week">3 times per week</SelectItem>
                        <SelectItem value="5x-week">5 times per week</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="goal">Connected Goal</Label>
                    <Input
                      id="goal"
                      placeholder="What life goal does this habit support?"
                      className="mt-2"
                      value={habitData.goal || ''}
                      onChange={(e) => setHabitData(prev => ({ ...prev, goal: e.target.value }))}
                    />
                  </div>

                  <Button 
                    onClick={() => setStep(3)}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                    disabled={!habitData.name || !habitData.frequency}
                  >
                    Continue to Personalization
                  </Button>
                </div>
              </Card>

              {/* Personalized Strategy Preview */}
              <Card className="p-8 bg-white/80 backdrop-blur border-slate-200 shadow-xl">
                <h2 className="text-xl mb-6 flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  Your Personalized Strategy
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">Approach for {discResults.dominant.toUpperCase()} Types:</h3>
                    <Badge className="bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700">
                      {strategy.approach}
                    </Badge>
                  </div>

                  <div>
                    <h3 className="font-medium mb-3">Recommended Strategies:</h3>
                    <ul className="space-y-2">
                      {strategy.tips.map((tip, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <Sparkles className="w-4 h-4 text-purple-500 flex-shrink-0" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Optimal Timing:
                    </h3>
                    <p className="text-sm text-slate-600">{strategy.timing}</p>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Motivation Style:</h3>
                    <p className="text-sm text-slate-600">{strategy.motivation}</p>
                  </div>
                </div>
              </Card>
            </div>
          </motion.div>
        )}

        {/* Step 3: Astrological Optimization */}
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
          >
            <Card className="p-8 bg-white/80 backdrop-blur border-slate-200 shadow-xl">
              <h2 className="text-2xl text-center mb-8 flex items-center justify-center gap-2">
                <Moon className="w-6 h-6" />
                Cosmic Timing Optimization
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg mb-4">Your Habit Summary</h3>
                  <div className="space-y-3 p-4 bg-slate-50 rounded-lg">
                    <div>
                      <span className="font-medium">Name:</span> {habitData.name}
                    </div>
                    <div>
                      <span className="font-medium">Category:</span> {categories.find(c => c.id === habitData.category)?.name}
                    </div>
                    <div>
                      <span className="font-medium">Frequency:</span> {habitData.frequency}
                    </div>
                    <div>
                      <span className="font-medium">Strategy:</span> {strategy.approach}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg mb-4">Astrological Guidance</h3>
                  <div className="space-y-3">
                    {astrologicalTiming.map((insight, index) => (
                      <div key={index} className="text-sm p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-100">
                        {insight}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="text-center mt-8">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    onClick={handleComplete}
                    className="px-12 py-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full shadow-xl hover:shadow-purple-500/25"
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    Create My Perfect Habit
                  </Button>
                </motion.div>
                
                <p className="text-sm text-slate-500 mt-4">
                  Your habit will be optimized for your personality and cosmic timing
                </p>
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}