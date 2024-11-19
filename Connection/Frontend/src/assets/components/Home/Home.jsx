import React from 'react';
import Navbar from '../Navbar/Navbar';
import gif from '../../Gif/Final.gif';
import { Link } from 'react-router-dom';

const Home = () => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [isOffline, setIsOffline] = React.useState(false);
  
    React.useEffect(() => {
      const loadingTimer = setTimeout(() => {
        setIsLoading(false);
        setIsOffline(true);
      }, 15000);
  
      return () => clearTimeout(loadingTimer);
    }, []);
  
    // Loading component
    if (isLoading) {
      return (
        <div className="flex flex-col min-h-screen bg-[#0D1117] text-white items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Render is Starting...</h1>
            <div className="animate-spin w-16 h-16 border-t-4 border-blue-500 rounded-full mx-auto"></div>
            <p className="mt-4 text-gray-300">Please wait while the application loads</p>
          </div>
        </div>
      );
    }
  
    // Offline component
    if (isOffline) {
      return (
        <div className="flex flex-col min-h-screen bg-[#0D1117] text-white items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Render Offline</h1>
            <p className="text-red-500">Unable to load the application. Please check your connection.</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Retry
            </button>
          </div>
        </div>
      );
    }
  
    // Original home page content
    return (
      <div className="flex flex-col min-h-screen bg-[#0D1117] text-white">
        <div className="flex-grow">
          <div className="container mx-auto py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 ml-4">
              <div className="flex flex-col justify-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Welcome to <div className="font-serif p-1">RoundGen</div> a scheduling website
                </h1>
                <p className="text-lg">
                  Event Scheduler
                  Post your events and sub-events and schedule them using the
                  Genetic Algorithm and get match schedule using the modified round-robin algorithm.
                </p>
                <div className="mt-10 ml-10 gap-10 mx-auto">
                  <h1 className="mt-10 text-xl">See your events</h1>
                  <a href="/enrolled">
                    <button className="mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-white">
                      Your events
                    </button>
                  </a>
                </div>
              </div>
              <div>
                <div 
                  className="size-[450px] right-20 absolute"
                  style={{
                    backgroundImage: 'url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)',
                    backgroundSize: 'cover'
                  }}
                  alt="Homepage"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-black py-10 text-center">
          <div className="mb-1">
            <p className="text-lg">Contact us for more information</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default Home;