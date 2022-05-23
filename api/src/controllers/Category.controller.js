const { Category, Products } = require("../db.js");

const getCategory = (req,res,next) => {
    Category.findAll({
        
            include: {
                model: Products,
                attribute: ["name", "id"],
              },
        
    })
    .then(function(categories) {
        if(!categories) return res.sendStatus(404);
        res.json(categories);
    }).catch(next);  
};

const getCategoryId = (req,res,next) => {
    Category.findByPk(req.params.id)
    .then(function(category){
        res.json(category);
    }).catch(next);
};

const createCategory = async (req,res,next) => {
    const { name, data } = req.body;
    try{    
    if(!name) return res.status(404).send("Not enough data to create a category.");
    await Category.create({
        name: name,        
    })
    if(data.length > 0){
        
        const selectedCategory = await Category.findOne({
            where: {name: name}
        });
        
        for(let i= 0; i < data.length; i++) {
        let selectedshoe = await Products.findOne({
            where: {
                id: data[i]
            }
        })

      await selectedCategory.addProducts(selectedshoe);
    }};
    res.send("The category has been created")
    }catch(err){
        console.log(err)
        res.send(err)
    }

}; 

const modifCategory = (req, res,next ) => {
    const { name } = req.body
    if(!name ) return res.status(404).send("Not enough data to modify a category.");
    Category.update({...req.body}, {
        where: {
            id: req.params.id
        }
    }).then(function(updatedCategory){
        res.status(201).send("Category modified successfully.")
    }).catch(next);
};

const deleteCategory = (req, res, next) => {
    Category.destroy({
        where: {
            id: req.params.id
        }
    }).then(function(deletedCategory){
        res.status(200).send("Category deleted successfully.")
    }).catch(next);

};

module.exports = {
    getCategory,
    getCategoryId,
    createCategory,
    modifCategory,
    deleteCategory
  };