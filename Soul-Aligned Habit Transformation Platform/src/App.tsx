import { useState } from "react";
import { LandingPage } from "./components/landing-page";
import { DISCAssessment, DISCResults } from "./components/disc-assessment";
import { KundliInput, KundliData } from "./components/kundli-input";
import { Dashboard } from "./components/dashboard";
import { HabitCreator, NewHabit } from "./components/habit-creator";
import { motion, AnimatePresence } from "motion/react";

type AppState = 'landing' | 'disc' | 'kundli' | 'dashboard' | 'habit-creator';

export default function App() {
  const [currentState, setCurrentState] = useState<AppState>('landing');
  const [discResults, setDiscResults] = useState<DISCResults | null>(null);
  const [kundliData, setKundliData] = useState<KundliData | null>(null);

  const handleDISCComplete = (results: DISCResults) => {
    setDiscResults(results);
    setCurrentState('kundli');
  };

  const handleKundliComplete = (data: KundliData) => {
    setKundliData(data);
    setCurrentState('dashboard');
  };

  const handleHabitComplete = (habit: NewHabit) => {
    // In a real app, this would save the habit to the database
    console.log('New habit created:', habit);
    setCurrentState('dashboard');
  };

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {currentState === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LandingPage onGetStarted={() => setCurrentState('disc')} />
          </motion.div>
        )}

        {currentState === 'disc' && (
          <motion.div
            key="disc"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <DISCAssessment onComplete={handleDISCComplete} />
          </motion.div>
        )}

        {currentState === 'kundli' && (
          <motion.div
            key="kundli"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <KundliInput onComplete={handleKundliComplete} />
          </motion.div>
        )}

        {currentState === 'dashboard' && discResults && kundliData && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5 }}
          >
            <Dashboard 
              discResults={discResults}
              kundliData={kundliData}
              onCreateHabit={() => setCurrentState('habit-creator')}
            />
          </motion.div>
        )}

        {currentState === 'habit-creator' && discResults && (
          <motion.div
            key="habit-creator"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
          >
            <HabitCreator 
              discResults={discResults}
              onComplete={handleHabitComplete}
              onBack={() => setCurrentState('dashboard')}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}