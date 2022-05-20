const { Products } = require("../db.js");

const ofertSelect = (req, res) => {
  let { id_oferta, id_destacado, porcentaje } = req.body;
  console.log(req.body)
  var array = id_oferta;
  try {
    if (array.length !== 0) {
      var Promises = [];
      array.forEach((e) => {
        var newPromise = Products.update(
          { inOferta: true },
          { where: { id: e } }
        );
        Promises.push(newPromise);
      });
      Promise.all(Promises).then((result) => {
        result.forEach((r) => console.log(r));
      });
    }
    var value_porcentaje = porcentaje;
    if (value_porcentaje) {
      var Promises = [];
      var newPromise = Products.update(
        { porcentaje: value_porcentaje },
        { where: { id: array } }
      );
      Promises.push(newPromise);

      Promise.all(Promises).then((result) => {
        result.forEach((r) => console.log(r));
      });
    }

    var arrayDestacado = id_destacado;
    //me llega un array de numeros en string
    if (arrayDestacado.length !== 0) {
      var Promises = [];
      arrayDestacado.forEach((e) => {
        var newPromise = Products.update(
          { inDestacados: true },
          { where: { id: e } }
        );
        Promises.push(newPromise);
      });
      Promise.all(Promises).then((result) => {
        result.forEach((r) => console.log(r));
      });
    }


    res.status(200).send({ message: "Product updated successfully." });
  } catch (err) {
    console.log(err, "Error on update.");
    res.send({ message: err.message });
  }
};

const deleteDestacado = async (req, res) => {
  let { id } = req.body
  console.log(req.body)
  console.log(id)
  const ResultUpDate = await Products.update({
    inDestacados: false,

  },
    { where: { "id": id } }

  )
  res.status(200).send("Remove from Destacados successfully.")
}

// const deleteDestacado = async (req, res) => {
//     let { id } = req.body
//     console.log(req.body)
//     console.log(id)
//     const ResultUpDate = await Products.update({
//         inDestacados: false,

//     },
//         { where: { "id": id } }

//     )
//     res.status(200).send("Actualizacion")
// }


const deletePromotion = async (req, res) => {
  let { id } = req.body
  console.log(req.body)
  console.log(id)
  const ResultUpDate = await Products.update({
    inOferta: false,
    porcentaje: null

  },
    { where: { "id": id } }

  )
  res.status(200).send("Remove from Promotion successfully.")
}

// const deletePromotion = async (req, res) => {
//     let { id } = req.body
//     console.log(req.body)
//     console.log(id)
//     const ResultUpDate = await Products.update({
//         inOferta: false,
//         porcentaje: null

//     },
//         { where: { "id": id } }

//     )
//     res.status(200).send("Actualizacion")
// }

module.exports = {
  ofertSelect,
  deleteDestacado,
  deletePromotion,
};





