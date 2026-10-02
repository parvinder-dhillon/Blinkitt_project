import { useState } from "react";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { useEffect } from "react";
import Loading from "../components/Loading";
import ProductCartAdmin from "../components/ProductCartAdmin";
import { IoSearchSharp } from "react-icons/io5";
// import EditProductAdmin from "../components/EditProductAdmin";


const ProductAdmin = () => {
  const [productData, setProductData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPageCount, setTotalPageCount] = useState(1);
  const [search, setSearch] = useState("");

  const fetchProductData = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getProduct,
        data: {
          page: page,
          limit: 12,
          search: search,
        },
      });
      const { data: responseData } = response;

      if (responseData.success) {
        setTotalPageCount(responseData.totalNoPage);
        setProductData(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
    fetchProductData();
    },300)
     return () => {
      clearTimeout(delayDebounceFn);
    };
  }, [page]);

  const handleNext = async () => {
    if (page !== totalPageCount) {
      setPage((prev) => prev + 1);
    }
  };
  const handlePrev = async () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handleOnChange = (e) => {
    const { value } = e.target;
    setSearch(value);
    setPage(1);
  };
  useEffect(() => {
    let flag = true;
    const delayDebounceFn = setTimeout(() => {
      if (flag) {
        fetchProductData();
      }
      flag = false;
    }, 300);
    return () => {
      clearTimeout(delayDebounceFn);
    };
  }, [search]);

  return (
    <section>
      <div className="p-2 font-semibold bg-white shadow-md flex items-center justify-between gap-4">
        <h2 className="font-semibold">Product</h2>
        <div className="h-full min-w-24 max-w-56 w-full ml-auto bg-blue-50 px-4 flex items-center gap-3 py-2 border-yellow-400 focus-within:border rounded ">
          <IoSearchSharp size={25} />
          <input
            type="text"
            placeholder="Search Product here....."
            className="h-full py-2 outline-none bg-transparent"
            value={search}
            onChange={handleOnChange}
          />
        </div>
      </div>
      {loading && <Loading />}

      <div className="p-4 bg-blue-50">
        <div className="min-h-[55vh]">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 ">
            {productData.map((p, index) => {
              return(
                 <ProductCartAdmin key={"item"+index} data={p} fetchProductData={fetchProductData}/>)
            })}
          </div>
        </div>

        <div className="flex justify-between my-4">
          <button
            onClick={handlePrev}
            className="border border-yellow-400 px-4 py-1 hover:bg-yellow-400 rounded"
          >
            Prev
          </button>
          <button className="w-full bg-white">
            {page}/{totalPageCount}
          </button>
          <button
            onClick={handleNext}
            className="border border-yellow-400 px-4 py-1 hover:bg-yellow-400 rounded"
          >
            Next
          </button>
        </div>
      </div>
      {/* <EditProductAdmin/> */}
    </section>
  );
};

export default ProductAdmin;
