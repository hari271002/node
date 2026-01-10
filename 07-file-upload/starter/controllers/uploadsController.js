const path = require("path");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const uploadImage = async (req, res) => {
  //console.log(req.files);
  //console.log(__dirname);
  if (!req.files) {
    throw new CustomError.BadRequestError("Please Upload the image");
  }

  const image = req.files.image;
  if (image.mimetype.startsWith("image")) {
    throw new CustomError.BadRequestError("Please Upload the image");
  }
  const maxSize = 1024 * 1024;
  if (image.size > maxSize) {
    throw new CustomError.BadRequestError(
      "The size of the image should be less than or equal to 1MB"
    );
  }
  const imagePath = path.join(
    __dirname,
    `../public/uploads/` + `${image.name}`
  );
  console.log(imagePath);
  await image.mv(imagePath);
  res.status(StatusCodes.OK).json({ image: { src: `/uploads/${image.name}` } });
};

module.exports = { uploadImage };
