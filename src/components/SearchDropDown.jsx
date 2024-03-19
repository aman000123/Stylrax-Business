import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectSearchTerm, setSearchTerm } from "../features/countriesInfo";

const SearchDropDown = ({ value, onChange }) => {

  const searchText = useSelector(selectSearchTerm);
  const dispatch = useDispatch();

  const handleSearchChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const data = [
    { text: "Category", value: "1" },
    { text: "option2", value: "2" },
    { text: "option3", value: "3" },
  ];

  return (
    <div className="dropdown-container">
      <div className="search-container">
        <input type="text" placeholder="Search" className="search-bar ps-3" 
           value={searchText}
           onChange={handleSearchChange}
        />
        <div className="vertical-line"></div>
        <select value={value} onChange={onChange} className="dropdown ps-2">
        {data.map((item) => (
          <option key={item.value} value={item.value}>
            {item.text}
          </option>
        ))}
      </select>
      </div>
      
    </div>
  );
};

export default SearchDropDown;
