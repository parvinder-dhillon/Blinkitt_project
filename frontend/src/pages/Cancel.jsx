import { Link } from "react-router-dom";

const Cancel = () => {
  return (
    <div className="m-2 w-full max-w-md bg-red-200 p-4 mx-auto py-5 flex flex-col justify-center items-center gap-5">
      <p className="text-red-700 text-lg font-bold text-center">Order Cancel</p>
      <Link
        to="/"
        className="border border-red-700 px-4 py-1 text-red-700 hover:bg-red-700 hover:text-red-100 transition-all"
      >
        Go To Home
      </Link>
    </div>
  );
};

export default Cancel;
