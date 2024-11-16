import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../component/Loader";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { useLoginMutation } from "../../redux/api/users";
import { toast } from "react-toastify";
import bg from "../../assets/login_half.png";
import logo from "../../assets/play-box-logo.png";
 
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="flex h-screen bg-[#050813]">
      {/* Left Section (Form) */}
      <div className="w-[40%] flex flex-col justify-center items-start pl-[5rem] text-white">
        {/* PlayBox Logo */}
        <div className="mb-8">
          <img
            src={logo}
            alt="PlayBox Logo"
            className="h-[3rem] w-auto"
          />
        </div>

        <h1 className="text-2xl font-semibold mb-4">Sign In</h1>

        <form onSubmit={submitHandler} className="w-[75%]">
          <div className="my-[3rem]">
            <label
              htmlFor="email"
              className="block text-sm font-medium"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 p-2 w-full border-b border-white bg-transparent text-white focus:outline-none"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="my-[2rem]">
            <label
              htmlFor="password"
              className="block text-sm font-medium"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 p-2 w-full border-b border-white bg-transparent text-white focus:outline-none"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full my-[1rem]"
          >
            {isLoading ? "Signing In ..." : "Sign In"}
          </button>
          {isLoading && <Loader />}
        </form>

        <div className="mt-4 text-center w-full">
          <p>
            New Customer?{" "}
            <Link
              to={redirect ? `/register?redirect=${redirect}` : "/register"}
              className="text-blue-600 hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>

      {/* Right Section (Image) */}
      <div className="w-[60%] h-full">
        <img
          src={bg}
          alt="Background"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default Login;
