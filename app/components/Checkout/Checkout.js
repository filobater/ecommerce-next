const Checkout = ({ onCheckout, totalPrice }) => {
  return (
    <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-lg font-medium text-gray-900">Order summary</h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">Order total</div>
          <span className="font-semibold">{totalPrice}$</span>
        </div>
      </div>
      <button
        onClick={onCheckout}
        className="rounded-full bg-black border border-transparent px-5 py-3 disabled:cursor-not-allowed disabled:opacity-50 text-white font-semibold hover:opacity-75 transition w-full mt-6"
      >
        Checkout
      </button>
    </div>
  );
};

export default Checkout;
