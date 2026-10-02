import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupees";
import { useGlobalContext } from "../Provider/GlobalProvider";
import { GoTriangleRight } from "react-icons/go";
import { useSelector } from "react-redux";
import AddToCartBtn from "./AddToCartBtn";
import { priceWithDiscount } from "../utils/PriceWithDiscount";
import emptyCartImg from "../assets/empty_cart.webp";
import toast from "react-hot-toast";

const DisplayCartItems = ({ close }) => {
  const { notDiscountTotalPrice, totalPrice, totalQty } = useGlobalContext();
  const cartItem = useSelector((state) => state.cartItem.cart);
  const user = useSelector(state => state.user)
  const navigate = useNavigate()

  const redirectToCheckoutPage = () => {
     if (user?._id) {
       navigate("/checkout")
       if (close) {
        close()
       }
       return
     }
     toast.error("Please Login")
  }
  
  return (
    <section className="bg-neutral-900/70 fixed top-0 bottom-0 right-0 left-0 z-50">
      <div className="bg-white w-full max-w-sm min-h-screen max-h-screen ml-auto">
        <div className="flex items-center p-4 shadow-md gap-3 justify-between">
          <h2 className="font-semibold">Cart</h2>
          <Link to={"/"} className="lg:hidden">
            <IoClose size={25} />
          </Link>
          <button onClick={close} className="hidden lg:block">
            <IoClose size={25} />
          </button>
        </div>
        <div className="lg:min-h-[80vh] min-h-[77vh] h-full max-h-[calc(100vh-150px)] bg-blue-50 p-2 flex flex-col gap-4">
          {/* display items */}
          {cartItem[0] ? (
            <>
              <div className="flex justify-between items-center py-2 px-4 bg-blue-100 text-blue-500 rounded-full ">
                <p>Your Total Savings</p>
                <p>
                  {DisplayPriceInRupees(notDiscountTotalPrice - totalPrice)}</p>
              </div>

              <div className="bg-white rounded-lg p-4 grid gap-5 overflow-auto">
                {
                cartItem[0] &&
                  cartItem.map((item, index) => {
                    return (
                      <div
                        key={"cartitem" + index}
                        className="flex w-full gap-5"
                      >
                        <div className="h-16 w-16 min-h-16 min-w-16 border rounded">
                          <img
                            src={item?.productId?.image[0]}
                            alt=""
                            className="object-scale-down"
                          />
                        </div>

                        <div className="w-full max-w-sm text-xs">
                          <p className="text-xs text-ellipsis line-clamp-2">
                            {item?.productId?.name}
                          </p>
                          <p className="text-neutral-500">
                            {item?.productId?.unit}
                          </p>
                          <p className="font-semibold">
                            {DisplayPriceInRupees(
                              priceWithDiscount(
                                item?.productId?.price,
                                item?.productId.discount,
                              ),
                            )}
                          </p>
                        </div>
                        <div>
                          <AddToCartBtn data={item?.productId} />
                        </div>
                      </div>
                    );
                  })}
              </div>

              <div className="bg-white p-4">
                <h3 className="font-semibold">Bill Details</h3>
                <div className="flex gap-4 justify-between ml-1">
                  <p>Items Total</p>
                  <p className="flex items-center gap-3"><span className="line-through text-neutral-400">{DisplayPriceInRupees(notDiscountTotalPrice)}</span><span>{DisplayPriceInRupees(totalPrice)}</span></p>
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
                  <p >Grand Total</p>
                  <p>{DisplayPriceInRupees(totalPrice)}</p>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white flex flex-col justify-center items-center">
              <img
                src={emptyCartImg}
                alt=""
                className="w-full h-full object-scale-down"
              />
              <Link
                onClick={close}
                to={"/"}
                className="bg-green-600 px-4 py-2 text-white rounded cursor-pointer hover:bg-green-500"
              >
                Shop Now
              </Link>
            </div>
          )}
        </div>

        {cartItem[0] && (
          <div className="p-2">
            <div className="bg-green-700 text-neutral-100 px-x font-bold text-base py-4 sticky bottom-3 rounded flex items-center gap-4 justify-between">
              <div>{DisplayPriceInRupees(totalPrice)}</div>

              <button onClick={redirectToCheckoutPage} className="flex items-center gap-1 cursor-pointer">
                Proceed
                <span>
                  <GoTriangleRight size={20} />
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DisplayCartItems;
