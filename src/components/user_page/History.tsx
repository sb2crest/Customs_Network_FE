import React, { useEffect, useState, useRef } from "react";
import { IoEye } from "react-icons/io5";
import "../../assets/sass/components/_history.scss";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { DatePicker } from 'antd';
import { useUserContext } from '../../context/UserContext';
import { useLocation } from 'react-router-dom';
import { axiosPrivate } from "../../services/apiService";
import { FaHistory } from "react-icons/fa";
const { RangePicker } = DatePicker;

const History = () => {
  const { historyData } = useUserContext(); 
  const [selectedDate, setSelectedDate] = useState(null);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [responseData, setResponseData] = useState(historyData && historyData.data ? historyData.data : []);
  const [totalRecords, setTotalRecords] = useState(historyData ? historyData.totalRecords : 0); 
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [displayedJsonType, setDisplayedJsonType] = useState(null);
  const [userId, setUserId] = useState("");

  const dropdownRef = useRef(null);
  const location = useLocation();
  const { state } = location;
  const { userId: locationUserId } = state || {};

  useEffect(() => {
    if (locationUserId) {
      setUserId(locationUserId);
    }
  }, [locationUserId]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    // Add event listener when component mounts
    document.addEventListener("mousedown", handleClickOutside);

    // Remove event listener when component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleEyeIconClick = (item, jsonType) => {
    setSelectedRow(item);
    setDisplayedJsonType(jsonType);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedRow(null);
    setModalOpen(false);
  };

  useEffect(() => {
    if (historyData && historyData.data) {
      setResponseData(historyData.data);
      setTotalRecords(historyData.totalRecords)
      setSelectedOption("");
      setSelectedDate(null);
    }
    setCurrentPage(1);
  }, [historyData]);

  const handleSelectClick = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setMenuOpen(false);
  };

  const handleApplyClick = () => {
    setCurrentPage(1);
    fetchData();
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
    fetchData(page);
  };

  const fetchData = (page = 1, size = 10) => {
    const apiUrl = "/convert/fetchDataByColValue";
    
    const startDate = selectedDate ? selectedDate[0].format("YYYY-MM-DD") : null;
    const endDate = selectedDate ? selectedDate[1].format("YYYY-MM-DD") : null;
  
    let requestbody = {
      fieldName: "user_id",
      value: userId,
      startDate: startDate,
      endDate: endDate || new Date().toISOString().split('T')[0],
      page: page,
      size: size,
      userId: userId,
    };
  
    if (selectedOption && selectedOption !== "All") {
      requestbody = {
        ...requestbody,
        fieldName: "status",
        value: selectedOption,
      };
    }
  
    axiosPrivate
      .post(apiUrl, requestbody)
      .then((response) => {
        console.log("API Response:", response.data);
        const updatedData = response.data;
        setResponseData(updatedData.data || []);
        setTotalRecords(updatedData.totalRecords || 0);
      })
      .catch((error) => {
        console.error("Error making API call:", error);
      });
  };
  
  return (
    <div className="history">
      <div className="history_container">
        <div className="history_container_section">
          <div className="filter_row">
            <p>History &nbsp;<FaHistory className="sidebar_icon" /></p>
            <div className="filter">
              <div className="created_date">
              <RangePicker separator="" className="date-range" onChange={(date)=> setSelectedDate(date)}/>
              </div>
              <div className="status_filter">
                <div ref={dropdownRef} className={`dropdown ${isMenuOpen ? "menu-open" : ""}`}>
                  <div className="select" onClick={handleSelectClick}>
                    <div
                      className={`selected ${
                        selectedOption === "placeholder"
                          ? "placeholder"
                          : " Status"
                      }`}
                    >
                      {selectedOption || "Status"}
                    </div>
                    <div
                      className={`caret ${isMenuOpen ? "caret-rotate" : ""}`}
                    ></div>
                  </div>
                  <ul className="menu">
                    <li onClick={() => handleOptionClick("All")}>All</li>
                    <li onClick={() => handleOptionClick("ACCEPTED")}>
                     Accepted
                    </li>
                    <li onClick={() => handleOptionClick("REJECTED")}>Rejected</li>
                    <li onClick={() => handleOptionClick("PENDING")}>Pending</li>
                    <li onClick={() => handleOptionClick("CBP DOWN")}>CBP Down</li>
                  </ul>
                </div>
              </div>
              <div className="Apply_button">
                <button type="submit" onClick={handleApplyClick}>
                  Apply
                </button>
              </div>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Batch Id</th>
                <th>User Id</th>
                <th>Refrence Id</th>
                <th>Created Date</th>
                <th>Status</th>
                <th>Request Json</th>
                <th>Response Json</th>
              </tr>
            </thead>
            <tbody>
              {responseData.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td className="batchid">{item.batchId}</td>
                  <td className="userid">{item.userId}</td>
                  <td>{item.referenceId}</td>
                  <td>{item.createdOn}</td>
                  <td
                    style={{
                      color:
                        item.status === "REJECTED"
                          ? "#e53d34"
                          : item.status === "ACCEPTED"
                          ? "rgb(80 199 147)"
                          : item.status === "PENDING"
                          ? "rgb(250 145 107)"
                          : "#FFD700",
                    }}
                  >
                    {item.status}
                  </td>
                 
                  <td className="eyeicon">
                    <button>
                      <IoEye
                        style={{ cursor: "pointer" }}
                        className="eye"
                        onClick={() => handleEyeIconClick(item, "requestJson")}
                      />
                    </button>
                  </td>
                  <td className="eyeicon">
                    <button>
                      <IoEye
                        style={{ cursor: "pointer" }}
                        className="eye"
                        onClick={() => handleEyeIconClick(item, "responseJson")}
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            <Stack spacing={1}>
              <Pagination
                count={Math.ceil(totalRecords / 10) || 1}
                page={currentPage}
                shape="rounded"
                onChange={handlePageChange}
              />
            </Stack>
          </div>
        </div>
      </div>
      <div className="popup">
        <Dialog open={modalOpen} onClose={handleCloseModal}>
          <DialogContent>
            {selectedRow && (
              <div>
                {displayedJsonType === "requestJson" && (
                  <div>
                    Request JSON:
                    <pre>
                      {JSON.stringify(selectedRow.requestJson, null, 2)}
                    </pre>
                  </div>
                )}
                {displayedJsonType === "responseJson" && (
                  <div>
                    Response JSON:
                    <pre>
                      {JSON.stringify(selectedRow.responseJson, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default History;
