import { React, useState, useEffect } from "react";
import Datatables from "../../../components/Datatable/Datatables";
import { Pencil, Trash2, Plus } from "lucide-react";
import Select from "react-select";
import peopleColumns from "../../../components/Datatable/column/peopleColumns";
import movieCastColumns from "../../../components/Datatable/column/movieCastColumns";
import movieCrewColumns from "../../../components/Datatable/column/movieCrewColumns";
import { PeopleModal, CastModal, CrewModal } from "./PeopleModals";
import axiosInstance from "../../../config/axios";

const People = () => {
  const [people, setPeople] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [movieCast, setMovieCast] = useState([]);
  const [movieCrew, setMovieCrew] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal states
  const [isPeopleModalOpen, setIsPeopleModalOpen] = useState(false);
  const [isCastModalOpen, setIsCastModalOpen] = useState(false);
  const [isCrewModalOpen, setIsCrewModalOpen] = useState(false);

  // Edit states
  const [editingPerson, setEditingPerson] = useState(null);
  const [editingCast, setEditingCast] = useState(null);
  const [editingCrew, setEditingCrew] = useState(null);

  // Fetch all data when component mounts
  useEffect(() => {
    fetchPeople();
    fetchSeasons();
  }, []);

  // Fetch cast and crew when season changes
  useEffect(() => {
    if (selectedSeason) {
      console.log("Selected season changed:", selectedSeason);
      fetchMovieCast(selectedSeason.value);
      fetchMovieCrew(selectedSeason.value);
    }
  }, [selectedSeason]);

  const fetchPeople = async () => {
    try {
      const response = await axiosInstance.get("/api/people");
      setPeople(response.data);
      setLoading(false);
    } catch (error) {
      alert("Lỗi khi tải danh sách thành viên");
      console.error("Error fetching people:", error);
    }
  };

  const fetchSeasons = async () => {
    try {
      const response = await axiosInstance.get("/api/movies");
      const movies = response.data;
      
      // Fetch seasons for each series type movie
      const seasonsPromises = movies
        .filter(movie => movie.type === "series")
        .map(movie => 
          axiosInstance.get(`/api/season/movie/${movie.id}`)
        );
      
      const seasonsResponses = await Promise.all(seasonsPromises);
      const allSeasons = seasonsResponses.flatMap(response => 
        response.data.map(season => ({
          value: season.id,
          label: `${season.title} - Season ${season.season_number}`
        }))
      );
      
      setSeasons(allSeasons);
    } catch (error) {
      alert("Lỗi khi tải danh sách mùa phim");
      console.error("Error fetching seasons:", error);
    }
  };

  const fetchMovieCast = async (seasonId) => {
    try {
      console.log("Fetching cast for season:", seasonId);
      const response = await axiosInstance.get(`/api/movie-cast/movie/${seasonId}`);
      console.log("Cast response:", response.data);
      if (response.data && response.data.length > 0) {
        console.log("First cast item structure:", JSON.stringify(response.data[0], null, 2));
      }
      setMovieCast(response.data);
    } catch (error) {
      console.error("Error fetching movie cast:", error);
      if (error.response) {
        console.error("Error response:", error.response.data);
        alert(error.response.data.error || "Lỗi khi tải danh sách diễn viên");
      } else {
        alert("Lỗi khi tải danh sách diễn viên");
      }
    }
  };

  const fetchMovieCrew = async (seasonId) => {
    try {
      console.log("Fetching crew for season:", seasonId);
      const response = await axiosInstance.get(`/api/movie-crew/movie/${seasonId}`);
      console.log("Crew response:", response.data);
      setMovieCrew(response.data);
    } catch (error) {
      console.error("Error fetching movie crew:", error);
      if (error.response) {
        console.error("Error response:", error.response.data);
        alert(error.response.data.error || "Lỗi khi tải danh sách đoàn phim");
      } else {
        alert("Lỗi khi tải danh sách đoàn phim");
      }
    }
  };

  // Handle functions for People CRUD
  const handleAddPerson = () => {
    setEditingPerson(null);
    setIsPeopleModalOpen(true);
  };

  const handleEditPerson = (person) => {
    setEditingPerson(person);
    setIsPeopleModalOpen(true);
  };

  const handleDeletePerson = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa người này?")) {
      try {
        await axiosInstance.delete(`/api/people/${id}`);
        alert("Xóa thành viên thành công");
        fetchPeople();
      } catch (error) {
        alert("Lỗi khi xóa thành viên");
        console.error("Error deleting person:", error);
      }
    }
  };

  const handleSubmitPerson = async (formData) => {
    try {
      if (editingPerson) {
        // Update existing person
        await axiosInstance.put(`/api/people/${editingPerson.id}`, formData);
        alert("Cập nhật thành viên thành công");
      } else {
        // Create new person
        await axiosInstance.post("/api/people", formData);
        alert("Thêm thành viên thành công");
      }
      fetchPeople();
      setIsPeopleModalOpen(false);
      setEditingPerson(null);
    } catch (error) {
      alert(editingPerson ? "Lỗi khi cập nhật thành viên" : "Lỗi khi thêm thành viên");
      console.error(error);
    }
  };

  // Handle functions for MovieCast CRUD
  const handleAddCast = () => {
    setEditingCast(null);
    setIsCastModalOpen(true);
  };

  const handleEditCast = (cast) => {
    setEditingCast(cast);
    setIsCastModalOpen(true);
  };

  const handleDeleteCast = async (cast) => {
    if (window.confirm("Bạn có chắc muốn xóa diễn viên này khỏi phim?")) {
      try {
        await axiosInstance.delete(
          `/api/movie-cast/${selectedSeason.value}/${cast.Person.id}`
        );
        alert("Xóa diễn viên khỏi phim thành công");
        fetchMovieCast(selectedSeason.value);
      } catch (error) {
        alert("Lỗi khi xóa diễn viên khỏi phim");
        console.error(error);
      }
    }
  };

  const handleSubmitCast = async (formData) => {
    try {
      if (!selectedSeason) {
        alert("Vui lòng chọn mùa phim trước");
        return;
      }

      if (!formData.peopleId || !formData.role) {
        alert("Vui lòng điền đầy đủ thông tin");
        return;
      }

      if (editingCast) {
        // Update existing cast
        await axiosInstance.put(
          `/api/movie-cast/${selectedSeason.value}/${editingCast.Person.id}`,
          { role: formData.role }
        );
        alert("Cập nhật vai diễn thành công");
      } else {
        // Check if cast already exists
        const existingCast = movieCast.find(
          c => c.Person.id === formData.peopleId
        );
        if (existingCast) {
          alert("Diễn viên này đã có trong phim");
          return;
        }

        // Add new cast
        const response = await axiosInstance.post(
          "/api/movie-cast",
          {
            peopleId: parseInt(formData.peopleId),
            role: formData.role,
            seasonId: parseInt(selectedSeason.value)
          }
        );

        if (response.status === 201) {
          alert("Thêm diễn viên thành công");
        }
      }
      fetchMovieCast(selectedSeason.value);
      setIsCastModalOpen(false);
      setEditingCast(null);
    } catch (error) {
      console.error("Error handling cast:", error);
      if (error.response) {
        console.error("Error response:", error.response.data);
        alert(error.response.data.error || (editingCast ? "Lỗi khi cập nhật vai diễn" : "Lỗi khi thêm diễn viên"));
      } else {
        alert(editingCast ? "Lỗi khi cập nhật vai diễn" : "Lỗi khi thêm diễn viên");
      }
    }
  };

  // Handle functions for MovieCrew CRUD
  const handleAddCrew = () => {
    setEditingCrew(null);
    setIsCrewModalOpen(true);
  };

  const handleEditCrew = (crew) => {
    setEditingCrew(crew);
    setIsCrewModalOpen(true);
  };

  const handleDeleteCrew = async (crew) => {
    if (window.confirm("Bạn có chắc muốn xóa nhân viên này khỏi phim?")) {
      try {
        await axiosInstance.delete(
          `/api/movie-crew/${selectedSeason.value}/${crew.Person.id}`
        );
        alert("Xóa nhân viên khỏi phim thành công");
        fetchMovieCrew(selectedSeason.value);
      } catch (error) {
        alert("Lỗi khi xóa nhân viên khỏi phim");
        console.error(error);
      }
    }
  };

  const handleSubmitCrew = async (formData) => {
    try {
      if (!selectedSeason) {
        alert("Vui lòng chọn mùa phim trước");
        return;
      }

      if (!formData.peopleId || !formData.job) {
        alert("Vui lòng điền đầy đủ thông tin");
        return;
      }

      if (editingCrew) {
        // Update existing crew
        await axiosInstance.put(
          `/api/movie-crew/${selectedSeason.value}/${editingCrew.Person.id}`,
          { job: formData.job }
        );
        alert("Cập nhật công việc thành công");
      } else {
        // Check if crew already exists
        const existingCrew = movieCrew.find(
          c => c.Person.id === formData.peopleId
        );
        if (existingCrew) {
          alert("Nhân viên này đã có trong phim");
          return;
        }

        // Add new crew
        const response = await axiosInstance.post(
          "/api/movie-crew",
          {
            peopleId: parseInt(formData.peopleId),
            job: formData.job,
            seasonId: parseInt(selectedSeason.value)
          }
        );

        if (response.status === 201) {
          alert("Thêm nhân viên thành công");
        }
      }
      fetchMovieCrew(selectedSeason.value);
      setIsCrewModalOpen(false);
      setEditingCrew(null);
    } catch (error) {
      console.error("Error handling crew:", error);
      if (error.response) {
        console.error("Error response:", error.response.data);
        alert(error.response.data.error || (editingCrew ? "Lỗi khi cập nhật công việc" : "Lỗi khi thêm nhân viên"));
      } else {
        alert(editingCrew ? "Lỗi khi cập nhật công việc" : "Lỗi khi thêm nhân viên");
      }
    }
  };

  return (
    <div className="p-4 sm:ml-64 dark:bg-gray-900 min-h-screen">
      <div className="p-4 border-2 border-dashed rounded-lg border-gray-200 dark:border-gray-700 mt-14">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Đội ngũ phim
          </h1>
          <button
            onClick={handleAddPerson}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            <Plus className="w-5 h-5" /> Thêm thành viên
          </button>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
          <Datatables
            columns={peopleColumns}
            data={people.map(person => ({
              ...person,
              onEdit: handleEditPerson,
              onDelete: handleDeletePerson
            }))}
          />
        </div>
      </div>

      <div className="p-4 border-2 border-dashed rounded-lg border-gray-200 dark:border-gray-700 mt-14">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Đội ngũ diễn viên
          </h1>
          <div className="flex gap-4">
            <Select
              className="w-64"
              options={seasons}
              value={selectedSeason}
              onChange={setSelectedSeason}
              placeholder="Chọn mùa phim..."
              isSearchable
            />
            {selectedSeason && (
              <button
                onClick={handleAddCast}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              >
                <Plus className="w-5 h-5" /> Thêm diễn viên
              </button>
            )}
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
          <Datatables
            columns={movieCastColumns}
            data={movieCast.map(cast => ({
              ...cast,
              onEdit: handleEditCast,
              onDelete: handleDeleteCast
            }))}
          />
        </div>
      </div>

      <div className="p-4 border-2 border-dashed rounded-lg border-gray-200 dark:border-gray-700 mt-14">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Đội ngũ sản xuất
          </h1>
          <div className="flex gap-4">
            <Select
              className="w-64"
              options={seasons}
              value={selectedSeason}
              onChange={setSelectedSeason}
              placeholder="Chọn mùa phim..."
              isSearchable
            />
            {selectedSeason && (
              <button
                onClick={handleAddCrew}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              >
                <Plus className="w-5 h-5" /> Thêm nhân viên
              </button>
            )}
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
          <Datatables
            columns={movieCrewColumns}
            data={movieCrew.map(crew => ({
              ...crew,
              onEdit: handleEditCrew,
              onDelete: handleDeleteCrew
            }))}
          />
        </div>
      </div>

      <PeopleModal
        isOpen={isPeopleModalOpen}
        onClose={() => {
          setIsPeopleModalOpen(false);
          setEditingPerson(null);
        }}
        onSubmit={handleSubmitPerson}
        editingPerson={editingPerson}
      />

      <CastModal
        isOpen={isCastModalOpen}
        onClose={() => {
          setIsCastModalOpen(false);
          setEditingCast(null);
        }}
        onSubmit={handleSubmitCast}
        people={people}
        editingCast={editingCast}
      />

      <CrewModal
        isOpen={isCrewModalOpen}
        onClose={() => {
          setIsCrewModalOpen(false);
          setEditingCrew(null);
        }}
        onSubmit={handleSubmitCrew}
        people={people}
        editingCrew={editingCrew}
      />
    </div>
  );
};

export default People;
