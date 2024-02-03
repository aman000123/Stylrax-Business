import { Paper } from '@mui/material';
import { MdOutlineContentPaste } from "react-icons/md";
import React from 'react';

const ServiceType = () => {
  return (
    <Paper className="service-type-paper px-3 pb-3 rounded" elevation={3}>
      <div className="d-flex align-items-center pt-2">
        <MdOutlineContentPaste />
        <p className=" ps-1 fw-bold  mb-0">Add Service Type</p>
      </div>
      <hr />
    </Paper>
  )
};

export default ServiceType;