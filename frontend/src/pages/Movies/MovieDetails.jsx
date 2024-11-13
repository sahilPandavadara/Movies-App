import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetSpecificMovieQuery,
  useAddMovieReviewMutation,
} from "../../redux/api/movies";
import MovieTabs from "./MovieTabs";

const MovieDetails = () => {
  const { id: movieId } = useParams();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { data: movie, refetch } = useGetSpecificMovieQuery(movieId);
  const { userInfo } = useSelector((state) => state.auth);
  const [createReview, { isLoading: loadingMovieReview }] =
    useAddMovieReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        id: movieId,
        rating,
        comment,
      }).unwrap();

      refetch();

      toast.success("Review created successfully");
    } catch (error) {
      toast.error(error.data || error.message);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="max-w-screen-xl mx-auto p-6">
        {/* Go Back Link */}
        <Link
          to="/"
          className="text-white font-semibold hover:underline text-lg md:text-2xl"
        >
          ← Go Back
        </Link>

        {/* Main Content */}
        <div className="mt-8 md:mt-12 lg:flex lg:space-x-8">
          {/* Movie Image */}
          <div className="flex justify-center lg:flex-none lg:w-1/2">
            <img
              src={movie?.image}
              alt={movie?.name}
              className="w-full md:w-3/4 lg:w-full rounded-lg shadow-lg"
            />
          </div>

          {/* Movie Info */}
          <div className="mt-8 lg:mt-0 lg:w-1/2">
            {/* Movie Title and Play Button */}
            <div className="flex items-center space-x-4">
              <h2 className="text-3xl md:text-5xl font-bold">{movie?.name}</h2>
              <button className="flex items-center bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.752 11.168l-6.084 3.422a1 1 0 01-1.482-.874V9.284a1 1 0 011.482-.874l6.084 3.422a1 1 0 010 1.736z"
                  />
                </svg>
                Play Now
              </button>
            </div>

            {/* Movie Details */}
            <p className="mt-4 text-gray-400 max-w-lg">{movie?.detail}</p>

            {/* Release Date & Cast */}
            <div className="mt-8 space-y-4">
              <p className="text-xl font-semibold">
                Releasing Date:{" "}
                <span className="text-gray-400">{movie?.year}</span>
              </p>
              <div>
                <h3 className="text-xl font-semibold">Cast:</h3>
                <ul className="text-gray-400">
                  {movie?.cast.map((c) => (
                    <li key={c._id} className="mt-2 text-lg">
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs for Reviews */}
        <div className="mt-12 md:mt-16">
          <MovieTabs
            loadingMovieReview={loadingMovieReview}
            userInfo={userInfo}
            submitHandler={submitHandler}
            rating={rating}
            setRating={setRating}
            comment={comment}
            setComment={setComment}
            movie={movie}
          />
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
