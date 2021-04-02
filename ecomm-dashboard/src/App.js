import logo from './logo.svg';
import './App.css';
import Header from "./components/includes/Header";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import AddProduct from "./components/products/AddProduct";
import UpdateProduct from "./components/products/UpdateProduct";
import Protected from "./components/Protected";
import ProductList from "./components/products/ProductList";
import SearchProduct from "./components/products/SearchProduct";
import Profile from "./components/user/Profile";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Switch>
                <Route path="/login">
                    <Login/>
                </Route>
                <Route path="/register">
                    <Register/>
                </Route>
                <Route exact path="/">
                    <Protected Cmp={ProductList} />
                </Route>
                <Route path="/add">
                    <Protected Cmp={AddProduct} />
                </Route>
                <Route path="/update/:id">
                    <Protected Cmp={UpdateProduct} />
                </Route>
                <Route path="/search">
                    <Protected Cmp={SearchProduct} />
                </Route>
                <Route path="/profile/:id">
                    <Protected Cmp={Profile} />
                </Route>
            </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
