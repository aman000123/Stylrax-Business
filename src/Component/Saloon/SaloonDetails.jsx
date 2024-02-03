import React from "react";
import { Row, Col } from "react-bootstrap";
import { Paper } from "@mui/material";
import hair from "../../assets/image/hair.png";
import SaloonServices from "./SaloonServices";
import { serviceData } from "./Data";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
function handleClick(event) {
  event.preventDefault();
}

const SaloonDetails = (props) => {
  const { personalDetails } = props;
  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      href="/"
      onClick={handleClick}
    >
      Salon Management
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="inherit"
      href="/material-ui/getting-started/installation/"
      onClick={handleClick}
    >
      Details
    </Link>,
  ];

  return (
    <>
      <Stack spacing={2}>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          {breadcrumbs}
        </Breadcrumbs>
      </Stack>

      <Row className="total-details mt-3 p-0">
        <Col lg={4}>
          <Paper className="details-paper pt-4">
            <div className="personal-details">
              <img src={hair} alt="hair.png" className="user-image" />
              <h4 className="salon-name">{personalDetails.salonName}</h4>
              <p className="user-details">
                {personalDetails.location} <br />
                {personalDetails.email} <br />
                Mobile Num: {personalDetails.mobileNum}
              </p>
            </div>

            {props.dataEntries.map((dataEntry, index) => (
              <Row key={index} className="data-entries">
                <Col lg={6}>
                  <h4 className="label">{dataEntry.label}</h4>
                </Col>
                <Col lg={6}>
                  <p className="value">{dataEntry.value}</p>
                </Col>
              </Row>
            ))}

            <div className="btn">
              <button className="btn-block">BLOCK</button>
              <button className="btn-req">REQUEST VERIFICATION</button>
            </div>
          </Paper>
        </Col>
        {<SaloonServices data={serviceData} />}
      </Row>
    </>
  );
};

export default SaloonDetails;
