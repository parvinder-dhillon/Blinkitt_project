import { TiShoppingCart } from "react-icons/ti";
import { useGlobalContext } from "../Provider/GlobalProvider";
import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupees";
import { Link } from "react-router-dom";
import { GoTriangleRight } from "react-icons/go";
import { useSelector } from "react-redux";

const CartMobileLink = () => {
  const { totalPrice, totalQty } = useGlobalContext();
  const cartItem = useSelector((state) => state.cartItem.cart);

  return (
    <>
      {cartItem[0] && (
        <div className="sticky bottom-4 p-2">
          <div className="bg-green-700 px-2 py-1 rounded text-white text-sm flex items-center justify-between gap-3 lg:hidden">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-green-500 rounded w-fit">
                <TiShoppingCart />
              </div>
              <div className="text-xs">
                <p>{totalQty} items</p>
                <p>{DisplayPriceInRupees(totalPrice)}</p>
              </div>
            </div>

            <Link to="/cart" className="flex items-center gap-1">
              <span className="text-sm">View Cart</span>
              <GoTriangleRight size={20}/>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default CartMobileLink;
