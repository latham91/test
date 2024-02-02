import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Guidelines from "./pages/Guidelines";
import Checkout from "./pages/Checkout";
import { SubscriptionProvider } from "./pages/SubscriptionContext";
import MyAudioComponent from "./Components/Audio.jsx";
import "./styles/App.css";

const App = () => {
  return (
    <Router>
      <SubscriptionProvider>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Catalog" element={<Catalog />} />
            <Route path="/Guidelines" element={<Guidelines />} />
            <Route path="/Checkout" element={<Checkout />} />
          </Routes>
          <MyAudioComponent />
        </div>
      </SubscriptionProvider>
    </Router>
  );
};

export default App;
