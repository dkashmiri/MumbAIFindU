import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { motion } from "motion/react";
import { Progress } from "./ui/progress";
import { CheckCircle, Circle } from "lucide-react";

interface DISCAssessmentProps {
  onComplete: (results: DISCResults) => void;
}

export interface DISCResults {
  red: number;
  yellow: number;
  green: number;
  blue: number;
  dominant: 'red' | 'yellow' | 'green' | 'blue';
}

const questions = [
  {
    id: 1,
    question: "When starting a new project, I prefer to:",
    options: [
      { text: "Take charge and drive results immediately", color: "red", weight: 4 },
      { text: "Gather the team and brainstorm exciting possibilities", color: "yellow", weight: 4 },
      { text: "Plan carefully and ensure everyone is comfortable", color: "green", weight: 4 },
      { text: "Research thoroughly and create detailed specifications", color: "blue", weight: 4 }
    ]
  },
  {
    id: 2,
    question: "In social situations, I tend to:",
    options: [
      { text: "Lead conversations and make decisions quickly", color: "red", weight: 3 },
      { text: "Connect with many people and share stories", color: "yellow", weight: 4 },
      { text: "Listen carefully and support others", color: "green", weight: 4 },
      { text: "Observe first, then contribute thoughtfully", color: "blue", weight: 3 }
    ]
  },
  {
    id: 3,
    question: "When facing challenges, I:",
    options: [
      { text: "Attack problems head-on with determination", color: "red", weight: 4 },
      { text: "Stay optimistic and inspire others to help", color: "yellow", weight: 3 },
      { text: "Seek consensus and maintain harmony", color: "green", weight: 3 },
      { text: "Analyze carefully and find the perfect solution", color: "blue", weight: 4 }
    ]
  },
  {
    id: 4,
    question: "My ideal work environment is:",
    options: [
      { text: "Fast-paced with clear goals and autonomy", color: "red", weight: 4 },
      { text: "Collaborative, creative, and full of variety", color: "yellow", weight: 4 },
      { text: "Stable, supportive, and team-oriented", color: "green", weight: 4 },
      { text: "Organized, detailed, and quality-focused", color: "blue", weight: 4 }
    ]
  },
  {
    id: 5,
    question: "When making decisions, I prioritize:",
    options: [
      { text: "Speed and efficiency above all", color: "red", weight: 4 },
      { text: "Input from others and creative solutions", color: "yellow", weight: 3 },
      { text: "Everyone's feelings and long-term relationships", color: "green", weight: 4 },
      { text: "Accuracy, data, and thorough analysis", color: "blue", weight: 4 }
    ]
  }
];

const colorInfo = {
  red: {
    name: "Dominance",
    description: "Direct, decisive, competitive, results-oriented",
    gradient: "from-red-400 to-orange-400",
    habits: "Challenge-based tracking with competitive elements"
  },
  yellow: {
    name: "Influence", 
    description: "Outgoing, enthusiastic, optimistic, people-focused",
    gradient: "from-yellow-400 to-orange-400",
    habits: "Social sharing and gamified progress celebrations"
  },
  green: {
    name: "Steadiness",
    description: "Patient, reliable, supportive, team-oriented",
    gradient: "from-green-400 to-teal-400", 
    habits: "Gentle routines with consistent, supportive reminders"
  },
  blue: {
    name: "Compliance",
    description: "Analytical, detail-oriented, systematic, quality-focused",
    gradient: "from-blue-400 to-purple-400",
    habits: "Data-driven tracking with detailed analytics and insights"
  }
};

export function DISCAssessment({ onComplete }: DISCAssessmentProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [scores, setScores] = useState({ red: 0, yellow: 0, green: 0, blue: 0 });

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (optionIndex: number) => {
    const question = questions[currentQuestion];
    const option = question.options[optionIndex];
    
    // Update scores
    const newScores = { ...scores };
    newScores[option.color as keyof typeof scores] += option.weight;
    setScores(newScores);
    
    // Record answer
    const newAnswers = { ...answers };
    newAnswers[question.id] = optionIndex;
    setAnswers(newAnswers);
    
    // Move to next question or complete
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate results
      const total = Object.values(newScores).reduce((sum, score) => sum + score, 0);
      const percentages = {
        red: Math.round((newScores.red / total) * 100),
        yellow: Math.round((newScores.yellow / total) * 100),
        green: Math.round((newScores.green / total) * 100),
        blue: Math.round((newScores.blue / total) * 100)
      };
      
      const dominant = Object.entries(percentages).reduce((a, b) => 
        percentages[a[0] as keyof typeof percentages] > percentages[b[0] as keyof typeof percentages] ? a : b
      )[0] as 'red' | 'yellow' | 'green' | 'blue';
      
      onComplete({
        ...percentages,
        dominant
      });
    }
  };

  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-3xl mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Discover Your Personality Blueprint
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Understanding your DISC personality type helps us create the perfect habit formation strategy for your unique mind.
          </p>
        </motion.div>

        {/* Progress */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-slate-600">Question {currentQuestion + 1} of {questions.length}</span>
            <span className="text-sm text-slate-600">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </motion.div>

        {/* Question Card */}
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-8 bg-white/80 backdrop-blur border-slate-200 shadow-xl">
            <h3 className="text-xl mb-8 text-center text-slate-800">
              {question.question}
            </h3>
            
            <div className="space-y-4">
              {question.options.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className="w-full p-6 text-left rounded-xl border-2 border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 transition-all duration-200 group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700 group-hover:text-slate-900 transition-colors">
                      {option.text}
                    </span>
                    <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${colorInfo[option.color as keyof typeof colorInfo].gradient} opacity-60 group-hover:opacity-100 transition-opacity`} />
                  </div>
                </motion.button>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Color Preview */}
        <motion.div 
          className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {Object.entries(colorInfo).map(([color, info]) => (
            <Card key={color} className="p-4 text-center bg-white/60 backdrop-blur border-slate-200">
              <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${info.gradient} mx-auto mb-2`} />
              <h4 className="text-sm text-slate-800">{info.name}</h4>
              <p className="text-xs text-slate-600 mt-1">{info.description}</p>
            </Card>
          ))}
        </motion.div>
      </div>
    </div>
  );
}