let express = require("express");

const beautyRouter = express.Router();

const { BeautyModel } = require("../model/Beauty.model");

beautyRouter.get("/", async (req, res) => {
  //verify here
  var limit = req.query.limit;
  var page = req.query.page;
  var page = req.query.page;
  var category = req.query.category;
  var subcategory = req.query.subcategory;
  var color = req.query.color;
  var brand = req.query.brand;
  var sort = req.query.sort;
 

  // if (limit) {
    // const notes = await BeautyModel.find()
    const notes = await BeautyModel.find({ $or:[{"category": category},{"subcategory":subcategory},{"color":color},{"brand":brand}]})
      .limit(limit)
      .skip(limit * page)
      .sort({"rating":sort})
    res.send(notes);
  // } else {
  //   const notes = await BeautyModel.find({ $and:[{"category": !null?(""||null):category},{"subcategory":null?(""||null):subcategory}]})
  //     .limit(10)
  //     .skip(50 * page);
  //   res.send(notes);
  // }
});
// {"category": category},{"color":"Yellow" },

beautyRouter.get("/:id", async (req, res) => {
  //verify here
  var id = req.params.id;
  const item = await BeautyModel.findById(id);
  res.send(item);
});
////////////logged
beautyRouter.post("/create", async (req, res) => {
  //verify here
  const payload = req.body;
  try {
    const note = new BeautyModel(payload);
    await note.save();
    res.send("Created the note");
  } catch (err) {
    console.log({ ERR: err });
  }
});
beautyRouter.patch("/update/:id", async (req, res) => {
  const id = req.params.id;
  const payload = req.body;
  // console.log("payload:-",payload)
  // console.log("id:-",id)
  // const beauty = await BeautyModel.find({ "_id": id });

  // const userID_in_beauty = beauty[0].userID
  // const userID_making_req = req.body.userID;
  // console.log(beauty)
  // console.log(userID_in_beauty)

  try {
    //   if (userID_making_req !== userID_in_beauty) {
    //     res.send({ "msg": "You are not authorised" });
    //   } else {
    await BeautyModel.findByIdAndUpdate({ _id: id }, payload);
    res.send("Updated the beauty");
    //   }
  } catch (err) {
    console.log({ ERR: err });
  }
});
beautyRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await BeautyModel.findByIdAndDelete({ _id: id });

    res.send("Deleted the beauty");
  } catch (err) {
    console.log({ ERR: err });
  }
});

module.exports = {
  beautyRouter,
};
