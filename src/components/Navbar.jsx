import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <img src="/onlycats_logo.png" alt="OnlyCats Logo" className="logo" />
      <div className="links-container">
        <ul className="navbar-links">
          <li>
            <Link to="/">HOME</Link>
          </li>
          <li>
            <Link to="/Catalog">CATALOG</Link>
          </li>
          <li>
            <Link to="/Guidelines">GUIDELINES</Link>
          </li>
        </ul>
      </div>
      <Link to="/Checkout" className="checkout-btn">
        CHECKOUT
      </Link>
    </nav>
  );
};

export default Navbar;