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

router.post("/:id", async (req, res) => {
  const body = req.body;

  try {
    const comment = await commentsHelper.addComment(body);
    console.log(comment);
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  const body = req.body;

  try {
    const update = await commentsHelper.updateComment(body.id, body);
    res.status(201).json(update);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:comment_id", async (req, res) => {
  const { comment_id } = req.params;

  try {
    const deleted = await commentsHelper.deleteComment(comment_id);
    res.status(200).json(deleted);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
