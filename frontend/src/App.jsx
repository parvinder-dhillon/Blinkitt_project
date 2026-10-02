import { Outlet, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useEffect } from "react";
import fetchUserDetails from "./utils/fetchUserDetails.js";
import { setUserDetails } from "./store/userSlice.js";
import { useDispatch } from "react-redux";
import GlobalProvider from "./Provider/GlobalProvider";
import {
  setAllCategory,
  setAllSubCategory,
  setLoadingCategory,
} from "./store/productSlice.js";
import SummaryApi from "./common/SummaryApi.js";
import Axios from "./utils/Axios.js";
import CartMobileLink from "./components/CartMobileLink";
function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  const fetchUser = async () => {
    const userData = await fetchUserDetails();
    dispatch(setUserDetails(userData?.data));
  };

  const fetchCategory = async () => {
    try {
      dispatch(setLoadingCategory(true));
      const response = await Axios({
        ...SummaryApi.getCategory,
      });
      const { data: responseData } = response;

      if (responseData.success) {
        dispatch(setAllCategory(responseData.data));
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoadingCategory(false));
    }
  };

  const fetchSubCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getSubCategory,
      });
      const { data: responseData } = response;

      if (responseData.success) {
        dispatch(setAllSubCategory(responseData.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchCategory();
    fetchSubCategory();
  }, []);
 

  return (
    <GlobalProvider>
      <Header />
      <main className="min-h-[78vh]">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
      {
      location.pathname !== "/checkout" && (
      <CartMobileLink />
      )}
    </GlobalProvider>
  );
}

export default App;
