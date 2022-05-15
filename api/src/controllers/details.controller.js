const { Products } = require("../db.js");

const getDetails = async (req, res) => {
  let id = req.params.id;
  try {
    const Models_Id = await Products.findByPk(id);
    if (Models_Id !== null) {
      res.status(200).json(Models_Id);
    } else {
      res.status(404).send({ message: "Producto no encontrado." });
    }
  } catch (err) {
    console.log(err, "error en busqueda por id");
    res.status(500).send({ message: err.message });
  }
};

module.exports = {
  getDetails,
};
