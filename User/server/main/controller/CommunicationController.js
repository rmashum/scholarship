const CommunicationModal = require("../model/CommunicationModal");
const cloudinary = require("cloudinary");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
cloudinary.config({
  cloud_name: "di4nh39ju",
  api_key: "247818548248677",
  api_secret: "UcNeKCfGuZM_HNJO6mAmxk17t-U",
});
const CommunicationController = {

    imageUpload: async (req, res) => {
        try {
          let promises = [];
          const fileList = req.files.upload;
          console.log("file List :---->>>               ", req.body);
          if (fileList.length > 1) {
            console.log("if block");
            fileList.forEach(async (image) =>
              promises.push(
                cloudinary.v2.uploader.upload(image.tempFilePath, {
                  folder: "grievance",
                })
              )
            );
          } else {
            console.log("else block");
            promises.push(
              cloudinary.v2.uploader.upload(fileList.tempFilePath, {
                folder: "grievance",
              })
            );
          }
    
          let cloudResponse = await Promise.all(promises);
          var urlList = cloudResponse.map((cloud) => cloud.url);
          var urlIds = cloudResponse.map((cloud) => cloud.asset_id);
          const { GType, Category, QueryText } = req.body;
          const dateCreation = new Date().toLocaleDateString("en-US");
          var dt = new Date();
          dt.setDate(dt.getDate() + 7);
          const closerDt = dt.getMonth() + "/" + dt.getDate() + "/" + dt.getYear();
    
        //   const grievance = new GrievanceModel({
        //     raiseddate: dateCreation,
        //     closerdate: closerDt,
        //     images: urlList,
        //     query: QueryText,
        //     category: Category,
        //     type: GType,
        //     imageIds: urlIds,
        //     status: "Created",
        //   });
        //   console.log("Grievance -->    ", grievance);
        //   await grievance.save();
          res.send(cloudResponse);
          //  res.json(grievance, " Update Successfully");
        } catch (err) {
          console.log("catc brokx   ", err);
          return res.status(500).json({ msg: err.message });
        }
      },
}

module.exports = CommunicationController;