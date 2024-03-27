import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import "../../assets/sass/components/_trends.scss";
import {
  MdOutlineStackedLineChart,
  MdOutlinePendingActions,
} from "react-icons/md";
import { LuSigma } from "react-icons/lu";
import { FaRegCircleXmark } from "react-icons/fa6";
import { GiSandsOfTime } from "react-icons/gi";
import { FaArrowTrendUp } from "react-icons/fa6";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import Button from "@mui/material/Button";
import { useAdminContext } from "../../context/AdminContext";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";

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
        period = "monthly";
        break;
      case 3:
        period = "yearly";
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
    <div className="trends">
      <div className="trends_container">
        <div className="trends_container_section">
          <div className="trends_container_section_section1">
            <div className="heading">
              <h2>
                Trends &nbsp;<MdOutlineStackedLineChart />
              </h2>
            </div>
          </div>
          <div className="filter">
            <div className="period">
              <Button
                size="small"
                onClick={() => handleButtonToggle(0)}
                style={{
                  color: "#a0a0a0",
                  backgroundColor: activeButtons[0] ? "#414142" : "transparent",
                }}
              >
                Last 3 Days
              </Button>
              <Button
                size="small"
                onClick={() => handleButtonToggle(1)}
                style={{
                  color: "#a0a0a0",
                  backgroundColor: activeButtons[1] ? "#414142" : "transparent",
                }}
              >
                Weekly
              </Button>
              <Button
                size="small"
                onClick={() => handleButtonToggle(2)}
                style={{
                  color: "#a0a0a0",
                  backgroundColor: activeButtons[2] ? "#414142" : "transparent",
                }}
                disabled
              >
                Monthly
              </Button>
              <Button
                size="small"
                onClick={() => handleButtonToggle(3)}
                style={{
                  color: "#a0a0a0",
                  backgroundColor: activeButtons[3] ? "#414142" : "transparent",
                }}
                disabled
              >
                Yearly
              </Button>
            </div>
            <div className="userId">
              <input
                type="text"
                placeholder="User Id"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
              <button type="submit" onClick={handleButtonToggle}>
                  Apply
                </button>
            </div>
          </div>
          <div className="trends_container_section_section2">
            <div className="card">
              <div className="item">
                <Card sx={{ width: 200, background: "#414142" }}>
                  <div className="content">
                    <div className="icon">
                      <LuSigma style={{ color: "#cccccc" }} />
                    </div>
                    <div className="heading">
                      <h5>Total Transaction</h5>
                      <p>
                      {responseData.allTransactions || 0}
                        &nbsp;&nbsp;
                        <FaArrowTrendUp style={{ color: "#cccccc" }} />
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
              <div className="item">
                <Card sx={{ width: 200, background: "#414142" }}>
                  <div className="content">
                    <div className="icon">
                      <IoIosCheckmarkCircleOutline
                        style={{ color: "rgb(80 199 147)" }}
                      />
                    </div>
                    <div className="heading">
                      <h5>Accepted Transaction</h5>
                      <p>
                      {responseData.totalAcceptedCount || 0}
                        &nbsp;&nbsp;
                        <FaArrowTrendUp style={{ color: "rgb(80 199 147)" }} />
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
              <div className="item">
                <Card sx={{ width: 200, background: "#414142" }}>
                  <div className="content">
                    <div className="icon">
                      <MdOutlinePendingActions
                        style={{ color: "rgb(250 145 107)" }}
                      />
                    </div>{" "}
                    <div className="heading">
                      <h5>Pending Transaction</h5>
                      <p>
                      {responseData.totalPendingCount || 0}
                        &nbsp;&nbsp;
                        <FaArrowTrendUp style={{ color: "rgb(250 145 107)" }} />
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
              <div className="item">
                <Card sx={{ width: 200, background: "#414142" }}>
                  <div className="content">
                    <div className="icon">
                      <FaRegCircleXmark style={{ color: "#e53d34" }} />
                    </div>
                    <div className="heading">
                      <h5>Rejected Transaction</h5>
                      <p>
                      {responseData.totalRejectedCount || 0}
                        &nbsp;&nbsp;
                        <FaArrowTrendUp style={{ color: "#e53d34" }} />
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
              <div className="item">
                <Card sx={{ width: 200, background: "#414142" }}>
                  <div className="content">
                    <div className="icon">
                      <GiSandsOfTime style={{ color: "#FFD700" }} />
                    </div>
                    <div className="heading">
                      <h5>CBP Down</h5>
                      <p>
                      {responseData.totalCbpDownCount || 0}
                        &nbsp;&nbsp;
                        <FaArrowTrendUp style={{ color: "#FFD700" }} />
                      </p>
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
                  height: 300,
                  background: "#414142",
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
                  height: 300,
                  background: "#414142",
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
