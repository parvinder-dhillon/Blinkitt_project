import { useEffect, useState } from "react";
import CartLoading from "../components/CartLoading";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import CartProduct from "../components/CartProduct";
import InfiniteScroll from "react-infinite-scroll-component";
import { useLocation } from "react-router-dom";
import noDataImage from '../assets/nothing here yet.webp'

const SearchPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadingArrayCard = new Array(10).fill(null);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const params = useLocation()
  const searchText = params?.search?.slice(3)



  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.searchProduct,
        data: {
          search: searchText,
          page : page,
        },
      });
      const { data: responseData } = response;

      if (responseData.success) {
        if (responseData.page == 1) {
          setData(responseData.data);
        } else {
          setData((prev) => {
            return [...prev, ...responseData.data];
          });
        }

        setTotalPage(responseData.totalPage);
        console.log(responseData);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
       fetchData();
    }, 200);
  },[page,searchText]);

console.log('page', page);

  const handleFetchMore = () => {
    if (totalPage > page) {
      setPage(prev => prev +1)
      
    }
  }

  return (
    <section className="bg-white">
      <div className="container mx-auto p-4">
        <p className="font-semibold">Search Results: {data.length}</p>
        <InfiniteScroll
         dataLength={data.length}
         hisMore={true}
         next={handleFetchMore}>
          <div className="grid grid-cols-1 lg:grid-cols-5 sm:grid-cols-2 md:grid-cols-3 gap-4 py-4">
            {/* data */}

            {data.map((p, index) => {
              return (
                <CartProduct data={p} key={p?._id + "searchproduct" + index} />
              );
            })}
            

            {/* loading data */}
            {loading &&
              loadingArrayCard.map((_, index) => {
                return <CartLoading key={"loadingsearchpage" + index} />;
              })}
          </div>
        </InfiniteScroll>

        {
              // no data
              !data[0] && !loading && (
                <div className="flex flex-col justify-center items-center mx-auto w-full">
                  <img src={noDataImage} alt="" className="w-full h-full max-w-xs max-h-xs"/>
                  <p className="font-semibold my-2">No Data Found</p>
                </div>
              )
            }
      </div>
    </section>
  );
};

export default SearchPage;
