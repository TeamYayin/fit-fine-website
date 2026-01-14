import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, ArrowRight, BookOpen, Target, Heart, Brain, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  imageUrl: string;
  featured?: boolean;
}

const BLOG_POSTS: BlogPost[] = [
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

const CATEGORIES = [
  'Workout & Training',
  'Diet & Nutrition',
  'Weight Loss',
  'Muscle Gain',
  'Lifestyle & Habits',
  'Mental Health & Motivation'
];

const Blog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const featuredPost = BLOG_POSTS.find(post => post.featured) || BLOG_POSTS[0];
  const regularPosts = BLOG_POSTS.filter(post => !post.featured);
  const filteredPosts = selectedCategory 
    ? regularPosts.filter(post => post.category === selectedCategory)
    : regularPosts;

  return (
    <div className="min-h-screen bg-premium-black pb-16">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 container mx-auto text-center relative z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-5 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:20px_20px]" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4">
            Fitness & Wellness <span className="text-gold">Insights</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Expert guidance on fitness, nutrition, mindset, and lifestyle. Learn from science-backed strategies that deliver real results.
          </p>
        </motion.div>
      </section>

      {/* Featured Blog Section */}
      <section className="py-12 px-4 container mx-auto relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-premium-dark border border-white/10 rounded-xl overflow-hidden hover:border-gold transition-colors group"
          >
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 h-[300px] md:h-auto overflow-hidden bg-black">
                <img
                  src={featuredPost.imageUrl}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />
              </div>
              <div className="md:w-1/2 p-8 md:p-10 flex flex-col justify-center">
                <div className="text-xs text-gold uppercase tracking-widest font-semibold mb-3">
                  Featured Article
                </div>
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-4 group-hover:text-gold transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <Clock size={14} />
                    {featuredPost.readTime}
                  </span>
                  <span className="text-xs text-gold uppercase tracking-widest">
                    {featuredPost.category}
                  </span>
                </div>
                <Button variant="outline" className="border-gold text-gold hover:bg-gold hover:text-black w-fit">
                  Read More <ArrowRight size={16} className="ml-2" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-8 px-4 container mx-auto">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                selectedCategory === null
                  ? 'bg-gold text-black border-2 border-gold'
                  : 'bg-black/40 text-gray-400 border-2 border-white/10 hover:border-gold/50'
              }`}
            >
              All Articles
            </button>
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  selectedCategory === category
                    ? 'bg-gold text-black border-2 border-gold'
                    : 'bg-black/40 text-gray-400 border-2 border-white/10 hover:border-gold/50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid Section */}
      <section className="py-16 px-4 container mx-auto">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-premium-dark border border-white/10 rounded-xl overflow-hidden flex flex-col hover:border-gold hover:shadow-[0_0_30px_rgba(212,175,55,0.1)] transition-all group"
              >
                {/* Image Container - Fixed Size */}
                <div className="w-full h-48 overflow-hidden bg-black">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  />
                </div>
                
                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="text-xs text-gold uppercase tracking-widest font-semibold mb-2">
                    {post.category}
                  </div>
                  <h3 className="text-xl font-heading font-bold text-white mb-3 group-hover:text-gold transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed line-clamp-3 flex-1">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock size={12} />
                      {post.readTime}
                    </span>
                    <button className="text-gold text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all group-hover:text-gold-light">
                      Read More <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Educational / Value Section */}
      <section className="py-16 px-4 container mx-auto bg-premium-dark/50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <BookOpen className="text-gold" size={32} />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">
                Why Fitness Knowledge <span className="text-gold">Matters</span>
              </h2>
            </div>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
              Understanding the science behind fitness and nutrition empowers you to make smarter decisions, achieve better results, and build a sustainable lifestyle.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: Target, text: 'Better workout results through proper technique and programming' },
              { icon: TrendingUp, text: 'Smarter diet choices based on your individual needs' },
              { icon: Heart, text: 'Injury prevention through understanding movement patterns' },
              { icon: Brain, text: 'Sustainable lifestyle changes that last a lifetime' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4 bg-black/40 p-6 rounded-lg border border-white/5 hover:border-gold/50 transition-colors"
              >
                <div className="p-3 bg-gold/10 rounded-lg border border-gold/20 shrink-0">
                  <item.icon className="text-gold" size={24} />
                </div>
                <p className="text-gray-300 leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Benefits / Trust Section */}
      <section className="py-16 px-4 container mx-auto">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
              How Our Blogs <span className="text-gold">Help You</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Beginner-Friendly Explanations',
                description: 'Complex concepts broken down into simple, actionable steps that anyone can understand and apply.'
              },
              {
                title: 'Trainer-Approved Guidance',
                description: 'Content created and reviewed by certified fitness professionals with years of real-world experience.'
              },
              {
                title: 'Science-Based Tips',
                description: 'Evidence-backed strategies and recommendations grounded in research and proven methodologies.'
              },
              {
                title: 'Real-World Applications',
                description: 'Practical advice that works in everyday life, not just in theory or ideal conditions.'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-premium-dark border border-white/10 p-6 rounded-lg hover:border-gold/50 transition-colors"
              >
                <h3 className="text-xl font-heading font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 px-4 container mx-auto">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-premium-dark to-black border border-gold p-12 rounded-xl text-center shadow-[0_0_30px_rgba(212,175,55,0.1)]"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
              Train Smarter. Eat Better. <span className="text-gold">Live Stronger.</span>
            </h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Ready to take your fitness journey to the next level? Explore our personalized plans designed to help you achieve your goals.
            </p>
            <Link to="/plans">
              <Button variant="primary" size="lg" className="bg-gold text-black hover:bg-gold-light">
                Explore Plans
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Blog;




