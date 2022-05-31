import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import { useSelector } from 'react-redux';



const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function Review() {
  const classes = useStyles();
  // const products = useSelector((state) => state.shoppingCartUserRegister)
  const products = useSelector((state) => state.AuxShopingCartBack);

  // console.log(products)

  const getTotal = () => {
    let total = 0;
    products.newArray.forEach((product) => {
      total +=    (product.price- Math.ceil(product.price*product.porcentaje/100)) * product.quantity;
    });
    return total;
  }
  // console.log(getTotal())

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {products.newArray.map((product) => (
          <ListItem className={classes.listItem} key={product.id}>
            <ListItemText primary={product.model} secondary={`${"Quantity"}: ${product.quantity}`} />
            <Typography variant="body2">{`$${product.price*product.quantity}`}</Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
           ${getTotal()}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
       
        
      </Grid>
    </React.Fragment>
  );
}