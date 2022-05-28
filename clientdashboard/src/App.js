import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./app.css";
import ProductList from "./components/pages/productList/ProductList";
import Product from "./components/pages/product/Product";
import CreateProduct from "./components/pages/createProduct/CreateProduct";
import UserList from "./components/pages/userList/UserList";
import User from "./components/pages/user/User";
import CreateBrand from "./components/pages/createBrand/CreateBrand";
import CreateCategory from "./components/pages/createCategory/CreateCategory";


function App() {
  return (
    <Router>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Switch>
          {/* HOME */}
          <Route path="/users">
            <UserList />
          </Route>
          <Route path="/user/:userId">
            <User />
          </Route>
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
          <Route path="/create-products">
          <CreateProduct />
          </Route>
          {/* NEWCATEGORY */}
          <Route path="/create-category">
          <CreateCategory />
          </Route>
          {/* NEWBRAND */}
          <Route path="/create-brand">
          <CreateBrand />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
