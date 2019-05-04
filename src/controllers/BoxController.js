const Box = require("../models/Box");

class BoxController {
  async store(req, res) {
    const box = await Box.create(req.body);
    return res.json(box);
  }

  async show(req, res) {
    const box = await Box.findById(req.params.id).populate({
      path: "files",
      options: { sort: { createdAt: -1 } }
    });
    return res.json(box);
  }

  async findAll(req, res) {
    const boxes = await Box.find();
    return res.json(boxes);
  }

  async delete(req, res) {
    console.log("try delete ", req.params.id);

    Box.findOneAndDelete({ _id: req.params.id }, function(err, res) {
      if (err) console.error(err);
    });
    return res.send("Delete successful!");
  }
}

module.exports = new BoxController();
