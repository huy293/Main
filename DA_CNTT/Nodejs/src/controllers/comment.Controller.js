const commentService = require("../services/comment.Service");

exports.createComment = async (req, res) => {
  try {
    const data = {
      content: req.body.content,
      userId: req.user.id,
      seasonId: req.body.seasonId,
    };
    const comment = await commentService.createComment(data);
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllComments = async (req, res) => {
  try {
    const seasonId = req.query.seasonId;
    const comments = await commentService.getAllComments(seasonId);
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCommentById = async (req, res) => {
  try {
    const comment = await commentService.getCommentById(req.params.id);
    if (!comment) return res.status(404).json({ message: "Not found" });
    res.json(comment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const result = await commentService.updateComment(req.params.id, req.user, req.body);
    if (!result) return res.status(404).json({ message: "Not found" });
    if (result === "forbidden") return res.status(403).json({ message: "Permission denied" });
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const result = await commentService.deleteComment(req.params.id, req.user);
    if (!result) return res.status(404).json({ message: "Not found" });
    if (result === "forbidden") return res.status(403).json({ message: "Permission denied" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};