import { useState } from "react";
import {
  useGetNewMoviesQuery,
  useGetTopMoviesQuery,
  useGetRandomMoviesQuery,
} from "../../redux/api/movies";

import "../../CSS/MoviesContainerPage.css";

import { useFetchGenresQuery } from "../../redux/api/genre";
import SliderUtil from "../../component/SliderUtil";

const MoviesContainerPage = () => {
  const { data } = useGetNewMoviesQuery();
  const { data: topMovies } = useGetTopMoviesQuery();
  const { data: genres } = useFetchGenresQuery();
  const { data: randomMovies } = useGetRandomMoviesQuery();

  const [selectedGenre, setSelectedGenre] = useState(null);

  const handleGenreClick = (genreId) => {
    setSelectedGenre(genreId);
  };

  const filteredMovies = data?.filter(
    (movie) => selectedGenre === null || movie.genre === selectedGenre
  );

  return (
    <div className="flex flex-col lg:flex-row lg:justify-between items-center mt-8">
      <section className="flex flex-col items-center justify-center w-full min-h-screen">
        <div className="w-full lg:max-w-[80rem] mb-8 flex flex-col items-center">
          <h1 className="mb-5 text-2xl font-semibold text-center">
            Choose For You
          </h1>
          <div className="w-full max-w-[80rem] px-4">
            <SliderUtil data={randomMovies} />
          </div>
        </div>

        <div className="w-full lg:max-w-[80rem] mb-8 flex flex-col items-center">
          <h1 className="mb-5 text-2xl font-semibold text-center">
            Top Movies
          </h1>
          <div className="w-full max-w-[80rem] px-4">
            <SliderUtil data={topMovies} />
          </div>
        </div>

        <div className="w-full lg:max-w-[80rem] mb-8 flex flex-col items-center">
          {/* Title and Genres in one row */}
          <div className="flex flex-col lg:flex-row items-center justify-between w-full px-4">
            <h1 className="text-2xl font-semibold text-center lg:text-left mb-4 lg:mb-0">
              Choose Movie
            </h1>
            <nav className="genres-nav flex flex-wrap justify-center lg:justify-start gap-4">
              {genres?.map((g) => (
                <button
                  key={g._id}
                  className={`genre-button transition duration-300 ease-in-out hover:bg-gray-200 p-2 rounded text-lg ${
                    selectedGenre === g._id ? "bg-gray-200" : ""
                  }`}
                  onClick={() => handleGenreClick(g._id)}
                >
                  {g.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Slider section */}
          <div className="w-full max-w-[80rem] px-4 mt-4">
            <SliderUtil data={filteredMovies} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default MoviesContainerPage;
