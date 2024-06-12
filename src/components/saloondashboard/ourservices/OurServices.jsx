import osImg16 from "../../../assets/image/osImg16.png";
import { useEffect, useState } from "react";
import { Paper } from "@mui/material";
import { Row, Col } from "react-bootstrap";
import styles from "../ourservices/OurServices.module.css";
import { salonServices } from "../../../api/salon.management";
import Session from "../../../service/session";
import Notify from "../../../utils/notify";

function OurServices({selectedSalon}) {
  const [services, setServices] = useState([]);
  const salonId = selectedSalon.id;

  useEffect(() => {
    const fetchServices = async () => {
      if (!salonId) {
        //Notify.error("Invalid salon ID");

        return;
      }

      try {
        const response = await salonServices(salonId);
        if (response && response.data) {
          const services = response.data;
          console.log("services::>", services);
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
                  {service.serviceName || "?"}
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
