import Axios from "./Axios";
import SummaryApi from "../common/SummaryApi.js";

const fetchUserDetails = async (tokenFromLogin = null) => {
  try {
    const token = tokenFromLogin || localStorage.getItem("accessToken");

    if (!token || token === "null") {
      console.log("No Token found, skipping API call");
      return null;
    }

    const response = await Axios({
      ...SummaryApi.userDetails,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default fetchUserDetails;
