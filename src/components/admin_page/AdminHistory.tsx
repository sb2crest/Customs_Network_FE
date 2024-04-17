import React, { useEffect, useState, useRef } from "react";
import { IoEye } from "react-icons/io5";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { DatePicker } from "antd";
import { useAdminContext } from "../../context/AdminContext";
import { FaHistory } from "react-icons/fa";
import { IoPlay } from "react-icons/io5";
import { TbPlayerPlayFilled } from "react-icons/tb";
const { RangePicker } = DatePicker;

const AdminHistory = () => {
  const { adminHistoryData,setAdminHistoryData } = useAdminContext();
  const [selectedDateS3, setSelectedDateS3] = useState("");
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [dateMenuOpen, setDateMenuOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("CBP DOWN");
  const [selectedDate, setSelectedDate] = useState(null);
  const [responseData, setResponseData] = useState(
    adminHistoryData && adminHistoryData.data ? adminHistoryData.data : []
  );
  const [totalRecords, setTotalRecords] = useState(
    adminHistoryData ? adminHistoryData.totalRecords : 0
  );
  const [currentPage, setCurrentPage] = useState(1);
  const axiosPrivate = useAxiosPrivate();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [displayedJsonType, setDisplayedJsonType] = useState(null);
  const [userId, setUserId] = useState("");
  const [fetchedDates, setFetchedDates] = useState([]);
  const [statusCount, setStatusCount] = useState(false);
  const [showExecuteButton, setShowExecuteButton] = useState(true);
  const [requestBody, setRequestBody] = useState({
    startDate: null,
    endDate: null,
    page: 1,
    size: 10,
    userId: null,
    fieldName: null,
    value: null
  });
  const dropdownRef = useRef(null);

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
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if ( adminHistoryData.totalRecords === 0) {
      setSelectedOption("All");
      setShowExecuteButton(false);
      setCurrentPage(1);
      fetchHistoryData();
    } else {
      setResponseData(adminHistoryData.data || []);
      setTotalRecords(adminHistoryData.totalRecords || 0);
      setSelectedOption("CBP DOWN");
      setSelectedDate(null);
      setCurrentPage(1);
      setShowExecuteButton(true);
    }
  }, [adminHistoryData]);
  
  const handleSelectClick = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleOptionClick = (option: string) => {
      setSelectedOption(option);
    setMenuOpen(false);
  };

  const handleApplyClick = () => {
    setCurrentPage(1);
    fetchHistoryData();
    setStatusCount(true)
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
    fetchHistoryData(page);
  };

  const fetchHistoryData = (page = 1, size = 10) => {
    const apiUrl = "/convert/fetchDataByColValue";

    const startDate = selectedDate
      ? selectedDate[0].format("YYYY-MM-DD")
      : null;
    const endDate = selectedDate ? selectedDate[1].format("YYYY-MM-DD") : null;

    let requestbody = {
      startDate: startDate,
      endDate: endDate || new Date().toISOString().split("T")[0],
      page: page,
      size: size,
      userId: userId || null,
    };

    if (selectedOption && selectedOption !== "All") {
      requestbody = {
        ...requestbody,
        fieldName: "status",
        value: selectedOption,
      };
    }

    if (selectedOption === "CBP DOWN") {
      setShowExecuteButton(true);
    } else {
      setShowExecuteButton(false);
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

  const executeCbpFiles = () => {
    const selectedDate = selectedDateS3;

    if (!selectedDate) {
      console.error("Please select a date.");
      return;
    }
    const removeSpecialCharacter = selectedDate.replace(/\//g, "");
    const formattedDate = `${removeSpecialCharacter.slice(
      0,
      4
    )}-${removeSpecialCharacter.slice(4, 6)}-${removeSpecialCharacter.slice(
      6
    )}`;

    axiosPrivate
      .get(`/convert/execute?folderkey=${formattedDate}`)
      .then((response) => {
        console.log(response.data);
        setSelectedOption("All");
        setSelectedDateS3("select Date");
        setAdminHistoryData("")
        if (response.status === 200) {
          fetchHistoryData();
        }
      })
      .catch((error) => {
        console.error("Error executing CBP files:", error);
      });
  };

  const fetchDatesFromS3 = () => {
    axiosPrivate.get("/convert/s3-folders").then((response) => {
      console.log(response.data);
      setFetchedDates(response.data);
      setDateMenuOpen(!dateMenuOpen);
    });
  };

  const handleDateClick = (date) => {
    setSelectedDateS3(date);
    setDateMenuOpen(!dateMenuOpen);
  };

  return (
    <div className="history">
      <div className="history_container">
      <div className="history_heading">
          <h2>
            History &nbsp;
            <FaHistory className="sidebar_icon" />
          </h2>
        </div>
        <div className="history_container_section">
          <div className="filter_row">
            <div className="filter">
              <div className="userId">
                <input
                  type="text"
                  placeholder="User Id"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                />
              </div>
              <div className="created_date">
                <RangePicker
                  separator=""
                  className="date-range"
                  onChange={(date) => setSelectedDate(date)}
                />
              </div>
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
                    <li onClick={() => handleOptionClick("REJECTED")}>
                      Rejected
                    </li>
                    <li onClick={() => handleOptionClick("PENDING")}>
                      Pending
                    </li>
                    <li onClick={() => handleOptionClick("VALIDATION ERROR")}>
                      Validation Error
                    </li>
                    <li onClick={() => handleOptionClick("CBP DOWN")}>
                      CBP Down
                    </li>
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
                <th className="batchid">Batch Id</th>
                <th className="userid">User Id</th>
                <th className="referenceid">Refrence Id</th>
                <th className="date">Created Date</th>
                <th className="status">
                  Status <br />
                  {statusCount ? (
                    <span
                      style={{
                        color:"#000",
                      }}
                    >
                      Count :{totalRecords}
                    </span>
                  ) : (
                    ""
                  )}
                </th>
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
                  <td className="referenceid">{item.referenceId}</td>
                  <td className="date">{item.createdOn}</td>
                  <td
                    className="status"
                    style={{
                      color:
                        item.status === "REJECTED"
                          ? "#DB7A6B"
                          : item.status === "ACCEPTED"
                          ? "#4ecdc4"
                          : item.status === "PENDING"
                          ? "#00A8E8"
                          : item.status === "VALIDATION ERROR"
                          ? "#6A8EAE"
                          : item.status === "CBP DOWN"
                          ? "#004D66"
                          : "#000",
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
          <div className={`pagination ${showExecuteButton ?"execute":""}`}>
            {showExecuteButton && (
            <div className="dropdown">
              <button
                className="Select_date_dropdown"
                onClick={fetchDatesFromS3}
              >
                {selectedDateS3 || "Select Date"}
                <TbPlayerPlayFilled className="dropdown_icon" />
              </button>
              <ul
                className={`dropdown-content ${dateMenuOpen ? "show" : ""}`}
                ref={dateMenuOpen ? dropdownRef : null}
              >
                {fetchedDates.map((date, index) => (
                  <li key={index} onClick={() => handleDateClick(date)}>
                    {date}
                  </li>
                ))}
              </ul>
              <button className="execute_button" onClick={executeCbpFiles}>
                Execute
                <IoPlay className="execute_icon" />
              </button>
            </div>
)}
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
                    <pre style={{fontSize:"0.7rem"}}>
                      {JSON.stringify(selectedRow.requestJson, null, 2)}
                    </pre>
                  </div>
                )}
                {displayedJsonType === "responseJson" && (
                  <div>
                    Response JSON:
                    <pre style={{fontSize:"0.7rem"}}>
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

export default AdminHistory;