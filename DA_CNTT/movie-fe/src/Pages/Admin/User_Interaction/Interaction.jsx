import React, { useEffect, useState, useMemo, useCallback } from "react";
import Datatables from "../../../components/Datatable/Datatables";

const Interaction = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchComments = useCallback(async () => {
    setLoading(true);
    const data = [
      {
        id: 101,
        user: "Nguyen Van A",
        content: "Phim rất hay và hấp dẫn!",
        relatedTo: "Phim: Avengers",
        status: "pending",
        createdAt: "2025-05-10",
      },
      {
        id: 102,
        user: "Tran Thi B",
        content: "Sản phẩm này chất lượng tốt.",
        relatedTo: "Sản phẩm: Tai nghe Bluetooth",
        status: "approved",
        createdAt: "2025-05-12",
      },
      {
        id: 103,
        user: "Le Van C",
        content: "Tôi không hài lòng về dịch vụ.",
        relatedTo: "Phim: Spider-Man",
        status: "rejected",
        createdAt: "2025-05-14",
      },
    ];
    await new Promise((resolve) => setTimeout(resolve, 800));
    setComments(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const updateStatus = useCallback((id, newStatus) => {
    setComments((prev) => {
      const updated = [...prev];
      const index = updated.findIndex((c) => c.id === id);
      if (index !== -1) {
        updated[index] = { ...updated[index], status: newStatus };
      }
      return updated;
    });
  }, []);

  const deleteComment = useCallback((id) => {
    if (window.confirm("Bạn có chắc muốn xóa bình luận này?")) {
      setComments((prev) => prev.filter((c) => c.id !== id));
      alert("Đã xóa bình luận");
    }
  }, []);

  const columns = useMemo(
    () => [
      { name: "ID", selector: (row) => row.id },
      { name: "Người dùng", selector: (row) => row.user },
      { name: "Nội dung bình luận", selector: (row) => row.content },
      { name: "Liên quan đến", selector: (row) => row.relatedTo },
      { name: "Ngày gửi", selector: (row) => row.createdAt },
      {
        name: "Trạng thái",
        render: (row) => {
          let bgColor = "bg-gray-500";
          if (row.status === "approved") bgColor = "bg-green-500";
          else if (row.status === "pending") bgColor = "bg-orange-500";
          else if (row.status === "rejected") bgColor = "bg-red-500";
          return (
            <span
              className={`${bgColor} px-2 py-1 rounded text-white capitalize whitespace-nowrap`}
            >
              {row.status}
            </span>
          );
        },
      },
      {
        name: "Thao tác",
        render: (row) => (
          <div className="flex flex-wrap gap-2">
            {row.status !== "approved" && (
              <button
                onClick={() => updateStatus(row.id, "approved")}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm whitespace-nowrap"
              >
                Duyệt
              </button>
            )}
            {row.status !== "rejected" && (
              <button
                onClick={() => updateStatus(row.id, "rejected")}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm whitespace-nowrap"
              >
                Từ chối
              </button>
            )}
            <button
              onClick={() => deleteComment(row.id)}
              className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 text-sm whitespace-nowrap"
            >
              Xóa
            </button>
          </div>
        ),
      },
    ],
    [updateStatus, deleteComment]
  );
  

  const pendingComments = comments.filter((c) => c.status === "pending");
  const reviewedComments = comments.filter(
    (c) => c.status === "approved" || c.status === "rejected"
  );

  return (
    <div className="p-4 sm:ml-64 dark:bg-gray-900 min-h-screen space-y-12">
      <h1 className="text-3xl font-semibold text-white mb-6">
        Quản lý Tương tác
      </h1>
      {loading ? (
        <div className="flex justify-center items-center h-48 text-white">
          Loading...
        </div>
      ) : (
        <>
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">
              Bình luận đang chờ duyệt
            </h2>
            <div className="overflow-x-auto rounded-lg border border-gray-700">
              <Datatables data={pendingComments} columns={columns} />
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">
              Bình luận đã duyệt hoặc từ chối
            </h2>
            <div className="overflow-x-auto rounded-lg border border-gray-700">
              <Datatables data={reviewedComments} columns={columns} />
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Interaction;
