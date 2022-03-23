import { RequestHandler, UploadedFile } from "@ooic/core";
import path from "path";
import uid2 from "uid2";

const upload: RequestHandler = async (request, response, next) => {
  try {
    if (!request.files || Object.keys(request.files).length === 0) {
      response.status(400).send("No files were uploaded.");
      return;
    }
    const uploadedFile = request.files.uploadFile as UploadedFile;
    const uploadPath = __dirname + "/../uploads/" + uid2(10) + uploadedFile.name;

    uploadedFile.mv(uploadPath, (err) => {
      if (err) {
        console.log(err);
        throw { statusCode: 500, message: "Dosya yüklenirken bir hata oluştu." };
      }

      const subPath = path.normalize(uploadPath.split(__dirname)[1]).split("uploads/")[1];

      response.status(200).send({ uploadedFilePath: subPath });
    });
  } catch (error) {
    next(error);
  }
};

export default upload;
