import React from 'react';
import { assets } from '../assets/assets';
import { Calendar1Icon, Clock10Icon,ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => { 
    
    const navigate=useNavigate();
        
    return (
        <div
            className='flex flex-col items-start justify-center gap-4 px-6 md:px-16 lg:px-36 min-h-screen bg-cover bg-center pt-28 text-white'
            style={{
                backgroundImage: `url('/backgroundImage.png')`, 
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <img src={assets.marvelLogo} alt="Marvel Logo" className="h-11" />
            <h1 className='text-5xl md:text-[70px] md:leading-[1.1] font-semibold max-w-[700px]'>
                Guardians <br />
                of the Galaxy
            </h1>
            <div className='flex flex-wrap items-center gap-4 text-gray-300'>
                <span>Action | Adventure | Sci-Fi</span>
                <div className='flex items-center gap-1'>
                    <Calendar1Icon className='w-4 h-4' /> 2018
                </div>
                <div className='flex items-center gap-1'>
                    <Clock10Icon className='w-4 h-4' /> 2h 18min
                </div>
            </div>
            <p className="max-w-xl text-gray-200">
                This is a demo text describing the movie Guardians of the Galaxy. I think the movie was great and was directed very well.
            </p>
            <button
                onClick={() => navigate('/movies')}
                className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg transition-all duration-200"
            >
                Explore More
                <ArrowRight className="w-5 h-5"/>
            </button>
        </div>
    );
};

export default HeroSection;
