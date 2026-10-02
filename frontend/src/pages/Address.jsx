import { useState } from "react";
import { useSelector } from "react-redux";
import AddAddress from "../components/AddAddress";
import { MdDeleteForever } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import EditAddressDetails from "../components/EditAddressDetails";
import AxiosToastError from "../utils/AxiosToastError";
import Axios  from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import { useGlobalContext } from "../Provider/GlobalProvider";

const Address = () => {
  const addressList = useSelector((state) => state.addresses.addressList);
  const [openAddress, setOpenAddress] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState({});
  const {fetchAddress} = useGlobalContext()

  const handleDisableAddress = async(id) => {
    try {
      const response = await Axios({
        ...SummaryApi.disableAddress,
        data : {
        _id : id
        }
      })
      if (response.data.success) {
        toast.success("Address Remove")
        if (fetchAddress) {
          fetchAddress()
          
        }
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }

  return (
    <div className="">
      <div className="bg-white shadow-lg px-2 py-2 flex justify-between gap-4 items-center">
        <h2 className="font-semibold text-ellipsis line-clamp-1">Address</h2>
        <button
          onClick={() => setOpenAddress(true)}
          className="border border-yellow-400 text-yellow-400 px-2 py-1 rounded-full hover:bg-yellow-400 hover:text-black"
        >
          Add Address
        </button>
      </div>
      <div className=" p-3 grid gap-4 bg-blue-50">
        {addressList.map((address, index) => {
          return (
            <div
              key={"address" + index}
              className={`border rounded p-3 flex gap-3 bg-white ${!address.status && 'hidden'}`}
            >
              <div className="w-full">
                <p>{address.address_line}</p>
                <p>{address.city}</p>
                <p>{address.state}</p>
                <p>
                  {address.country} - {address.pincode}
                </p>
                <p>{address.mobile}</p>
              </div>
              <div className="grid gap-10">
                <button
                  onClick={() => {
                    setOpenEdit(true);
                    setEditData(address);
                  }}
                  className="bg-green-200 p-1 rounded text-green-800 hover:text-white hover:bg-green-800 "
                >
                  <MdEdit size={20} />
                </button>
                <button onClick={() => handleDisableAddress(address._id)} className="bg-red-200 p-1 rounded text-red-600 hover:text-white hover:bg-red-600">
                  <MdDeleteForever size={20} />
                </button>
              </div>
            </div>
          );
        })}
        <div
          onClick={() => setOpenAddress(true)}
          className="h-16 bg-white border-2 border-dotted flex justify-center items-center cursor-pointer"
        >
          Add Address
        </div>
      </div>

      {openAddress && <AddAddress close={() => setOpenAddress(false)} />}
      {openEdit && (
        <EditAddressDetails data={editData} close={() => setOpenEdit(false)} />
      )}
    </div>
  );
};

export default Address;
