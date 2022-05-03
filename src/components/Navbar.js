/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from "react-router-dom";
import { useState } from "react";


function Nav() {

  const [path, setPath] = useState("");
  let handleChange = (value) => {
    setPath(value);
    console.log(value);
  };

  return (
    <>
      <nav class="navbar navbar-light bg-primary">
        <div class="container-fluid">
          <a class="navbar-brand fs-4 text-light fw-bolder fontchange">Mobile</a>
          <form class="d-flex">
            <input class="form-control me-2" type="text"  placeholder="Search" id="demo" name="search" onChange={(data)=>{
              handleChange(data.target.value)
            }} aria-label="Search"/>
              <Link class="btn btn-outline-light fontchange" to={`/${path}`}>Search</Link>
          </form>
        </div>
      </nav>
    </>
  );
}

export default Nav;
