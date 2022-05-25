import Category from "../models/Category.js";

export const getCategory = (req, res, next) => {
  Category.findAll()
    .then(function (categories) {
      if (!categories) return res.sendStatus(404);
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

export const createCategory = (req, res, next) => {
  const { name } = req.body;
  if (!name)
    return res.status(404).send("Not enough data to create a category.");
  Category.create({
    name: name,
  })
    .then(function (createdCategory) {
      res.json(createdCategory);
    })
    .catch(next);
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
