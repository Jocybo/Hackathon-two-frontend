import { useState, useEffect, useContext } from "react";
import Context from "../context";
import axios from "axios";
function Card({ match }) {

    const context = useContext(Context);
    const [card, setCard] = useState([]);


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
            const { data } = await axios.get("https://webscrapbackend.herokuapp.com/product");
            pagination(data);
        }
    };

    useEffect(() => {
        getSearch();
    },[]);

    useEffect(() => {
        getSearch();
    }, [match.params.id]);

    let allvalues = [];

  let pagination = (data) => {
    allvalues = [...data];

    previousPage();
  };

  let nextPage = () => {
    if (allvalues.length === 0) {
      allvalues = [...context.state];
    }
    let temp = [];

    let startindex = context.pagenumber;
    let endindex = context.pagenumber + 10;
    for (let i = startindex; i < endindex; i++) {
      temp.push(allvalues[i]);
    }
    setCard(temp);
    context.pagenumber = endindex;
    if (context.pagenumber >= allvalues.length) {
      context.pagenumber = allvalues.length - 10;
    }
  };
  let previousPage = () => {
    if (allvalues.length === 0) {
      allvalues = [...context.state];
    }
    let temp = [];

    let endindex = context.pagenumber;
    let startindex = context.pagenumber - 10;
    for (let i = startindex; i < endindex; i++) {
      temp.push(allvalues[i]);
    }
    setCard(temp);

    context.pagenumber = startindex;

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
                            <img className="boximg" alt="Mobile" style={{ width: "100%" }} src={scrapData.productImage}></img>
                            <div className="card-body">
                                <p className="title">{scrapData.productName}</p>
                                <p className="productrating">Rating : {scrapData.productRating}</p>
                                <p className="offerPrice">Price : {scrapData.offerPrice}<span className="actualPrice"> {scrapData.productPrice}</span></p>
                            </div>
                        </div>
                    );
                })}
            </div>
            {match.params.id ? (
                <>
                </>
            ) : (
                <div className="pagination mb-4">
                     <button type="button" className="btn btn-outline-dark fontchange"onClick={previousPage}>
                        Previous
                    </button>
                    <button type="button" className="btn btn-outline-dark ms-3 fontchange" onClick={nextPage}>
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}
export default Card;
