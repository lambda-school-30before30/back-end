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

router.post("/:id", async (req, res) => {
  const body = req.body;

  if (!body.comment) {
    return res.status(204).json({ message: "Please provide a comment" });
  } else if (!body.activity_id) {
    return res.status(204).json({ message: "Please provide an activity ID" });
  } else if (!body.user_id) {
    return res
      .status(204)
      .json({ message: "Please provide user's id that posted comment" });
  }

  try {
    const comment = await commentsHelper.addComment(body);

    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/", async (req, res) => {
  const body = req.body;

  if (!body.comment) {
    return res.status(204).json({ message: "Please provide edited comment" });
  } else if (!body.id) {
    return res.status(204).json({ message: "No ID provided" });
  }

  try {
    const update = await commentsHelper.updateComment(body.id, body);
    res.status(201).json(update);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/delete/:comment_id", async (req, res) => {
  const { comment_id } = req.params;

  try {
    const deleted = await commentsHelper.deleteComment(comment_id);
    res.status(200).json(deleted);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
