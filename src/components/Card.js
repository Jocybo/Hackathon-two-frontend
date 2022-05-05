import { useState, useEffect, useContext } from "react";
import Context from "../context";
import axios from "axios";
function Card({ match }) {

  const context = useContext(Context);
  const [card, setCard] = useState([]);

  //To  Fetch data
  let getSearch = async () => {
    if (context.state.length !== 0 || match.path === "/:id") {
      if (match.path === "/:id") {
        const { data } = await axios.get(
          `https://webscrapbackend.herokuapp.com/product/${match.params.id}`
        );

        setCard(data);

      } else {

        pagination(context.state);
      }
    } else {
      const { data } = await axios.get(
        "https://webscrapbackend.herokuapp.com/product"
      );

      pagination(data);
    }
  };

  useEffect(() => {
    getSearch();
  }, []);

  //To Change States --> when params change
  useEffect(() => {
    getSearch();
  }, [match.params.id]);

  //---> Pagination<---//

  let pageValues = [];

  let pagination = (data) => {
    pageValues = [...data];


    previousPage();
  };

  let nextPage = () => {
    if (pageValues.length === 0) {
      pageValues = [...context.state];

    }
    let newPage = [];

    let pageStart = context.pagenumber;
    let pageEnd = context.pagenumber + 10;
    for (let i = pageStart; i < pageEnd; i++) {
      newPage.push(pageValues[i]);
    }
    setCard(newPage);
    context.pagenumber = pageEnd;
    if (context.pagenumber >= pageValues.length) {
      context.pagenumber = pageValues.length - 10;
    }
  };
  let previousPage = () => {
    if (pageValues.length === 0) {
      pageValues = [...context.state];
    }
    let newPage = [];

    let pageEnd = context.pagenumber;
    let pageStart = context.pagenumber - 10;
    for (let i = pageStart; i < pageEnd; i++) {
      newPage.push(pageValues[i]);
    }
    setCard(newPage);

    context.pagenumber = pageStart;

    if (context.pagenumber <= 0) {
      context.pagenumber = 10;
    }
  };

  return (
    <div>
      <div className="container-fluid  boxgrid">
        {card.map((scrapData) => {
          return (
            <div className="box" key={scrapData._id}>
              <img
                className="card-img-top boximg"
                alt="Mobile"
                style={{ width: "100%" }}
                src={scrapData.productImage}
              ></img>
              <div className="card-body">
                <p className="prducttitle">{scrapData.productName}</p>
                <p className="productrating">Rating : {scrapData.productRating}</p>
                <p className="finalprice">Price : {scrapData.offerPrice} <span className="actualPrice">{scrapData.productPrice}</span></p>

              </div>
            </div>
          );
        })}
      </div>
      {match.params.id ? (
        <>

        </>
      ) : (
        <div className="pagination mb-3">
          <button
            type="button"
            className="btn btn-outline-dark"
            onClick={previousPage}
          >
            Previous
          </button>
          <button
            type="button"
            className="btn btn-outline-dark ms-3"
            onClick={nextPage}>
            Next
          </button>
        </div>
      )}
    </div>
  );
}
export default Card;
