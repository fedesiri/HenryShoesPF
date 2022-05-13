const { Products } = require("../db.js");


const ofertSelect = (req, res) => {
    let { id } = req.body
    console.log(id)
    var array = id
    //me llega un array de numeros en string
    var Promises = [];
    array.forEach(e => {
        var newPromise = Products.update(
            { inOferta: true },
            { where: { "id": e } }
        )
        Promises.push(newPromise);
    })
    return Promise.all(Promises).then(result => { result.forEach(r => console.log(r)) })



    // const Models_Id = await Products.findByPk(number);
    // console.log(Models_Id)

}


module.exports = {
    ofertSelect,
};
