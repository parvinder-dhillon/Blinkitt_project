import { useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import toast from "react-hot-toast";
import Axios from "axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { useNavigate, Link } from "react-router-dom";
import fetchUserDetails from "../utils/fetchUserDetails";
import { setUserDetails } from "../store/userSlice";
import { useDispatch } from "react-redux";
// import { setUserDetails } from "../store/userSlice";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const validValue = Object.values(data).every((el) => el);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios({
        ...SummaryApi.login,
        data: data,
      });

      if (response.data.error) {
        toast.error(response.data.message);
      }

      if (response.data.success) {
        toast.success(response.data.message);

        const accessToken = response.data.data.accessToken;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", response.data.data.refreshToken);

        const userDetails = await fetchUserDetails(accessToken);
        if (userDetails) {
          dispatch(setUserDetails(userDetails.data));
        }

        setData({
          email: "",
          password: "",
        });
        navigate("/");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="w-full container mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7">
        <p className="text-2xl text-green-700 font-semibold">Login</p>

        <form onSubmit={handleSubmit} className="grid gap-2 mt-3 py-4">
          <div className="grid gap-1">
            <label htmlFor="email">Email : </label>
            <input
              type="text"
              id="email"
              className="bg-blue-50 p-2 border rounded outline-none focus:border-yellow-400"
              value={data.email}
              name="email"
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="password">Password : </label>
            <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-yellow-400">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                autoFocus
                className="w-full outline-none"
                value={data.password}
                name="password"
                onChange={handleChange}
                placeholder="Enter your password"
              />

              <div
                onClick={() => setShowPassword((preve) => !preve)}
                className="cursor-pointer"
              >
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </div>
            </div>
            <Link
              to={"/forgot-password"}
              className="block ml-auto hover:text-yellow-400"
            >
              Forgot password ?
            </Link>
          </div>

          <button
            disabled={!validValue}
            className={`${validValue ? "bg-green-800" : "bg-gray-500"} text-white py-2 rounded font-semibold mt-3 tracking-wide`}
          >
            Login
          </button>
        </form>

        <p>
          Don't have account ?{" "}
          <Link
            to={"/register"}
            className="font-semibold text-green-700 hover:text-green-600"
          >
            Register
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
