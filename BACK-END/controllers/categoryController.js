const Category = require("./../models/categoryModel");

exports.getCategory = (req, res) => {
  console.log(req.query);
  try {
    Category.find(req.query)
      .then((doc) => {
        res.status(200).json(doc);
      })
      .catch((err) => res.status(404).json({ error: `Bad request query` }));
  } catch {
    res.status(500).json({ error: "Get request failed, please try again" });
  }
};

exports.createCategory = (req, res) => {
  const {category} = req.body;

  try {
category.findOne({category : category})
.then((existingCategory) => {
  if(existingCategory) {
    res
    .status(422)
    .json({ error: "Category already exists" });
  }
  else {
    const createdCategory = new Category ({
      category
    });

    createdCategory
    .save()
    .then((doc) => {
      res.status(201).json(doc);
    })
    .catch((err) =>  res.status(404).json({ error: err.message }))
  }
})
  } catch {
    res
      .status(500)
      .json({ error: "Creating category failed, please try again later" });
}
}