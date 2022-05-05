import { Link } from "react-router-dom";
import { useState } from "react";

function Nav() {
  const [userInp, setuserInp] = useState("");
  let handleChange = (value) => {
    setuserInp(value);
    // console.log(value);
  };

  return (
    <>
      <nav class="navbar navbar-light bg-primary">
        <div class="container-fluid">
          <span class="navbar-brand fs-4 text-light fw-bolder fontchange">
            Mobile
          </span>
          <form class="d-flex">
            <input
              class="form-control me-2"
              type="text"
              placeholder="Search"
              id="demo"
              name="search"
              onChange={(data) => {
                handleChange(data.target.value);
              }}
              aria-label="Search"
            />
            <Link class="btn btn-outline-light fontchange" to={`/${userInp}`}>
              Search
            </Link>
          </form>
        </div>
      </nav>
    </>
  );
}

export default Nav;
