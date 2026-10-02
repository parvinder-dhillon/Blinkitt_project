import { useState } from "react";
import { useGlobalContext } from "../Provider/GlobalProvider";
import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupees";
import AddAddress from "../components/AddAddress";
import { useSelector } from "react-redux";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";



const CheckoutPage = () => {
  const { notDiscountTotalPrice, totalPrice, totalQty, fetchCartItem, fetchOrder } =
    useGlobalContext();
  const [openAddress, setOpenAddress] = useState(false);
  const addressList = useSelector((state) => state.addresses.addressList);
  const [selectedAddress, setSelectedAddress] = useState(0);
  const cartItemList = useSelector((state) => state.cartItem.cart);
  const navigate = useNavigate();
  

  const handleCashOnDelivery = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.cashOnDelivery,
        data: {
          list_items: cartItemList,
          addressId: addressList[selectedAddress]?._id,
          totalAmt: totalPrice,
          subTotalAmt: totalPrice,
        },
      });
      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        if (fetchCartItem) {
          fetchCartItem();
        }
        if (fetchOrder) {
          fetchOrder()
        }
        navigate("/success", {
        state : {
          text : "Order"
        }
        })
        
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const handleOnlinePayment = async () => {
    try {
      toast.loading("Loading...")
      const response = await Axios({
        ...SummaryApi.paymentUrl,
        data : {
          list_items: cartItemList,
          addressId: addressList[selectedAddress]?._id,
          totalAmt: totalPrice,
          subTotalAmt: totalPrice,
        }
      })

      const {data : responseData} = response

      if (responseData?.url) {
        window.location.href = responseData.url;
      }
         if (fetchOrder) {
          fetchOrder()
        
      }else{
        toast.error(responseData?.message || "Failed to redirect to payment gatway")
      }

      
    } catch (error) {
      AxiosToastError(error)
      
    }
  }

  return (
    <section className="bg-blue-50">
      <div className="container mx-auto p-4 flex flex-col lg:flex-row w-full gap-5 justify-between">
        <div className="w-full">
          {/* address */}
          <h3 className="text-lg font-semibold">Choose your address</h3>
          <div className="bg-white p-3 grid gap-4">
            {addressList.map((address, index) => {
              return (
                <label
                  htmlFor={"address" + index}
                  className={!address.status && `hidden`}
                >
                  <div className="border rounded p-3 flex gap-3 hover:bg-blue-50">
                    <div className="">
                      <input
                        id={"address" + index}
                        type="radio"
                        name="address"
                        value={index}
                        onChange={(e) => setSelectedAddress(e.target.value)}
                      />
                    </div>
                    <div>
                      <p>{address.address_line}</p>
                      <p>{address.city}</p>
                      <p>{address.state}</p>
                      <p>
                        {address.country} - {address.pincode}
                      </p>
                      <p>{address.mobile}</p>
                    </div>
                  </div>
                </label>
              );
            })}
            <div
              onClick={() => setOpenAddress(true)}
              className="h-16 bg-blue-50 border-2 border-dotted flex justify-center items-center cursor-pointer"
            >
              Add Address
            </div>
          </div>
        </div>
        <div className="w-full max-w-md bg-white py-4 px-2">
          {/* summary */}
          <h3 className="text-lg font-semibold">Summary</h3>
          <div className="bg-white p-4">
            <h3 className="font-semibold">Bill Details</h3>
            <div className="flex gap-4 justify-between ml-1">
              <p>Items Total</p>
              <p className="flex items-center gap-3">
                <span className="line-through text-neutral-400">
                  {DisplayPriceInRupees(notDiscountTotalPrice)}
                </span>
                <span>{DisplayPriceInRupees(totalPrice)}</span>
              </p>
            </div>

            <div className="flex gap-4 justify-between">
              <p>Quantity Total</p>
              <p className="flex items-center gap-3">{totalQty} item</p>
            </div>
            <div className="flex gap-4 justify-between">
              <p>Delivery Charge</p>
              <p className="flex items-center gap-3">Free</p>
            </div>
            <div className="font-semibold flex items-center justify-between gap-4">
              <p>Grand Total</p>
              <p>{DisplayPriceInRupees(totalPrice)}</p>
            </div>
          </div>
          <div className="w-full max-w-sm flex flex-col gap-4">
            <button onClick={handleOnlinePayment} className="py-2 px-4 bg-green-600 text-white font-semibold hover:bg-green-700 rounded cursor-pointer">
              Online Payment
            </button>
            <button
              onClick={handleCashOnDelivery}
              className="py-2 px-4 border border-green-600 text-green-600 font-semibold hover:bg-green-600 hover:text-white rounded cursor-pointer"
            >
              Cash on Delivery
            </button>
          </div>
        </div>
      </div>

      {openAddress && <AddAddress close={() => setOpenAddress(false)} />}
    </section>
  );
};

export default CheckoutPage;
