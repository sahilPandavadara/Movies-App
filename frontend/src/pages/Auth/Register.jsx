import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../component/Loader";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { useRegisterMutation } from "../../redux/api/users";
import { toast } from "react-toastify";
import logo from "../../assets/play-box-logo.png";
import netflix from "../../assets/netflix.png";
import mx from "../../assets/mx.jpg";
import disney from "../../assets/disney.jpg";
import prime from "../../assets/prime.png";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedPackage, setSelectedPackage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

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

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else if (!selectedPackage) {
      toast.error("Please select a subscription package.");
    } else {
      try {
        const res = await register({ username, email, password, packageId: selectedPackage }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
        toast.success("User successfully registered.");
      } catch (err) {
        toast.error(err.data.message || err.error);
      }
    }
  };

  const packages = [
    {
      id: 1,
      name: "Silver",
      services: [
        { name: "Netflix", logo: netflix },
        { name: "Disney", logo: disney },
      ],
      price: 299,
    },
    {
      id: 2,
      name: "Gold",
      services: [
        { name: "Netflix", logo: netflix },
        { name: "MX Player", logo: mx },
        { name: "Disney", logo: disney },
      ],
      price: 599,
    },
    {
      id: 3,
      name: "Platinum",
      services: [
        { name: "Netflix", logo: netflix },
        { name: "Prime", logo: prime },
        { name: "MX Player", logo: mx },
        { name: "Disney+ Hotstar", logo: disney },
      ],
      price: 999,
    },
  ];

  return (
    <div className="flex h-screen bg-[#050813] text-white">
      {/* Left Section (Form) */}
      <div className="w-[40%] flex flex-col justify-center items-start pl-[5rem] text-white">
        <div className="mb-8">
          <img src={logo} alt="PlayBox Logo" className="h-[3rem] w-auto" />
        </div>

        <h1 className="text-2xl font-semibold mb-4">Register</h1>

        <form onSubmit={submitHandler} className="w-[75%]">
          <div className="my-[2rem]">
            <label htmlFor="name" className="block text-sm font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 p-2 w-full border-b border-white bg-transparent text-white focus:outline-none"
              placeholder="Enter Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="my-[2rem]">
            <label htmlFor="email" className="block text-sm font-medium">
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
            <label htmlFor="password" className="block text-sm font-medium">
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
          <div className="my-[2rem]">
            <label htmlFor="confirmPassword" className="block text-sm font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="mt-1 p-2 w-full border-b border-white bg-transparent text-white focus:outline-none"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full my-[1rem]"
          >
            {isLoading ? "Registering..." : "Register"}
          </button>

          {isLoading && <Loader />}
        </form>

        <div className="mt-4 text-center w-full">
          <p>
            Already have an account?{" "}
            <Link
              to={redirect ? `/login?redirect=${redirect}` : "/login"}
              className="text-teal-500 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>

      {/* Right Section (Subscription Options) */}
      <div className="w-[60%] h-full flex flex-col justify-start p-8">
        <h1 className="text-3xl font-semibold mb-2">Subscription</h1>
        <p className="text-gray-400 mb-4">Choose your package</p>

        <div className="space-y-4">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className={`flex items-center justify-between rounded-lg p-6 shadow-md cursor-pointer ${
                selectedPackage === pkg.id ? "bg-gray-700" : "bg-gray-800"
              }`}
              onClick={() => setSelectedPackage(pkg.id)}
            >
              {/* Package Name */}
              <div className="flex flex-col">
                <p className="text-xl font-semibold mb-2">{pkg.name} Package</p>
                {/* Services */}
                <div className="flex space-x-4">
                  {pkg.services.map((service, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-center w-24 h-16 bg-gray-700 rounded-md"
                    >
                      <img
                        src={service.logo}
                        alt={`${service.name} logo`}
                        className="h-10"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Price and Select Button */}
              <div className="flex items-center space-x-8">
                <p className="text-xl font-semibold">₹{pkg.price}</p>
                <button
                  onClick={(e) => {
                    setSelectedPackage(pkg.id);
                  }}
                  className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 ${
                    selectedPackage === pkg.id ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={selectedPackage === pkg.id}
                >
                  Select
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Register;
