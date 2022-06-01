import Category from "../models/Category.js";
import Products from "../models/Products.js"

export const getCategory = (req, res, next) => {
  Category.findAll()
    .then(function (categories) {
      if (!categories) return res.status(404).send({ message: "There are no Categories." });
      res.json(categories);
    })
    .catch(next); 
};

export const getCategoryId = (req, res, next) => {
  Category.findByPk(req.params.id)
    .then(function (category) {
      res.json(category);
    })
    .catch(next);
}; 

export const createCategory = async (req, res) => {
  const { name, data } = req.body;
  try{
  if (!name){
    return res.status(404).send("Not enough data to create a category.");
  }else{
    let category = await Category.findOne({
      where: {
        name: name.toLowerCase(), 
      }
    })
    if (!category){
      category = await Category.create({
          name: name,
      });
    }  
  for(let i=0; i < data.length; i++){
    const brandedProduct = await Products.findOne({
      where:{
        id: data[i]
      }
    });
   await brandedProduct.setCategory(category)
  };
  res.send("The Category was succesfully created")
} 
}catch(err){
  res.send(err)
}
};

export const modifCategory = (req, res, next) => {
  console.log(req.params.id);
  console.log(req.body.name);
  const { name } = req.body;
  if (!name)
    return res.status(404).send("Not enough data to modify a category.");
  Category.update(
    { ...req.body },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then(function (updatedCategory) {
      res.status(201).send("Category modified successfully.");
    })
    .catch(next);
};

export const deleteCategory = (req, res, next) => {
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(function (deletedCategory) {
      res.status(200).send("Category deleted successfully.");
    })
    .catch(next);
};
