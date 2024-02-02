import PropTypes from "prop-types";
import "../styles/Notification.css";

const Notification = ({ message, type, onClose }) => {
  return (
    <div className={`notification ${type}`}>
      <p>{message}</p>
      <button onClick={onClose}>&times;</button>
    </div>
  );
};

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Notification;
