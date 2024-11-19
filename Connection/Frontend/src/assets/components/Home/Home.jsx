import React from 'react';
import Navbar from '../Navbar/Navbar';
import gif from '../../Gif/Final.gif';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="flex flex-col min-h-screen bg-[#0D1117] text-white">
            <div className="flex-grow">
                <Navbar />
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
                                <Link to="/enrolled">
                                    <button className="mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-white">
                                        Your events
                                    </button>
                                </Link>
                            </div>
                        </div>
                        <div>
                            <img
                                src={gif}
                                alt="Homepage"
                                className="size-[450px] right-20 absolute"
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
