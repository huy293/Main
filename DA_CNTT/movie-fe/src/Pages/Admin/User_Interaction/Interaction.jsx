import React, { useEffect, useState, useMemo, useCallback } from "react";
import axios from '../../../config/axios';
import Datatables from "../../../components/Datatable/Datatables";

// Danh sách từ khóa cấm
const BAD_WORDS = [
  "bậy", "tục", "địt", "lồn", "cặc", "đéo", "vkl", "vl", "cc", "ngu", "chửi", "fuck", "shit"
];

const containsBadWord = (content) => {
  if (!content) return false;
  const lower = content.toLowerCase();
  return BAD_WORDS.some(word => lower.includes(word));
};

const Interaction = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Lấy dữ liệu từ backend
  const fetchComments = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/comment");
      const data = res.data.map((c) => ({
        id: c.id,
        user: c.User?.username || c.user || "Ẩn danh",
        content: c.content,
        relatedTo: c.seasonId
          ? `Mùa: ${c.Season?.title || c.seasonId}`
          : c.movieId
          ? `Phim: ${c.Movie?.title || c.movieId}`
          : "",
        createdAt: c.createdAt
          ? new Date(c.createdAt)
          : null,
        createdAtStr: c.createdAt
          ? new Date(c.createdAt).toLocaleString("vi-VN")
          : "",
      }));
      setComments(data);
    } catch (err) {
      alert("Không thể tải bình luận từ server!");
      setComments([]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  // Xóa comment
  const deleteComment = useCallback(async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa bình luận này?")) return;
    try {
      await axios.delete(`/api/comment/${id}`);
      setComments((prev) => prev.filter((c) => c.id !== id));
      alert("Đã xóa bình luận");
    } catch (err) {
      alert("Không thể xóa bình luận!");
    }
  }, []);

  // Cột cho bảng
  const columns = useMemo(
    () => [
      { name: "ID", selector: (row) => row.id },
      { name: "Người dùng", selector: (row) => row.user },
      { name: "Nội dung bình luận", selector: (row) => row.content },
      { name: "Liên quan đến", selector: (row) => row.relatedTo },
      { name: "Ngày gửi", selector: (row) => row.createdAtStr },
      {
        name: "Thao tác",
        render: (row) => (
          <button
            onClick={() => deleteComment(row.id)}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm whitespace-nowrap"
          >
            Xóa
          </button>
        ),
      },
    ],
    [deleteComment]
  );

  // Lọc bình luận mới nhất trong 7 ngày
  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const recentComments = comments.filter(
    (c) => c.createdAt && c.createdAt >= sevenDaysAgo
  );

  // Lọc bình luận tục tĩu/bậy bạ
  const badComments = comments.filter((c) => containsBadWord(c.content));

  return (
    <div className="p-4 sm:ml-64 dark:bg-gray-900 min-h-screen space-y-12">
      <h1 className="text-3xl font-semibold text-white mb-6">
        Quản lý bình luận
      </h1>
      {loading ? (
        <div className="flex justify-center items-center h-48 text-white">
          Loading...
        </div>
      ) : (
        <>
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">
              Bình luận mới nhất trong 7 ngày
            </h2>
            <div className="overflow-x-auto rounded-lg border border-gray-700">
              <Datatables data={recentComments} columns={columns} />
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">
              Bình luận có nội dung tục tĩu/bậy bạ
            </h2>
            <div className="overflow-x-auto rounded-lg border border-gray-700">
              <Datatables data={badComments} columns={columns} />
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Interaction;