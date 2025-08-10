import React, { useState } from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const DateSelect = ({ dateTime, id }) => {
    const navigate = useNavigate();
    const [selected, setSelected] = useState(null);

    const onBookHandle = () => {
        if (!selected) {
            return toast.error('Please select a date');
        }
        navigate(`/movies/${id}/${selected}`);
        window.scrollTo(0, 0);
    };

    return (
        <div id='dateSelect' className='pt-10'>
            <div className='flex flex-col md:flex-row items-center justify-between gap-10
                p-8 bg-[#1c1c1e] border border-gray-700 rounded-lg'>

                <div>
                    <p className='text-lg font-semibold text-white mb-4'>
                        Choose Date
                    </p>
                    <div className='grid grid-cols-3 md:flex flex-wrap gap-4'>
                        {Object.keys(dateTime).map((date) => (
                            <button
                                key={date}
                                onClick={() => setSelected(date)}
                                className={`flex flex-col items-center justify-center h-14 w-14 rounded text-white transition
                                    ${selected === date ? "bg-red-400" : "bg-gray-800 hover:bg-gray-700"}`}>
                                <span>{new Date(date).getDate()}</span>
                                <span>{new Date(date).toLocaleDateString("en-US", { month: "short" })}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <button
                    className='bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-2 rounded-lg shadow-md transition'
                    onClick={onBookHandle}
                >
                    Book Now
                </button>
            </div>
        </div>
    );
};

export default DateSelect;
