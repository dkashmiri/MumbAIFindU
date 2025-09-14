import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { motion } from "motion/react";
import { Calendar, Clock, MapPin, Sparkles, Moon, Sun } from "lucide-react";

interface KundliInputProps {
  onComplete: (kundliData: KundliData) => void;
}

export interface KundliData {
  birthDate: string;
  birthTime: string;
  birthPlace: string;
  latitude: number;
  longitude: number;
}

export function KundliInput({ onComplete }: KundliInputProps) {
  const [formData, setFormData] = useState({
    birthDate: '',
    birthTime: '',
    birthPlace: '',
    latitude: 0,
    longitude: 0
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate processing time for astrological calculations
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    onComplete(formData);
    setIsSubmitting(false);
  };

  const handleLocationSearch = async (place: string) => {
    // Mock geocoding - in real app would use Google Maps API
    const mockCoordinates = {
      'Mumbai': { lat: 19.0760, lng: 72.8777 },
      'Delhi': { lat: 28.7041, lng: 77.1025 },
      'Bangalore': { lat: 12.9716, lng: 77.5946 },
      'Chennai': { lat: 13.0827, lng: 80.2707 },
      'Kolkata': { lat: 22.5726, lng: 88.3639 },
      'Hyderabad': { lat: 17.3850, lng: 78.4867 },
      'Pune': { lat: 18.5204, lng: 73.8567 },
      'Ahmedabad': { lat: 23.0225, lng: 72.5714 },
      'Jaipur': { lat: 26.9124, lng: 75.7873 },
      'Lucknow': { lat: 26.8467, lng: 80.9462 }
    };

    const coords = mockCoordinates[place as keyof typeof mockCoordinates] || { lat: 28.7041, lng: 77.1025 };
    
    setFormData(prev => ({
      ...prev,
      birthPlace: place,
      latitude: coords.lat,
      longitude: coords.lng
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 mb-4"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          >
            <Moon className="w-8 h-8 text-purple-500" />
            <Sun className="w-8 h-8 text-yellow-500" />
          </motion.div>
          <h2 className="text-3xl mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Your Cosmic Blueprint
          </h2>
          <p className="text-slate-600 max-w-xl mx-auto">
            Enter your birth details to unlock personalized astrological insights and optimal timing for your habits.
          </p>
        </motion.div>

        {/* Cosmic Info Cards */}
        <motion.div 
          className="grid md:grid-cols-3 gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-4 text-center bg-gradient-to-br from-purple-50 to-white border-purple-200">
            <Calendar className="w-6 h-6 text-purple-500 mx-auto mb-2" />
            <p className="text-sm text-slate-600">Birth Date reveals your core planetary positions</p>
          </Card>
          <Card className="p-4 text-center bg-gradient-to-br from-blue-50 to-white border-blue-200">
            <Clock className="w-6 h-6 text-blue-500 mx-auto mb-2" />
            <p className="text-sm text-slate-600">Exact time determines your ascendant and houses</p>
          </Card>
          <Card className="p-4 text-center bg-gradient-to-br from-indigo-50 to-white border-indigo-200">
            <MapPin className="w-6 h-6 text-indigo-500 mx-auto mb-2" />
            <p className="text-sm text-slate-600">Location calculates precise celestial alignments</p>
          </Card>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-8 bg-white/80 backdrop-blur border-slate-200 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Birth Date */}
              <div className="space-y-2">
                <Label htmlFor="birthDate" className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-purple-500" />
                  Birth Date
                </Label>
                <Input
                  id="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, birthDate: e.target.value }))}
                  required
                  className="bg-white border-slate-300 focus:border-purple-400 focus:ring-purple-400"
                />
              </div>

              {/* Birth Time */}
              <div className="space-y-2">
                <Label htmlFor="birthTime" className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-500" />
                  Birth Time
                  <span className="text-xs text-slate-500">(as accurate as possible)</span>
                </Label>
                <Input
                  id="birthTime"
                  type="time"
                  value={formData.birthTime}
                  onChange={(e) => setFormData(prev => ({ ...prev, birthTime: e.target.value }))}
                  required
                  className="bg-white border-slate-300 focus:border-blue-400 focus:ring-blue-400"
                />
              </div>

              {/* Birth Place */}
              <div className="space-y-2">
                <Label htmlFor="birthPlace" className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-indigo-500" />
                  Birth Place
                </Label>
                <Input
                  id="birthPlace"
                  type="text"
                  placeholder="e.g., Mumbai, Delhi, Bangalore"
                  value={formData.birthPlace}
                  onChange={(e) => {
                    const place = e.target.value;
                    setFormData(prev => ({ ...prev, birthPlace: place }));
                    if (place.length > 2) {
                      handleLocationSearch(place);
                    }
                  }}
                  required
                  className="bg-white border-slate-300 focus:border-indigo-400 focus:ring-indigo-400"
                />
                <p className="text-xs text-slate-500">
                  City and country where you were born
                </p>
              </div>

              {/* Submit Button */}
              <motion.div 
                className="pt-4"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <motion.div
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      Calculating Your Cosmic Blueprint...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5" />
                      Generate My Astrological Profile
                    </div>
                  )}
                </Button>
              </motion.div>
            </form>
          </Card>
        </motion.div>

        {/* Privacy Note */}
        <motion.div 
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-sm text-slate-500">
            🔒 Your birth details are used only for astrological calculations and are never shared or sold.
            <br />
            ✨ Based on 5,000+ years of Vedic astrological wisdom
          </p>
        </motion.div>
      </div>
    </div>
  );
}