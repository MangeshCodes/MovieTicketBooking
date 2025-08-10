import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { dummyDateTimeData, dummyShowsData } from "../assets/assets";
import { Heart, PlayCircleIcon, StarIcon } from 'lucide-react';
import timeFormat from '../lib/timeFormat';
import DateSelect from "../components/DateSelect";
import MovieCard from '../components/MovieCard';
/**
 * MovieDetails component displays detailed information about a selected movie,
 * including its poster, title, rating, overview, runtime, genres, release year,
 * and cast members. It also provides options to watch the trailer, buy tickets,
 * and add the movie to favorites. The component fetches movie data based on the
 * route parameter `id` and renders a date selection component for ticket booking.
 *
 * @component
 * @returns {JSX.Element} The rendered MovieDetails page.
 */
const MovieDetails = () => {
    const { id } = useParams();
    const [show, setShow] = useState(null);
    const navigate=useNavigate();
    useEffect(() => {
        const getShow = () => {
            const foundShow = dummyShowsData.find(show => show._id.toString() === id);
            if (foundShow) {
                setShow({ movie: foundShow, dateTime: dummyDateTimeData }); // <-- fix here
            }
        };
        getShow();
    }, [id]);


    if (!show) {
        return <div className="text-center mt-20 text-gray-400 text-lg">Loading movie details...</div>;
    }

    return (
        <>
            <div className="px-6 md:px-16 lg:px-40 pt-30 md:pt-50">
                <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
                    <img
                        src={show.movie.poster_path}
                        alt={show.movie.title}
                        className="mx-auto md:mx-0 rounded-xl h-[400px] w-[270px] object-cover"
                    />

                    <div className='relative flex flex-col gap-4'>
                        <p className="text-primary uppercase text-sm">English</p>

                        <h1 className='text-4xl font-semibold max-w-96'>{show.movie.title}</h1>

                        <div className="flex items-center gap-2 text-gray-300">
                            <StarIcon className="w-5 h-5 text-primary fill-primary" />
                            <span>{show.movie.vote_average.toFixed(1)} User Rating</span>
                        </div>

                        <p className="text-gray-400 mt-2 text-sm leading-tight max-w-xl">
                            {show.movie.overview}
                        </p>

                        <p className="text-sm text-gray-300">
                            {show.movie.runtime && timeFormat(show.movie.runtime)} <span className="mx-2">•</span>
                            {show.movie.genres?.map(g => g.name).join(', ')} <span className="mx-2">•</span>
                            {show.movie.release_date?.split("-")[0]}
                        </p>

                        <div className="flex gap-4 items-center mt-4">
                            <button className="flex items-center gap-2 px-7 py-3 bg-red-600 hover:bg-gray-800 text-sm rounded transition font-medium cursor-pointer active-scale-95">
                                <PlayCircleIcon className='w-5 h-5' />
                                Watch Trailer
                            </button>
                            <a href="#dateSelect" className="text-primary underline">Buy Tickets</a>
                            <button className="p-2 bg-gray-100 rounded-full">
                                <Heart className='w-5 h-5 text-red-500' />
                            </button>
                        </div>

                    </div>
                </div>
                <p className='text-lg font-medium mt-20'>
                    Your Favourite Cast </p>
                <div className="overflow-x-auto no-scrollbar">
                   <div className='flex items-center gap-4 w-max px-4'>
                     {show.movie.casts.slice(0,12).map((cast, index) => (
                        <div key={index} className='flex flex-col items-center text-center'>
                          <img src={cast.profile_path} alt={cast.name} className='rounded-full h-20 md:h-20 aspect-square object-cover' />
                          <p className='font-medium text-xs mt-3'>
                            {cast.name}
                          </p>
                        </div>
                     ))}
                   </div>
                </div>
            </div>
            <DateSelect dateTime={show.dateTime} id={id}/>
            <p className="text-lg font-medium mt-20 mb-8">
                You May Also Like
            </p>
            <div className="flex flex-wrap max-sm:justify-center gap-8">
             {dummyShowsData.slice(0,4).map((movie,index)=>(
                <MovieCard key={index} movie={movie}/> )
             )}
            </div>
            <div className='flex justify-center mt-20'>
                <button onClick={()=>navigate('/movies')} className="px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-sm font-medium cursor-pointer">
                  Show More
                </button>
            </div>
        </>
    );
};

export default MovieDetails;
