import osImg16 from "../../../assets/image/osImg16.png";
import { useEffect, useState } from "react";
import { Paper } from "@mui/material";
import { Row, Col } from "react-bootstrap";
import styles from "../ourservices/OurServices.module.css";
import { salonService } from "../../../api/salon.management";
import Session from "../../../service/session";
import Notify from "../../../utils/notify";

function OurServices() {
  const [services, setServices] = useState([]);
  const salonId = Session.get("salonId");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await salonService(salonId);
        const services = response.data;
        console.log("services::>", services);
        setServices(services);
      } catch (error) {
        Notify.error(error.message);
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
                  alt={service.serviceName}
                />
                <p className={styles.hairStyle}>
                  {service.serviceName}
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
