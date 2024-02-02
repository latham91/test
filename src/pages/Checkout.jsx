import { useSubscription } from "../pages/SubscriptionContext";
import "../styles/Checkout.css";

const Checkout = () => {
  const { state, dispatch } = useSubscription();

  const handleRemoveSubscription = (index) => {
    const removedSubscription = state.subscriptions[index];

    dispatch({
      type: "REMOVE_SUBSCRIPTION",
      payload: index,
    });
  };

  const handlePayNow = () => {
    alert("Thanks for paying for your subscriptions! Have a purrrrfect day!");

    dispatch({
      type: "CLEAR_SUBSCRIPTIONS",
    });
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>

      <div className="subscriptions-list">
        <h3>Subscriptions:</h3>
        <ul>
          {state.subscriptions.map((subscription, index) => (
            <li key={index}>
              {`${subscription.name} - ${subscription.months} months - £${subscription.price}`}
              <button onClick={() => handleRemoveSubscription(index)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="total-amount">
        <h3>Total Amount:</h3>
        <p>£{state.totalAmount.toFixed(2)}</p>
      </div>

      {state.subscriptions.length > 0 && (
        <button onClick={handlePayNow} className="pay-now-button">
          Pay Now
        </button>
      )}
    </div>
  );
};

export default Checkout;
