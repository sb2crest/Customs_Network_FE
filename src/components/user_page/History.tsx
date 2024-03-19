import React, { useEffect, useState } from "react";
import { IoEye } from "react-icons/io5";
import "../../assets/sass/components/_history.scss";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField } from "@mui/material";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const History = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [referenceId, setReferenceId] = useState("");
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const location = useLocation();
  const [data, setData] = useState(location.state?.historyData.data || []);
  const [totalRecords, setTotalRecords] = useState(
    location.state?.historyData.totalRecords || 0
  );
  const [currentPage, setCurrentPage] = useState(1);
  const axiosPrivate = useAxiosPrivate();

  const locationState = useLocation().state;

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [displayedJsonType, setDisplayedJsonType] = useState(null);
  const [userId, setUserId] = useState("");

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
    if (locationState && locationState.historyData) {
      setData(locationState.historyData.data || []);
      setTotalRecords(locationState.historyData.totalRecords || 0);
      const firstItem = locationState.historyData.data[0];
    const extractedUserId = firstItem?.userId;
    setUserId(extractedUserId || "");
    }
  }, [locationState]);

  const handleSelectClick = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setMenuOpen(false);
  };

  const handleApplyClick = () => {
    fetchData();
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
    fetchData(page);
  };

  const fetchData = (page = 1) => {
    const apiUrl = "/convert/getFdaPn-records";
    const formattedDate = selectedDate
      ? dayjs(selectedDate).format("DD-MM-YYYY")
      : null;
    const requestData = {
      createdOn: formattedDate || null,
      referenceId: referenceId || null,
      status: selectedOption.toUpperCase() || null,
      page: page - 1,
      userId: userId,
    };
 
    axiosPrivate
      .get(apiUrl, {
        params: requestData,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("API Response:", response.data);
        const updatedData = response.data;
        setData(updatedData.data || []);
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
            <p>History</p>
            <div className="filter">
              <div className="created_date">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    className="datepicker"
                    sx={{ width: "170px" }}
                    value={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    format="DD-MM-YYYY"
                  />
                </LocalizationProvider>
              </div>
              <div className="referenceId_filter">
                <TextField
                  id="outlined-basic"
                  label="Reference ID"
                  variant="outlined"
                  size="small"
                  style={{ width: "160px" }}
                  value={referenceId}
                  onChange={(e) => setReferenceId(e.target.value)}
                />
              </div>
              <div className="status_filter">
                <div className={`dropdown ${isMenuOpen ? "menu-open" : ""}`}>
                  <div className="select" onClick={handleSelectClick}>
                    <div
                      className={`selected ${
                        selectedOption === "placeholder" ? "placeholder" : " Status"
                      }`}
                    >
                      {selectedOption|| "Status"}
                    </div>
                    <div
                      className={`caret ${isMenuOpen ? "caret-rotate" : ""}`}
                    ></div>
                  </div>
                  <ul className="menu">
                    {/* <li onClick={() => handleOptionClick("All")}>All</li> */}
                    <li onClick={() => handleOptionClick("Success")}>
                      Success
                    </li>
                    <li onClick={() => handleOptionClick("Failed")}>Failed</li>
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
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td className="batchid">{item.batchId}</td>
                  <td className="userid">{item.userId}</td>
                  <td>{item.referenceId}</td>
                  <td>{item.createdOn}</td>
                  <td
                    style={{
                      color:
                        item.status === "FAILED"
                          ? "#e53d34"
                          : item.status === "SUCCESS"
                          ? "rgb(80 199 147)"
                          : "rgb(250 145 107)",
                    }}
                  >
                    {item.status}
                  </td>
                  <td>
                    <button>
                      <IoEye
                        style={{ cursor: "pointer" }}
                        className="eye"
                        onClick={() => handleEyeIconClick(item, "requestJson")}
                      />
                    </button>
                  </td>
                  <td>
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
