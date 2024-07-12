const fs = require("fs");
module.exports = async function (req, res, next) {
  try {
    if (!req.files || Object.values(req.files).flat().length === 0) {
      return res.status(400).json({ message: "No files selected." });
    }
    let files = Object.values(req.files).flat();
    files.forEach((file) => {
      if (
        file.mimetype !== "image/jpeg" &&
        file.mimetype !== "image/png" &&
        file.mimetype !== "image/gif" &&
        file.mimetype !== "image/webp" &&
        file.mimetype !== "video/mp4" &&
        file.mimetype !== "video/webm"
      ) {
        removeTmp(file.tempFilePath);
        return res.status(400).json({ message: "Unsupported format." });
      }
      if (file.size > 1024 * 1024 * 50) { // Increase the file size limit for videos
        removeTmp(file.tempFilePath);
        return res.status(400).json({ message: "File size is too large." });
      }
    });
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};
