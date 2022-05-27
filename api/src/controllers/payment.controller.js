import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const createPayment = async (req, res) => {
  const order = {
    intent: "CAPTURE",
    purchase_units: [
      // array de las unidades de compra
      {
        amount: {
          currency_code: "USD",
          value: "100.00",
        },
        description: "Compra de productos",
      },
    ],
    application_context: {
      brand_name: "HenryShoes",
      landing_page: "LOGIN",
      user_action: "PAY_NOW",
      return_url: "http://localhost:3000/payment/capture-order", //Si pagas con paypal, esta es la url de la pagina de retorno
      cancel_url: "http://localhost:3000/payment/cancel-order", //si cancela la compra, esta es la url de la pagina de retorno
    },
  };

  //Peticion a la ruta post de paypal
  const response = await axios.post(
    `${process.env.PAYPAL_API}/v2/checkout/orders`,
    order,
    {
      auth: {
        username: process.env.PAYPAL_API_CLIENT,
        password: process.env.PAYPAL_API_SECRET,
      },
    }
  );
  console.log(response.data);

  res.send("creating order");
};

export const capturePayment = async (req, res) => {
  res.send("capture order");
};

export const cancelPayment = async (req, res) => {
  res.send("cancel order");
};
