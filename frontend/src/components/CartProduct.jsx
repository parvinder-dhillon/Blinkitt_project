import { Link } from "react-router-dom";
import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupees";
import { validURLConvert } from "../utils/ValidUrlConvert";
import { priceWithDiscount } from "../utils/PriceWithDiscount";
import AddToCartBtn from "./AddToCartBtn";

const CartProduct = ({ data }) => {

  const url = `/product/${validURLConvert(data.name)}-${data._id}`;

 
  

  return (
    <Link
      to={url}
      className="border py-2 lg:p-4 gap-1 grid lg:gap-3 min-w-36 lg:min-w-52 rounded bg-white"
    >
      <div className="min-h-20 max-h-24 lg:max-h-32 rounded w-full overflow-hidden">
        <img
          src={data.image[0]}
          className="w-full h-full object-scale-down lg:scale-125 "
          alt=""
        />
      </div>
      <div className="flex items-center gap-1">
        <div className="text-xs w-fit px-2 p-1 rounded text-green-600 bg-green-100">
          10 min
        </div>
        <div>
          {Boolean(data.discount) && (
            <p className="text-green-600 bg-green-100 px-2 w-fit text-xs rounded-full">
              {data.discount}% discount
            </p>
          )}
        </div>
      </div>

      <div className="px-1 font-medium text-ellipsis text-sm lg-text-base line-clamp-2">
        {data.name}
      </div>
      <div className="w-fit px-2 text-sm lg:text-base">{data.unit}</div>

      <div className="px-2 lg:px-0 flex items-center justify-between gap-1 lg:gap-3 text-sm lg:text-base">
        <div className="flex items-center gap-1">
          <div className="font-semibold">
            {DisplayPriceInRupees(priceWithDiscount(data.price, data.discount))}
          </div>
        </div>
        <div className="">
          {data.stock == 0 ? (
            <p className="text-red-500 text-sm text-center">Out of stock</p>
          ) : (
           <AddToCartBtn data={data}/>
          )}
        </div>
      </div>
    </Link>
  );
};

export default CartProduct;
