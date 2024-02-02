import { createContext, useContext, useReducer } from "react";

const SubscriptionContext = createContext();

const initialState = {
  subscriptions: [],
  totalAmount: 0,
};

const subscriptionReducer = (state, action) => {
  switch (action.type) {
    case "SUBSCRIBE":
      return {
        ...state,
        subscriptions: [...state.subscriptions, action.payload],
        totalAmount: state.totalAmount + parseFloat(action.payload.price),
      };

    case "REMOVE_SUBSCRIPTION":
      const removedSubscription = state.subscriptions[action.payload];
      return {
        ...state,
        subscriptions: state.subscriptions.filter(
          (_, i) => i !== action.payload
        ),
        totalAmount: state.totalAmount - parseFloat(removedSubscription.price),
      };

    case "CLEAR_SUBSCRIPTIONS":
      return {
        ...state,
        subscriptions: [],
        totalAmount: 0,
      };

    default:
      return state;
  }
};

const SubscriptionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(subscriptionReducer, initialState);

  const value = {
    state,
    dispatch,
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
};

const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error(
      "useSubscription must be used within a SubscriptionProvider"
    );
  }
  return context;
};

export { SubscriptionProvider, useSubscription };
