const { Products } = require("../db.js");


const ofertSelect = (req, res) => {
    let { id_oferta, id_destacado } = req.body
    console.log(id_oferta)
    console.log(id_destacado)
    var array = id_oferta
    //me llega un array de numeros en string
    var Promises = [];
    array.forEach(e => {
        var newPromise = Products.update(
            { inOferta: true },
            { where: { "id": e } }
        )
        Promises.push(newPromise);
    })
    Promise.all(Promises).then(result => { result.forEach(r => console.log(r)) })


    var arrayDestacado = id_destacado
    //me llega un array de numeros en string
    var Promises = [];
    arrayDestacado.forEach(e => {
        var newPromise = Products.update(
            { inDestacados: true },
            { where: { "id": e } }
        )
        Promises.push(newPromise);
    })
    Promise.all(Promises).then(result => { result.forEach(r => console.log(r)) })

    res.status(200).send({ message: "informacion actualizada" })

}


module.exports = {
    ofertSelect,
};
