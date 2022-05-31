import axios from "axios";
import dotenv from "dotenv";
import ShoppingCart from "../models/ShoppingCart.js";
import User from "../models/User.js";
import Orders from "../models/Orders.js"
dotenv.config();

export const createPayment = async (req, res) => {
    // console.log("SOY BODY PAYYY", req.body)
    // console.log("TOTAL", req.body.total)
    const {email, total} = req.body
    let denegatedOrders = [];

    try {
    const selectedCart = await ShoppingCart.findOne({
      where: {
        email: email,
        statusOpen: true
      },
      include: {
        model: Orders,
        attributes: ["sizeId", "productId", "quantity", "stock"],
      },
    });
  
    console.log(await selectedCart.orders)

    await selectedCart.orders.map( (ord) => {
      if (ord.quantity > ord.stock){
        denegatedOrders.push(ord)
      }
    })

  if(await denegatedOrders.length == 0){  
    const order = {
      intent: "CAPTURE",
      purchase_units: [
        // array de las unidades de compra
        {
          amount: {
            currency_code: "USD",
            value: total,
          },
          description: "Compra de productos",
        },
      ],
      application_context: {
        brand_name: "HenryShoes",
        landing_page: "LOGIN",
        user_action: "PAY_NOW",
        return_url: "http://localhost:3001/payment/capture-order", //Si pagas con paypal, esta es la url de la pagina de retorno
        cancel_url: "http://localhost:3001/payment/cancel-order", //si cancela la compra, esta es la url de la pagina de retorno
      },
    };

    //para colocar valores dentro de una URL. No puedo directamente porque es como un formulario
    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");

    const {
      data: { access_token },
    } = await axios.post(
      `https://api-m.sandbox.paypal.com/v1/oauth2/token`,
      params,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        auth: {
          username: process.env.PAYPAL_API_CLIENT,
          password: process.env.PAYPAL_API_SECRET,
        },
      }
    );

    //Peticion a la ruta post de paypal
    const response = await axios.post(
      `${process.env.PAYPAL_API}/v2/checkout/orders`,
      order,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    // console.log(access_token);
    // console.log(response.data);

    res.json(response.data);

  }else{
    res.status(500).send(denegatedOrders)
  }

  } catch (error) {
    console.log(error)
    return res.status(500).send({ message: "Something went wrong" });
  }
};

export const capturePayment = async (req, res) => {
    const { token } = req.query;
    // console.log(token);
    const response = await axios.post(`${process.env.PAYPAL_API}/v2/checkout/orders/${token}/capture`, {}, {
        auth: {
            username: process.env.PAYPAL_API_CLIENT,
            password: process.env.PAYPAL_API_SECRET,
        }
    })

    console.log(response.data);
  res.redirect("http://localhost:3000/payment-success"); //! redireccionar a la pagina de gracias por comprar o perfil usuario/ordenes
};

export const cancelPayment = async (req, res) => {
  res.redirect('http://localhost:3000/payment-cancel'); //! redireccionar a la pagina del carrito
};


export const CloseCart = async (req, res) => {
  const {email, prices} = req.body;

  try{
    const selectedCart = await ShoppingCart.findOne({
      where:{
        email: email,
        statusOpen: true
      },
      include: {
        model: Orders,
        attributes: ["sizeId", "productId", "quantity", "stock", "id", "price"],
      },
    });

    //console.log(selectedCart.orders,"Esto es selectedd")

    await selectedCart.orders.map((element, index) => {

      const newStock = element.stock-element.quantity
      const id = element.id

      element.update({
        id: id,
        stock: newStock,
        price: prices[index]
    },
    {
      where:{
        id: id,
      }
    }
    )
    });
  
  const closeCart = await ShoppingCart.update(
    {
      statusOpen: false
    },
    {
    where:{
      email: email,
      statusOpen: true
    }
  });

  const newShoppingCart = await ShoppingCart.create();

  const selectedUser = await User.findOne({
    where:{
      email: email
    }
  })

  await selectedUser.addShoppingCart(newShoppingCart);

  const closedCart = await ShoppingCart.findOne({
    where:{
      email: email,
      statusOpen: false
    },
    include: {
      model: Orders,
      attributes: ["sizeId", "productId", "quantity", "stock"],
    },
  });


  res.send(closedCart)
}catch(err){
  console.log(err)
  res.send(err)
}
}