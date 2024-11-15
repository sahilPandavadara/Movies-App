import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetSpecificMovieQuery,
  useAddMovieReviewMutation,
} from "../../redux/api/movies";
import MovieTabs from "./MovieTabs";
import { PlayCircle } from "lucide-react";

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
            <div className="flex items-center space-x-6">
              <h2 className="text-3xl md:text-5xl font-bold">{movie?.name}</h2>
            </div>

            {/* Movie Details */}
            <p className="mt-4 text-gray-400 max-w-lg">{movie?.detail}</p>

            <button className="flex items-center px-6 py-3 bg-red-600 rounded-lg hover:bg-red-700 transition transform hover:scale-105 mt-5">
              <PlayCircle className="w-8 h-8 mr-2" />
              <span className="font-semibold">Watch Now</span>
            </button>

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
