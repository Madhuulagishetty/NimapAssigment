import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const API_KEY = "c45a857c193f6302f2b5061c3b85e743";
const BASE_URL = "https://api.themoviedb.org/3";

const Home = ({ searchQuery }) => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMovies = async (query = "") => {
    try {
      const url = query
        ? `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&language=en-US&page=1`
        : `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

      const response = await axios.get(url);
      setPopularMovies(response.data.results);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(searchQuery);
  }, [searchQuery]);

  return (
    <div className="bg-gray-900 text-white min-h-screen w-full pt-10 pb-10">
      <div className="w-[100%] sm:w-[80%] mx-auto">
        <h1 className="text-4xl font-bold text-center pt-14 mb-8">Popular Movies</h1>

        {loading ? (
          <div className="flex justify-center items-center">
            <p className="text-2xl">Loading...</p>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-8 sm:gap-10 md:gap-6 lg:gap-4 m-[16px] md:m-0">
            {popularMovies.map((movie) => (
              <div
                key={movie.id}
                className="bg-gray-800 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl w-full sm:w-[200px] md:w-[200px] lg:w-[250px] xl:w-[280px]"
              >
                <Link to={`/movie/${movie.id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-[300px] object-cover rounded-t-lg"
                  />
                </Link>
                <div className="text-center pt-2 pb-4 px-2">
                  <h3 className="text-lg font-semibold pt-1">{movie.title}</h3>
                  <p className="text-gray-400">Rating: {movie.vote_average}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
