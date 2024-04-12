import Card from "@mui/material/Card";
import "../../assets/sass/components/_trends.scss";
import { MdOutlinePendingActions } from "react-icons/md";
import { LuSigma } from "react-icons/lu";
import { GiSandsOfTime } from "react-icons/gi";
import { FaArrowTrendUp, FaCircleXmark } from "react-icons/fa6";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import Button from "@mui/material/Button";
import { useEffect, useState, useRef } from "react";
import { useUserContext } from "../../context/UserContext";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { IoBarChartOutline } from "react-icons/io5";
import PortBarChart from "./PortBarChart";
import PortLineChart from "./PortLineChart";
import { MdErrorOutline } from "react-icons/md";

const Trends = () => {
  const [activeButtons, setActiveButtons] = useState([
    true,
    false,
    false,
    false,
  ]);
  const { trendsData, setTrendsData } = useUserContext();
  const axiosPrivate = useAxiosPrivate();
  const [responseData, setResponseData] = useState([]);
  const [portTrendsResponseData, setPortTrendsResponseData] = useState([]);
  const [userId, setUserId] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("");
  const { state } = location;
  const { userId: locationUserId } = state || {};
  const [isMenuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (locationUserId) {
      setUserId(locationUserId);
    }
  }, [locationUserId]);

  useEffect(() => {
    if (trendsData && trendsData.length > 0) {
      setResponseData(trendsData);
    }
  }, [trendsData]);

  const handleButtonToggle = (index: number) => {
    setActiveButtons(activeButtons.map((button, i) => i === index));
    fetchTrendsData(index);
  };

  const handleSelectClick = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleDropdownChange = (option: string) => {
    setSelectedOption(option);
    setInputValue("");
    setMenuOpen(false);
    setSuggestions([]);
  };

  const handleSuggestionSelect = (selectedItem) => {
    setInputValue(selectedItem);
    setSuggestions([]);
    fetchPortTrends(selectedItem);
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleOutsideClick = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      event.target.closest(".portInputField") === null
    ) {
      setMenuOpen(false);
      setSuggestions([]);
    }
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
    if (value === "") {
      setPortTrendsResponseData([]);
      setSuggestions([]);
    } else if (value.length >= 2) {
      fetchSuggestions(value);
    } else {
      setSuggestions([]);
    }
  };

  const fetchTrendsData = (periodIndex: number) => {
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
      .get(`/api/audit/user-transaction?userId=${userId}&period=${period}`)
      .then((response) => {
        setResponseData(response.data);
        setTrendsData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching trends data:", error);
        navigate("/login", { state: { from: location }, replace: true });
      });
  };

  const fetchSuggestions = (input: string) => {
    const endpoint =
      selectedOption === "Port Code"
        ? `/getPortData?portDetails=${input}`
        : `/getPortData?portDetails=${input}`;

    axiosPrivate
      .get(endpoint)
      .then((response) => {
        setSuggestions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching suggestions:", error);
      });
  };

  const fetchPortTrends = (input: string) => {
    const endpoint =
      selectedOption === "Port Code"
        ? `/api/audit/getPortTransactionDetails?userId=${userId}&portCode=${input}`
        : `/api/audit/getPortTransactionDetails?userId=${userId}&portName=${input}`;

    axiosPrivate
      .get(endpoint)
      .then((response) => {
        setPortTrendsResponseData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching suggestions:", error);
      });
  };

  return (
    <div className="trends">
      <div className="trends_container">
        <div className="trends_container_section">
          <div className="trends_container_section_section1">
            <div className="heading">
              <h2>
                Trends &nbsp;
                <IoBarChartOutline />
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
                  sx={{ width: 180, background: "rgba(255, 255, 255, 0.5)" }}
                >
                  <div className="content">
                    <div className="icon">
                      <LuSigma style={{ color: "#cccccc" }} />
                    </div>
                    <div className="heading">
                      <p style={{ color: "#cccccc" }}>
                        {trendsData.allTransactions || 0}
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
                  sx={{ width: 165, background: "rgba(255, 255, 255, 0.5)" }}
                >
                  <div className="content">
                    <div className="icon">
                      <FaCheckCircle style={{ color: "#38E54D" }} />
                    </div>
                    <div className="heading">
                      <p style={{ color: "#38E54D" }}>
                        {trendsData.totalAcceptedCount || 0}
                        &nbsp;&nbsp;
                        <FaArrowTrendUp />
                      </p>
                      <h4 style={{ color: "#38E54D" }}>Accepted</h4>
                    </div>
                  </div>
                </Card>
              </div>
              <div className="item">
                <Card
                  sx={{ width: 165, background: "rgba(255, 255, 255, 0.5)" }}
                >
                  <div className="content">
                    <div className="icon">
                      <MdOutlinePendingActions style={{ color: "#CD5C08" }} />
                    </div>
                    <div className="heading">
                      <p style={{ color: "#CD5C08" }}>
                        {trendsData.totalPendingCount || 0}
                        &nbsp;&nbsp;
                        <FaArrowTrendUp />
                      </p>
                      <h4 style={{ color: "#CD5C08" }}>Pending</h4>
                    </div>
                  </div>
                </Card>
              </div>
              <div className="item">
                <Card
                  sx={{ width: 165, background: "rgba(255, 255, 255, 0.5)" }}
                >
                  <div className="content">
                    <div className="icon">
                      <FaCircleXmark style={{ color: "#e53d34" }} />
                    </div>
                    <div className="heading">
                      <p style={{ color: "#bf302f" }}>
                        {trendsData.totalRejectedCount || 0}
                        &nbsp;&nbsp;
                        <FaArrowTrendUp />
                      </p>
                      <h4 style={{ color: "#bf302f" }}>Rejected</h4>
                    </div>
                  </div>
                </Card>
              </div>
              <div className="item">
                <Card
                  sx={{ width: 180, background: "rgba(255, 255, 255, 0.5)" }}
                >
                  <div className="content">
                    <div className="icon">
                      <MdErrorOutline style={{ color: "#F8DE22" }} />
                    </div>
                    <div className="heading">
                      <p style={{ color: "#F8DE22" }}>
                        {trendsData.totalValidationErrorCount || 0}
                        &nbsp;&nbsp;
                        <FaArrowTrendUp />
                      </p>
                      <h4 style={{ color: "#F8DE22" }}>Validation Error</h4>
                    </div>
                  </div>
                </Card>
              </div>
              <div className="item">
                <Card
                  sx={{ width: 165, background: "rgba(255, 255, 255, 0.5)" }}
                >
                  <div className="content">
                    <div className="icon">
                      <GiSandsOfTime style={{ color: "#12CAD6" }} />
                    </div>
                    <div className="heading">
                      <p style={{ color: "#12CAD6" }}>
                        {trendsData.totalCbpDownCount || 0}
                        &nbsp;&nbsp;
                        <FaArrowTrendUp />
                      </p>
                      <h4 style={{ color: "#12CAD6" }}>CBP Down</h4>
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
          {userId === "javed12345" && (
            <>
              <h3>
                To see Trends for particular Port using Port Code or Port Name
              </h3>
              <div className="customized_trends">
                <div className="status_filter">
                  <div
                    ref={dropdownRef}
                    className={`dropdown ${isMenuOpen ? "menu-open" : ""}`}
                  >
                    <div className="select" onClick={handleSelectClick}>
                      <div
                        className={`selected ${
                          selectedOption === "placeholder"
                            ? "placeholder"
                            : " Status"
                        }`}
                      >
                        {selectedOption || "Select Option"}
                      </div>
                      <div
                        className={`caret ${isMenuOpen ? "caret-rotate" : ""}`}
                      ></div>
                    </div>
                    <ul className="menu">
                      <li onClick={() => handleDropdownChange("Port Code")}>
                        Port Code
                      </li>
                      <li onClick={() => handleDropdownChange("Port Name")}>
                        Port Name
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="portInputField">
                  {selectedOption && (
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => handleInputChange(e.target.value)}
                      placeholder={`Enter ${selectedOption}`}
                    />
                  )}
                  {selectedOption && suggestions.length > 0 && (
                    <ul>
                      {suggestions.map((item, index) => (
                        <li
                          key={index}
                          onClick={() =>
                            handleSuggestionSelect(
                              selectedOption === "Port Code"
                                ? item.portCode
                                : item.portName
                            )
                          }
                        >
                          {selectedOption === "Port Code"
                            ? item.portCode
                            : item.portName}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              {selectedOption && (
                <>
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
                        <PortLineChart
                          portTrendsResponseData={portTrendsResponseData}
                        />
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
                        <PortBarChart
                          portTrendsResponseData={portTrendsResponseData}
                        />
                      </Card>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Trends;
