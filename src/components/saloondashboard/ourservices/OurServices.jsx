import osImg16 from "../../../assets/image/osImg16.png";
import React, { useEffect, useState } from "react";
import { Paper, Skeleton } from "@mui/material"; // Import Skeleton from Material-UI
import { Row, Col } from "react-bootstrap";
import styles from "../ourservices/OurServices.module.css";
import { salonServices } from "../../../api/salon.management";
import Notify from "../../../utils/notify";

function OurServices({ selectedSalon }) {
  const [services, setServices] = useState([]);
  const salonId = selectedSalon.id;

  const capitalizeFirstLetter = (string) => {
    return string
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  useEffect(() => {
    const fetchServices = async () => {
      if (!salonId) {
        return;
      }

      try {
        const response = await salonServices(salonId);
        if (response && response.data) {
          const services = response.data;
          setServices(services);
        } else {
          Notify.error("Failed to fetch services. Please try again.");
        }
      } catch (error) {
        Notify.error(error.message || "An unexpected error occurred.");
      }
    };

    fetchServices();
  }, [salonId]);

  // Divide services into groups of 4 for rendering
  const serviceGroups = [];
  for (let i = 0; i < services.length; i += 4) {
    serviceGroups.push(services.slice(i, i + 4));
  }

  // Show skeleton loading while waiting for services
  if (services.length === 0) {
    return (
      <div className={styles.mainDiv}>
        <div style={{ color: "#000000" }}>Our Services</div>

        <Row className="mt-2">
          {[...Array(4)].map((_, index) => (
            <Col key={index} className={styles.border}>
              <Paper className={styles.paper} elevation={0}>
                <Skeleton variant="rectangular" width="100%" height={200} />
              </Paper>
            </Col>
          ))}
        </Row>
      </div>
    );
  }

  return (
    <div className={styles.mainDiv}>
      <div style={{ color: "#000000" }}>Our Services</div>

      {serviceGroups.map((group, groupIndex) => (
        <Row key={groupIndex} className="mt-2">
          {group.map((service, serviceIndex) => (
            <Col key={service.id} className={styles.border}>
              <Paper className={styles.paper} elevation={0}>
                <img
                  className={styles.hairStylist}
                  src={osImg16}
                  alt={service.serviceName || "Service"}
                />
                <p className={styles.hairStyle}>
                  {capitalizeFirstLetter(service.serviceName) || "?"}
                  <br />
                </p>
              </Paper>
            </Col>
          ))}
        </Row>
      ))}
    </div>
  );
}

export default OurServices;
