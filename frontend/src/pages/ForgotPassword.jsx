import { useState } from "react";
import toast from "react-hot-toast";
import Axios from "axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import {useNavigate, Link } from 'react-router-dom'

const ForgotPassword = () => {
  const [data, setData] = useState({
    email: "",
  });

  const navigate = useNavigate()

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
        ...SummaryApi.forgot_password,
        data : data
      });

      if (response.data.error) {
        toast.error(response.data.message)
        
      }
     
      if (response.data.success) {
        toast.success(response.data.message,)
        navigate('/verification-otp', {
          state :  data,
          message : 'otp verifyed'
        })
        setData({
          email : "",
        })
        
      }
    
    } catch (error) {
      AxiosToastError(error)
    }

    
  };

  return (
    <section className="w-full container mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7">
        <p className="text-2xl text-green-700 font-semibold">Forgot Password</p>

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
        

          <button
            disabled={!validValue}
            className={`${validValue ? "bg-green-800" : "bg-gray-500"} text-white py-2 rounded font-semibold mt-3 tracking-wide`}
          >
           Send OTP
          </button>
        </form>

        <p>Already have account ? <Link to={'/login'} className="font-semibold text-green-700 hover:text-green-600">Login</Link></p>
      </div>
    </section>
  );
};

export default ForgotPassword
