import  { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import Axios from "axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { useNavigate, Link, useLocation } from "react-router-dom";

const OtpVerification = () => {
  const [data, setData] = useState(["", "", "", "", "", ""]);
  const navigate = useNavigate();
  const inputRef = useRef([])
  const location = useLocation()

  console.log(location, 'location');
  

  useEffect(()=>{
     if (!location?.state?.email) {
      navigate('/forgot-password')
      
     }
  },[])

  const valideValue = data.every((el) => el);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios({
        ...SummaryApi.forgot_password_otp_verification,
        data: {
          otp : data.join(""),
          email : location?.state?.email
        }
      });

      if (response.data.error) {
        toast.error(response.data.message);
      }

      if (response.data.success) {
        toast.success(response.data.message);
        setData(["", "", "", "", "", ""]);
        navigate('/reset-password', {
          state : {
            data : response.data,
            email : location?.state?.email
          }
        })
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="w-full container mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7">
        <p className="text-2xl text-green-700 font-semibold">Enter OTP</p>

        <form onSubmit={handleSubmit} className="grid gap-2 mt-3 py-4">
          <div className="grid gap-1">
            <label htmlFor="otp">Enter your OTP : </label>
            <div className="flex items-center gap-2 justify-between mt-3">
              {data.map((element, index) => {
                return (
                  <input
                    key={'otp'+index}
                    type="text"
                    id="otp"
                    ref={(ref)=>{
                       inputRef.current[index] = ref
                       return ref
                    }}
                    value={data[index]}
                    onChange={(e) => {
                      const value = e.target.value;
                      console.log("value", value);

                      const newData = [...data];
                      newData[index] = value; setData(newData);

                      if (value && index < 5) {
                        inputRef.current[index+1].focus()
                        
                      }
                    }}
                    maxLength={1}
                    className="bg-blue-50 p-2 w-full border max-w-16  rounded outline-none focus:border-yellow-400 text-center font-semibold"
                  />
                );
              })}
            </div>
          </div>

          <button
            disabled={!valideValue}
            className={`${valideValue ? "bg-green-800" : "bg-gray-500"} text-white py-2 rounded font-semibold mt-3 tracking-wide`}
          >
            Verify OTP
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

export default OtpVerification;
