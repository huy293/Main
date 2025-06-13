import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../config/axios";
import MovieCard from "../../components/MovieCard/MovieCard";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import useUser from "../../hooks/useUser";
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';

const Episode = () => {
  const { seasonId, episodeId } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const { user } = useUser();

  const [episode, setEpisode] = useState(null);
  const [season, setSeason] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [related, setRelated] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [editingComment, setEditingComment] = useState(null);
  const [editContent, setEditContent] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyContent, setReplyContent] = useState('');
  const [editingReply, setEditingReply] = useState(null);
  const [editReplyContent, setEditReplyContent] = useState('');
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [ratingLoading, setRatingLoading] = useState(false);
  // Lấy thông tin tập phim và mùa
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const [epRes, seasonRes, commentsRes, relatedRes] = await Promise.all([
          axios.get(`/api/episode/${episodeId}`),
          axios.get(`/api/season/${seasonId}`),
          axios.get(`/api/season/${seasonId}/comments?page=${page}`).catch(() => ({ data: [] })),
          axios.get(`/api/season/${seasonId}/related`).catch(() => ({ data: [] }))
        ]);
        setEpisode(epRes.data);
        setSeason(seasonRes.data);

        // Group comment cha và reply
        const commentMap = {};
        const parents = [];
        commentsRes.data.forEach(c => {
          c.replies = [];
          commentMap[c.id] = c;
        });
        commentsRes.data.forEach(c => {
          if (c.parentId) {
            if (commentMap[c.parentId]) {
              commentMap[c.parentId].replies.push(c);
            }
          } else {
            parents.push(c);
          }
        });

        if (page === 1) {
          setComments(parents);
        } else {
          setComments(prev => [...prev, ...parents]);
        }
        setHasMore(commentsRes.data.length === 10);
        setRelated(relatedRes.data);
        setError(null);
      } catch (err) {
        setError("Không thể tải dữ liệu tập phim.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    // Ghi nhận lịch sử xem nếu đã đăng nhập và có episode
    if (user && episodeId) {
      axios.post("/api/watch-history", {
        episodeId: episodeId
      }).catch(() => {});
    }
  }, [seasonId, episodeId, page, user]);
  useEffect(() => {
    if (user && season) {
      axios
        .get(`/api/rating/${season.id}`)
        .then(res => setUserRating(res.data?.rating || 0))
        .catch(() => setUserRating(0));
    }
  }, [user, season]);
  const handleRate = async (value) => {
    if (!user) {
      navigate('/login');
      return;
    }
    setRatingLoading(true);
    try {
      await axios.post(`/api/rating/${season.id}`, { rating: value });
      setUserRating(value);
      // Có thể hiện thông báo thành công ở đây
    } catch (err) {
      // Có thể hiện thông báo lỗi ở đây
    }
    setRatingLoading(false);
  };
  // Hàm kiểm tra trạng thái yêu thích
  const checkFavoriteStatus = async () => {
    try {
      const response = await axios.get(`/api/favorites/check/${seasonId}`, {
        withCredentials: true
      });
      setIsFavorite(response.data.isFavorite);
    } catch (err) {
      console.error('Lỗi khi kiểm tra trạng thái yêu thích:', err);
    }
  };

  // Hàm xử lý yêu thích/bỏ yêu thích
  const handleFavorite = async () => {
    if (!user) {
      // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
      navigate('/login');
      return;
    }

    try {
      if (isFavorite) {
        await axios.delete(`/api/favorites/${seasonId}`, {
          withCredentials: true
        });
      } else {
        await axios.post('/api/favorites', 
          { seasonId },
          { withCredentials: true }
        );
      }
      setIsFavorite(!isFavorite);
    } catch (err) {
      console.error('Lỗi khi cập nhật trạng thái yêu thích:', err);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }
    try {
      const response = await axios.post(`/api/comment/season/${seasonId}`, {
        content: newComment
      });
      setComments([response.data, ...comments]);
      setNewComment('');
      setMessage({ type: 'success', text: 'Bình luận đã được đăng' });
    } catch (err) {
      console.error('Error posting comment:', err);
      setMessage({ 
        type: 'error', 
        text: err.response?.data?.message || 'Không thể đăng bình luận' 
      });
    }
  };

  const handleEditComment = async (commentId) => {
    try {
      const response = await axios.put(`/api/comment/${commentId}`, {
        content: editContent
      });
      setComments(comments.map(comment => 
        comment.id === commentId
          ? { ...response.data, replies: comment.replies } // Giữ lại replies cũ
          : comment
      ));
      setEditingComment(null);
      setEditContent('');
      setMessage({ type: 'success', text: 'Bình luận đã được cập nhật' });
    } catch (err) {
      setMessage({ type: 'error', text: 'Không thể cập nhật bình luận' });
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm('Bạn có chắc muốn xóa bình luận này?')) return;
    try {
      await axios.delete(`/api/comment/${commentId}`);
      setComments(comments.filter(comment => comment.id !== commentId));
      setMessage({ type: 'success', text: 'Bình luận đã được xóa' });
    } catch (err) {
      setMessage({ type: 'error', text: 'Không thể xóa bình luận' });
    }
  };
  const handleReplySubmit = async (parentId) => {
    if (!user) {
      navigate('/login');
      return;
    }
    try {
      const response = await axios.post(`/api/comment/${parentId}/reply`, {
        content: replyContent,
      });
      const replyData = {
        ...response.data,
        User: response.data.User || user,
      };
      setComments(comments =>
        comments.map(comment =>
          comment.id === parentId
            ? { ...comment, replies: [replyData, ...(comment.replies || [])] }
            : comment
        )
      );
      setReplyingTo(null);
      setReplyContent('');
      setMessage({ type: 'success', text: 'Đã trả lời bình luận' });
    } catch (err) {
      setMessage({ type: 'error', text: 'Không thể gửi trả lời' });
    }
  };

  const handleEditReply = async (replyId, parentId) => {
    try {
      const response = await axios.put(`/api/comment/${replyId}`, {
        content: editReplyContent
      });
      setComments(comments =>
        comments.map(comment =>
          comment.id === parentId
            ? {
                ...comment,
                replies: comment.replies.map(reply =>
                  reply.id === replyId ? response.data : reply
                )
              }
            : comment
        )
      );
      setEditingReply(null);
      setEditReplyContent('');
      setMessage({ type: 'success', text: 'Đã sửa trả lời' });
    } catch (err) {
      setMessage({ type: 'error', text: 'Không thể sửa trả lời' });
    }
  };

  const handleDeleteReply = async (replyId, parentId) => {
    if (!window.confirm('Bạn có chắc muốn xóa trả lời này?')) return;
    try {
      await axios.delete(`/api/comment/${replyId}`);
      setComments(comments =>
        comments.map(comment =>
          comment.id === parentId
            ? { ...comment, replies: comment.replies.filter(reply => reply.id !== replyId) }
            : comment
        )
      );
      setMessage({ type: 'success', text: 'Trả lời đã được xóa' });
    } catch (err) {
      setMessage({ type: 'error', text: 'Không thể xóa trả lời' });
    }
  };
  const loadMoreComments = () => {
    setPage(prev => prev + 1);
  };

  // Thêm hàm format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Chưa cập nhật';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  if (loading) {
    return (
      <>
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </>
    );
  }

  if (error || !episode || !season) {
    return (
      <>
        <div className="text-center text-red-500 p-8">{error || "Không tìm thấy tập phim."}</div>
      </>
    );
  }

  const episodes = season.Episodes || [];

  return (
    <>
      <div className="min-h-screen bg-gray-900 text-white pb-12">
        {/* Video Player - Đã giảm kích thước */}
        <div className="w-full bg-black flex justify-center items-center" style={{ minHeight: 300 }}>
          {episode.video_url ? (
            <video
              ref={videoRef}
              src={episode.video_url}
              controls
              className="w-full max-w-3xl rounded-lg shadow-lg"
              poster={season.poster_url}
              autoPlay
            />
          ) : (
            <div className="text-center w-full py-24 text-gray-400">Chưa có video cho tập này.</div>
          )}
        </div>

        <div className="container mx-auto px-4 mt-8">
          {/* Danh sách tập phim - Đã chuyển lên trên */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Danh sách tập</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {episodes.map((ep) => (
                <div
                  key={ep.id}
                  className={`flex items-center gap-2 bg-gray-800 rounded-lg p-2 cursor-pointer hover:bg-blue-700 transition ${
                    ep.id === episode.id ? "border-2 border-blue-500" : ""
                  }`}
                  onClick={() => navigate(`/watch/${seasonId}/${ep.id}`)}
                >
                  <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-base font-bold">{ep.episode_number}</span>
                  </div>
                  <div className="flex-grow min-w-0">
                    <h3 className="text-sm font-semibold line-clamp-1">
                      Tập {ep.episode_number}
                    </h3>
                    <p className="text-xs text-gray-400 line-clamp-1">{ep.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Thông tin tập phim */}
          <div className="flex flex-col md:flex-row gap-8 mb-8">
            {/* Poster */}
            <div className="md:w-1/4 flex-shrink-0">
              <div className="relative w-full" style={{ paddingTop: "150%" }}>
                <img
                  src={season.poster_url}
                  alt={season.title}
                  className="absolute top-0 left-0 w-full h-full object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
            {/* Thông tin chi tiết */}
            <div className="md:w-3/4">
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-3xl font-bold">
                  {season.Movie?.title} - {season.title}
                </h1>
                <button
                  onClick={handleFavorite}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    isFavorite 
                      ? 'bg-red-500 hover:bg-red-600' 
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  {isFavorite ? (
                    <>
                      <FaHeart className="text-white" />
                      <span>Đã thích</span>
                    </>
                  ) : (
                    <>
                      <FaRegHeart className="text-white" />
                      <span>Thêm vào yêu thích</span>
                    </>
                  )}
                </button>
              </div>
              <div className="flex flex-wrap gap-4 mb-2 text-gray-300">
                <span>
                  <b>Tập:</b> {episode.episode_number} - {episode.title}
                </span>
                <span>
                  <b>Thời lượng:</b> {episode.runtime} phút
                </span>
                <span>
                  <b>Ngày chiếu:</b> {formatDate(episode.release_date)}
                </span>
                <span>
                  <b>Mùa:</b> {season.season_number}
                </span>
                <span>
                  <b>Trạng thái:</b>{" "}
                  {season.status === "upcoming"
                    ? "Sắp chiếu"
                    : season.status === "ongoing"
                    ? "Đang chiếu"
                    : "Hoàn thành"}
                </span>
              </div>
              <div className="mb-2 text-gray-300">
                <b>Mô tả tập:</b> {episode.overview || "Chưa có mô tả"}
              </div>
              <div className="mb-2 text-gray-300">
                <b>Mô tả mùa:</b> {season.overview || "Chưa có mô tả"}
              </div>
              <div className="mt-6 mb-8">
                <h3 className="text-lg font-semibold mb-2">Đánh giá cho toàn bộ phim:</h3>
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(star => (
                    <button
                      key={star}
                      type="button"
                      disabled={ratingLoading}
                      onClick={() => handleRate(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="focus:outline-none"
                    >
                      <svg
                        className={`w-8 h-8 ${star <= (hoverRating || userRating) ? 'text-yellow-400' : 'text-gray-400'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
                      </svg>
                    </button>
                  ))}
                  <span className="ml-2 text-yellow-400 font-bold">{userRating}/5</span>
                  {ratingLoading && <span className="ml-2 text-gray-400 text-sm">Đang gửi...</span>}
                </div>
              </div>
            </div>
          </div>

          {/* Bình luận */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Bình luận</h2>
            
            {message.text && (
              <div className={`p-4 mb-4 rounded-lg ${
                message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {message.text}
              </div>
            )}

            <form onSubmit={handleCommentSubmit} className="space-y-4 mb-6">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full bg-gray-800 rounded-lg p-3 text-white"
                rows="3"
                placeholder={user ? "Viết bình luận của bạn..." : "Vui lòng đăng nhập để bình luận"}
                disabled={!user}
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                disabled={!user || !newComment.trim()}
              >
                Gửi bình luận
              </button>
            </form>

            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <img
                      src={comment.User?.avatar || '/default-avatar.jpg'}
                      alt={comment.User?.username}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="font-semibold">{comment.User?.username}</span>
                    <span className="text-xs text-gray-400">
                      {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true, locale: vi })}
                    </span>
                  </div>
                  {editingComment === comment.id ? (
                    <form
                      onSubmit={e => {
                        e.preventDefault();
                        handleEditComment(comment.id);
                      }}
                      className="mt-2"
                    >
                      <textarea
                        value={editContent}
                        onChange={e => setEditContent(e.target.value)}
                        className="w-full bg-gray-700 rounded-lg p-2 text-white"
                        rows="2"
                        placeholder="Chỉnh sửa bình luận..."
                      />
                      <div className="flex gap-2 mt-2">
                        <button
                          type="submit"
                          className="bg-yellow-600 text-white px-3 py-1 rounded hover:bg-yellow-700"
                          disabled={!editContent.trim()}
                        >
                          Lưu
                        </button>
                        <button
                          type="button"
                          className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700"
                          onClick={() => {
                            setEditingComment(null);
                            setEditContent('');
                          }}
                        >
                          Hủy
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="text-gray-200 mt-2">{comment.content}</div>
                  )}
                  <div className="flex gap-2 mt-2">
                    <button
                      className="text-green-400 hover:text-green-300"
                      onClick={() => setReplyingTo(comment.id)}
                    >
                      Trả lời
                    </button>
                    {user && (user.id === comment.User?.id || user.role === 'admin') && (
                      <>
                        <button
                          className="text-yellow-400 hover:text-yellow-300"
                          onClick={() => {
                            setEditingComment(comment.id);
                            setEditContent(comment.content);
                          }}
                        >
                          Sửa
                        </button>
                        <button
                          className="text-red-400 hover:text-red-300"
                          onClick={() => handleDeleteComment(comment.id)}
                        >
                          Xóa
                        </button>
                      </>
                    )}
                  </div>
                  {/* Form trả lời */}
                  {replyingTo === comment.id && (
                    <form
                      onSubmit={e => {
                        e.preventDefault();
                        handleReplySubmit(comment.id);
                      }}
                      className="mt-2"
                    >
                      <textarea
                        value={replyContent}
                        onChange={e => setReplyContent(e.target.value)}
                        className="w-full bg-gray-700 rounded-lg p-2 text-white"
                        rows="2"
                        placeholder="Nhập trả lời..."
                      />
                      <div className="flex gap-2 mt-2">
                        <button
                          type="submit"
                          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                          disabled={!replyContent.trim()}
                        >
                          Gửi trả lời
                        </button>
                        <button
                          type="button"
                          className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700"
                          onClick={() => {
                            setReplyingTo(null);
                            setReplyContent('');
                          }}
                        >
                          Hủy
                        </button>
                      </div>
                    </form>
                  )}
                  {/* Hiển thị replies nếu có */}
                  {comment.replies && comment.replies.length > 0 && (
                    <div className="ml-8 mt-2 space-y-2">
                      {comment.replies.map(reply => (
                        <div key={reply.id} className="bg-gray-700 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <img
                              src={reply.User?.avatar || '/default-avatar.jpg'}
                              alt={reply.User?.username}
                              className="w-6 h-6 rounded-full"
                            />
                            <span className="font-semibold">{reply.User?.username}</span>
                            <span className="text-xs text-gray-400">
                              {formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true, locale: vi })}
                            </span>
                          </div>
                          {editingReply === reply.id ? (
                            <form
                              onSubmit={e => {
                                e.preventDefault();
                                handleEditReply(reply.id, comment.id);
                              }}
                              className="mt-2"
                            >
                              <textarea
                                value={editReplyContent}
                                onChange={e => setEditReplyContent(e.target.value)}
                                className="w-full bg-gray-600 rounded-lg p-2 text-white"
                                rows="2"
                                placeholder="Chỉnh sửa trả lời..."
                              />
                              <div className="flex gap-2 mt-2">
                                <button
                                  type="submit"
                                  className="bg-yellow-600 text-white px-3 py-1 rounded hover:bg-yellow-700"
                                  disabled={!editReplyContent.trim()}
                                >
                                  Lưu
                                </button>
                                <button
                                  type="button"
                                  className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700"
                                  onClick={() => {
                                    setEditingReply(null);
                                    setEditReplyContent('');
                                  }}
                                >
                                  Hủy
                                </button>
                              </div>
                            </form>
                          ) : (
                            <div className="text-gray-200">{reply.content}</div>
                          )}
                          {user && (user.id === reply.User?.id || user.role === 'admin') && (
                            <>
                              <button
                                className="text-yellow-400 hover:text-yellow-300 text-xs ml-2"
                                onClick={() => {
                                  setEditingReply(reply.id);
                                  setEditReplyContent(reply.content);
                                }}
                              >
                                Sửa
                              </button>
                              <button
                                className="text-red-400 hover:text-red-300 text-xs ml-2"
                                onClick={() => handleDeleteReply(reply.id, comment.id)}
                              >
                                Xóa
                              </button>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {hasMore && (
              <button
                onClick={loadMoreComments}
                className="mt-4 w-full bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
              >
                Xem thêm bình luận
              </button>
            )}
          </div>

          {/* Phim liên quan */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Phim liên quan</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {related.map((rel) => (
                <MovieCard
                  key={rel.id}
                  season={rel}
                  size="small"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Episode;
