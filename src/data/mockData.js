export const QUOTES = [
  { id: 1, text: "Small daily steps lead to big results." },
  { id: 2, text: "Consistency over intensity — every day counts." },
  { id: 3, text: "Fuel your body, power your life." },
  { id: 4, text: "Progress, not perfection." },
  { id: 5, text: "Eat well. Move daily. Sleep well." },
  { id: 6, text: "Stronger than yesterday." },
  { id: 7, text: "Discipline is the most elegant flex." },
  { id: 8, text: "Recovery is the new hustle." },
  { id: 9, text: "Move like you respect your future self." },
];

export const SUCCESS_STORIES = [
  {
    id: '1',
    name: "Rohan Verma",
    beforeWeight: 92,
    afterWeight: 78,
    durationWeeks: 12,
    quote: "Discipline became my new addiction.",
    imageUrl: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80",
    description: "Rohan spent years trying fad diets with no results. The Gold plan's structured nutrition and strength training approach helped him shed fat while building a powerful physique. He is now training for his first marathon.",
    plan: 'Gold'
  },
  {
    id: '2',
    name: "Arjun Mehta",
    beforeWeight: 102,
    afterWeight: 84,
    durationWeeks: 16,
    quote: "Consistency is the only magic pill.",
    imageUrl: "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?auto=format&fit=crop&w=800&q=80",
    description: "Arjun's sedentary lifestyle was taking a toll on his health markers. He joined the Platinum plan for the 1-on-1 coaching. Our trainers helped him integrate short, effective workouts into his busy schedule, helping him drop fat and improve his stamina significantly.",
    plan: 'Platinum'
  },
  {
    id: '3',
    name: "Kavita Reddy",
    beforeWeight: 75,
    afterWeight: 62,
    durationWeeks: 10,
    quote: "I feel lighter, faster, and unstoppable.",
    imageUrl: "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?auto=format&fit=crop&w=800&q=80",
    description: "Kavita wanted to tone up for her sister's wedding. The Silver plan gave her the structure she needed. By following the clean eating templates and home workout guides, she sculpted her physique and now inspires her whole family to stay fit.",
    plan: 'Silver'
  },
  {
    id: '4',
    name: "Meera Iyer",
    beforeWeight: 88,
    afterWeight: 70,
    durationWeeks: 18,
    quote: "Strong is the new beautiful.",
    imageUrl: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80",
    description: "Post-pregnancy, Meera struggled to find time for herself. With the Platinum plan's flexible scheduling and home-based high-intensity intervals, she reclaimed her health and energy levels for her family.",
    plan: 'Platinum'
  },
  {
    id: '5',
    name: "Kabir Das",
    beforeWeight: 85,
    afterWeight: 77,
    durationWeeks: 14,
    quote: "I built the body I always dreamed of.",
    imageUrl: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=800&q=80",
    description: "Kabir was 'skinny fat' and lacked confidence. Our hypertrophy-focused Gold plan helped him recomposition his body. He gained significant lean muscle mass while dropping body fat percentage.",
    plan: 'Gold'
  },
  {
    id: '6',
    name: "Suresh Patel",
    beforeWeight: 95,
    afterWeight: 82,
    durationWeeks: 12,
    quote: "Fitness has no age limit.",
    imageUrl: "https://images.unsplash.com/photo-1550345332-09e3ac987658?auto=format&fit=crop&w=800&q=80",
    description: "At 55, Suresh thought his best years were behind him. Our coaches designed a low-impact program that protected his joints while melting fat. He now has more energy than his sons and enjoys weekend hikes without shortness of breath.",
    plan: 'Silver'
  }
];

export const PLANS = [
  {
    id: 'silver',
    name: 'Silver',
    price: 499,
    period: '/month',
    description: 'Essential habits, baseline metrics, and foundational coaching.',
    features: [
      'Basic Diet Templates',
      'Weekly Workout Plan',
      'Community Access',
      'Email Support'
    ]
  },
  {
    id: 'gold',
    name: 'Gold',
    price: 999,
    period: '/month',
    recommended: true,
    description: 'Our signature transformation protocol with bi-weekly calibration.',
    features: [
      'Personalized Macro Breakdown',
      'Advanced Diet Templates',
      'Bi-Weekly Coach Check-in',
      'Progress Tracking App',
      'Priority Email Support'
    ]
  },
  {
    id: 'platinum',
    name: 'Platinum',
    price: 1999,
    period: '/month',
    description: 'Concierge-level guidance, customized macros, and 24/7 dedicated access.',
    features: [
      'Fully Custom Meal Plans',
      '1-on-1 Weekly Coaching',
      'Daily Macro Adjustments',
      'Video Form Analysis',
      '24/7 WhatsApp Support'
    ]
  }
];

export const COMPARISON_FEATURES = [
  { feature: 'Basic Diet Templates', silver: true, gold: true, platinum: true },
  { feature: 'Personalized Macro Breakdown', silver: false, gold: true, platinum: true },
  { feature: 'Weekly Workout Plan', silver: true, gold: true, platinum: true },
  { feature: 'Community Access', silver: true, gold: true, platinum: true },
  { feature: 'Bi-Weekly Coach Check-in', silver: false, gold: true, platinum: false },
  { feature: 'Progress Tracking App', silver: false, gold: true, platinum: true },
  { feature: 'Fully Custom Meal Plans', silver: false, gold: false, platinum: true },
  { feature: '1-on-1 Weekly Coaching', silver: false, gold: false, platinum: true },
  { feature: '24/7 WhatsApp Support', silver: false, gold: false, platinum: true },
];

