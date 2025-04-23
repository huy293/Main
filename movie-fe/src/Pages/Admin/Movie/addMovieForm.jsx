import React from "react";
const AddMovieForm = () => {
    return (
        <div className="fixed top-0 left-0 z-[999] flex justify-center items-center w-full h-full overflow-x-hidden overflow-y-auto backdrop-blur-sm">
            <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
                <h1 className="text-xl font-bold mb-4">Add Movie</h1>
                <form className="space-y-4">
                    <input type="text" placeholder="Movie Title" className="w-full p-2 border rounded" />
                    <input type="text" placeholder="Director" className="w-full p-2 border rounded" />
                    <input type="text" placeholder="Genre" className="w-full p-2 border rounded" />
                    <input type="text" placeholder="Release Date" className="w-full p-2 border rounded" />
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add Movie</button>
                </form>
            </div>
        </div>
    )
}
export default AddMovieForm;