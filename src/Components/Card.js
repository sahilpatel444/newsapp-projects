import React, { useContext, useState } from "react";
import "./Card.css";
import { InputContext } from "../Context/inputContext";
const Card = ({ data }) => {
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const { theme,newsData } = useContext(InputContext);

  // Safeguard for non-array or empty data
  const validData = Array.isArray(newsData) ? newsData : [];

  // Calculate total pages
  const totalPages = Math.ceil(validData.length / itemsPerPage);

  // Get current items to display
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = validData.slice(startIndex, endIndex);

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // pagination dropdown select number
  const handleItemsPerPageChange = (event) => {
    const newItemsPerPage = parseInt(event.target.value, 10);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to the first page on items per page change
  };

  console.log(currentItems, "currentitems");

  console.log(data, "all news");

  return (
    <div className={theme}>
      <div className="cardContainer ">
        {Array.isArray(currentItems) &&
          currentItems.map((curItem, index) => (
            <div className="card">
              <img src={curItem.urlToImage} alt="news_photo" />
              <div className="cardContent">

                <p className="date  ">
                  by {curItem.author} on{" "}
                  {new Date(curItem.publishedAt).toDateString()}
                </p>

                <a className="titleCard" href={curItem.url} target="_blank" rel="noreferrer" >
                  {curItem.title}
                </a>
                <p style={{ color: "black" }}>{curItem.description}</p>
                <a
                  style={{ color: "black" }}
                  href={curItem.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <button>Read More</button>
                </a>
              </div>
            </div>
          ))}

        {/* //   Pagination controls  */}
        <div className="pagination">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={currentPage === index + 1 ? "active" : ""}
              onClick={() => goToPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>

          <select value={itemsPerPage} onChange={handleItemsPerPageChange} className={theme}>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Card;
