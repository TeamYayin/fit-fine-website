import React from "react";
import { motion } from "framer-motion";
import { PLANS } from "../data/mockData";
import Button from "./Button";
import { Check } from "lucide-react";

const Pricing: React.FC = () => {
  const handleCheckout = (planName: string) => {
    alert(`Redirecting to Stripe Checkout for ${planName} plan... (Test Mode)`);
  };

  return (
    <section
      id="plans"
      className="py-24 bg-premium-dark relative overflow-hidden"
    >
      {/* Background patterns */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-5 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:20px_20px]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">
            Invest in Yourself
          </h2>
          <p className="text-gray-400">
            Choose the tier that matches your ambition.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
          {PLANS.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative flex flex-col p-8 md:p-10 transition-all duration-300 group
                bg-black/40 border border-white/5 h-full
                hover:bg-premium-black hover:border-gold hover:shadow-[0_0_30px_rgba(212,175,55,0.1)] hover:z-10 hover:scale-105
              `}
            >
              {plan.recommended && (
                <div className="absolute top-0 right-0 bg-gold text-black text-[10px] font-bold px-3 py-1 uppercase tracking-widest z-20">
                  Most Popular
                </div>
              )}

              <div className="mb-8 text-center md:text-left">
                <h3 className="text-xl font-bold font-heading mb-2 uppercase tracking-wider transition-colors text-white group-hover:text-gold">
                  {plan.name}
                </h3>
                <div className="flex items-baseline justify-center md:justify-start">
                  <span className="text-4xl md:text-5xl font-bold text-white">
                    ₹{plan.price}
                  </span>
                  <span className="ml-2 text-sm text-gray-500 uppercase">
                    /month
                  </span>
                </div>
              </div>

              <div className="w-full h-px bg-white/10 mb-8" />

              <ul className="flex-1 space-y-5 mb-10">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <div className="mt-1 mr-4 flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full transition-colors bg-white/10 text-gray-400 group-hover:bg-gold group-hover:text-black">
                      <Check size={12} strokeWidth={3} />
                    </div>
                    <span className="text-sm text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => handleCheckout(plan.name)}
                variant="outline"
                fullWidth
                className="border-white/10 text-gray-400 group-hover:border-gold group-hover:text-gold hover:!bg-gold hover:!text-black hover:!border-gold"
              >
                Select {plan.name}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
