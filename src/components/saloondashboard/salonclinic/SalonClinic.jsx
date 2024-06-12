import { Row, Col } from "react-bootstrap";

import Stylist from "../stylist/Stylist";
import OurServices from "../ourservices/OurServices";

import RunningBanner from "../runningbanner/RunningBanner";

function SalonClinic({ selectedSalon }) {
  console.log("selected", selectedSalon);
  return (
    <>
      <RunningBanner selectedSalon={selectedSalon} />

      <Row>
        <Col xl={6} className="mt-4">
          <Stylist selectedSalon={selectedSalon} />
        </Col>

        <Col xl={6} className="mt-4">
          <OurServices selectedSalon={selectedSalon} />
        </Col>
      </Row>
    </>
  );
}

export default SalonClinic;
