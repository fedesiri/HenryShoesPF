import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./app.css";
import ProductList from "./components/pages/productList/ProductList";
import Product from "./components/pages/product/Product";
import CreateProduct from "./components/pages/createProduct/CreateProduct";
import UserList from "./components/pages/userList/UserList";
import User from "./components/pages/user/User";
import CreateBrand from "./components/pages/createBrand/CreateBrand";
import CreateCategory from "./components/pages/createCategory/CreateCategory";
import Orders from "./components/pages/orders/Orders";
import OrderDetail from "./components/orderDetail/OrderDetail";
import OnSaleBestsellers from "./components/pages/onSaleBestsellers/OnSaleBestsellers";
import SignIn from "./components/signin/Signin";
import ForgotPassword from "./components/signin/ForgotPassword";
import Home from "./components/pages/home/Home";

function App() {


  return (
    <Router>
      <Topbar />
      <div className="container">
        {/* <div> */}
        <Sidebar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/users">
            <UserList />
          </Route>
          <Route exact path="/user/:userId">
            <User />
          </Route>
          <Route exact path="/products">
            <ProductList />
          </Route>
          {/* PRODUCT */}
          <Route exact path="/product/:id">
            <Product />
          </Route>
          {/* NEWPRODUCT */}
          <Route exact path="/create-products">
            <CreateProduct />
          </Route>
          <Route exact path="/onsale-bestsellers">
            <OnSaleBestsellers />
          </Route>
          {/* NEWCATEGORY */}
          <Route path="/create-category">
            <CreateCategory />
          </Route>
          {/* NEWBRAND */}
          <Route exact path="/create-brand">
            <CreateBrand />
          </Route>
          <Route exact path="/orders">
            <Orders />
          </Route>
          <Route exact path="/detail/:orderId">
            <OrderDetail />
          </Route>
          <Route exact path="/signin">
            <SignIn />
          </Route>
          <Route exact path="/forgot-password">
            <ForgotPassword />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