export const FAQS = [
  {
    id: '1',
    question: "How quickly will I see results?",
    answer: "Results vary — most users see improvements in 4–8 weeks with consistent habits. Sustainable weight loss is about 0.5-1kg per week."
  },
  {
    id: '2',
    question: "Are the diet plans customizable?",
    answer: "Yes, all plans allow allergy, vegetarian, and vegan customization options within the user dashboard."
  },
  {
    id: '3',
    question: "What do the subscription plans include?",
    answer: "Plans range from basic templates to full coaching. All include access to our community and basic tracking tools."
  },
  {
    id: '4',
    question: "Can I pause or cancel my subscription?",
    answer: "Yes, you can pause or cancel anytime via your user account settings with no hidden fees."
  },
  {
    id: '5',
    question: "Will I get a personalized macro breakdown?",
    answer: "Yes, personalized macro breakdowns are included in both the Gold and Platinum plans."
  }
];

export const PLAN_FAQS = [
  {
    id: 'p1',
    question: "What's the difference between Silver, Gold, and Platinum plans?",
    answer: "Silver offers basic templates and community support. Gold includes personalized macros and bi-weekly check-ins. Platinum provides 1-on-1 weekly coaching, custom meal plans, and 24/7 support."
  },
  {
    id: 'p2',
    question: "Can I upgrade or downgrade my plan later?",
    answer: "Yes, you can change your plan anytime from your account dashboard. Changes take effect at the start of your next billing cycle."
  },
  {
    id: 'p3',
    question: "Do all plans include workout plans?",
    answer: "Yes, all plans include workout plans. Silver provides weekly templates, Gold offers advanced programs, and Platinum includes fully customized training based on your goals and schedule."
  },
  {
    id: 'p4',
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, debit cards, UPI, and net banking. All payments are processed securely through our payment partners."
  },
  {
    id: 'p5',
    question: "Is there a money-back guarantee?",
    answer: "Yes, we offer a 30-day money-back guarantee. If you're not satisfied with your plan within the first month, contact us for a full refund."
  },
  {
    id: 'p6',
    question: "Are meal plans included in all tiers?",
    answer: "Yes, all plans include meal plans. Silver has basic templates, Gold offers personalized macro-based plans, and Platinum provides fully custom meal plans tailored to your preferences."
  }
];

export const DIET_PLANS = [
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
      breakfast: 'Customised Anabolic Morning Feast', 
      lunch: 'Precision Lean Protein with Complex Carbs', 
      snack: 'Recovery Hydrolysate & Healthy Fats', 
      dinner: 'Sustained Slow-Release Protein Bowl' 
    }
  }
];

export const BLOG_POSTS = [
  {
    id: '1',
    title: 'The Science of Progressive Overload: Building Strength the Right Way',
    excerpt: 'Understanding how progressive overload works and why it\'s the foundation of all effective strength training programs. Learn the principles that top athletes use.',
    category: 'Workout & Training',
    readTime: '8 min read',
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80',
    featured: true
  },
  {
    id: '2',
    title: 'Macro Nutrition 101: Balancing Proteins, Carbs, and Fats',
    excerpt: 'A comprehensive guide to understanding macronutrients and how to balance them for your fitness goals. Simple explanations for beginners.',
    category: 'Diet & Nutrition',
    readTime: '6 min read',
    imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '3',
    title: '10 Effective Weight Loss Strategies That Actually Work',
    excerpt: 'Evidence-based approaches to sustainable weight loss. No fad diets, just proven methods backed by science and real results.',
    category: 'Weight Loss',
    readTime: '10 min read',
    imageUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '4',
    title: 'Muscle Gain Fundamentals: Training and Nutrition Essentials',
    excerpt: 'Everything you need to know about building lean muscle mass. From workout splits to meal timing, master the basics of muscle growth.',
    category: 'Muscle Gain',
    readTime: '9 min read',
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '5',
    title: 'Building Healthy Habits: The Psychology of Consistency',
    excerpt: 'Why consistency beats intensity every time. Learn how to build sustainable fitness habits that stick for life.',
    category: 'Lifestyle & Habits',
    readTime: '7 min read',
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '6',
    title: 'Mental Strength in Fitness: Overcoming Plateaus and Setbacks',
    excerpt: 'The mental game is just as important as the physical. Discover strategies to stay motivated and push through challenges.',
    category: 'Mental Health & Motivation',
    readTime: '8 min read',
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '7',
    title: 'Pre-Workout Nutrition: What to Eat Before Training',
    excerpt: 'Maximize your workout performance with the right pre-workout fuel. Timing, types, and quantities explained simply.',
    category: 'Diet & Nutrition',
    readTime: '5 min read',
    imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '8',
    title: 'Recovery Essentials: Why Rest Days Are Non-Negotiable',
    excerpt: 'Understanding the importance of recovery in your fitness journey. Learn how rest accelerates progress and prevents injury.',
    category: 'Workout & Training',
    readTime: '6 min read',
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '9',
    title: 'Hydration and Performance: The Overlooked Performance Factor',
    excerpt: 'How proper hydration impacts your workouts and recovery. Simple guidelines to optimize your water intake.',
    category: 'Diet & Nutrition',
    readTime: '5 min read',
    imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80'
  }
];

export const CATEGORIES = [
  'All',
  'Workout & Training',
  'Diet & Nutrition',
  'Weight Loss',
  'Muscle Gain',
  'Lifestyle & Habits',
  'Mental Health & Motivation'
];

