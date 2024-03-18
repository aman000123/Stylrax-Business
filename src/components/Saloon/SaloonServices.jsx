import React from 'react';
import { Row, Col } from "react-bootstrap";
import { Paper } from "@mui/material";
const SaloonServices = (props) => {
  return (
    <Col lg={8}>
      <Paper className="services-details">
        <h4 className="services">Services</h4>
        <hr />
        {props.data.map((service,index) => (
          <p className="service-box" key={index}>
            <Row>
              <Col lg={2}>
                <img
                  src={service.imageSrc}
                  alt={service.title}
                  className="service-image"
                />
              </Col>
              <Col lg={2}>
                <h4 className="title">{service.title}</h4>
                <p className="para">{service.para}</p>
              </Col>
              <Col lg={4}>
                <h4 className="paraOne">{service.para1}</h4>
              </Col>
              <Col lg={2} className='btn'>
                <p
                  className={service.button === "ACTIVE" ? "active" : "inactive"}>
                  {service.button}
                </p>
              </Col>
              <Col lg={2}>
                <h4 className="price">
                  {service.rs}
                  <br />
                  <span>{service.tax}</span>
                </h4>
              </Col>
            </Row>
          </p>
        ))} 
        <hr />
      </Paper>
    </Col>
  );
}

export default SaloonServices;
