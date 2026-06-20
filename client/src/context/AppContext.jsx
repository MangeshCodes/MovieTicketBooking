import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BASE_URL || 'http://localhost:3000';
  const currency = import.meta.env.VITE_CURRENCY || '$';
  
  const { getToken, isSignedIn } = useAuth();
  
  const [movies, setMovies] = useState([]);
  const [myBookings, setMyBookings] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isAdminState, setIsAdminState] = useState(false);
  const [loading, setLoading] = useState(false);

  // Helper for authenticated request headers
  const getAuthHeaders = async () => {
    try {
      const token = await getToken();
      return {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
    } catch (err) {
      console.error('Error fetching auth token:', err);
      return {};
    }
  };

  // Fetch all movies (active shows)
  const getMovies = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${backendUrl}/api/show/all`);
      if (res.data.success) {
        setMovies(res.data.shows);
      } else {
        toast.error(res.data.message || 'Failed to fetch movies');
      }
    } catch (error) {
      console.error('getMovies error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch single movie show details (dates and times)
  const getMovieDetails = async (movieId) => {
    try {
      setLoading(true);
      const res = await axios.get(`${backendUrl}/api/show/${movieId}`);
      if (res.data.success) {
        return res.data;
      } else {
        toast.error(res.data.message || 'Failed to fetch movie details');
        return null;
      }
    } catch (error) {
      console.error('getMovieDetails error:', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Get occupied seats for a show
  const getOccupiedSeats = async (showId) => {
    try {
      const res = await axios.get(`${backendUrl}/api/booking/seats/${showId}`);
      if (res.data.success) {
        return res.data.occupiedSeats;
      } else {
        toast.error(res.data.message || 'Failed to fetch occupied seats');
        return [];
      }
    } catch (error) {
      console.error('getOccupiedSeats error:', error);
      return [];
    }
  };

  // Create a new booking
  const bookSeats = async (showId, seats, amount) => {
    try {
      setLoading(true);
      const headers = await getAuthHeaders();
      const res = await axios.post(
        `${backendUrl}/api/booking/create`,
        { showId, seats, amount },
        headers
      );
      if (res.data.success) {
        toast.success(res.data.message || 'Booking successful!');
        return res.data.booking;
      } else {
        toast.error(res.data.message || 'Booking failed');
        return null;
      }
    } catch (error) {
      console.error('bookSeats error:', error);
      toast.error(error.response?.data?.message || 'Booking failed');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Fetch logged-in user's bookings
  const getUserBookings = async () => {
    try {
      setLoading(true);
      const headers = await getAuthHeaders();
      const res = await axios.get(`${backendUrl}/api/user/bookings`, headers);
      if (res.data.success) {
        setMyBookings(res.data.bookings);
      } else {
        toast.error(res.data.message || 'Failed to load bookings');
      }
    } catch (error) {
      console.error('getUserBookings error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Toggle favorite movie
  const updateFavorites = async (movieId) => {
    try {
      const headers = await getAuthHeaders();
      const res = await axios.post(
        `${backendUrl}/api/user/update-favorite`,
        { movieId },
        headers
      );
      if (res.data.success) {
        toast.success(res.data.message);
        getFavorites(); // reload
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error('updateFavorites error:', error);
    }
  };

  // Fetch favorites
  const getFavorites = async () => {
    try {
      if (!isSignedIn) return;
      const headers = await getAuthHeaders();
      const res = await axios.get(`${backendUrl}/api/user/favorites`, headers);
      if (res.data.success) {
        setFavorites(res.data.movies);
      }
    } catch (error) {
      console.error('getFavorites error:', error);
    }
  };

  // Check if current user is admin
  const checkIsAdmin = async () => {
    try {
      if (!isSignedIn) {
        setIsAdminState(false);
        return false;
      }
      const headers = await getAuthHeaders();
      const res = await axios.get(`${backendUrl}/api/admin/is-admin`, headers);
      if (res.data.success && res.data.isAdmin) {
        setIsAdminState(true);
        return true;
      } else {
        setIsAdminState(false);
        return false;
      }
    } catch (error) {
      setIsAdminState(false);
      return false;
    }
  };

  // ADMIN: Get dashboard data
  const getDashboardData = async () => {
    try {
      const headers = await getAuthHeaders();
      const res = await axios.get(`${backendUrl}/api/admin/dashboard`, headers);
      if (res.data.success) {
        return res.data.dashboardData;
      }
      return null;
    } catch (error) {
      console.error('getDashboardData error:', error);
      return null;
    }
  };

  // ADMIN: Get all shows
  const getAllShows = async () => {
    try {
      const headers = await getAuthHeaders();
      const res = await axios.get(`${backendUrl}/api/admin/shows`, headers);
      if (res.data.success) {
        return res.data.shows;
      }
      return [];
    } catch (error) {
      console.error('getAllShows error:', error);
      return [];
    }
  };

  // ADMIN: Get all bookings
  const getAllBookings = async () => {
    try {
      const headers = await getAuthHeaders();
      const res = await axios.get(`${backendUrl}/api/admin/bookings`, headers);
      if (res.data.success) {
        return res.data.bookings;
      }
      return [];
    } catch (error) {
      console.error('getAllBookings error:', error);
      return [];
    }
  };

  // ADMIN: Add shows
  const addShow = async (movieId, showsInput, showPrice) => {
    try {
      setLoading(true);
      const headers = await getAuthHeaders();
      const res = await axios.post(
        `${backendUrl}/api/show/add`,
        { movieId, showsInput, showPrice: Number(showPrice) },
        headers
      );
      if (res.data.success) {
        toast.success(res.data.message);
        return true;
      } else {
        toast.error(res.data.message);
        return false;
      }
    } catch (error) {
      console.error('addShow error:', error);
      toast.error(error.response?.data?.message || 'Failed to add show');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // ADMIN: Get TMDB now playing movies
  const getNowPlayingMovies = async () => {
    try {
      const headers = await getAuthHeaders();
      const res = await axios.get(`${backendUrl}/api/show/now-playing`, headers);
      if (res.data.success) {
        return res.data.movies;
      }
      return [];
    } catch (error) {
      console.error('getNowPlayingMovies error:', error);
      return [];
    }
  };

  // Auto load movies on load
  useEffect(() => {
    getMovies();
  }, []);

  // Auto check admin and get favorites when auth state changes
  useEffect(() => {
    if (isSignedIn) {
      checkIsAdmin();
      getFavorites();
    } else {
      setIsAdminState(false);
      setFavorites([]);
    }
  }, [isSignedIn]);

  return (
    <AppContext.Provider
      value={{
        backendUrl,
        currency,
        movies,
        myBookings,
        favorites,
        isAdminState,
        loading,
        getMovies,
        getMovieDetails,
        getOccupiedSeats,
        bookSeats,
        getUserBookings,
        updateFavorites,
        getFavorites,
        checkIsAdmin,
        getDashboardData,
        getAllShows,
        getAllBookings,
        addShow,
        getNowPlayingMovies
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
