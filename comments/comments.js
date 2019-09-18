const router = require("express").Router();
const commentsHelper = require("./commentsModel");

router.get("/:activity_id/comments", async (req, res) => {
  const { activity_id } = req.params;
  try {
    const comments = await commentsHelper.getComments(activity_id);
    if (comments.length < 1) {
      res.status(204).json({ message: "id not found" });
    } else {
      res.status(200).json(comments);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/:activity_id/comments", async (req, res) => {
  let body = req.body;
  // let id = body.activity_id;
  // id = req.params.activity_id;

  if (!body.comment) {
    return res.status(204).json({ message: "Please provide a comment" });
  } else if (!body.user_id) {
    return res
      .status(204)
      .json({ message: "Please provide user's id that posted comment" });
  } else {
    body = { ...body, activity_id: req.params.activity_id };
  }
  console.log(body);
  try {
    const comment = await commentsHelper.addComment(body);

    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/comments/:comment_id", async (req, res) => {
  const body = req.body;
  const { comment_id } = req.params;

  if (!body.comment) {
    return res.status(204).json({ message: "Please provide edited comment" });
  }

  try {
    const update = await commentsHelper.updateComment(comment_id, body);
    res.status(201).json(update);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/comments/:comment_id", async (req, res) => {
  const { comment_id } = req.params;

  try {
    const deleted = await commentsHelper.deleteComment(comment_id);
    res.status(200).json(deleted);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
