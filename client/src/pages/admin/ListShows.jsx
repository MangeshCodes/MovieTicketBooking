import React, { useEffect, useState } from 'react';
import { dummyShowsData } from '../../assets/assets';
import Loading from '../../components/Loading';
import { dateFormat } from '../../lib/dateFormat';

const ListShows = () => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  const currency=import.meta.env.VITE_CURRENCY;

  const getAllShows = async () => {
    try {
      setShows([{
        movie: dummyShowsData[0],
        showDateTime: "2025-06-30T02:30:00.000Z",
        showPrice: 59,
        occupiedSeats: {
          A1: "user_1",
          B1: "user_2",
          C1: "user_3"
        }
      }]);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllShows();
  }, []);

  return !loading ? (
    <>
      <div className="p-4">
        <h1 className="text-xl font-bold mb-6">
          List <span className="text-red-500">Shows</span>
        </h1>
        <div className="max-w-4xl mt-6 overflow-x-auto">
          <table className='w-full border-collapse rounded-md overflow-hidden text-nowrap'>
            <thead>
              <tr className='bg-[#2d0a31] text-left text-white'>
                <th className='p-2 font-medium pl-5'>Movie Name</th>
                <th className='p-2 font-medium'>Show Time</th>
                <th className='p-2 font-medium'>Total Bookings</th>
                <th className='p-2 font-medium'>Earnings</th>
              </tr>
            </thead>
            <tbody className="text-sm font-light text-white">
              {shows.map((show, index) => (
                <tr key={index} className="border-b border-[#3a3a3a] hover:bg-[#3a3a3a] bg-[#252525]">
                  <td className="p-2 min-w-45 pl-5 font-medium">{show.movie.title}</td>
                  <td className="p-2">{dateFormat(show.showDateTime)}</td>
                  <td className="p-2">{Object.keys(show.occupiedSeats).length}</td>
                  <td className="p-2">${(Object.keys(show.occupiedSeats).length * show.showPrice).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  ) : <Loading />;
};

export default ListShows;
