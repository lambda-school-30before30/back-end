const router = require("express").Router();
const commentsHelper = require("./commentsModel");

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const comments = await commentsHelper.getComments(id);

  try {
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
