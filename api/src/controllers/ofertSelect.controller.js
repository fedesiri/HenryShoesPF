const { Products } = require("../db.js");

const ofertSelect = (req, res, next) => {
  let { id_oferta, id_destacado, porcentaje } = req.body;
  console.log(req.body)

  var array = id_oferta;
  try {
    try {
      if (array.length !== 0 && porcentaje.length === 0) {
        res.status(500).send("falta porcentaje")
      }

    } catch (err) {
      console.log(err)
    }


    try {
      if (array.length !== 0 && porcentaje.length !== 0) {
        var Promises = [];
        array.forEach((e) => {
          var newPromise = Products.update(
            {
              inOferta: true,
              porcentaje: porcentaje
            },
            { where: { id: Number(e) } }
          );
          Promises.push(newPromise);
        });
        Promise.all(Promises).then((result) => {
          result.forEach((r) => console.log(r));
        });
      }
    } catch (err) {
      console.log("Error adding ofert", err)

    }

    try {

      var arrayDestacado = id_destacado;

      if (arrayDestacado.length !== 0) {
        var Promises = [];
        arrayDestacado.forEach((e) => {
          var newPromise = Products.update(
            { inDestacados: true },
            { where: { id: Number(e) } }
          );
          Promises.push(newPromise);
        });
        Promise.all(Promises).then((result) => {
          result.forEach((r) => console.log(r));
        });
      }
    } catch (err) {
      console.log("Error adding 'Best sellers'.", err)
    }
    res.status(200).send({ message: "Information has been updated." });

  } catch (err) {
    res.status(500).send({ message: error.message });
  }
};

const deleteDestacado = async (req, res) => {
  let { id } = req.body
  try {
    const ResultUpDate = await Products.update({
      inDestacados: false,

    },
      { where: { "id": id } }

    )


    res.status(200).send("Product removed from 'Best Sellers'")
  } catch (err) {
    res.status(500).send({ message: error.message });
  }
}




const deletePromotion = async (req, res) => {
  let { id } = req.body
  try {
    const ResultUpDate = await Products.update({
      inOferta: false,
      porcentaje: null

    },
      { where: { "id": id } }

    )
    res.status(200).send("Product removed from 'Promotions'")
  } catch (err) {
    console.log(err)
    res.status(500).send({ message: error.message });
  }
}



module.exports = {
  ofertSelect,
  deleteDestacado,
  deletePromotion,
};




