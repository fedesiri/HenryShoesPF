const { Products } = require("../db.js");

const ofertSelect = (req, res, next) => {
  let { id_oferta, id_destacado, porcentaje } = req.body;
  console.log(req.body)

  var array = id_oferta;
  try {
    try {
      if (array.length !== 0) {
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
      console.log("error en oferta", err)

    }

    try {

      var arrayDestacado = id_destacado;
      console.log("esto te llega", id_destacado)
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
      console.log("error en Destacado", err)
    }
    res.status(200).send({ message: "La información ha sido actualizada." });

  } catch (err) {
    console.log(err, "error en la actualizacion");
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


    res.status(200).send("Actualizacion")
  } catch (err) {
    console.log(err)
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
    res.status(200).send("Actualizacion")
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




