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
  const { isPortDetails } = state || {};
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
    let portCode;
    let endpoint;
  
    const portCodeMatch = input.match(/\b\d{4}\b/);
    if (portCodeMatch) {
      portCode = portCodeMatch[0];
    }
    if (portCode) {
      endpoint = `/api/audit/getPortTransactionDetails?userId=${userId}&portCode=${portCode}`;
    } else {
      endpoint = `/api/audit/getPortTransactionDetails?userId=${userId}&portName=${input}`;
    }

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
                        {trendsData.allTransactions || 0}
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
                        {trendsData.totalAcceptedCount || 0}
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
                        {trendsData.totalPendingCount || 0}
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
                        {trendsData.totalRejectedCount || 0}
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
                        {trendsData.totalValidationErrorCount || 0}
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
                        {trendsData.totalCbpDownCount || 0}
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
          {isPortDetails ? (
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
          ):("")}
        </div>
      </div>
    </div>
  );
};

export default Trends;
