const { Media } = require("../../db/models/");

const sharp = require("sharp"),
  { unlink, rename } = require("fs/promises"),
  path = require("path");

const { fileSizeLimit } = require("../../config/config");

module.exports.mediaUpload = async (req, res, next) => {
  if (!req.files || !req.files.file) {
    return res.status(400).json({
      message: "file not found",
    });
  }
  const file = req.files.file;

  let mediaData = {};

  if (file.type.match(/image/g)) {
    const name = create_privateid(12) + ".webp";
    const imgPath = path.join(__dirname, "../../../medias/images/", name);

    const imgPromise = sharp(file.path)
      .resize({
        width: 1920,
        height: 1080,
        fit: "inside",
      })
      .webp({ quality: 75 })
      .toFile(imgPath);

    const dbPromise = Media.create({
      path: imgPath,
      type: "image/webp",
      user_id: req.user.id,
    });

    try {
      const { id, type } = (
        await Promise.all([imgPromise, dbPromise]).catch((e) => {
          throw new Error(e);
        })
      )[1];

      mediaData = { id, type, path: "/images/" + name };
      await unlink(file.path);
    } catch (e) {
      next({ Stack: e, msg: "imageProcess Error", statusCode: 500 });
    }
  } else if (file.size < fileSizeLimit) {
    const filePath = path.join(
      __dirname,
      "../../../medias/files",
      create_privateid(12) + path.extname(file.originalFilename)
    );
    const movePromise = rename(file.path, filePath);

    const dbPromise = Media.create({
      path: filePath,
      type: file.type,
      user_id: req.user.id,
    });
    try {
      const { id, type } = (
        await Promise.all([movePromise, dbPromise]).catch((e) => {
          throw new Error(e);
        })
      )[1];
      mediaData = { id, type };
    } catch (e) {
      next({ Stack: e, msg: "uploadProcess Error", statusCode: 500 });
    }
  } else {
    await unlink(file.path);
    return res.status(400).json({
      message: "file size is big",
    });
  }

  return res.json({
    message: "post file successfully",
    mediaData,
  });
};

function create_privateid(n) {
  const CODE_TABLE = "0123456789";
  let r = "";
  for (let i = 0, k = CODE_TABLE.length; i < n; i++) {
    r += CODE_TABLE.charAt(Math.floor(k * Math.random()));
  }
  return r;
}
