const { Comment, User, Season } = require("../models");

exports.createComment = async (data) => {
  return await Comment.create(data);
};

exports.getAllComments = async (seasonId) => {
  const where = seasonId ? { seasonId } : {};
  return await Comment.findAll({
    where,
    include: [
      { model: User, attributes: ["id", "username"] },
      { model: Season, attributes: ["id", "title"] }
    ],
    order: [["createdAt", "DESC"]],
  });
};

exports.getCommentById = async (id) => {
  return await Comment.findByPk(id, {
    include: [
      { model: User, attributes: ["id", "username"] },
      { model: Movie, attributes: ["id", "title"] }
    ],
  });
};

exports.updateComment = async (id, user, data) => {
  const comment = await Comment.findByPk(id);
  if (!comment) return null;

  const isOwner = comment.userId === user.id;
  const isAdminOrMod = ["admin", "moderator"].includes(user.role);

  if (!isOwner && !isAdminOrMod) return "forbidden";

  await comment.update({ content: data.content });
  return comment;
};

exports.deleteComment = async (id, user) => {
  const comment = await Comment.findByPk(id);
  if (!comment) return null;

  const isOwner = comment.userId === user.id;
  const isAdminOrMod = ["admin", "moderator"].includes(user.role);

  if (!isOwner && !isAdminOrMod) return "forbidden";

  await comment.destroy();
  return true;
};
