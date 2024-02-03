import * as React from "react";
import { Row, Col } from "react-bootstrap";
import { Paper } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import user from "../assets/image/user.png";
import salons from "../assets/image/salons.png";
import revenue1 from "../assets/image/revenue1.png";
import running from "../assets/image/running.png";
import email from "../assets/image/email.png";
import booking from "../assets/image/booking.png";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { PieChart } from "react-minimal-pie-chart";
import cancelled from "../assets/image/cancelled.png";
import { BarPlot} from "@mui/x-charts";
import { LineChart, LinePlot, MarkPlot } from "@mui/x-charts/LineChart";
import { BarChart } from "@mui/x-charts/BarChart";
const uData = [2000, 3000, 3200];
const vData = [3200, 4000, 3200];

const data = [
  {
    id: 1,
    imageSrc: user,
    title: "Total User",
    value: 777,
    color: "red",
    icon: <ArrowDownwardIcon sx={{ fontSize: "13px" }}/>,
    changePercentage: -25,
  },
  {
    id: 2,
    imageSrc: salons,
    title: "Total Salons",
    value: 777,
    color: "green",
    icon: <ArrowUpwardIcon sx={{ fontSize: "13px" }} />,
    changePercentage: 25,
  },
  {
    id: 3,
    imageSrc: revenue1,
    title: "Total Revenue",
    value: 777,
    color: "green",
    icon: <ArrowUpwardIcon sx={{ fontSize: "12px" }} />,
    changePercentage: 25,
  },
  {
    id: 4,
    imageSrc: running,
    title: "Total Freelance",
    value: 777,
    color: "red",
    icon: <ArrowDownwardIcon sx={{ fontSize: "12px" }} />,
    changePercentage: -25,
  },
];

const data1 = [
  {
    id: 1,
    imageSrc: booking,
    title: "Total Completed Booking",
    value: 777,
    color: "green",
    icon: <ArrowUpwardIcon sx={{ fontSize: "12px" }} />,
    changePercentage: 25,
  },
  {
    id: 2,
    imageSrc: cancelled,
    title: "Total Cancelled Booking",
    value: 777,
    color: "red",
    icon: <ArrowDownwardIcon sx={{ fontSize: "12px" }} />,
    changePercentage: -25,
  },
  {
    id: 3,
    imageSrc: email,
    title: "Total Upcoming Bookings",
    value: 777,
    color: "green",
    icon: <ArrowUpwardIcon sx={{ fontSize: "12px" }} />,
    changePercentage: 25,
  },
];

const Dashboard = () => {
  const pData = [100, 50, 150, 20, 50, 40, 60];
  const xLabels = [
    "7 January 2023",
    "8 January 2023",
    "9 January 2023",
    "10 January 2023",
    "11 January 2023",
    "12 January 2023",
    "13 January 2023",
  ];

  return (
    <>
      <Row className="totalOne-counts p-0 m-3">
        {data.map((item,index) => (
          <Col key={item.id} lg={3}>
            <Paper className={`paperOne ${index === 0 ? 'first-paper' : ''} ${index === 1 ? 
              'second-paper' : ''} ${index === 2 ? 'third-paper' : ''} ${index === 3 ? 
              'fourth-paper' : ''}`}>
              <Row>
                <Col lg={6}>
                  <img
                    src={item.imageSrc}
                    alt={item.title}
                    className="user-image"
                  />
                </Col>
                <Col lg={6}>
                  <div className="total">
                    <h5>{item.title}</h5>
                    <h6>{item.value}</h6>
                    <p style={{ color: item.color }}>
                      <span className="span-icon">{item.icon}</span>
                      {item.changePercentage}%{" "}
                      {item.changePercentage > 0 ? "Increase" : "Decrease"}
                    </p>
                  </div>
                </Col>
              </Row>
            </Paper>
          </Col>
        ))}
      </Row>
      <Row className="totalTwo-counts p-0 m-3">
        {data1.map((item,index) => (
          <Col key={item.id} lg={4}>
           <Paper   className={`total-paper ${index === 0 ? 'extra-padding' : ''} ${
          index === 2 ? 'extra-padding' : ''
        }`}>
              <Row>
                <Col lg={4}>
                  <img
                    src={item.imageSrc}
                    alt={item.title}
                    className="user-image"
                  />
                </Col>
                <Col lg={4}>
                  <h5>{item.title}</h5>
                </Col>
                <Col lg={4}>
                  <h6>{item.value}</h6>
                  <p style={{ color: item.color}}>
                    <span>{item.icon}</span>
                    {item.changePercentage}%{" "}
                    {item.changePercentage > 0 ? "Increase" : "Decrease"}
                  </p>
                </Col>
              </Row>
            </Paper>
          </Col>
        ))}
      </Row>
      <Row className="totalThree-counts p-0 m-3">
        <Col lg={3}>
          <Paper className="registeredUser">
            <h4>Total User</h4>
            <p>total registered</p>

            <BarChart className="barchart"
               width={250}
               height={270}
              series={[
                { data: uData, type: "bar", color: "#D9D9D9" },
                { data: vData, type: "bar", color: "black" },
              ]}
              xAxis={[
                { scaleType: "band", color: "#D9D9D9", data: ["M", "T", "W"] },
              ]}
              leftAxis={null}
              disableLine={null}
            >
              <BarPlot />
            </BarChart>
          </Paper>
        </Col>
        <Col lg={3}>
          <Paper className="booking-graph">
            <h4>Bookings</h4>

            <PieChart className="booking"
              data={[
                { value: 13, color: "#000000" },
                { value: 5, color: "#D9D9D9" },
                { value: 2, color: "#6F6B7D" },
              ]}
              radius={35}
              lineWidth={40}
              startAngle={-1}
              lengthAngle={360}
              animate
              cx={150}
              cy={150}
            />
            <ul className="booking-list">
              <li>Upcoming Bookings</li>
              <li>Completed Bookings</li>
              <li>Cancelled Bookings</li>
            </ul>
          </Paper>
        </Col>
        <Col lg={6}>
          <Paper className="graph-revennue">
            <h4>Total Revenue</h4>
            <h3>777</h3>
            <LineChart className="linechart"
               width={450}
              height={261}
              series={[
                {
                  type: "line",
                  data: pData,
                  disableLine: "false",
                  disableTicks: "false",
                },
              ]}
              xAxis={[{ scaleType: "point", dataKey: "index", data: xLabels, }]}
              leftAxis={null}
              xAxisLine={null}
              sx={{
                ".MuiLineElement-root": {
                  stroke: "#000000",
                  strokeWidth: 10,
                },
                ".MuiMarkElement-root": {
                  stroke: "#fff",
                  scale: "0.6",
                  strokeWidth: 10,
                },
              }}
              disableAxisListener
            >
              <LinePlot />

              <MarkPlot />
            </LineChart>
          </Paper>
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;