import React from "react";
import PopUp from "./PopUp";
import DataTable from "react-data-table-component";
import CustomTitle from "./CustomTitle";

const Table = (props) => {
 

  return (
    <div className="mt-5 main-table rounded ">
      <DataTable
        title={<CustomTitle icon={props.icon} title={props.title} />}
        columns={props.columns}
        data={props.countries}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="450px"
        highlightOnHover
        onRowClicked={props.handleRowClick}
      />
      {props.showEditPopup && (
        <PopUp
          show={true}
          handleClose={() => props.setShowEditPopup(false)}
          handleEdit={props.handleEdit}
          rowData={props.selectedRow}
        />
      )}
    </div>
  );
};

export default Table;
