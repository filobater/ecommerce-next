import StripeCheckout from 'react-stripe-checkout';
import { message } from 'antd';

const Checkout = ({ totalPrice }) => {
  const [messageApi, contextHolder] = message.useMessage();

  const msg = (type, msg, close) => {
    messageApi.open({
      type: type,
      content: msg,
      duration: 1.8,
      onClose: () => close,
    });
  };

  const onToken = () => {
    localStorage.removeItem('cart');
    msg('success', 'Payment completed successfully', window.location.reload());
  };

  return (
    <div className="shadow-md mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      {contextHolder}
      <h2 className="text-lg font-medium text-gray-900">Order summary</h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">Order total</div>
          <span className="font-semibold">{totalPrice}$</span>
        </div>
      </div>

      <StripeCheckout
        token={onToken}
        amount={totalPrice * 100}
        currency="USD"
        name="Store ecommerce"
        description={`Your total is $${totalPrice}`}
        stripeKey={
          'pk_test_51LNNKvCrZ4wrcd7hccJCu5sxg2xQSc28JB4LxRZdywgNAruOv5Lf7JiSFjpWzJKT0RGaJd8EFn3UeJVxRR4aYa2T00q43EYm7j'
        }
      >
        <button className="rounded-full bg-black border border-transparent px-5 py-3 disabled:cursor-not-allowed disabled:opacity-50 text-white font-semibold hover:opacity-75 transition w-full mt-6">
          Checkout
        </button>
      </StripeCheckout>
    </div>
  );
};

export default Checkout;
