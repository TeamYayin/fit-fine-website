import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { 
  CheckCircle, 
  ChevronDown, 
  ChevronUp, 
  User, 
  ClipboardList, 
  TrendingUp, 
  AlertCircle
} from 'lucide-react';
import Button from '../components/Button';

// --- Types & Mock Data ---

interface DietPlan {
  id: string;
  name: string;
  category: 'Weight Loss' | 'Weight Gain' | 'Muscle Gain' | 'Maintenance' | 'Vegetarian';
  tier: 'Silver' | 'Gold' | 'Platinum';
  goal: string;
  description: string;
  duration: string;
  features: string[];
  recommendedFor: string[];
  sampleMenu: {
    breakfast: string;
    lunch: string;
    snack: string;
    dinner: string;
  };
}

const DIET_PLANS: DietPlan[] = [
  // Weight Loss Plans
  {
    id: 'weight-loss-silver',
    name: 'Weight Loss Diet Plan',
    category: 'Weight Loss',
    tier: 'Silver',
    goal: 'Fat Loss',
    description: 'Structured approach to sustainable weight reduction through balanced nutrition and portion control.',
    duration: '45 Days',
    features: ['Calorie Deficit Strategy', 'Portion Control Guidelines', 'Hydration Tracking', 'Weekly Progress Check-ins'],
    recommendedFor: ['Overweight', 'Obese'],
    sampleMenu: { 
      breakfast: 'Oatmeal with Berries & Greek Yogurt', 
      lunch: 'Grilled Chicken Salad with Light Dressing', 
      snack: 'Apple Slices with Almonds', 
      dinner: 'Baked Fish with Steamed Vegetables & Quinoa' 
    }
  },
  {
    id: 'weight-loss-gold',
    name: 'Weight Loss Diet Plan',
    category: 'Weight Loss',
    tier: 'Gold',
    goal: 'Fat Loss',
    description: 'Advanced weight loss protocol with personalized macro adjustments and meal timing strategies.',
    duration: '60 Days',
    features: ['Personalized Calorie Targets', 'Macro Nutrient Optimization', 'Meal Timing Strategies', 'Bi-Weekly Adjustments'],
    recommendedFor: ['Overweight', 'Obese'],
    sampleMenu: { 
      breakfast: 'Protein Smoothie with Spinach & Berries', 
      lunch: 'Lean Turkey Wrap with Vegetables', 
      snack: 'Greek Yogurt with Nuts', 
      dinner: 'Grilled Salmon with Roasted Vegetables' 
    }
  },
  {
    id: 'weight-loss-platinum',
    name: 'Weight Loss Diet Plan',
    category: 'Weight Loss',
    tier: 'Platinum',
    goal: 'Fat Loss',
    description: 'Fully customized weight loss program with daily coaching and flexible meal options.',
    duration: '90 Days',
    features: ['Custom Meal Plans', 'Daily Macro Adjustments', 'Flexible Meal Options', '1-on-1 Weekly Coaching'],
    recommendedFor: ['Overweight', 'Obese'],
    sampleMenu: { 
      breakfast: 'Custom Protein Bowl with Vegetables', 
      lunch: 'Personalized Meal Based on Preferences', 
      snack: 'Custom Snack Options', 
      dinner: 'Tailored Dinner Plan' 
    }
  },
  // Weight Gain Plans
  {
    id: 'weight-gain-gold',
    name: 'Weight Gain Diet Plan',
    category: 'Weight Gain',
    tier: 'Gold',
    goal: 'Mass Gain',
    description: 'Strategic nutrition plan to support healthy weight gain through nutrient-dense meals.',
    duration: '60 Days',
    features: ['Calorie Surplus Strategy', 'High Nutrient Density Meals', 'Meal Frequency Planning', 'Progress Tracking'],
    recommendedFor: ['Underweight'],
    sampleMenu: { 
      breakfast: 'Whole Grain Pancakes with Eggs & Avocado', 
      lunch: 'Beef Stir-fry with Brown Rice & Vegetables', 
      snack: 'Protein Shake with Banana & Peanut Butter', 
      dinner: 'Grilled Chicken with Sweet Potato & Broccoli' 
    }
  },
  {
    id: 'weight-gain-platinum',
    name: 'Weight Gain Diet Plan',
    category: 'Weight Gain',
    tier: 'Platinum',
    goal: 'Mass Gain',
    description: 'Personalized weight gain program with custom meal plans and ongoing support.',
    duration: '90 Days',
    features: ['Custom Calorie Targets', 'Personalized Meal Plans', 'Daily Adjustments', 'Weekly Coaching Sessions'],
    recommendedFor: ['Underweight'],
    sampleMenu: { 
      breakfast: 'Custom High-Calorie Breakfast Bowl', 
      lunch: 'Personalized Nutrient-Dense Lunch', 
      snack: 'Custom High-Protein Snack', 
      dinner: 'Tailored Dinner for Weight Gain' 
    }
  },
  // Muscle Gain Plans
  {
    id: 'muscle-gain-gold',
    name: 'Muscle Gain Diet Plan',
    category: 'Muscle Gain',
    tier: 'Gold',
    goal: 'Muscle Building',
    description: 'High-protein nutrition plan designed to support muscle growth and recovery.',
    duration: '60 Days',
    features: ['High Protein Focus', 'Pre/Post-Workout Nutrition', 'Recovery Meal Planning', 'Macro Tracking'],
    recommendedFor: ['Normal', 'Underweight'],
    sampleMenu: { 
      breakfast: '6 Egg Whites + 2 Whole Eggs with Wholegrain Toast', 
      lunch: 'Lean Beef Stir-fry with Brown Rice', 
      snack: 'Whey Protein Shake with Banana', 
      dinner: 'Grilled Chicken Breast with Sweet Potato & Broccoli' 
    }
  },
  {
    id: 'muscle-gain-platinum',
    name: 'Muscle Gain Diet Plan',
    category: 'Muscle Gain',
    tier: 'Platinum',
    goal: 'Muscle Building',
    description: 'Fully customized muscle building program with personalized nutrition and training support.',
    duration: '90 Days',
    features: ['Custom Protein Targets', 'Personalized Meal Timing', 'Daily Macro Adjustments', '1-on-1 Coaching'],
    recommendedFor: ['Normal', 'Underweight'],
    sampleMenu: { 
      breakfast: 'Custom High-Protein Breakfast', 
      lunch: 'Personalized Muscle-Building Lunch', 
      snack: 'Custom Post-Workout Shake', 
      dinner: 'Tailored Recovery Dinner' 
    }
  },
  // Maintenance Plans
  {
    id: 'maintenance-silver',
    name: 'Maintenance / Balanced Diet Plan',
    category: 'Maintenance',
    tier: 'Silver',
    goal: 'Wellness & Balance',
    description: 'Balanced nutrition plan to maintain current weight and support overall wellness.',
    duration: '45 Days',
    features: ['Balanced Macro Split', 'Hydration Tracking', 'Weekly Cheat Meal Guide', 'Basic Meal Templates'],
    recommendedFor: ['Normal'],
    sampleMenu: { 
      breakfast: 'Oatmeal with Blueberries & Honey', 
      lunch: 'Grilled Chicken Caesar Salad (Light Dressing)', 
      snack: 'Handful of Almonds & Green Apple', 
      dinner: 'Steamed White Fish with Quinoa & Asparagus' 
    }
  },
  {
    id: 'maintenance-gold',
    name: 'Maintenance / Balanced Diet Plan',
    category: 'Maintenance',
    tier: 'Gold',
    goal: 'Wellness & Balance',
    description: 'Advanced maintenance plan with personalized nutrition guidance for optimal health.',
    duration: '60 Days',
    features: ['Personalized Macro Balance', 'Advanced Meal Templates', 'Bi-Weekly Check-ins', 'Flexible Meal Options'],
    recommendedFor: ['Normal'],
    sampleMenu: { 
      breakfast: 'Greek Yogurt Parfait with Granola & Berries', 
      lunch: 'Mediterranean Quinoa Bowl with Grilled Chicken', 
      snack: 'Mixed Nuts & Dried Fruits', 
      dinner: 'Baked Salmon with Roasted Vegetables & Rice' 
    }
  },
  {
    id: 'maintenance-platinum',
    name: 'Maintenance / Balanced Diet Plan',
    category: 'Maintenance',
    tier: 'Platinum',
    goal: 'Wellness & Balance',
    description: 'Fully customized maintenance program tailored to your lifestyle and preferences.',
    duration: '90 Days',
    features: ['Custom Meal Plans', 'Daily Adjustments', 'Lifestyle Integration', 'Weekly Coaching'],
    recommendedFor: ['Normal'],
    sampleMenu: { 
      breakfast: 'Custom Balanced Breakfast', 
      lunch: 'Personalized Healthy Lunch', 
      snack: 'Custom Snack Options', 
      dinner: 'Tailored Balanced Dinner' 
    }
  },
  // Vegetarian Plan (Demo)
  {
    id: 'vegetarian-platinum',
    name: 'Vegetarian / Lifestyle Plan',
    category: 'Vegetarian',
    tier: 'Platinum',
    goal: 'Plant-Based Wellness',
    description: 'Custom vegetarian nutrition plan designed to meet all nutritional needs through plant-based foods.',
    duration: '90 Days',
    features: ['Plant-Based Meal Plans', 'Protein Optimization', 'Nutrient Balance', 'Custom Recipe Options'],
    recommendedFor: ['Normal'],
    sampleMenu: { 
      breakfast: 'Tofu Scramble with Vegetables & Whole Grain Toast', 
      lunch: 'Lentil & Vegetable Buddha Bowl', 
      snack: 'Hummus with Vegetable Sticks', 
      dinner: 'Quinoa Stuffed Bell Peppers with Side Salad' 
    }
  }
];

