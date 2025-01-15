import { Card, Radio, Select, Spin } from "antd";
import React, { useEffect, useState } from "react";

import "../components/dashboard/dashboard.css";
import Overview from "../components/dashboard/Overview";
import PieChartP from "../components/dashboard/PieChartP";
import {
  getAllSessions,
} from "../services/SessionsService";
import LineChartP from "../components/dashboard/LineChartP";
import { formateDayAndMonth } from "../lib/formateDate";
import { Button, ButtonGroup, Col, Row } from "react-bootstrap";
import { formatMoney } from "../lib/formatMoney";
import BarChart from "../components/dashboard/BarChart";
import { getGameSessionsCount, getTotalAmountByDevice, getTotalAmountByGame } from "../services/DashboardService";
const Dashboard = () => {
  const [games, setGames] = useState([]);
  const [sessions, setSessions] = useState([]);

  const [barCharData, setBarCharData] = useState({});
  const [chartData, setChartData] = useState({});
  const [selectedPeriod, setSelectedPeriod] = useState("30");
  const [radioGameDevice, setRadioGameDevice] = useState("devices");
const [totalRevenue,setTotalRevenue] = useState(0)
  const [isLoadingBar, setIsLoadingBar] = useState(true);
  const [isLoadingChart, setIsLoadingChart] = useState(true);
  const [isLoadingPie, setIsLoadingPie] = useState(true);

  useEffect(() => {
    if (radioGameDevice == "devices") {
      getTotalAmountByDevice().then((data) => {
        // console.log(data);
        setBarCharData((prev) => {
          return {
            ...prev,
            labels: data?.map((game) => game.name),
            data: data?.map((game) => parseFloat(game.total.toFixed(3))),
          };
        });
      });

      setIsLoadingBar(false);
    } else {
      getTotalAmountByGame().then((data) => {
        // console.log("games total:" + JSON.stringify(data));
        setBarCharData((prev) => {
          return {
            ...prev,
            labels: data.map((game) => game.name),
            data: data.map((game) => parseFloat(game.total.toFixed(3))),
          };
        });
      });
    }
  }, [radioGameDevice]);
  useEffect(() => {
    getGameSessionsCount().then((data) => {
      // console.log(JSON.stringify(data));
      setGames(data);
      setIsLoadingPie(false);
    });
  }, []);

  useEffect(() => {
    
    getAllSessions(0, 0, selectedPeriod).then((data) => {
      
      setTotalRevenue(data.reduce((acc,current) => {
        
        return acc+current.amount
      }, 0))
      
      const sortedData = data.sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
      });
      setChartData((prev) => {
        return {
          ...prev,
          labels: sortedData.map((session) => formateDayAndMonth(session.date)),
          data: sortedData.map((session) => session.amount),
        };
      });
      setSessions(data);
    });
    setIsLoadingChart(false);
    // console.log(chartData);
  }, [selectedPeriod]);

  if (isLoadingBar || isLoadingChart || isLoadingPie) {

    return <Spin fullscreen  size="large" />

    // <div className="d-flex bg-danger justify-content-center align-items-center vh-100">
    //   <Spin fullscreen size="large" />
    // </div>;
  }
  return (
    <>

      <Overview />

      <section className="mt-4">
        <Row  className="justify-content-between gap-4 gap-md-0">
          {/* Begin Revenue Section */}
          <Col md={8} className="">
            <Card>
              <div className="d-flex justify-content-between">
                <div>
                <p className="h3 ">Revenue Overview</p>
                  <p className="m-0 text-muted" >Total Revenues: <span className="text-primary fw-bold fs-6">{formatMoney(totalRevenue)} TND</span>  </p>
                </div>
                <Select
                  defaultValue="30"
                  style={{ width: 120 }}
                  onChange={(value) => {
                    setSelectedPeriod(value);
                  }}
                  options={[
                    {
                      label: "Week",
                      value: "7",
                    },
                    {
                      label: "Month",
                      value: "30",
                    },
                    {
                      label: "Year",
                      value: "365",
                    },
                  ]}
                />
              </div>

              <LineChartP data={chartData} />
            </Card>
          </Col>
          {/* End Revenue Section */}
          {/* Begin Popular Games Section */}
          <Col md={4} className="p-0">
            {/* this will be a pie chart for games count */}
            <Card className="">
              <p className="h3">Popular Games</p>
              <p className="text-muted m-0">By number of sessions played</p>
              <PieChartP data={games} />
            </Card>
          </Col>
          {/* End Popular Games Section */}
        </Row>
      </section>

      {/* Begin Revenue Distribution Section */}
      <section className="mt-4">
        <Card>
          <div className="d-flex justify-content-between">
            <div>
            <h3>Revenue Distribution</h3>
              <p className="m-0 text-secondary">Revenue distribution by device or games</p>
            </div>
            
            <Radio.Group
              defaultValue="devices"
              onChange={(e) => {
                setRadioGameDevice(e.target.value);
              }}
              optionType="button"
              buttonStyle="solid"
              value={radioGameDevice}
            >
              <Radio.Button defaultChecked value="devices">
                Devices
              </Radio.Button>
              <Radio.Button value="games">Games</Radio.Button>
            </Radio.Group>
          </div>

          <BarChart data={barCharData} />
        </Card>
      </section>
      {/* End Revenue Distribution Section */}

    </>
  );
};

export default Dashboard;
