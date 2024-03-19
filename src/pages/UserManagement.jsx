import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import { getCountries } from "../api/account.api";
import Notify from "../utils/notify";
import { AiOutlineUser } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { selectSearchTerm, setCountries, selectCountriesData } from "../features/countriesInfo";

const UserManagement = () => {

 const searchText = useSelector(selectSearchTerm);
  console.log('Search text:', searchText);

   const dispatch = useDispatch();
  const countries = useSelector(selectCountriesData);

  // const [countries, setCountries] = useState([]);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleEdit = (rowData) => {
    console.log("Editing row:", rowData);

    // Close the edit popup
    setShowEditPopup(false);
    setSelectedRow(null);
  };

  const handleRowClick = (row) => {
    // Open the edit popup when a row is clicked
    setShowEditPopup(true);
    setSelectedRow(row);
  };

  const getCountrie = async () => {
    try {
      const response = await getCountries()
      const filteredCountries = response.data.filter((country) =>
      country.name.toLowerCase().includes(searchText.toLowerCase())
    );

    // Dispatch the setCountries action to update the countries state
    dispatch(setCountries(filteredCountries));

    console.log("Response ::", response.data);


    console.log("Response ::", response.data);
    } catch (error) {
      Notify.error(error.message);
    }
  };

  useEffect(() => {
    getCountrie();
  },  [searchText]);

  const columns = [
    {
      name: "Country Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Active",
      cell: (row, index) => (
        <span
          className={`rounded-pill ${
            index % 2 === 0 ? "blocked-pill" : "active-pill"
          }`}
        >
          {index % 2 === 0 ? "Blocked" : "Active"}
        </span>
      ),
      //  row.capital ? (
      //     <span className="rounded-pill active-pill"> Active</span>
      //   ) : (
      //     <span className="rounded-pill blocked-pill"> Blocked</span>
      //   ),
    },
    {
      name: "Country Native Name",
      selector: (row) => row.nativeName,
    },
    {
      name: "Country Captial",
      selector: (row) => row.capital,
    },
    {
      name: "Appointment",
      cell: (row) => (
        <div>
          <span
            className={`appointment ${
              row.capital ? "appointment-completed" : "appointment-canceled"
            }`}
          >
            Completed
          </span>
          <br />
          <span
            className={`appointment ${
              !row.capital ? "appointment-canceled" : "appointment-canceled"
            }`}
          >
            Canceled
          </span>
        </div>
      ),
    },
    {
      name: "Country Flag",
      selector: (row) => (
        <img width={50} height={50} src={row.flag} alt="icon" />
      ),
    },
    {
      name: "Action",
      cell: (row) => (
        <button
          className="btn btn-primary"
          onClick={() => {
            setSelectedRow(row);
            setShowEditPopup(true);
          }}
        >
          Edit
        </button>
      ),
    },
  ];

  return (
    <Table
      icon={<AiOutlineUser />} title={"User Management"}
      countries={countries}
      columns={columns}
      handleRowClick={handleRowClick}
      showEditPopup={showEditPopup}
      setShowEditPopup={setShowEditPopup}
      handleEdit={handleEdit}
      selectedRow={selectedRow}
    />
  );
};

export default UserManagement;
