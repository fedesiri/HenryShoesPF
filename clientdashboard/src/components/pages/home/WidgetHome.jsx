import React, { useEffect, useState } from "react";
import axios from "axios";
import "./widgetHome.css";

const WidgetHome = () => {
  const [data, setData] = useState([]);

  const getOrders = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/shoppingcart/allhistory`
      );
      setData(response.data);
      //   console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
//   console.log(data);
  useEffect(() => {
    getOrders();
  }, []);

  let revenue = data?.map((item) =>
    item.orders.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)
  );
  console.log(revenue);

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Revenues</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">
            $ {revenue ? revenue.reduce((acc, curr) => acc + curr, 0) : 0 }
          </span>
        </div>
        <span className="featuredSub">from your sales</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Sales</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{data ? data.length : 0}</span>
        </div>
        <span className="featuredSub">from this month</span>
      </div>
    </div>
  );
};

export default WidgetHome;
