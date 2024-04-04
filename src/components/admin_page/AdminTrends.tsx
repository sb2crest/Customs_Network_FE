import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import "../../assets/sass/components/_trends.scss";
import {
  MdOutlineStackedLineChart,
  MdOutlinePendingActions,
} from "react-icons/md";
import { LuSigma } from "react-icons/lu";
import { FaCircleXmark, FaRegCircleXmark } from "react-icons/fa6";
import { GiSandsOfTime } from "react-icons/gi";
import { FaArrowTrendUp } from "react-icons/fa6";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import Button from "@mui/material/Button";
import { useAdminContext } from "../../context/AdminContext";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

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
              size="small"
              onClick={() => handleButtonToggle(0)}
              style={{
                color: "#143369",
                fontWeight: "bold",
                padding: "4px 12px",
                backgroundColor: activeButtons[0] ? "#fff" : "#a0a0a0",
              }}
            >
              Last 3 Days
            </Button>
            <Button
              size="small"
              onClick={() => handleButtonToggle(1)}
              style={{
                color: "#143369",
                fontWeight: "bold",
                padding: "4px 12px",
                backgroundColor: activeButtons[1] ? "#fff" : "#a0a0a0",
              }}
            >
              Weekly
            </Button>
            <Button
              size="small"
              onClick={() => handleButtonToggle(2)}
              style={{
                color: "#143369",
                fontWeight: "bold",
                padding: "4px 12px",
                backgroundColor: activeButtons[2] ? "#fff" : "#a0a0a0",
              }}
            >
              Monthly
            </Button>
            <Button
              size="small"
              onClick={() => handleButtonToggle(3)}
              style={{
                color: "#143369",
                fontWeight: "bold",
                padding: "4px 12px",
                backgroundColor: activeButtons[3] ? "#fff" : "#a0a0a0",
              }}
            >
              Yearly
            </Button>
          </div>
          <div className="trends_container_section_section2">
            <div className="card">
              <div className="item">
                <Card
                  sx={{ width: 200, background: "rgba(255, 255, 255, 0.5)" }}
                >
                  <div className="content">
                    <div className="icon">
                      <LuSigma style={{ color: "#cccccc" }} />
                    </div>
                    <div className="heading">
                      <p style={{ color: "#cccccc" }}>
                        {responseData.allTransactions || 0}
                        &nbsp;&nbsp;
                        <FaArrowTrendUp />
                      </p>
                      <h4 style={{ color: "#cccccc" }}>Total Transaction</h4>
                    </div>
                  </div>
                </Card>
              </div>
              <div className="item">
                <Card
                  sx={{ width: 200, background: "rgba(255, 255, 255, 0.5)" }}
                >
                  <div className="content">
                    <div className="icon">
                      <FaCheckCircle style={{ color: "#38E54D" }} />
                    </div>
                    <div className="heading">
                      <p style={{ color: "#38E54D" }}>
                        {responseData.totalAcceptedCount || 0}
                        &nbsp;&nbsp;
                        <FaArrowTrendUp />
                      </p>
                      <h4 style={{ color: "#38E54D" }}>Accepted Transaction</h4>
                    </div>
                  </div>
                </Card>
              </div>
              <div className="item">
                <Card
                  sx={{ width: 200, background: "rgba(255, 255, 255, 0.5)" }}
                >
                  <div className="content">
                    <div className="icon">
                      <MdOutlinePendingActions style={{ color: "#f5b212" }} />
                    </div>
                    <div className="heading">
                      <p style={{ color: "#f5b212" }}>
                        {responseData.totalPendingCount || 0}
                        &nbsp;&nbsp;
                        <FaArrowTrendUp />
                      </p>
                      <h4 style={{ color: "#f5b212" }}>Pending Transaction</h4>
                    </div>
                  </div>
                </Card>
              </div>
              <div className="item">
                <Card
                  sx={{ width: 200, background: "rgba(255, 255, 255, 0.5)" }}
                >
                  <div className="content">
                    <div className="icon">
                      <FaCircleXmark style={{ color: "#e53d34" }} />
                    </div>
                    <div className="heading">
                      <p style={{ color: "#bf302f" }}>
                        {responseData.totalRejectedCount || 0}
                        &nbsp;&nbsp;
                        <FaArrowTrendUp />
                      </p>
                      <h4  style={{ color: "#bf302f" }}>Rejected Transaction</h4>
                    </div>
                  </div>
                </Card>
              </div>
              <div className="item">
                <Card
                  sx={{ width: 200, background: "rgba(255, 255, 255, 0.5)" }}
                >
                  <div className="content">
                    <div className="icon">
                      <GiSandsOfTime style={{ color: "#FFD700" }} />
                    </div>
                    <div className="heading">
                      <p style={{ color: "yellow" }}>
                        {responseData.totalCbpDownCount || 0}
                        &nbsp;&nbsp;
                        <FaArrowTrendUp />
                      </p>
                      <h4 style={{ color: "yellow" }}>CBP Down</h4>
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
