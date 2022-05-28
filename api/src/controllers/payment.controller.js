import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const createPayment = async (req, res) => {
    // console.log(req.body)
  try {
    const order = {
      intent: "CAPTURE",
      purchase_units: [
        // array de las unidades de compra
        {
          amount: {
            currency_code: "USD",
            value: req.body.total,
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
  } catch (error) {
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

    // console.log(response.data);
  res.send("capture order"); //! redireccionar a la pagina de gracias por comprar o perfil usuario/ordenes
};

export const cancelPayment = async (req, res) => {
  res.send("cancel order"); //! redireccionar a la pagina del carrito
};
