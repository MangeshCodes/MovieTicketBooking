import React, { useEffect, useState } from "react";
import { dummyBookingData } from "../assets/assets";
import Loading from "../components/Loading";
import BlurCircle from "../components/BlurCircle";

const MyBookings = () => {
    const currency = import.meta.env.VITE_CURRENCY || "$";
    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getMyBookings = async () => {
        try {
            console.log("Loading bookings...", dummyBookingData);
            setBookings(dummyBookingData);
            setIsLoading(false);
        } catch (error) {
            console.error("Error loading bookings:", error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getMyBookings();
    }, []);

    return !isLoading ? (
        <>
            <div className="relative px-6 md:px-16 lg:px-40 pt-28 pb-12 min-h-[80vh] bg-black text-white">
                <BlurCircle top="100px" left="100px" />
                <div>
                    <BlurCircle bottom="0px" left="600px" />
                </div>

                <h1 className="text-2xl font-semibold mb-6">My Bookings</h1>

                {bookings.length === 0 ? (
                    <div className="text-center text-gray-400 mt-8">
                        <p>No bookings found.</p>
                    </div>
                ) : (
                    bookings.map((item, index) => {
                    const showDate = new Date(item.show.showDateTime).toLocaleString('en-US', {
                        weekday: 'short',
                        month: 'long',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true
                    });

                    return (
                        <div
                            key={index}
                            className="flex flex-col md:flex-row justify-between items-start bg-[#1c1c1c] border border-[#f3123c33] rounded-xl mt-6 p-4 max-w-3xl shadow-lg backdrop-blur-sm"
                        >
                            {/* Left Section */}
                            <div className="flex flex-col md:flex-row gap-4">
                                <img
                                    src={item.show.movie.poster_path}
                                    alt=""
                                    className="w-40 h-24 rounded object-cover"
                                />
                                <div className="flex flex-col justify-between">
                                    <p className="text-lg font-semibold">{item.show.movie.title}</p>
                                    <p className="text-gray-400 text-sm">{item.show.movie.runtime}</p>
                                    <p className="text-gray-400 text-sm">{showDate}</p>
                                </div>
                            </div>

                            {/* Right Section */}
                            <div className="flex flex-col items-end justify-between mt-4 md:mt-0 text-right gap-2">
                                <div className="flex items-center gap-4">
                                    <p className="text-lg font-bold">
                                        {currency}
                                        {item.amount}
                                    </p>
                                    {!item.isPaid && (
                                        <button className="bg-[#F3123C] text-white px-4 py-1.5 text-sm rounded-full font-medium hover:brightness-110 transition">
                                            Pay Now
                                        </button>
                                    )}
                                </div>
                                <div className="text-sm text-gray-400">
                                    <p>Total Tickets: {item.bookedSeats.length}</p>
                                    <p>Seat Number: {item.bookedSeats.join(", ")}</p>
                                </div>
                            </div>
                        </div>
                    );
                })
                )}
            </div>
        </>
    ) : (
        <Loading />
    );
};

export default MyBookings;
