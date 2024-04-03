import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import image from '../../Images/images-removebg-preview.png'
import AuthContext from '../../../Context/AuthContext';


function Navbar() {
    const { user, logoutUser } = useContext(AuthContext);
    return (
        <nav className="sticky z-50 top-0 bg-slate-500 text-xl text-black">



            <div className="flex items-center align-middle justify-start space-x-11 h-20">
                <div className="flex justify-center align-middle">
                    <button>
                        <Link to="/home" className="text-2xl flex justify-center align-middle items-center">
                            <img className='flex size-11  ' src={image} alt="" />
                            <p className='hover:text-white'>

                                Sports Scheduler
                            </p>
                        </Link>
                    </button>

                    <div className='flex text-lg ml-14 space-x-10'>
                        <button><Link to="/create" className="hover:text-xl hover:text-white">Create Event</Link></button>
                        <button><Link to="/event" className="hover:text-xl hover:text-white">See Events</Link></button>
                        <button><Link to="/enrolled" className="hover:text-xl hover:text-white">Your events</Link></button>
                        <button><Link to="/schedule" className="hover:text-xl hover:text-white">Event Schedule</Link></button>

                    </div>
                </div>

                <div className="absolute flex gap-2 justify-items-center items-center align-middle justify-start right-10 cursor-pointer">
                    {user && <p> Hello {user.name} </p>}

                    {[user ? 
                    <div className='flex flex-row-reverse'>
                        <button><Link to="/login" onClick={logoutUser} className="hover:text-xl hover:text-white">Logout</Link>
                    </button>
                    {/* <img className='size-10' src="https://cdn.iconscout.com/icon/free/png-512/free-user-1556-528036.png?f=webp&w=256" alt="hi" />
                             */}
                        </div>
                        :
                        <button><Link to="/login" className="hover:text-xl hover:text-white">Login
                            </Link>
                            </button>]}

                </div>
            </div>
        </nav>
    );
}

export default Navbar;
