import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../redux/actions";
import { Redirect, useParams } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "36ch",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

const OrderDetail = () => {
var {orderId} = useParams()
console.log(orderId)

  const classes = useStyles();
  const products = useSelector((state) => state.products);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo);

  const getOrders = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/shoppingcart/allhistory`
      );
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(data);
  useEffect(() => {
    getOrders();
    dispatch(getAllProducts());
  }, [dispatch]);

  var id = 1;
  return (
    <>
    {userInfo && userInfo.roleId === 1 ? (
      <>
      <div style={{ margin: "20px", width: "100%" }}>
      <Paper style={{ width: "50%" }}>
        <h1>Order Detail</h1>
        <br />
        <br />
        {data?.map((item) => (
          item.id === parseInt(orderId) ? 
          (<main key={id++}>
            <p>
              <b>Order N°: </b> {item.id}
            </p>
            <p>
              <b>Customer: </b> {item.email}
            </p>
            <p>
              <b>Date: </b> {item.createdAt}
            </p>
            <p>
              <b>Status: </b> {item.statusOpen === false ? "Closed" : "Open"}
            </p>
            <br />
            <br />
            {item?.orders?.map((order) => (
              <List key={id++}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar
                      alt="shoes"
                      src={String(
                        products
                        .filter((product) => product.id === order.productId)
                        .map((img) => img.image)
                      )}
                      />
                  </ListItemAvatar>
                  <ListItemText
                    primary={products
                      .filter((product) => product.id === order.productId)
                      .map((img) => img.model)}
                      secondary={
                        <>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                          color="textPrimary"
                          >
                          <b>Product Id: </b> {order.productId}
                        </Typography>
                        <br />
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                          color="textPrimary"
                          >
                          <b>Product Size: </b> {order.sizeId}
                        </Typography>
                        <br />
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                          color="textPrimary"
                        >
                          <b>Quantity: </b> {order.quantity}
                        </Typography>
                        <br />
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                          color="textPrimary"
                          >
                          <b>Total: </b>{" "}
                          {order.quantity *
                            products
                              .filter(
                                (product) => product.id === order.productId
                                )
                                .map((img) => img.price)}
                        </Typography>
                      </>
                    }
                    ></ListItemText>
                  <br />
                </ListItem>
                <Divider />
              </List>
            ))}
          </main>) : <Redirect to="/signin" />
        ))}
      </Paper>
    </div>
      </>
    ) : null}
            </>
  );
};

export default OrderDetail;
