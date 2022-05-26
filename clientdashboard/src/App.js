import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./app.css";
import ProductList from "./components/pages/productList/ProductList";
import Product from "./components/pages/product/Product";

function App() {
  return (
    <Router>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Switch>
          {/* HOME */}
          {/* USERLIST */}
          {/* USER */}
          {/* NEWUSER verificar si poner o no */}
          {/* PRODUCTLIST */}
          <Route path="/products">
            <ProductList />
          </Route>
          {/* PRODUCT */}
          <Route path="/product/:id">
            <Product />
          </Route>
          {/* NEWPRODUCT */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
