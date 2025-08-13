import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const AdministratorSearchBox = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleClear = () => {
    setSearchTerm(""); 
    setSearchParams({}, { replace: true }); 
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedSearch = searchTerm.trim();

    if (trimmedSearch) {
      setSearchParams({ search: trimmedSearch }, { replace: true });
    } else {
      setSearchParams({}, { replace: true });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2 gap-2">
      <TextField
        name="search"
        value={searchTerm}
        onChange={handleChange}
        label="Search"
        variant="outlined"
        size="small"
        className="w-72"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon className="text-gray-500" />
            </InputAdornment>
          ),
          endAdornment: searchTerm && (
            <InputAdornment position="end">
              <IconButton onClick={handleClear} size="small">
                <ClearIcon className="text-gray-500" />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Search
      </button>
    </form>
  );
};

export default AdministratorSearchBox;
