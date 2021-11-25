const productService = require("./productService");

// --------------------------------------------------------------------------------------------------------------

/**
 * find all item and pageination
 *
 */
exports.productTable = async function (req, res) {
  const page = parseInt(req.query.page);

  console.log(" client want find items in page: " + page);

  if (!isNaN(page) && page > 0) {
    const listOfProduct = await productService.listProductTable(page, 12);
    res.render("./product/ product_table", { listOfProduct, page });
  } else {
    const listOfProduct = await productService.listProductTable();

    res.render("./product/product_table", { listOfProduct, page });
  }
};

// --------------------------------------------------------------------------------------------------------------

/**
 *
 * find all item with pagniation when there are a post request
 * @param {*} req
 * @param {*} res
 */
exports.postProductTable = async function (req, res) {
  const page = parseInt(req.body.page);
  console.log(" client want find items in page: " + page);
  if (isNaN(page) && page > 0) {
    const listOfProduct = await productService.listProductTable(page, 12);
    res.render("./product/product_table", { listOfProduct, page });
  } else {
    const listOfProduct = await productService.listProductTable();
    res.render("./product/product_table", { listOfProduct, page });
  }
};

// --------------------------------------------------------------------------------------------------------------

/**
 *
 *Delete a product with matching id from the req.body.
 * @param {*} req
 * @param {*} res
 */
exports.deleteProductWithID = async function (req, res) {
  const id = parseInt(req.body.product_id);
  console.log("id is: " + id);
  if (!isNaN(id)) {
    await productService.deleteProduct(id);
    res.end("success");
  } else {
    res.end("fail");
    throw new Error("id is not valid");
  }
};

// --------------------------------------------------------------------------------------------------------------

/**
 *find product have matching id in req.body.
 *
 * @param {*} req
 * @param {*} res
 */
exports.findProductById = async function (req, res) {
  const id = req.body.product_id;
  console.log("id is " + id);
  if (!isNaN(id)) {
    const productDetails = await productService.findProduct(id);
    res.render("./product/product_details", { productDetails });
  } else {
    res.render("./error");
  }
};

// --------------------------------------------------------------------------------------------------------------

/**
 *add product with paragram in req body
 *
 * @param {*} req
 * @param {*} res
 */
exports.addProduct = async function (req, res) {
  const id = parseInt(req.body.product_id);
  const name = req.body.name;
  const grade = req.body.grade;
  const universe = req.body.universe;
  const description = req.body.description;
  const price = parseFloat(req.body.price);
  const link_picture = req.body.link;

  console.log(
    " client want add: " +
      id +
      " " +
      name +
      " " +
      description +
      " " +
      price +
      " " +
      link_picture
  );
  if (!isNaN(id) && !isNaN(price)) {
    /** add product return two object, created indicate that if product is created or not */
    const [product, created] = await productService.addProduct(
      id,
      name,
      grade,
      universe,
      description,
      price,
      link_picture
    );
    if (!created) {
      res.end(
        "fails: there already exists a product with the same id = " +
          id +
          " with name = " +
          name
      );
    } else {
      res.end("success");
    }
  } else {
    res.end("fails: please insert number to id and price");
  }
};

// --------------------------------------------------------------------------------------------------------------

/**
 * Find list of products with condition in req .body.
 *
 * @param {*} req.body : //search_with// is filter type, //value// is the value for product service to search, //page// is for pageinition
 * @param {*} res
 */
exports.findProductWithCondition = async (req, res) => {
  const searchCond = req.body.search_with;
  const value = req.body.value;
  console.log(
    " client want to seach with condition: " + searchCond + " value: " + value
  );
  switch (searchCond) {
    case "name": {
      const nameCond = value;
      const listOfProduct = await productService.findByName(nameCond);
      if (listOfProduct.length != 0) {
        res.render("./product/product_table", { listOfProduct });
      } else {
        res.render("error");
        console.error("cant find product with name");
      }
      break;
    }
  }
};

// --------------------------------------------------------------------------------------------------------------

exports.editProductWithPostValue = async function (req, res) {
  const id = parseInt(req.body.product_id);
  const name = req.body.name;
  const grade = req.body.eGrade;
  const universe = req.body.universe;
  const description = req.body.description;
  const price = parseFloat(req.body.price);
  const link_picture = req.body.link;

  if (isNaN(id)) {
    res.end("failed. Try to edit imaginary product");
  } else {
    const findProduct = await productService.findProduct(id);
    if (findProduct === null) {
      res.end("failed. Try to edit imaginary product");
    } else {
      product = await productService.updateProduct(
        id,
        name,
        grade,
        universe,
        description,
        price,
        link_picture
      );
      res.end("success");
    }
  }
};
