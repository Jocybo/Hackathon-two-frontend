import "./App.css";
import axios from "axios";
import Context from "./context";
import Card from "./components/Card";
import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"

function App() {
  const [state, setState] = useState([]);

  let pagenumber = 10;
  let getdata = async () => {
    const { data } = await axios.get("https://b32-hackathon2-backend-webscra.herokuapp.com/products/");
    setState(data);
  }

  useEffect(() => {
    getdata();
  }, [])

  return (
    <>
      <Context.Provider value={{ state, setState, pagenumber }}>
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Card}></Route>
            <Route path="/:id" component={Card}></Route>
          </Switch>
        </BrowserRouter>
      </Context.Provider>

    </>
  );
}
export default App;