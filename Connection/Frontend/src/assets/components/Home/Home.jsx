import React from 'react';
import Navbar from '../Navbar/Navbar';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [isOffline, setIsOffline] = React.useState(false);
  
    React.useEffect(() => {
      const loadingTimer = setTimeout(() => {
        setIsLoading(false);
      }, 2000);
  
      return () => clearTimeout(loadingTimer);
    }, []);
  
    // Loading component
    if (isLoading) {
      return (
        <div className="flex flex-col min-h-screen bg-[#f5f7fa] dark:bg-[#1a1c2e] text-[#1a1c2e] dark:text-white items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#5e7ce2] to-[#3a4980]">
              Loading RoundGen
            </h1>
            <div className="w-20 h-20 mx-auto relative">
              <div className="absolute inset-0 rounded-full border-t-4 border-b-4 border-[#5e7ce2] animate-ping opacity-30"></div>
              <div className="absolute inset-0 rounded-full border-4 border-t-[#5e7ce2] border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
            </div>
            <p className="mt-6 text-[#727888] dark:text-[#a3adc2] font-light">Preparing your scheduling experience...</p>
          </div>
        </div>
      );
    }
  
    // Offline component
    if (isOffline) {
      return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#f5f7fa] to-[#e9eef5] dark:from-[#1a1c2e] dark:to-[#12141f] text-[#1a1c2e] dark:text-white items-center justify-center">
          <div className="text-center p-10 bg-white/80 dark:bg-[#262940]/80 backdrop-blur-sm rounded-xl shadow-2xl max-w-md border border-[#e1e6f0] dark:border-[#32374f]">
            <div className="text-[#e25e5e] mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold mb-4">Connection Lost</h1>
            <p className="text-[#727888] dark:text-[#a3adc2] mb-6">We're having trouble connecting to our servers. Please check your connection.</p>
            <button 
              onClick={() => window.location.reload()}
              className="w-full py-3 px-6 bg-[#5e7ce2] hover:bg-[#4a69d2] text-white font-medium rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Retry Connection
            </button>
          </div>
        </div>
      );
    }
  
    // Original home page content with redesigned look
    return (
      <div className="flex flex-col min-h-screen bg-[#f5f7fa] dark:bg-[#1a1c2e] text-[#1a1c2e] dark:text-white">
        <Navbar />
        
        <main className="flex-grow pt-16">
          {/* Hero Section */}
          <section className="relative overflow-hidden bg-gradient-to-tr from-white to-[#e9eef5] dark:from-[#262940] dark:to-[#1a1c2e] py-16">
            {/* Background decorative elements */}
            <div className="absolute inset-0 z-0">
              <div className="absolute top-20 left-10 w-64 h-64 bg-[#5e7ce2]/10 rounded-full filter blur-3xl"></div>
              <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#5e7ce2]/10 rounded-full filter blur-3xl"></div>
              <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-[#a5b4e3]/10 rounded-full filter blur-3xl"></div>
            </div>
            
            <div className="container mx-auto px-6 py-10 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col"
                >
                  <h1 className="text-5xl md:text-6xl font-bold mb-6">
                    Welcome to <span className="font-serif bg-clip-text text-transparent bg-gradient-to-r from-[#5e7ce2] to-[#4a69d2]">RoundGen</span>
                  </h1>
                  <p className="text-xl font-light text-[#727888] dark:text-[#a3adc2] mb-8 leading-relaxed">
                    The intelligent scheduling platform that uses <span className="text-[#5e7ce2] dark:text-[#7d93e5]">Genetic Algorithms</span> and <span className="text-[#5e7ce2] dark:text-[#7d93e5]">Round-Robin</span> optimization to create perfect event schedules.
                  </p>
                  <div className="flex flex-wrap gap-5 mt-6">
                    <Link to="/enrolled">
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-8 py-4 bg-[#5e7ce2] hover:bg-[#4a69d2] text-white rounded-xl text-lg font-medium shadow-lg"
                      >
                        View Your Events
                      </motion.button>
                    </Link>
                    <Link to="/event">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-8 py-4 bg-white dark:bg-[#262940] border border-[#d1d9e6] dark:border-[#32374f] hover:border-[#b0c0e2] dark:hover:border-[#5e7ce2] rounded-xl text-lg font-medium transition-colors"
                      >
                        Browse Live Events
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="relative"
                >
                  <div className="relative w-full aspect-square max-w-lg mx-auto">
                    <div className="absolute inset-0 bg-white/50 dark:bg-[#262940]/50 rounded-3xl backdrop-blur-sm border border-[#e1e6f0] dark:border-[#32374f] shadow-xl"></div>
                    <img 
                      src="https://img.freepik.com/free-vector/calendar-concept-illustration_114360-1132.jpg" 
                      alt="Scheduling Illustration" 
                      className="absolute inset-0 w-full h-full object-contain p-6"
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
          
          {/* Features Section */}
          <section className="py-20 bg-white dark:bg-[#262940]">
            <div className="container mx-auto px-6">
              <h2 className="text-3xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-[#5e7ce2] to-[#4a69d2]">
                Streamline Your Event Planning
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
                    title: "Smart Scheduling",
                    description: "Our genetic algorithm finds optimal time slots for all your events and sub-events."
                  },
                  {
                    icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
                    title: "Fair Matchups",
                    description: "Modified round-robin algorithm ensures balanced competition schedules."
                  },
                  {
                    icon: "M13 10V3L4 14h7v7l9-11h-7z",
                    title: "Real-time Updates",
                    description: "Instantly see changes and adjustments to your event schedule."
                  }
                ].map((feature, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="p-8 rounded-2xl bg-[#f5f7fa] dark:bg-[#1e2136] shadow-xl border border-[#e1e6f0] dark:border-[#32374f] hover:shadow-2xl transition-shadow duration-300"
                  >
                    <div className="w-14 h-14 rounded-full bg-[#5e7ce2]/20 flex items-center justify-center mb-6">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#5e7ce2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={feature.icon} />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-[#3a4980]">{feature.title}</h3>
                    <p className="text-[#727888] dark:text-[#a3adc2]">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
          
          {/* Testimonial Section */}
          <section className="py-20 bg-[#f5f7fa] dark:bg-[#1a1c2e]">
            <div className="container mx-auto px-6">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-8 text-[#3a4980] dark:text-[#a5b4e3]">Why Event Planners Choose Us</h2>
                <blockquote className="p-8 bg-white dark:bg-[#262940] rounded-2xl border border-[#e1e6f0] dark:border-[#32374f] shadow-lg">
                  <p className="text-xl text-[#505565] dark:text-[#c5cfe0] italic mb-6">"RoundGen transformed how we organize our sports tournament. The automated scheduling saved us countless hours and produced perfectly balanced matchups."</p>
                  <footer className="text-[#727888] dark:text-[#a3adc2]">
                    <p className="font-medium">Sarah Johnson</p>
                    <p className="text-sm">Tournament Director, Regional Athletics</p>
                  </footer>
                </blockquote>
              </div>
            </div>
          </section>
        </main>
        
        {/* Footer */}
        <footer className="bg-white dark:bg-[#262940] py-12 border-t border-[#e1e6f0] dark:border-[#32374f]">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-8 md:mb-0">
                <h2 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#5e7ce2] to-[#4a69d2]">RoundGen</h2>
                <p className="text-[#727888] dark:text-[#a3adc2]">Intelligent scheduling for your events</p>
              </div>
              
              <div className="flex space-x-6">
                <a href="#" className="text-[#727888] dark:text-[#a3adc2] hover:text-[#5e7ce2] dark:hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path></svg>
                </a>
                <a href="#" className="text-[#727888] dark:text-[#a3adc2] hover:text-[#5e7ce2] dark:hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path></svg>
                </a>
                <a href="#" className="text-[#727888] dark:text-[#a3adc2] hover:text-[#5e7ce2] dark:hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path></svg>
                </a>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-[#e1e6f0] dark:border-[#32374f] text-center">
              <p className="text-[#727888] dark:text-[#a3adc2] text-sm">© {new Date().getFullYear()} RoundGen. All rights reserved.</p>
              <p className="text-[#a0a8b8] dark:text-[#717891] text-xs mt-2">Contact us for more information or support</p>
            </div>
          </div>
        </footer>
      </div>
    );
  };
  
  export default Home;