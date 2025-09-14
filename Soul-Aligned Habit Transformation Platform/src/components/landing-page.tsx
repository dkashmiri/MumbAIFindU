import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { motion } from "motion/react";
import { Sparkles, Target, Brain, Moon } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 relative overflow-hidden">
      {/* Cosmic Background */}
      <div className="absolute inset-0 opacity-20">
        <ImageWithFallback 
          src="https://images.unsplash.com/photo-1692537805923-bee786710b7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3NtaWMlMjBzdGFycyUyMGdhbGF4eSUyMG1pbmltYWx8ZW58MXx8fHwxNzU3ODQ2NDk1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Cosmic background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Floating Elements */}
      <motion.div 
        className="absolute top-20 left-10 w-2 h-2 bg-purple-400 rounded-full"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute top-40 right-20 w-1 h-1 bg-blue-400 rounded-full"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div 
        className="absolute bottom-40 left-20 w-1.5 h-1.5 bg-yellow-400 rounded-full"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <div className="relative z-10 container mx-auto px-6 py-16">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 mb-6"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles className="w-8 h-8 text-purple-500" />
            <h1 className="text-5xl font-light bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              SoulSync
            </h1>
            <Sparkles className="w-8 h-8 text-blue-500" />
          </motion.div>
          
          <p className="text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Where personality psychology meets cosmic wisdom. 
            <br />
            <span className="text-purple-600">Transform your habits through ancient knowledge and AI precision.</span>
          </p>
        </motion.div>

        {/* Feature Cards */}
        <motion.div 
          className="grid md:grid-cols-3 gap-8 mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Card className="p-8 bg-white/80 backdrop-blur border-purple-100 hover:shadow-xl transition-all duration-300 group">
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg transition-shadow">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl mb-4 text-slate-800">DISC Personality Intelligence</h3>
              <p className="text-slate-600 leading-relaxed">
                Discover your unique personality blueprint and receive personalized habit strategies tailored to how your mind naturally works.
              </p>
            </motion.div>
          </Card>

          <Card className="p-8 bg-white/80 backdrop-blur border-blue-100 hover:shadow-xl transition-all duration-300 group">
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg transition-shadow">
                <Moon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl mb-4 text-slate-800">Vedic Astrology Timing</h3>
              <p className="text-slate-600 leading-relaxed">
                Harness the power of cosmic timing. Know exactly when to start new habits for maximum success based on your birth chart.
              </p>
            </motion.div>
          </Card>

          <Card className="p-8 bg-white/80 backdrop-blur border-green-100 hover:shadow-xl transition-all duration-300 group">
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-teal-400 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg transition-shadow">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl mb-4 text-slate-800">AI-Powered Transformation</h3>
              <p className="text-slate-600 leading-relaxed">
                Advanced AI learns your patterns and provides personalized coaching to ensure your daily habits align with your deepest goals.
              </p>
            </motion.div>
          </Card>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            Join thousands discovering their optimal path to personal transformation through the perfect blend of science and spirituality.
          </p>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              onClick={onGetStarted}
              className="px-12 py-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300"
            >
              Begin Your Transformation
            </Button>
          </motion.div>
          
          <p className="text-sm text-slate-500 mt-4">
            ✨ Free personality assessment • 🌙 Personalized astrological insights • 🎯 AI-powered habit coaching
          </p>
        </motion.div>
      </div>
    </div>
  );
}