interface AssignFormInputs {
  customerName: string;
  customerEmail: string;
  planId: string;
  notes: string;
}

const DietPlans: React.FC = () => {
  // UI State
  const [expandedPlan, setExpandedPlan] = useState<string | null>(null);
  const [assignSuccess, setAssignSuccess] = useState(false);
  const [recommendedPlanId, setRecommendedPlanId] = useState<string | null>(null);

  // Form
  const { register, handleSubmit, setValue, reset, formState: { errors, isSubmitting } } = useForm<AssignFormInputs>();

  useEffect(() => {
    window.scrollTo(0, 0);
    // Demo: Set a recommended plan based on BMI category (prototype logic)
    // In real system, this would come from BMI calculation
    setRecommendedPlanId('weight-loss-gold'); // Demo default
  }, []);

  const onAssignSubmit = async (data: AssignFormInputs) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log("Assigned Plan Data:", data);
    setAssignSuccess(true);
    reset();
    setTimeout(() => setAssignSuccess(false), 5000);
  };


  return (
    <div className="min-h-screen bg-black text-white relative pb-16">
       {/* Background Decoration */}
       <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gold/5 blur-[120px] rounded-full pointer-events-none" />
       <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-purple-900/10 blur-[120px] rounded-full pointer-events-none" />

      {/* 1. Header / Intro */}
      <section className="pt-24 pb-12 px-4 container mx-auto text-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4">
            Diet Plans & <span className="text-gold">Recommendations</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Expert diet protocols personalized for your goals. Assign, track, and manage customer diet journeys with precision.
          </p>
          <div className="mt-6 inline-block px-4 py-1 bg-white/5 border border-gold/30 rounded-full text-gold text-xs font-bold uppercase tracking-widest">
            Prototype / Demo Mode
          </div>
        </motion.div>
      </section>

      {/* 2. Available Diet Plans Grid */}
      <section className="py-16 px-4 container mx-auto">
         <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold">Expert Diet Protocols</h2>
            <div className="w-20 h-1 bg-gold mx-auto mt-4" />
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {DIET_PLANS.map((plan) => {
              const isRecommended = recommendedPlanId === plan.id;
              return (
                <motion.div 
                  key={plan.id}
                  id={`plan-${plan.id}`}
                  whileHover={{ y: -5 }}
                  className={`bg-premium-dark border ${isRecommended ? 'border-gold shadow-[0_0_20px_rgba(212,175,55,0.1)]' : 'border-white/10'} rounded-xl overflow-hidden flex flex-col hover:border-gold transition-colors`}
                >
                  <div className="p-6 border-b border-white/5 bg-black/20">
                    <div className="flex justify-between items-start mb-4">
                       <h3 className="text-xl font-heading font-bold text-white">{plan.name}</h3>
                       {isRecommended && <CheckCircle size={20} className="text-gold" />}
                    </div>
                    <div className="text-xs text-gold uppercase tracking-widest mb-2 font-semibold">Sample / Demo Plan</div>
                    <div className="text-sm text-gray-400 mb-1"><strong className="text-gold">Goal:</strong> {plan.goal}</div>
                    <div className="text-sm text-gray-400 mb-2"><strong className="text-gold">Duration:</strong> {plan.duration}</div>
                    <div className="text-xs text-gray-500 italic">{plan.description}</div>
                  </div>
                  
                  <div className="p-6 flex-1">
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-gray-300">
                          <div className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* Expandable Menu */}
                    <button 
                      onClick={() => setExpandedPlan(expandedPlan === plan.id ? null : plan.id)}
                      className="w-full flex items-center justify-between p-3 bg-white/5 rounded hover:bg-white/10 transition-colors text-sm text-gray-300 mb-6"
                    >
                      <span>Sample Menu</span>
                      {expandedPlan === plan.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                    
                    <AnimatePresence>
                      {expandedPlan === plan.id && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden mb-6"
                        >
                          <div className="space-y-2 text-xs text-gray-400 pl-2 border-l-2 border-gold/30">
                            <p><strong className="text-gray-200">B:</strong> {plan.sampleMenu.breakfast}</p>
                            <p><strong className="text-gray-200">L:</strong> {plan.sampleMenu.lunch}</p>
                            <p><strong className="text-gray-200">S:</strong> {plan.sampleMenu.snack}</p>
                            <p><strong className="text-gray-200">D:</strong> {plan.sampleMenu.dinner}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <Button 
                      onClick={() => {
                        setValue('planId', plan.id);
                        document.getElementById('assign-section')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      fullWidth 
                      variant="primary"
                    >
                      Select Plan
                    </Button>
                  </div>
                </motion.div>
              );
            })}
         </div>
      </section>

      {/* 3. Assign Plan - DPM Demo */}
      <section id="assign-section" className="py-16 px-4 bg-premium-dark/50 border-t border-white/5">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center gap-3 mb-8">
            <ClipboardList className="text-gold" size={28} />
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-white">Diet Plan Manager (DPM)</h2>
          </div>

          <div className="bg-black border border-white/10 rounded-xl p-8 shadow-2xl relative overflow-hidden">
             {assignSuccess && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-black/90 z-20 flex flex-col items-center justify-center text-center p-6"
                >
                  <CheckCircle size={64} className="text-gold mb-4" />
                  <h3 className="text-2xl font-heading font-bold text-white mb-2">Plan Assigned Successfully</h3>
                  <p className="text-gray-400 mb-6">The verified diet protocol has been linked to the customer profile.</p>
                  <div className="text-xs uppercase tracking-widest text-gold border border-gold px-3 py-1 rounded">Demo Status: Completed</div>
                  <button onClick={() => setAssignSuccess(false)} className="mt-8 text-sm text-gray-500 hover:text-white underline">Assign Another</button>
                </motion.div>
             )}

             <form onSubmit={handleSubmit(onAssignSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                <div className="col-span-1 md:col-span-2 mb-2">
                   <p className="text-gray-400 text-sm">Assign a diet plan to a registered customer. This action will trigger the nutrition delivery workflow.</p>
                </div>

                <div>
                   <label className="block text-xs font-bold text-gold uppercase tracking-widest mb-2">Customer Name</label>
                   <div className="relative">
                      <User size={16} className="absolute left-3 top-3.5 text-gray-500" />
                      <input 
                        {...register('customerName', { required: true })}
                        className="w-full bg-premium-dark border border-white/10 pl-10 pr-4 py-3 rounded text-white focus:border-gold outline-none text-sm"
                        placeholder="John Smith"
                      />
                   </div>
                   {errors.customerName && <span className="text-red-500 text-xs">Required</span>}
                </div>

                <div>
                   <label className="block text-xs font-bold text-gold uppercase tracking-widest mb-2">Contact Email</label>
                   <input 
                     {...register('customerEmail', { required: true })}
                     className="w-full bg-premium-dark border border-white/10 px-4 py-3 rounded text-white focus:border-gold outline-none text-sm"
                     placeholder="john@example.com"
                   />
                   {errors.customerEmail && <span className="text-red-500 text-xs">Required</span>}
                </div>

                <div>
                   <label className="block text-xs font-bold text-gold uppercase tracking-widest mb-2">Select Plan Protocol</label>
                   <select 
                      {...register('planId', { required: true })}
                      className="w-full bg-premium-dark border border-white/10 px-4 py-3 rounded text-white focus:border-gold outline-none text-sm appearance-none cursor-pointer"
                   >
                     <option value="">Choose a diet plan...</option>
                     <optgroup label="Weight Loss Plans">
                       {DIET_PLANS.filter(p => p.category === 'Weight Loss').map(p => (
                         <option key={p.id} value={p.id}>{p.name} - {p.tier} ({p.goal})</option>
                       ))}
                     </optgroup>
                     <optgroup label="Weight Gain Plans">
                       {DIET_PLANS.filter(p => p.category === 'Weight Gain').map(p => (
                         <option key={p.id} value={p.id}>{p.name} - {p.tier} ({p.goal})</option>
                       ))}
                     </optgroup>
                     <optgroup label="Muscle Gain Plans">
                       {DIET_PLANS.filter(p => p.category === 'Muscle Gain').map(p => (
                         <option key={p.id} value={p.id}>{p.name} - {p.tier} ({p.goal})</option>
                       ))}
                     </optgroup>
                     <optgroup label="Maintenance Plans">
                       {DIET_PLANS.filter(p => p.category === 'Maintenance').map(p => (
                         <option key={p.id} value={p.id}>{p.name} - {p.tier} ({p.goal})</option>
                       ))}
                     </optgroup>
                     <optgroup label="Lifestyle Plans">
                       {DIET_PLANS.filter(p => p.category === 'Vegetarian').map(p => (
                         <option key={p.id} value={p.id}>{p.name} - {p.tier} ({p.goal})</option>
                       ))}
                     </optgroup>
                   </select>
                   {errors.planId && <span className="text-red-500 text-xs">Required</span>}
                </div>

                <div>
                   <label className="block text-xs font-bold text-gold uppercase tracking-widest mb-2">Manager Notes</label>
                   <input 
                     {...register('notes')}
                     className="w-full bg-premium-dark border border-white/10 px-4 py-3 rounded text-white focus:border-gold outline-none text-sm"
                     placeholder="Allergies, preferences, etc."
                   />
                </div>

                <div className="col-span-1 md:col-span-2 pt-4">
                  <Button type="submit" size="lg" disabled={isSubmitting} fullWidth>
                    {isSubmitting ? 'Verifying Protocol...' : 'Assign Plan (Demo)'}
                  </Button>
                </div>
             </form>
          </div>
        </div>
      </section>

      {/* 4. Mock Progress Tracking */}
      <section className="py-16 px-4 container mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="text-gray-400" size={24} />
            <h3 className="text-xl font-heading font-bold text-gray-300">Customer Progress Snapshot</h3>
          </div>
          
          <div className="bg-white/5 border border-white/5 rounded-xl p-6 relative overflow-hidden">
             {/* Watermark */}
             <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -rotate-12 text-6xl font-black text-white/5 whitespace-nowrap pointer-events-none">
                SAMPLE DATA
             </div>
             <div className="absolute top-2 right-2 z-20">
               <span className="text-xs text-gray-500 uppercase tracking-widest bg-black/50 px-2 py-1 rounded border border-white/10">Sample Data</span>
             </div>

             <div className="flex justify-between items-end mb-2 relative z-10">
                <div>
                   <div className="text-2xl font-bold text-white">Week 3 <span className="text-gray-500 text-lg font-normal">of 6</span></div>
                   <div className="text-gold text-sm font-medium">Gold Gains Protocol</div>
                </div>
                <div className="text-3xl font-bold text-white">42%</div>
             </div>
             <div className="w-full bg-black h-3 rounded-full overflow-hidden border border-white/10 relative z-10">
                <motion.div 
                   initial={{ width: 0 }}
                   whileInView={{ width: '42%' }}
                   transition={{ duration: 1.5, ease: "easeOut" }}
                   className="h-full bg-gold"
                />
             </div>
             <div className="mt-4 flex gap-4 text-xs text-gray-500 relative z-10">
                <span className="flex items-center gap-1"><CheckCircle size={12} className="text-green-500"/> Adherence: 95%</span>
                <span className="flex items-center gap-1"><TrendingUp size={12} className="text-blue-500"/> Workouts: 12/18</span>
             </div>
          </div>
        </div>
      </section>

      {/* 5. Disclaimer */}
      <footer className="py-12 text-center px-4 border-t border-white/5">
         <div className="inline-flex items-center gap-2 text-gray-500 text-sm bg-black px-4 py-2 rounded-full border border-white/10 max-w-4xl">
            <AlertCircle size={16} />
            <span><strong>Prototype Disclaimer:</strong> This is a prototype demonstration. Diet plans shown are templates and not medical prescriptions. No medical advice provided.</span>
         </div>
      </footer>
    </div>
  );
};

export default DietPlans;