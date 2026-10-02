const CartLoading = () => {
  return (
    <div className="border py-2 lg:p-4 gap-1 grid lg:gap-3 min-w-36 lg:min-w-52 rounded bg-white animate-pulse">
      <div className="min-h-24 lg:min-h-20 bg-blue-50 rounded"></div>
      <div className="p-2 lg:p-3 bg-blue-50 rounded w-20"></div>
      <div className="p-2 lg:p-3 rounded bg-blue-50"></div>
      <div className="p-2 lg:p-3  bg-blue-50 rounded w-14"></div>

      <div className="flex items-center justify-between gap-3">
        <div className="p-2 lg:p-3  bg-blue-50 rounded w-20"></div>
        <div className="p-2 lg:p-3  bg-blue-50 rounded w-20"></div>
      </div>
    </div>
  );
};

export default CartLoading;
