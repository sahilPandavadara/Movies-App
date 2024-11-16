import { useGetAllMoviesQuery } from "../../redux/api/movies";
import { useFetchGenresQuery } from "../../redux/api/genre";
import {
  useGetNewMoviesQuery,
  useGetTopMoviesQuery,
  useGetRandomMoviesQuery,
} from "../../redux/api/movies";
import MovieCard from "./MovieCard";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import banner from "../../assets/banner3.jpg";
import {
  setMoviesFilter,
  setFilteredMovies,
  setMovieYears,
  setUniqueYears,
} from "../../redux/features/movies/moviesSlice";

const AllMovies = () => {
  const dispatch = useDispatch();
  const { data } = useGetAllMoviesQuery();
  const { data: genres } = useFetchGenresQuery();
  const { data: newMovies } = useGetNewMoviesQuery();
  const { data: topMovies } = useGetTopMoviesQuery();
  const { data: randomMovies } = useGetRandomMoviesQuery();

  const { moviesFilter, filteredMovies } = useSelector((state) => state.movies);

  const movieYears = data?.map((movie) => movie.year);
  const uniqueYears = Array.from(new Set(movieYears));

  useEffect(() => {
    dispatch(setFilteredMovies(data || []));
    dispatch(setMovieYears(movieYears));
    dispatch(setUniqueYears(uniqueYears));
  }, [data, dispatch]);

  const handleSearchChange = (e) => {
    dispatch(setMoviesFilter({ searchTerm: e.target.value }));

    const filteredMovies = data.filter((movie) =>
      movie.name.toLowerCase().includes(e.target.value.toLowerCase())
    );

    dispatch(setFilteredMovies(filteredMovies));
  };

  const handleGenreClick = (genreId) => {
    const filterByGenre = data.filter((movie) => movie.genre === genreId);
    dispatch(setFilteredMovies(filterByGenre));
  };

  const handleYearChange = (year) => {
    const filterByYear = data.filter((movie) => movie.year === +year);
    dispatch(setFilteredMovies(filterByYear));
  };

  const handleSortChange = (sortOption) => {
    switch (sortOption) {
      case "new":
        dispatch(setFilteredMovies(newMovies));
        break;
      case "top":
        dispatch(setFilteredMovies(topMovies));
        break;
      case "random":
        dispatch(setFilteredMovies(randomMovies));
        break;

      default:
        dispatch(setFilteredMovies([]));
        break;
    }
  };

  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 -translate-y-[5rem]">
      <>
        <section>
          <div
            className="relative h-[50rem] w-screen mb-10 flex items-center justify-center bg-cover"
            style={{ backgroundImage: `url(${banner})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-black opacity-60"></div>

            <div className="relative pt-32 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              Play<span className="text-blue-500">Box</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
              Cinematic Odyssey: Unveiling the Magic of Movies
            </p>
          </div>
            </div>

            <section className="absolute -bottom-[5rem]">
              <input
                type="text"
                className="w-[100%] h-[3rem] border px-10 outline-none rounded-full"
                placeholder="Search Movie"
                value={moviesFilter.searchTerm}
                onChange={handleSearchChange}
              />
              <section className="sorts-container mt-[2rem] ml-[10rem]  w-[30rem]">
                <select
                  className="border p-2 rounded text-black"
                  value={moviesFilter.selectedGenre}
                  onChange={(e) => handleGenreClick(e.target.value)}
                >
                  <option value="">Genres</option>
                  {genres?.map((genre) => (
                    <option key={genre._id} value={genre._id}>
                      {genre.name}
                    </option>
                  ))}
                </select>

                <select
                  className="border p-2 rounded ml-4 text-black"
                  value={moviesFilter.selectedYear}
                  onChange={(e) => handleYearChange(e.target.value)}
                >
                  <option value="">Year</option>
                  {uniqueYears.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>

                <select
                  className="border p-2 rounded ml-4 text-black"
                  value={moviesFilter.selectedSort}
                  onChange={(e) => handleSortChange(e.target.value)}
                >
                  <option value="">Sort By</option>
                  <option value="new">New Movies</option>
                  <option value="top">Top Movies</option>
                  <option value="random">Random Movies</option>
                </select>
              </section>
            </section>
          </div>

          <section className="mt-[10rem] w-screen flex justify-center items-center flex-wrap">
            {filteredMovies?.map((movie) => (
              <MovieCard key={movie._id} movie={movie} />
            ))}
          </section>
        </section>
      </>
    </div>
  );
};

export default AllMovies;


// import React, { useEffect, useMemo } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import banner from "../../assets/banner3.jpg";
// import { Search } from 'lucide-react';
// import { 
//   useGetAllMoviesQuery, 
//   useGetNewMoviesQuery,
//   useGetTopMoviesQuery,
//   useGetRandomMoviesQuery 
// } from "../../redux/api/movies";
// import { useFetchGenresQuery } from "../../redux/api/genre";
// import MovieCard from "./MovieCard";
// import {
//   setMoviesFilter,
//   setFilteredMovies,
//   setMovieYears,
//   setUniqueYears,
// } from "../../redux/features/movies/moviesSlice";

// const AllMovies = () => {
//   const dispatch = useDispatch();
//   const { data } = useGetAllMoviesQuery();
//   const { data: genres } = useFetchGenresQuery();
//   const { data: newMovies } = useGetNewMoviesQuery();
//   const { data: topMovies } = useGetTopMoviesQuery();
//   const { data: randomMovies } = useGetRandomMoviesQuery();
//   const { moviesFilter, filteredMovies } = useSelector((state) => state.movies);

//   // Memoizing computed values to avoid re-creating arrays
//   const movieYears = useMemo(() => data?.map((movie) => movie.year) || [], [data]);
//   const uniqueYears = useMemo(() => Array.from(new Set(movieYears)), [movieYears]);

//   useEffect(() => {
//     if (data) {
//       dispatch(setFilteredMovies(data));
//       dispatch(setMovieYears(movieYears));
//       dispatch(setUniqueYears(uniqueYears));
//     }
//   }, [data, dispatch, movieYears, uniqueYears]);

//   const handleSearchChange = (e) => {
//     dispatch(setMoviesFilter({ searchTerm: e.target.value }));
//     const filteredMovies = data?.filter((movie) =>
//       movie.name.toLowerCase().includes(e.target.value.toLowerCase())
//     );
//     dispatch(setFilteredMovies(filteredMovies || []));
//   };

//   const handleGenreClick = (genreId) => {
//     const filterByGenre = data?.filter((movie) => movie.genre === genreId);
//     dispatch(setFilteredMovies(filterByGenre || []));
//   };

//   const handleYearChange = (year) => {
//     const filterByYear = data?.filter((movie) => movie.year === +year);
//     dispatch(setFilteredMovies(filterByYear || []));
//   };

//   const handleSortChange = (sortOption) => {
//     switch (sortOption) {
//       case "new":
//         dispatch(setFilteredMovies(newMovies || []));
//         break;
//       case "top":
//         dispatch(setFilteredMovies(topMovies || []));
//         break;
//       case "random":
//         dispatch(setFilteredMovies(randomMovies || []));
//         break;
//       default:
//         dispatch(setFilteredMovies(data || []));
//         break;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-900">
//       {/* Hero Section */}
//       <div className="relative h-screen">
//         {/* Background Image */}
//         <div 
//           className="absolute inset-0 bg-cover bg-center bg-no-repeat"
//           style={{ backgroundImage: `url(${banner})` }}
//         >
//           <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-gray-900/80 to-gray-900"></div>
//         </div>

//         {/* Hero Content */}
//         <div className="relative pt-32 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
//           <div className="text-center">
//             <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
//               Play<span className="text-blue-500">Box</span>
//             </h1>
//             <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
//               Cinematic Odyssey: Unveiling the Magic of Movies
//             </p>
//           </div>

//           {/* Search and Filters */}
//           <div className="mt-12 max-w-4xl mx-auto">
//             {/* Search Bar */}
//             <div className="relative">
//               <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
//               <input
//                 type="text"
//                 className="w-full h-12 pl-12 pr-4 rounded-full bg-white/10 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 placeholder="Search for movies..."
//                 value={moviesFilter.searchTerm}
//                 onChange={handleSearchChange}
//               />
//             </div>

//             {/* Filters */}
//             <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
//               <select
//                 className="h-10 px-4 rounded-lg bg-white/10 border border-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer transition-all"
//                 value={moviesFilter.selectedGenre}
//                 onChange={(e) => handleGenreClick(e.target.value)}
//               >
//                 <option value="">All Genres</option>
//                 {genres?.map((genre) => (
//                   <option key={genre._id} value={genre._id}>
//                     {genre.name}
//                   </option>
//                 ))}
//               </select>

//               <select
//                 className="h-10 px-4 rounded-lg bg-white/10 border border-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer transition-all"
//                 value={moviesFilter.selectedYear}
//                 onChange={(e) => handleYearChange(e.target.value)}
//               >
//                 <option value="">All Years</option>
//                 {uniqueYears.map((year) => (
//                   <option key={year} value={year}>
//                     {year}
//                   </option>
//                 ))}
//               </select>

//               <select
//                 className="h-10 px-4 rounded-lg bg-white/10 border border-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer transition-all"
//                 value={moviesFilter.selectedSort}
//                 onChange={(e) => handleSortChange(e.target.value)}
//               >
//                 <option value="">Sort By</option>
//                 <option value="new">New Movies</option>
//                 <option value="top">Top Rated</option>
//                 <option value="random">Random</option>
//               </select>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Movies Grid */}
//       <div className="max-w-7xl mx-auto px-4 py-12 md:px-6 lg:px-8">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {filteredMovies?.map((movie) => (
//             <MovieCard key={movie._id} movie={movie} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AllMovies;









