import React, { useState, memo } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Activity, Droplet, Flame, TrendingUp } from 'lucide-react';
import Button from '../components/Button';

const CalculatorCard = memo(({ 
  icon: Icon, 
  title, 
  description, 
  children 
}: { 
  icon: any; 
  title: string; 
  description: string; 
  children: React.ReactNode;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ y: -5, scale: 1.02 }}
    className="bg-premium-dark border border-white/10 rounded-xl p-6 md:p-8 hover:border-gold hover:shadow-[0_0_30px_rgba(212,175,55,0.1)] transition-all duration-300"
  >
    <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/5">
      <div className="p-3 bg-gold/10 rounded-lg border border-gold/20">
        <Icon className="text-gold" size={24} />
      </div>
      <div>
        <h3 className="text-xl font-heading font-bold text-white">{title}</h3>
        <p className="text-xs text-gray-400">{description}</p>
      </div>
    </div>
    {children}
  </motion.div>
));

CalculatorCard.displayName = 'CalculatorCard';

const Tools: React.FC = () => {
  // BMI Calculator State
  const [bmiHeight, setBmiHeight] = useState<string>('');
  const [bmiWeight, setBmiWeight] = useState<string>('');
  const [bmi, setBmi] = useState<number | null>(null);
  const [bmiCategory, setBmiCategory] = useState<string>('');

  // BMR Calculator State
  const [bmrAge, setBmrAge] = useState<string>('');
  const [bmrGender, setBmrGender] = useState<'male' | 'female'>('male');
  const [bmrHeight, setBmrHeight] = useState<string>('');
  const [bmrWeight, setBmrWeight] = useState<string>('');
  const [bmrActivity, setBmrActivity] = useState<string>('1.2');
  const [bmr, setBmr] = useState<number | null>(null);
  const [bmrWithActivity, setBmrWithActivity] = useState<number | null>(null);

  // Water Intake Calculator State
  const [waterWeight, setWaterWeight] = useState<string>('');
  const [waterActivity, setWaterActivity] = useState<string>('moderate');
  const [waterIntake, setWaterIntake] = useState<number | null>(null);

  // Calories Calculator State
  const [calAge, setCalAge] = useState<string>('');
  const [calGender, setCalGender] = useState<'male' | 'female'>('male');
  const [calHeight, setCalHeight] = useState<string>('');
  const [calWeight, setCalWeight] = useState<string>('');
  const [calActivity, setCalActivity] = useState<string>('moderate');
  const [calGoal, setCalGoal] = useState<string>('maintain');
  const [calories, setCalories] = useState<number | null>(null);

  const calculateBMI = () => {
    const h = parseFloat(bmiHeight);
    const w = parseFloat(bmiWeight);

    if (h > 0 && w > 0) {
      const heightInMeters = h / 100;
      const bmiValue = w / (heightInMeters * heightInMeters);
      const roundedBmi = parseFloat(bmiValue.toFixed(1));
      setBmi(roundedBmi);

      let category = '';
      if (roundedBmi < 18.5) {
        category = 'Underweight';
      } else if (roundedBmi >= 18.5 && roundedBmi < 24.9) {
        category = 'Normal Weight';
      } else if (roundedBmi >= 25 && roundedBmi < 29.9) {
        category = 'Overweight';
      } else {
        category = 'Obese';
      }
      setBmiCategory(category);
    }
  };

  const calculateBMR = () => {
    const age = parseFloat(bmrAge);
    const h = parseFloat(bmrHeight);
    const w = parseFloat(bmrWeight);
    const activity = parseFloat(bmrActivity);

    if (age > 0 && h > 0 && w > 0) {
      // Mifflin-St Jeor Equation
      let bmrValue: number;
      if (bmrGender === 'male') {
        bmrValue = 10 * w + 6.25 * h - 5 * age + 5;
      } else {
        bmrValue = 10 * w + 6.25 * h - 5 * age - 161;
      }
      setBmr(Math.round(bmrValue));
      setBmrWithActivity(Math.round(bmrValue * activity));
    }
  };

  const calculateWaterIntake = () => {
    const w = parseFloat(waterWeight);
    if (w > 0) {
      // Base: 35ml per kg body weight
      let baseWater = w * 35;
      
      // Activity multiplier
      const activityMultipliers: { [key: string]: number } = {
        'low': 1.0,
        'moderate': 1.2,
        'high': 1.5,
        'very-high': 1.8
      };
      
      const multiplier = activityMultipliers[waterActivity] || 1.2;
      const totalWater = baseWater * multiplier;
      setWaterIntake(Math.round(totalWater));
    }
  };

  const calculateCalories = () => {
    const age = parseFloat(calAge);
    const h = parseFloat(calHeight);
    const w = parseFloat(calWeight);

    if (age > 0 && h > 0 && w > 0) {
      // Calculate BMR first
      let bmrValue: number;
      if (calGender === 'male') {
        bmrValue = 10 * w + 6.25 * h - 5 * age + 5;
      } else {
        bmrValue = 10 * w + 6.25 * h - 5 * age - 161;
      }

      // Activity multipliers
      const activityMultipliers: { [key: string]: number } = {
        'sedentary': 1.2,
        'light': 1.375,
        'moderate': 1.55,
        'active': 1.725,
        'very-active': 1.9
      };

      const multiplier = activityMultipliers[calActivity] || 1.55;
      let totalCalories = bmrValue * multiplier;

      // Goal adjustments
      const goalMultipliers: { [key: string]: number } = {
        'lose': 0.85,      // 15% deficit
        'maintain': 1.0,
        'gain': 1.15       // 15% surplus
      };

      const goalMultiplier = goalMultipliers[calGoal] || 1.0;
      totalCalories = totalCalories * goalMultiplier;

      setCalories(Math.round(totalCalories));
    }
  };

  const getBmiColor = (cat: string) => {
    switch (cat) {
      case 'Underweight': return 'text-blue-400';
      case 'Normal Weight': return 'text-green-400';
      case 'Overweight': return 'text-orange-400';
      case 'Obese': return 'text-red-500';
      default: return 'text-white';
    }
  };

  return (
    <div className="min-h-screen bg-premium-black text-white py-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-heading font-bold mb-4"
          >
            Fitness <span className="text-gold">Calculators</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Calculate your BMI, BMR, daily water intake, and calorie needs with precision
          </motion.p>
        </div>

        {/* Calculators - Stacked Vertically */}
        <div className="max-w-4xl mx-auto space-y-12">
          {/* BMI Calculator */}
          <CalculatorCard
            icon={Activity}
            title="BMI Calculator"
            description="Body Mass Index"
          >
            <div className="flex flex-col md:flex-row gap-6">
              {/* Left Side - Inputs */}
              <div className="flex-1 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={bmiHeight}
                    onChange={(e) => setBmiHeight(e.target.value)}
                    placeholder="e.g. 175"
                    className="w-full bg-black border border-white/10 p-3 rounded text-white focus:border-gold outline-none transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={bmiWeight}
                    onChange={(e) => setBmiWeight(e.target.value)}
                    placeholder="e.g. 70"
                    className="w-full bg-black border border-white/10 p-3 rounded text-white focus:border-gold outline-none transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
                <Button onClick={calculateBMI} fullWidth>
                  Calculate BMI
                </Button>
              </div>

              {/* Right Side - Results */}
              <div className="flex-1">
                {bmi ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-black/50 p-6 rounded-lg border border-gold/20 h-full flex flex-col justify-center items-center text-center min-h-[200px]"
                  >
                    <p className="text-gray-400 text-sm uppercase tracking-widest mb-2">Your BMI</p>
                    <div className="text-5xl font-heading font-bold text-white mb-3">{bmi}</div>
                    <div className={`text-lg font-bold ${getBmiColor(bmiCategory)} px-4 py-2 rounded-full bg-white/5 inline-block border border-white/10`}>
                      {bmiCategory}
                    </div>
                  </motion.div>
                ) : (
                  <div className="bg-black/30 border border-white/5 p-6 rounded-lg h-full flex flex-col justify-center items-center text-center min-h-[200px]">
                    <Activity size={40} className="text-gray-600 mb-3 opacity-30" />
                    <p className="text-gray-500 text-sm">Enter metrics to calculate</p>
                  </div>
                )}
              </div>
            </div>
          </CalculatorCard>

          {/* BMR Calculator */}
          <CalculatorCard
            icon={Flame}
            title="BMR Calculator"
            description="Basal Metabolic Rate"
          >
            <div className="flex flex-col md:flex-row gap-6">
              {/* Left Side - Inputs */}
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                      Age
                    </label>
                    <input
                      type="number"
                      step="1"
                      min="1"
                      value={bmrAge}
                      onChange={(e) => setBmrAge(e.target.value)}
                      placeholder="Years"
                      className="w-full bg-black border border-white/10 p-3 rounded text-white focus:border-gold outline-none transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                      Gender
                    </label>
                    <select
                      value={bmrGender}
                      onChange={(e) => setBmrGender(e.target.value as 'male' | 'female')}
                      className="w-full bg-black border border-white/10 p-3 rounded text-white focus:border-gold outline-none transition-colors"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                      Height (cm)
                    </label>
                    <input
                      type="number"
                      step="any"
                      value={bmrHeight}
                      onChange={(e) => setBmrHeight(e.target.value)}
                      placeholder="cm"
                      className="w-full bg-black border border-white/10 p-3 rounded text-white focus:border-gold outline-none transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                      Weight (kg)
                    </label>
                    <input
                      type="number"
                      step="any"
                      value={bmrWeight}
                      onChange={(e) => setBmrWeight(e.target.value)}
                      placeholder="kg"
                      className="w-full bg-black border border-white/10 p-3 rounded text-white focus:border-gold outline-none transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                    Activity Level
                  </label>
                  <select
                    value={bmrActivity}
                    onChange={(e) => setBmrActivity(e.target.value)}
                    className="w-full bg-black border border-white/10 p-3 rounded text-white focus:border-gold outline-none transition-colors"
                  >
                    <option value="1.2">Sedentary (little/no exercise)</option>
                    <option value="1.375">Light (1-3 days/week)</option>
                    <option value="1.55">Moderate (3-5 days/week)</option>
                    <option value="1.725">Active (6-7 days/week)</option>
                    <option value="1.9">Very Active (2x/day)</option>
                  </select>
                </div>
                <Button onClick={calculateBMR} fullWidth>
                  Calculate BMR
                </Button>
              </div>

              {/* Right Side - Results */}
              <div className="flex-1">
                {bmr ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-black/50 p-6 rounded-lg border border-gold/20 h-full flex flex-col justify-center space-y-4 min-h-[200px]"
                  >
                    <div className="text-center">
                      <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">Base BMR</p>
                      <p className="text-4xl font-heading font-bold text-white">{bmr} <span className="text-lg text-gray-400">kcal/day</span></p>
                    </div>
                    <div className="border-t border-white/10 pt-4 text-center">
                      <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">With Activity</p>
                      <p className="text-4xl font-heading font-bold text-gold">{bmrWithActivity} <span className="text-lg text-gray-400">kcal/day</span></p>
                    </div>
                  </motion.div>
                ) : (
                  <div className="bg-black/30 border border-white/5 p-6 rounded-lg h-full flex flex-col justify-center items-center text-center min-h-[200px]">
                    <Flame size={40} className="text-gray-600 mb-3 opacity-30" />
                    <p className="text-gray-500 text-sm">Enter metrics to calculate</p>
                  </div>
                )}
              </div>
            </div>
          </CalculatorCard>

          {/* Water Intake Calculator */}
          <CalculatorCard
            icon={Droplet}
            title="Water Intake Calculator"
            description="Daily Hydration Needs"
          >
            <div className="flex flex-col md:flex-row gap-6">
              {/* Left Side - Inputs */}
              <div className="flex-1 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={waterWeight}
                    onChange={(e) => setWaterWeight(e.target.value)}
                    placeholder="e.g. 70"
                    className="w-full bg-black border border-white/10 p-3 rounded text-white focus:border-gold outline-none transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                    Activity Level
                  </label>
                  <select
                    value={waterActivity}
                    onChange={(e) => setWaterActivity(e.target.value)}
                    className="w-full bg-black border border-white/10 p-3 rounded text-white focus:border-gold outline-none transition-colors"
                  >
                    <option value="low">Low (sedentary)</option>
                    <option value="moderate">Moderate (regular exercise)</option>
                    <option value="high">High (intense training)</option>
                    <option value="very-high">Very High (athlete level)</option>
                  </select>
                </div>
                <Button onClick={calculateWaterIntake} fullWidth>
                  Calculate Water Intake
                </Button>
              </div>

              {/* Right Side - Results */}
              <div className="flex-1">
                {waterIntake ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-black/50 p-6 rounded-lg border border-gold/20 h-full flex flex-col justify-center items-center text-center min-h-[200px]"
                  >
                    <p className="text-gray-400 text-sm uppercase tracking-widest mb-2">Daily Water Intake</p>
                    <div className="text-5xl font-heading font-bold text-gold mb-3">{waterIntake} <span className="text-2xl text-gray-400">ml</span></div>
                    <p className="text-gray-400 text-lg">≈ {(waterIntake / 1000).toFixed(1)} liters</p>
                  </motion.div>
                ) : (
                  <div className="bg-black/30 border border-white/5 p-6 rounded-lg h-full flex flex-col justify-center items-center text-center min-h-[200px]">
                    <Droplet size={40} className="text-gray-600 mb-3 opacity-30" />
                    <p className="text-gray-500 text-sm">Enter metrics to calculate</p>
                  </div>
                )}
              </div>
            </div>
          </CalculatorCard>

          {/* Calories Calculator */}
          <CalculatorCard
            icon={TrendingUp}
            title="Calorie Calculator"
            description="Daily Calorie Needs"
          >
            <div className="flex flex-col md:flex-row gap-6">
              {/* Left Side - Inputs */}
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                      Age
                    </label>
                    <input
                      type="number"
                      step="1"
                      min="1"
                      value={calAge}
                      onChange={(e) => setCalAge(e.target.value)}
                      placeholder="Years"
                      className="w-full bg-black border border-white/10 p-3 rounded text-white focus:border-gold outline-none transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                      Gender
                    </label>
                    <select
                      value={calGender}
                      onChange={(e) => setCalGender(e.target.value as 'male' | 'female')}
                      className="w-full bg-black border border-white/10 p-3 rounded text-white focus:border-gold outline-none transition-colors"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                      Height (cm)
                    </label>
                    <input
                      type="number"
                      step="any"
                      value={calHeight}
                      onChange={(e) => setCalHeight(e.target.value)}
                      placeholder="cm"
                      className="w-full bg-black border border-white/10 p-3 rounded text-white focus:border-gold outline-none transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                      Weight (kg)
                    </label>
                    <input
                      type="number"
                      step="any"
                      value={calWeight}
                      onChange={(e) => setCalWeight(e.target.value)}
                      placeholder="kg"
                      className="w-full bg-black border border-white/10 p-3 rounded text-white focus:border-gold outline-none transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                    Activity Level
                  </label>
                  <select
                    value={calActivity}
                    onChange={(e) => setCalActivity(e.target.value)}
                    className="w-full bg-black border border-white/10 p-3 rounded text-white focus:border-gold outline-none transition-colors"
                  >
                    <option value="sedentary">Sedentary</option>
                    <option value="light">Light Exercise</option>
                    <option value="moderate">Moderate Exercise</option>
                    <option value="active">Active</option>
                    <option value="very-active">Very Active</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                    Goal
                  </label>
                  <select
                    value={calGoal}
                    onChange={(e) => setCalGoal(e.target.value)}
                    className="w-full bg-black border border-white/10 p-3 rounded text-white focus:border-gold outline-none transition-colors"
                  >
                    <option value="lose">Lose Weight</option>
                    <option value="maintain">Maintain Weight</option>
                    <option value="gain">Gain Weight</option>
                  </select>
                </div>
                <Button onClick={calculateCalories} fullWidth>
                  Calculate Calories
                </Button>
              </div>

              {/* Right Side - Results */}
              <div className="flex-1">
                {calories ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-black/50 p-6 rounded-lg border border-gold/20 h-full flex flex-col justify-center items-center text-center min-h-[200px]"
                  >
                    <p className="text-gray-400 text-sm uppercase tracking-widest mb-2">Daily Calories</p>
                    <div className="text-5xl font-heading font-bold text-gold mb-3">{calories} <span className="text-2xl text-gray-400">kcal</span></div>
                    <p className="text-gray-400 text-sm">
                      {calGoal === 'lose' && '15% deficit for weight loss'}
                      {calGoal === 'maintain' && 'Maintenance calories'}
                      {calGoal === 'gain' && '15% surplus for weight gain'}
                    </p>
                  </motion.div>
                ) : (
                  <div className="bg-black/30 border border-white/5 p-6 rounded-lg h-full flex flex-col justify-center items-center text-center min-h-[200px]">
                    <TrendingUp size={40} className="text-gray-600 mb-3 opacity-30" />
                    <p className="text-gray-500 text-sm">Enter metrics to calculate</p>
                  </div>
                )}
              </div>
            </div>
          </CalculatorCard>
        </div>
      </div>
    </div>
  );
};

export default Tools;

