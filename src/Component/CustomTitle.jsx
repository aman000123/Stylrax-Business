import React from "react";
import SearchDropDown from "../Component/SearchDropDown";

const CustomTitle = (props) => {
  const iconStyles = {
    size: 20,
    marginRight: 10,
    ...(props.icon && props.icon.props.style),
  };

  return (
    <div className="d-flex align-items-center justify-content-between">
      <div className="d-flex align-items-center">
        {props.icon && React.cloneElement(props.icon, { style: iconStyles })}
        {props.title}
      </div>
      <div className="d-flex align-items-center">
        <SearchDropDown
        // value={props.searchText}
        //   onChange={props.handleSearchChange}
        />
      </div>
    </div>
  );
};

export default CustomTitle;
