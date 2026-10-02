import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "axios";
import toast from "react-hot-toast";
import SummaryApi from "../common/SummaryApi";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const valideValue = Object.values(data).every(el => el);

  useEffect(() => {
    if (!location?.state?.data?.success) {
      navigate("/");
    }

    if (location?.state?.email) {
      setData((prev) => {
        return {
          ...prev,
          email: location?.state?.email,
        };
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  console.log("data reset password", data);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // optional
    if (data.newPassword !== data.confirmPassword) {
      toast.error("New password and confirm password must be same")
      return
    }

    try {
      const response = await Axios({
        ...SummaryApi.ResetPassword, 
        data: data,
      });

      console.log('reset password response', response.data);
      

      if (response.data.error) {
        toast.error(response.data.message);
      }

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
        setData({
          email: "",
          newPassword: "",
          confirmPassword: "",
        });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="w-full container mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7">
        <p className="text-2xl text-green-700 font-semibold">
          Enter Your Password
        </p>

        <form onSubmit={handleSubmit} className="grid gap-2 mt-3 py-4">
          <div className="grid gap-1">
            <label htmlFor="newPassword">New Password : </label>

            <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-yellow-400">
              <input
                type={showPassword ? "text" : "password"}
                id="newpassword"
                autoFocus
                className="w-full outline-none"
                value={data.newPassword}
                name="newPassword"
                onChange={handleChange}
                placeholder="Enter your new password"
              />

              <div
                onClick={() => setShowPassword((preve) => !preve)}
                className="cursor-pointer"
              >
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </div>
            </div>
          </div>

          <div className="grid gap-1">
            <label htmlFor="confirmPassword">Confirm Password : </label>

            <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-yellow-400">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                autoFocus
                className="w-full outline-none"
                value={data.confirmPassword}
                name="confirmPassword"
                onChange={handleChange}
                placeholder="Enter your confirm password"
              />

              <div
                onClick={() => setShowConfirmPassword(preve => !preve)}
                className="cursor-pointer"
              >
                {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </div>
            </div>
          </div>
          <button
            disabled={!valideValue}
            className={`${valideValue ? "bg-green-800" : "bg-gray-500"} text-white py-2 rounded font-semibold mt-3 tracking-wide`}
          >
            Change Password
          </button>
        </form>

        <p>
          Already have account ?{" "}
          <Link
            to={"/login"}
            className="font-semibold text-green-700 hover:text-green-600"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default ResetPassword;
