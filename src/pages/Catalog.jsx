import { useState, useEffect, useCallback } from "react";
import { faker } from "@faker-js/faker";
import CatModal from "./CatModal";
import { useNavigate } from "react-router-dom";
import { useSubscription } from "./SubscriptionContext";
import Notification from "./Notification";
import "../styles/Catalog.css";

const Catalog = () => {
  const { dispatch } = useSubscription();

  const [imagesData, setImagesData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 10;
  const maxPages = 6;

  const [loadedImages, setLoadedImages] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedCat, setSelectedCat] = useState(null);
  const { addSubscription } = useSubscription();

  const navigate = useNavigate();

  const pageNumbers = Array.from({ length: maxPages }, (_, i) => i + 1);

  const [notification, setNotification] = useState(null);

  const fetchPage = useCallback(
    async (page) => {
      setLoading(true);

      if (loadedImages[page]) {
        setLoading(false);
        return;
      }

      const url = `https://api.thecatapi.com/v1/images/search?limit=${itemsPerPage}&page=${page}`;
      const api_key =
        "live_5oFkLgqzJlEQoqfSM9wGAxXNFmRO04OisLkOKupqH5gc2PLAurQ9nUASoiraLDKK";

      try {
        const response = await fetch(url, {
          headers: {
            "x-api-key": api_key,
          },
        });

        let data = await response.json();
        data = data.filter((imageData) => !imageData.url.endsWith(".gif"));

        data = data.map((imageData) => ({
          ...imageData,
          gender: Math.random() > 0.5 ? "Male" : "Female",
          name: faker.name.firstName(),
          breed: faker.animal.cat(),
        }));

        setImagesData((prevData) => [...prevData, ...data]);
        setLoadedImages((prevLoadedImages) => ({
          ...prevLoadedImages,
          [page]: true,
        }));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    },
    [loadedImages]
  );

  useEffect(() => {
    fetchPage(currentPage);
  }, [currentPage, fetchPage]);

  const totalPages = Math.min(
    Math.ceil(imagesData.length / itemsPerPage),
    maxPages
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = imagesData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    fetchPage(pageNumber);
  };

  const handleSubscribe = (info) => {
    dispatch({ type: "SUBSCRIBE", payload: info });
    setShowModal(false);

    // Show a notification when the subscription is added
    setNotification({
      message:
        "Item has been added to the checkout. Please continue to browse.",
      type: "success", // You can define different types for different styles
    });
  };

  return (
    <div className="catalog-page">
      <div className="imgrid" id="grid">
        {currentItems.map((imageData, index) => (
          <div
            className="card"
            key={index}
            onClick={() => {
              setSelectedCat(imageData);
              setShowModal(true);
            }}
          >
            <img src={imageData.url} alt={`Cat ${index}`} loading="lazy" />
            <h1 className="name">{imageData.name}</h1>
            <p className="gender">
              {imageData.gender === "Male" ? (
                <i className="fas fa-mars gender-icon male-color"></i>
              ) : (
                <i className="fas fa-venus gender-icon female-color"></i>
              )}
            </p>
            <p className="breed">{imageData.breed}</p>
            <button
              className="subscribe-button"
              onClick={() =>
                handleSubscribe({
                  name: imageData.name,
                  months: Math.floor(Math.random() * 4) + 1,
                  price: (Math.random() * 20).toFixed(2),
                })
              }
            >
              SUBSCRIBE
            </button>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button
          onClick={() => paginate(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            className={currentPage === pageNumber ? "active" : ""}
            onClick={() => paginate(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
        <button
          onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
        >
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      {showModal && (
        <CatModal
          catData={selectedCat}
          onClose={() => setShowModal(false)}
          onSubscribe={handleSubscribe}
        />
      )}
    </div>
  );
};

export default Catalog;
