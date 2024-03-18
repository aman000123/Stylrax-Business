import React from "react";
import AddServiceType from "../components/ServiceType/AddServiceType";
import ServiceType from "../components/ServiceType/ServiceType";
import { Row, Col, Container } from "react-bootstrap";

const ServiceTypeMan = () => {
  return (
    <Container>
      <Row>
        <Col md={4} className="mt-5 ">
          <AddServiceType />
        </Col>
        <Col md={8} className="mt-5">
          <ServiceType />
        </Col>
      </Row>
    </Container>
  );
};

export default ServiceTypeMan;
