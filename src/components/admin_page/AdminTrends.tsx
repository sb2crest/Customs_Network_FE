import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import {
  MdOutlineStackedLineChart,
  MdOutlinePendingActions,
} from "react-icons/md";
import { LuSigma } from "react-icons/lu";
import { FaCircleXmark} from "react-icons/fa6";
import { GiSandsOfTime } from "react-icons/gi";
import { FaArrowTrendUp } from "react-icons/fa6";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import Button from "@mui/material/Button";
import { useAdminContext } from "../../context/AdminContext";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { MdErrorOutline  } from "react-icons/md";

const AdminTrends = () => {
  const [activeButtons, setActiveButtons] = useState([
    true,
    false,
    false,
    false,
  ]);
  const { adminTrendsData, setAdminTrendsData } = useAdminContext();
  const axiosPrivate = useAxiosPrivate();
  const [responseData, setResponseData] = useState([]);
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();
  console.log(adminTrendsData);
  useEffect(() => {
    if (adminTrendsData && adminTrendsData.length > 0) {
      setResponseData(adminTrendsData);
    }
  }, [adminTrendsData]);

  useEffect(() => {
    fetchTrendsData(0); 
  }, []); 
  

  const handleButtonToggle = (index) => {
    setActiveButtons(activeButtons.map((button, i) => i === index));
    fetchTrendsData(index);
  };

  const fetchTrendsData = (periodIndex) => {
    let period;
    switch (periodIndex) {
      case 0:
        period = "today";
        break;
      case 1:
        period = "week";
        break;
      case 2:
        period = "month";
        break;
      case 3:
        period = "year";
        break;
      default:
        period = "today";
    }

    axiosPrivate
      .get(`/api/audit/get-all-transaction?userId=${userId}&period=${period}`)
      .then((response) => {
        setResponseData(response.data);
        setAdminTrendsData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching trends data:", error);
        navigate("/login", { state: { from: location }, replace: true });
      });
  };

  return (
    <div className="trends" style={{height:"91.8vh"}}>
      <div className="trends_container">
        <div className="trends_container_section">
          <div className="trends_container_section_section1">
            <div className="heading">
              <h2>
                Trends &nbsp;
                <MdOutlineStackedLineChart />
              </h2>
            </div>
          </div>
          <div className="period">
            <Button
              onClick={() => handleButtonToggle(0)}
              style={{
                backgroundColor: activeButtons[0] ? "#007090" : "",
                color: activeButtons[0] ? "#fff" : "#007090",
              }}
            >
              Last 3 Days
            </Button>
            <Button
              onClick={() => handleButtonToggle(1)}
              style={{
                backgroundColor: activeButtons[1] ? "#007090" : "",
                color: activeButtons[1] ? "#fff" : "#007090",
              }}
            >
              Weekly
            </Button>
            <Button
              onClick={() => handleButtonToggle(2)}
              style={{
                backgroundColor: activeButtons[2] ? "#007090" : "",
                color: activeButtons[2] ? "#fff" : "#007090",
              }}
            >
              Monthly
            </Button>
            <Button
              onClick={() => handleButtonToggle(3)}
              style={{
                backgroundColor: activeButtons[3] ? "#007090" : "",
                color: activeButtons[3] ? "#fff" : "#007090",
              }}
            >
              Yearly
            </Button>
          </div>
          <div className="trends_container_section_section2">
            <div className="card">
            <div className="item">
                <Card
                  sx={{ width: 190 }}
                >
                  <div className="content">
                    <div className="icon" style={{border:"1px solid #006989"}}>
                      <LuSigma style={{ color: "#006989" }} />
                    </div>
                    <div className="heading">
                      <p style={{ color: "#006989" }}>
                        {responseData.allTransactions || 0}
                        &nbsp;&nbsp;
                        <FaArrowTrendUp />
                      </p>
                      <h4 style={{ color: "#006989" }}>Total Transaction</h4>
                    </div>
                  </div>
                </Card>
              </div>
              <div className="item">
                <Card
                  sx={{ width: 150 }}
                >
                  <div className="content">
                    <div className="icon" style={{border:"1px solid #4ecdc4"}}>
                      <FaCheckCircle style={{ color: "#4ecdc4" }} />
                    </div>
                    <div className="heading">
                      <p style={{ color: "#4ecdc4" }}>
                        {responseData.totalAcceptedCount || 0}
                        &nbsp;&nbsp;
                        <FaArrowTrendUp />
                      </p>
                      <h4 style={{ color: "#4ecdc4" }}>Accepted</h4>
                    </div>
                  </div>
                </Card>
              </div>
              <div className="item">
                <Card
                  sx={{ width: 150 }}
                >
                  <div className="content">
                    <div className="icon" style={{border:"1px solid #00A8E8"}}>
                      <MdOutlinePendingActions style={{ color: "#00A8E8" }} />
                    </div>
                    <div className="heading">
                      <p style={{ color: "#00A8E8" }}>
                        {responseData.totalPendingCount || 0}
                        &nbsp;&nbsp;
                        <FaArrowTrendUp />
                      </p>
                      <h4 style={{ color: "#00A8E8" }}>Pending</h4>
                    </div>
                  </div>
                </Card>
              </div>
              <div className="item">
                <Card
                  sx={{ width: 150 }}
                >
                  <div className="content">
                    <div className="icon" style={{border:"1px solid #DB7A6B"}}>
                      <FaCircleXmark style={{ color: "#DB7A6B" }} />
                    </div>
                    <div className="heading">
                      <p style={{ color: "#DB7A6B" }}>
                        {responseData.totalRejectedCount || 0}
                        &nbsp;&nbsp;
                        <FaArrowTrendUp />
                      </p>
                      <h4 style={{ color: "#DB7A6B" }}>Rejected</h4>
                    </div>
                  </div>
                </Card>
              </div>
              <div className="item">
                <Card
                  sx={{ width: 180 }}
                >
                  <div className="content">
                    <div className="icon" style={{border:"1px solid #6A8EAE"}}>
                      <MdErrorOutline style={{ color: "#6A8EAE" }} />
                    </div>
                    <div className="heading">
                      <p style={{ color: "#6A8EAE" }}>
                        {responseData.totalValidationErrorCount || 0}
                        &nbsp;&nbsp;
                        <FaArrowTrendUp />
                      </p>
                      <h4 style={{ color: "#6A8EAE" }}>Validation Error</h4>
                    </div>
                  </div>
                </Card>
              </div>
              <div className="item">
                <Card
                  sx={{ width: 150 }}
                >
                  <div className="content">
                    <div className="icon" style={{border:"1px solid #004D66"}}>
                      <GiSandsOfTime style={{ color: "#004D66" }} />
                    </div>
                    <div className="heading">
                      <p style={{ color: "#004D66" }}>
                        {responseData.totalCbpDownCount || 0}
                        &nbsp;&nbsp;
                        <FaArrowTrendUp />
                      </p>
                      <h4 style={{ color: "#004D66" }}>CBP Down</h4>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
          <div className="charts">
            <div className="linechart">
              <Card
                sx={{
                  width: 520,
                  height: 260,
                  background: "rgba(255, 255, 255, 0.5)",
                  marginTop: "2vw",
                }}
              >
                <LineChart data={responseData} />
              </Card>
            </div>
            <div className="barchart">
              <Card
                 sx={{
                  width: 520,
                  height: 260,
                  background: "rgba(255, 255, 255, 0.5)",
                  marginTop: "2vw",
                }}
              >
                <BarChart data={responseData} />
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminTrends;
