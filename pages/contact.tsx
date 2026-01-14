import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { CheckCircle, Phone, HelpCircle } from 'lucide-react';
import Button from '../components/Button';
import Modal from '../components/Modal';

interface ContactFormInputs {
  plan: 'Silver' | 'Gold' | 'Platinum';
  fullName: string;
  email: string;
  phone: string;
  callbackDate: string;
  callbackTime: string;
  message: string;
}

const ContactPage: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<'Silver' | 'Gold' | 'Platinum' | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const { register, handleSubmit, setValue, reset, formState: { errors, isSubmitting } } = useForm<ContactFormInputs>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handlePlanSelect = (plan: 'Silver' | 'Gold' | 'Platinum') => {
    setSelectedPlan(plan);
    setValue('plan', plan);
  };

  const onSubmit = async (data: ContactFormInputs) => {
    if (!selectedPlan) {
      alert("Please select a plan first!");
      return;
    }
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log(data);
    setIsSuccess(true);
    reset();
    setSelectedPlan(null);
  };

  return (
    <div className="min-h-screen bg-premium-dark py-12 md:py-24 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gold/5 blur-[120px] rounded-full" />
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-purple-900/10 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto relative z-10 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center lg:items-start">
            
            {/* LEFT HALF: Call / Support Section */}
            <div className="w-full lg:w-1/2 pt-0 lg:pt-10 space-y-12">
                <div className="text-left">
                    <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6 leading-tight">
                        Begin Your <br />
                        <span className="text-gold">Legacy</span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-lg leading-relaxed">
                        Apply for a consultation with our elite coaching staff. Spots are limited and highly sought after.
                    </p>
                </div>

                <div className="space-y-10">
                    <div className="flex gap-6 items-start group">
                        <div className="bg-black border border-gold/20 p-4 rounded-full text-gold group-hover:bg-gold group-hover:text-black transition-colors shadow-lg shrink-0">
                            <Phone size={28} />
                        </div>
                        <div>
                            <h3 className="text-white font-bold text-xl mb-2 font-heading">Talk to Us</h3>
                            <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                                Once you call us, we will help you understand the plans. We believe in complete transparency before you commit.
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-6 items-start group">
                        <div className="bg-black border border-gold/20 p-4 rounded-full text-gold group-hover:bg-gold group-hover:text-black transition-colors shadow-lg shrink-0">
                            <HelpCircle size={28} />
                        </div>
                        <div>
                            <h3 className="text-white font-bold text-xl mb-2 font-heading">We Clarify Your Doubts</h3>
                            <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                                No question is too small. We assess your goals and clear up any confusion about our methods.
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-6 items-start group">
                        <div className="bg-black border border-gold/20 p-4 rounded-full text-gold group-hover:bg-gold group-hover:text-black transition-colors shadow-lg shrink-0">
                            <CheckCircle size={28} />
                        </div>
                        <div>
                            <h3 className="text-white font-bold text-xl mb-2 font-heading">Choose the Best Plan</h3>
                            <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                                Then you can choose the best plan for you, ensuring it aligns perfectly with your lifestyle.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="hidden lg:block pt-8 border-t border-white/5 max-w-md">
                   <p className="text-sm text-gray-500 uppercase tracking-widest font-semibold flex items-center gap-2">
                      <Phone size={14} className="text-gold" /> Support Hotline: <span className="text-white">+91 98765 00000</span>
                   </p>
                </div>
            </div>

            {/* RIGHT HALF: Form Section */}
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-full max-w-md bg-black border border-gold shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] hover:-translate-y-1 transition-all duration-300 p-6 md:p-8 rounded-xl relative group"
                >
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10">
                    
                    {/* Plan Selection */}
                    <div className="space-y-4">
                      <label className="block text-lg font-heading font-bold text-white text-center mb-2">Select Your Tier</label>
                      <div className="grid grid-cols-3 gap-3">
                        {(['Silver', 'Gold', 'Platinum'] as const).map((plan) => (
                          <button
                            key={plan}
                            type="button"
                            onClick={() => handlePlanSelect(plan)}
                            className={`py-3 px-2 border transition-all duration-300 flex flex-col items-center gap-1 rounded-md ${
                              selectedPlan === plan 
                                ? 'border-gold bg-gold/10 text-gold shadow-[0_0_15px_rgba(212,175,55,0.1)]' 
                                : 'border-white/10 text-gray-500 hover:border-gold/50 hover:text-gray-300'
                            }`}
                          >
                            <span className="font-bold tracking-wider uppercase text-[10px] sm:text-xs">{plan}</span>
                          </button>
                        ))}
                      </div>
                      <input type="hidden" {...register('plan', { required: true })} />
                      {errors.plan && <p className="text-red-500 text-xs text-center">Selection required</p>}
                    </div>

                    {/* Form Fields */}
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gold uppercase tracking-widest">Full Name</label>
                        <input
                          {...register('fullName', { required: 'Name is required' })}
                          className="w-full px-4 py-3 bg-premium-dark border border-white/10 rounded text-white focus:border-gold outline-none transition-colors placeholder-gray-600 text-sm focus:ring-1 focus:ring-gold/50"
                          placeholder="Jane Doe"
                        />
                        {errors.fullName && <p className="text-red-500 text-xs">{errors.fullName.message}</p>}
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gold uppercase tracking-widest">Phone Number</label>
                        <input
                          {...register('phone', { required: 'Phone is required' })}
                          className="w-full px-4 py-3 bg-premium-dark border border-white/10 rounded text-white focus:border-gold outline-none transition-colors placeholder-gray-600 text-sm focus:ring-1 focus:ring-gold/50"
                          placeholder="+91 98765 43210"
                        />
                        {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gold uppercase tracking-widest">Email Address</label>
                        <input
                          {...register('email', { 
                            required: 'Email is required',
                            pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' }
                          })}
                          className="w-full px-4 py-3 bg-premium-dark border border-white/10 rounded text-white focus:border-gold outline-none transition-colors placeholder-gray-600 text-sm focus:ring-1 focus:ring-gold/50"
                          placeholder="jane@example.com"
                        />
                        {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gold uppercase tracking-widest">Date</label>
                            <input
                              type="date"
                              {...register('callbackDate', { required: 'Required' })}
                              className="w-full px-3 py-3 bg-premium-dark border border-white/10 rounded text-white focus:border-gold outline-none transition-colors [color-scheme:dark] text-sm focus:ring-1 focus:ring-gold/50"
                            />
                             {errors.callbackDate && <p className="text-red-500 text-xs">Required</p>}
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gold uppercase tracking-widest">Time</label>
                            <input
                              type="time"
                              {...register('callbackTime', { required: 'Required' })}
                              className="w-full px-3 py-3 bg-premium-dark border border-white/10 rounded text-white focus:border-gold outline-none transition-colors [color-scheme:dark] text-sm focus:ring-1 focus:ring-gold/50"
                            />
                             {errors.callbackTime && <p className="text-red-500 text-xs">Required</p>}
                          </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gold uppercase tracking-widest">Goals</label>
                        <textarea
                          {...register('message')}
                          rows={3}
                          className="w-full px-4 py-3 bg-premium-dark border border-white/10 rounded text-white focus:border-gold outline-none transition-colors placeholder-gray-600 resize-none text-sm focus:ring-1 focus:ring-gold/50"
                          placeholder="Briefly describe your goals..."
                        />
                      </div>
                    </div>

                    <Button type="submit" fullWidth disabled={isSubmitting} size="lg" className="mt-2">
                      {isSubmitting ? 'Processing...' : 'Request Consultation'}
                    </Button>

                  </form>
                </motion.div>
            </div>
        </div>
      </div>

      {/* Success Modal */}
      <Modal isOpen={isSuccess} onClose={() => setIsSuccess(false)} title="Submission Successful">
        <div className="text-center py-8 px-4">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-gold/30"
          >
            <CheckCircle size={40} className="text-gold" />
          </motion.div>
          
          <h3 className="text-2xl font-heading font-bold text-white mb-2">Application Received</h3>
          <p className="text-gray-400 mb-8 leading-relaxed">
            Your inquiry has been prioritized. A senior consultant will reach out to you shortly to finalize your legacy.
          </p>
          
          <Button onClick={() => setIsSuccess(false)} fullWidth>
            Return to Site
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default ContactPage;