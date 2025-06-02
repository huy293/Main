import { React, useState, useEffect } from "react";
import Datatables from "../../../components/Datatable/Datatables";
import { Pencil, Trash2, Plus } from "lucide-react";
import Select from "react-select";
import axios from "axios";
import { toast } from "react-toastify";
import peopleColumns from "../../../components/Datatable/column/peopleColumns";
import movieCastColumns from "../../../components/Datatable/column/movieCastColumns";
import movieCrewColumns from "../../../components/Datatable/column/movieCrewColumns";
import { PeopleModal, CastModal, CrewModal } from "./PeopleModals";

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

  // Fetch all data when component mounts
  useEffect(() => {
    fetchPeople();
    fetchSeasons();
  }, []);

  // Fetch cast and crew when season changes
  useEffect(() => {
    if (selectedSeason) {
      fetchMovieCast(selectedSeason.value);
      fetchMovieCrew(selectedSeason.value);
    }
  }, [selectedSeason]);

  const fetchPeople = async () => {
    try {
      const response = await axios.get("http://localhost:8888/api/people", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      setPeople(response.data);
      setLoading(false);
    } catch (error) {
      toast.error("Lỗi khi tải danh sách thành viên");
      console.error(error);
    }
  };

  const fetchSeasons = async () => {
    try {
      const response = await axios.get("http://localhost:8888/api/movies", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      const movies = response.data;
      
      // Fetch seasons for each series type movie
      const seasonsPromises = movies
        .filter(movie => movie.type === "series")
        .map(movie => 
          axios.get(`http://localhost:8888/api/season/movie/${movie.id}`, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          })
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
      toast.error("Lỗi khi tải danh sách mùa phim");
      console.error(error);
    }
  };

  const fetchMovieCast = async (seasonId) => {
    try {
      const response = await axios.get(
        `http://localhost:8888/api/moviecast/movie/${seasonId}`,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setMovieCast(response.data);
    } catch (error) {
      toast.error("Lỗi khi tải danh sách diễn viên");
      console.error(error);
    }
  };

  const fetchMovieCrew = async (seasonId) => {
    try {
      const response = await axios.get(
        `http://localhost:8888/api/moviecrew/movie/${seasonId}`,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setMovieCrew(response.data);
    } catch (error) {
      toast.error("Lỗi khi tải danh sách đoàn phim");
      console.error(error);
    }
  };

  // Handle functions for People CRUD
  const handleAddPerson = () => {
    setIsPeopleModalOpen(true);
  };

  const handleEditPerson = (person) => {
    // TODO: Implement edit person
    console.log("Edit person:", person);
  };

  const handleDeletePerson = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa thành viên này?")) {
      try {
        await axios.delete(`http://localhost:8888/api/people/${id}`, {
          withCredentials: true,
        });
        toast.success("Xóa thành viên thành công");
        fetchPeople();
      } catch (error) {
        toast.error("Lỗi khi xóa thành viên");
        console.error(error);
      }
    }
  };

  const handleSubmitPerson = async (formData) => {
    try {
      await axios.post(
        "http://localhost:8888/api/people",
        formData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      toast.success("Thêm thành viên thành công");
      fetchPeople();
      setIsPeopleModalOpen(false);
    } catch (error) {
      toast.error("Lỗi khi thêm thành viên");
      console.error(error);
    }
  };

  // Handle functions for MovieCast CRUD
  const handleAddCast = () => {
    setIsCastModalOpen(true);
  };

  const handleEditCast = (cast) => {
    // TODO: Implement edit cast
    console.log("Edit cast:", cast);
  };

  const handleDeleteCast = async (cast) => {
    if (window.confirm("Bạn có chắc muốn xóa diễn viên này khỏi phim?")) {
      try {
        await axios.delete(
          `http://localhost:8888/api/moviecast/${selectedSeason.value}/${cast.People.id}`,
          { withCredentials: true }
        );
        toast.success("Xóa diễn viên khỏi phim thành công");
        fetchMovieCast(selectedSeason.value);
      } catch (error) {
        toast.error("Lỗi khi xóa diễn viên khỏi phim");
        console.error(error);
      }
    }
  };

  const handleSubmitCast = async (formData) => {
    try {
      await axios.post(
        "http://localhost:8888/api/moviecast",
        {
          ...formData,
          movieId: selectedSeason.value,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      toast.success("Thêm diễn viên thành công");
      fetchMovieCast(selectedSeason.value);
      setIsCastModalOpen(false);
    } catch (error) {
      toast.error("Lỗi khi thêm diễn viên");
      console.error(error);
    }
  };

  // Handle functions for MovieCrew CRUD
  const handleAddCrew = () => {
    setIsCrewModalOpen(true);
  };

  const handleEditCrew = (crew) => {
    // TODO: Implement edit crew
    console.log("Edit crew:", crew);
  };

  const handleDeleteCrew = async (crew) => {
    if (window.confirm("Bạn có chắc muốn xóa nhân viên này khỏi phim?")) {
      try {
        await axios.delete(
          `http://localhost:8888/api/moviecrew/${selectedSeason.value}/${crew.People.id}`,
          { withCredentials: true }
        );
        toast.success("Xóa nhân viên khỏi phim thành công");
        fetchMovieCrew(selectedSeason.value);
      } catch (error) {
        toast.error("Lỗi khi xóa nhân viên khỏi phim");
        console.error(error);
      }
    }
  };

  const handleSubmitCrew = async (formData) => {
    try {
      await axios.post(
        "http://localhost:8888/api/moviecrew",
        {
          ...formData,
          movieId: selectedSeason.value,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      toast.success("Thêm nhân viên thành công");
      fetchMovieCrew(selectedSeason.value);
      setIsCrewModalOpen(false);
    } catch (error) {
      toast.error("Lỗi khi thêm nhân viên");
      console.error(error);
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
        onClose={() => setIsPeopleModalOpen(false)}
        onSubmit={handleSubmitPerson}
      />

      <CastModal
        isOpen={isCastModalOpen}
        onClose={() => setIsCastModalOpen(false)}
        onSubmit={handleSubmitCast}
        people={people}
      />

      <CrewModal
        isOpen={isCrewModalOpen}
        onClose={() => setIsCrewModalOpen(false)}
        onSubmit={handleSubmitCrew}
        people={people}
      />
    </div>
  );
};

export default People;
