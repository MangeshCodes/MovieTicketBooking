import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";      
import MovieCard from '../components/MovieCard';
const Movies=()=>{
    const { movies } = useContext(AppContext);
    return movies.length>0 ?(
        <div className='relative my-40 mb-60 px-6 md:px-16 lg:px-40 xl:px-44 overflow-hidden min-h-[80vh]'>
             <h1 className="text-lg font-medium my-4">Now Showing</h1>
        <div className="flex flex-wrap max-sm:justify-center gap-8">
             {movies.map((movie) => (<MovieCard movie={movie} key={movie._id}/>))}
        </div>   
       </div> 
    )
    :(
        <div className="relative my-40 mb-60 text-center min-h-[80vh]">
            <h1 className="text-xl font-medium text-gray-400">No Movies Available</h1>
        </div>
    )
}
export default Movies;