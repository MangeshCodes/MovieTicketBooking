import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { dummyShowsData, dummyDateTimeData, assets } from "../assets/assets";
import Loading from "../components/Loading";
import { ArrowRightIcon, ClockIcon } from "lucide-react";
import isoTimeFormat from "../lib/isoTImeFormat";
import BlurCircle from "../components/BlurCircle";
import toast from "react-hot-toast";

const SeatLayout = () => {
    const groupRows = [["A", "B"], ["C", "D"], ["E", "F"]];
    const { id, date } = useParams();
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [selectedTime, setSelectedTime] = useState(null);
    const [show, setShow] = useState(null);
    const navigate = useNavigate();

    const getShow = async () => {
        const show = dummyShowsData.find(show => show._id === id);
        if (show) {
            setShow({
                movie: show,
                dateTime: dummyDateTimeData,
            });
        }
    };

    const handleSeatClick = (seatId) => {
        if (!selectedTime) {
            return toast("Please select the time first.");
        }
        if (!selectedSeats.includes(seatId) && selectedSeats.length >= 4) {
            return toast("You can select a maximum of 4 seats.");
        }
        setSelectedSeats(prev =>
            prev.includes(seatId)
                ? prev.filter(seat => seat !== seatId)
                : [...prev, seatId]
        );
    };

    const renderSeats = (row, count = 9) => {
        return (
            <div key={row} className="flex gap-2 mt-2">
                <div className="flex flex-wrap items-center justify-center gap-2">
                    {Array.from({ length: count }, (_, i) => {
                        const seatId = `${row}${i + 1}`;
                        return (
                            <button
                                key={seatId}
                                onClick={() => handleSeatClick(seatId)}
                                className={`h-8 w-8 rounded border cursor-pointer transition font-bold
                                    ${selectedSeats.includes(seatId)
                                        ? "bg-[#F3123C] text-white border-[#F3123C]"
                                        : "bg-gray-800 text-white border-gray-700 hover:bg-gray-700"}
                                `}
                            >
                                {seatId}
                            </button>
                        );
                    })}
                </div>
            </div>
        );
    };

    useEffect(() => {
        getShow();
    }, );

    return show ? (
        <div className="flex flex-col md:flex-row px-6 md:px-16 lg:px-40 py-30 md:pt-50">
            {/* Available Timings */}
            <div className="w-60 bg-[#1a1a1a] border border-gray-700 rounded-lg py-10 h-max md:sticky md:top-30">
                <p className="text-lg font-semibold px-6 text-white">Available Timings</p>
                <div className="mt-5 space-y-1">
                    {show.dateTime?.[date]?.map((item) => (
                        <div
                            key={item.time}
                            onClick={() => setSelectedTime(item)}
                            className={`flex items-center gap-2 px-6 py-2 w-max rounded-r-md cursor-pointer transition font-medium
                                ${selectedTime?.time === item.time
                                    ? "bg-[#F3123C] text-white border border-[#F3123C]"
                                    : "hover:bg-[#2a2a2a] text-white"}
                            `}
                        >
                            <ClockIcon className="w-4 h-4" />
                            <p className="text-sm">{isoTimeFormat(item.time)}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Seat Selection */}
            <div className="relative flex-1 flex flex-col items-center max-md:mt-16">
                <BlurCircle top="-100px" left="-100px" />
                <BlurCircle bottom="0" right="0" />
                <h1 className="text-2xl font-semibold mb-4 text-white">Select Your Seat</h1>
                <img src={assets.screenImage} alt="screen" />
                <p className="text-gray-400 text-sm mb-6">SCREEN SIDE</p>

                <div className="flex flex-col items-center mt-10 text-xs text-white">
                    <div className="grid grid-cols-2 md:grid-cols-1 gap-8 md:gap-2 mb-6">
                        {groupRows[0].map(row => renderSeats(row))}
                        <div className="grid grid-cols-2 gap-11">
                            {groupRows.slice(1).map((group, idx) => (
                                <div key={idx}>
                                    {group.map(row => renderSeats(row))}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Display selected seats */}
                    <p className="mt-4 text-sm">
                        Selected Seats: {selectedSeats.join(", ") || "None"}
                    </p>

                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-1 mt-10 px-10 py-3 text-sm bg-[#F3123C] hover:bg-red-700 text-white transition rounded-full font-medium cursor-pointer active:scale-95"
                    >
                        Proceed to Checkout
                        <ArrowRightIcon strokeWidth={3} className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    ) : <Loading />;
};

export default SeatLayout;
