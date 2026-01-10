const createProduct = async (req, res) => {
  res.send("Product is created");
};

const getAllProdcucts = async (req, res) => {
  res.send("Fetching all products");
};

module.exports = { createProduct, getAllProdcucts };
