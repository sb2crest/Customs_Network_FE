import React, { useEffect, useState } from "react";
import { IoEye } from "react-icons/io5";
import "../../assets/sass/components/_history.scss";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField } from "@mui/material";
import { useLocation } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsivePie } from "@nivo/pie";
import { ResponsiveLine } from "@nivo/line";

const AdminPage = () => {
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

  const locationState = useLocation().state;

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [displayedJsonType, setDisplayedJsonType] = useState(null);
  const [userId, setUserId] = useState("");

  //   const handleEyeIconClick = (item, jsonType) => {
  //     setSelectedRow(item);
  //     setDisplayedJsonType(jsonType);
  //     setModalOpen(true);
  //   };

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
    const apiUrl = "http://localhost:8080/convert/getFdaPn-records";
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

    axios
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
    <div className="adminpage">
      <div className="adminpage_container">
        <div className="adminpage_container_section">
          <div className="adminpage_section1">
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
                        <div
                          className={`dropdown ${
                            isMenuOpen ? "menu-open" : ""
                          }`}
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
                              className={`caret ${
                                isMenuOpen ? "caret-rotate" : ""
                              }`}
                            ></div>
                          </div>
                          <ul className="menu">
                            {/* <li onClick={() => handleOptionClick("All")}>All</li> */}
                            <li onClick={() => handleOptionClick("Success")}>
                              Success
                            </li>
                            <li onClick={() => handleOptionClick("Failed")}>
                              Failed
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
                      <tr>
                        <td>01</td>
                        <td className="batchid">abcd123</td>
                        <td className="userid">lmnop456</td>
                        <td>876543458</td>
                        <td>15-03-2024</td>
                        <td>SUCCESS</td>
                        <td>
                          <button>
                            <IoEye
                              style={{ cursor: "pointer" }}
                              className="eye"
                            />
                          </button>
                        </td>
                        <td>
                          <button>
                            <IoEye
                              style={{ cursor: "pointer" }}
                              className="eye"
                            />
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td>01</td>
                        <td className="batchid">abcd123</td>
                        <td className="userid">lmnop456</td>
                        <td>876543458</td>
                        <td>15-03-2024</td>
                        <td>SUCCESS</td>
                        <td>
                          <button>
                            <IoEye
                              style={{ cursor: "pointer" }}
                              className="eye"
                            />
                          </button>
                        </td>
                        <td>
                          <button>
                            <IoEye
                              style={{ cursor: "pointer" }}
                              className="eye"
                            />
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td>01</td>
                        <td className="batchid">abcd123</td>
                        <td className="userid">lmnop456</td>
                        <td>876543458</td>
                        <td>15-03-2024</td>
                        <td>SUCCESS</td>
                        <td>
                          <button>
                            <IoEye
                              style={{ cursor: "pointer" }}
                              className="eye"
                            />
                          </button>
                        </td>
                        <td>
                          <button>
                            <IoEye
                              style={{ cursor: "pointer" }}
                              className="eye"
                            />
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td>01</td>
                        <td className="batchid">abcd123</td>
                        <td className="userid">lmnop456</td>
                        <td>876543458</td>
                        <td>15-03-2024</td>
                        <td>SUCCESS</td>
                        <td>
                          <button>
                            <IoEye
                              style={{ cursor: "pointer" }}
                              className="eye"
                            />
                          </button>
                        </td>
                        <td>
                          <button>
                            <IoEye
                              style={{ cursor: "pointer" }}
                              className="eye"
                            />
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td>01</td>
                        <td className="batchid">abcd123</td>
                        <td className="userid">lmnop456</td>
                        <td>876543458</td>
                        <td>15-03-2024</td>
                        <td>SUCCESS</td>
                        <td>
                          <button>
                            <IoEye
                              style={{ cursor: "pointer" }}
                              className="eye"
                            />
                          </button>
                        </td>
                        <td>
                          <button>
                            <IoEye
                              style={{ cursor: "pointer" }}
                              className="eye"
                            />
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td>01</td>
                        <td className="batchid">abcd123</td>
                        <td className="userid">lmnop456</td>
                        <td>876543458</td>
                        <td>15-03-2024</td>
                        <td>SUCCESS</td>
                        <td>
                          <button>
                            <IoEye
                              style={{ cursor: "pointer" }}
                              className="eye"
                            />
                          </button>
                        </td>
                        <td>
                          <button>
                            <IoEye
                              style={{ cursor: "pointer" }}
                              className="eye"
                            />
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td>01</td>
                        <td className="batchid">abcd123</td>
                        <td className="userid">lmnop456</td>
                        <td>876543458</td>
                        <td>15-03-2024</td>
                        <td>SUCCESS</td>
                        <td>
                          <button>
                            <IoEye
                              style={{ cursor: "pointer" }}
                              className="eye"
                            />
                          </button>
                        </td>
                        <td>
                          <button>
                            <IoEye
                              style={{ cursor: "pointer" }}
                              className="eye"
                            />
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td>01</td>
                        <td className="batchid">abcd123</td>
                        <td className="userid">lmnop456</td>
                        <td>876543458</td>
                        <td>15-03-2024</td>
                        <td>SUCCESS</td>
                        <td>
                          <button>
                            <IoEye
                              style={{ cursor: "pointer" }}
                              className="eye"
                            />
                          </button>
                        </td>
                        <td>
                          <button>
                            <IoEye
                              style={{ cursor: "pointer" }}
                              className="eye"
                            />
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td>01</td>
                        <td className="batchid">abcd123</td>
                        <td className="userid">lmnop456</td>
                        <td>876543458</td>
                        <td>15-03-2024</td>
                        <td>SUCCESS</td>
                        <td>
                          <button>
                            <IoEye
                              style={{ cursor: "pointer" }}
                              className="eye"
                            />
                          </button>
                        </td>
                        <td>
                          <button>
                            <IoEye
                              style={{ cursor: "pointer" }}
                              className="eye"
                            />
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td>01</td>
                        <td className="batchid">abcd123</td>
                        <td className="userid">lmnop456</td>
                        <td>876543458</td>
                        <td>15-03-2024</td>
                        <td>SUCCESS</td>
                        <td>
                          <button>
                            <IoEye
                              style={{ cursor: "pointer" }}
                              className="eye"
                            />
                          </button>
                        </td>
                        <td>
                          <button>
                            <IoEye
                              style={{ cursor: "pointer" }}
                              className="eye"
                            />
                          </button>
                        </td>
                      </tr>
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
                              {JSON.stringify(
                                selectedRow.responseJson,
                                null,
                                2
                              )}
                            </pre>
                          </div>
                        )}
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
          <div className="adminpage_section2">
            <div className="linechart_section">
              <div style={{ width: "600px", height: "300px" }}>
                <ResponsiveBar
                  data={[
                    { country: "A", value: 100 },
                    { country: "B", value: 200 },
                    { country: "C", value: 300 },
                    { country: "D", value: 400 },
                    { country: "E", value: 500 },
                    { country: "F", value: 600 },
                    { country: "G", value: 700 },
                    { country: "H", value: 800 },
                  ]}
                  keys={["value"]}
                  indexBy="country"
                  margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                  padding={0.3}
                  colors={{ scheme: "nivo" }}
                  borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
                  axisTop={null}
                  axisRight={null}
                  axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "Country",
                    legendPosition: "middle",
                    legendOffset: 32,
                  }}
                  axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "Value",
                    legendPosition: "middle",
                    legendOffset: -40,
                  }}
                  labelSkipWidth={12}
                  labelSkipHeight={12}
                  labelTextColor={{
                    from: "color",
                    modifiers: [["darker", 1.6]],
                  }}
                  animate={true}
                  motionStiffness={90}
                  motionDamping={15}
                />
              </div>
            </div>
            <div className="piechart_section">
              <div style={{ width: "400px", height: "300px" }}>
                <ResponsivePie
                  data={[
                    { id: "A", value: 100 },
                    { id: "B", value: 200 },
                    { id: "C", value: 300 },
                  ]}
                  margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                  innerRadius={0.5}
                  padAngle={0.7}
                  cornerRadius={3}
                  colors={{ scheme: "nivo" }}
                  borderWidth={1}
                  borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
                  enableRadialLabels={false}
                  enableSliceLabels={true}
                  radialLabelsSkipAngle={10}
                  radialLabelsTextXOffset={6}
                  radialLabelsTextColor="#333333"
                  radialLabelsLinkOffset={0}
                  radialLabelsLinkDiagonalLength={16}
                  radialLabelsLinkHorizontalLength={24}
                  radialLabelsLinkStrokeWidth={1}
                  radialLabelsLinkColor={{ from: "color" }}
                  sliceLabelsSkipAngle={10}
                  sliceLabelsTextColor="#333333"
                  animate={true}
                  motionStiffness={90}
                  motionDamping={15}
                />
              </div>
              <div className="linechart_section">
                <div style={{ width: "600px", height: "600px" }}>
                  <ResponsiveLine
                     data={[
                        {
                          id: 'series1',
                          data: [
                            { x: 0, y: 2 },
                            { x: 1, y: 3 },
                            { x: 2, y: 5 },
                            { x: 3, y: 7 },
                          ],
                        },
                        {
                            id: 'series2',
                            data: [
                              { x: 0, y: 4 },
                              { x: 1, y: 5 },
                              { x: 2, y: 6 },
                              { x: 3, y: 8 },
                            ],
                          },
                        {
                            id: 'series3',
                            data: [
                              { x: 0, y: 4 },
                              { x: 1, y: 5 },
                              { x: 2, y: 6 },
                              { x: 3, y: 8 },
                            ],
                          },
                        {
                            id: 'series4',
                            data: [
                              { x: 0, y: 4 },
                              { x: 1, y: 5 },
                              { x: 2, y: 6 },
                              { x: 3, y: 8 },
                            ],
                          },
                      ]}
                    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                    xScale={{ type: "point" }}
                    yScale={{
                      type: "linear",
                      min: "auto",
                      max: "auto",
                      stacked: true,
                      reverse: false,
                    }}
                    yFormat=" >-.2f"
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                      tickSize: 5,
                      tickPadding: 5,
                      tickRotation: 0,
                      legend: "transportation",
                      legendOffset: 36,
                      legendPosition: "middle",
                      truncateTickAt: 0,
                    }}
                    axisLeft={{
                      tickSize: 5,
                      tickPadding: 5,
                      tickRotation: 0,
                      legend: "count",
                      legendOffset: -40,
                      legendPosition: "middle",
                      truncateTickAt: 0,
                    }}
                    pointSize={10}
                    pointColor={{ theme: "background" }}
                    pointBorderWidth={2}
                    pointBorderColor={{ from: "serieColor" }}
                    pointLabelYOffset={-12}
                    enableTouchCrosshair={true}
                    useMesh={true}
                    legends={[
                      {
                        anchor: "bottom-right",
                        direction: "column",
                        justify: false,
                        translateX: 100,
                        translateY: 0,
                        itemsSpacing: 0,
                        itemDirection: "left-to-right",
                        itemWidth: 80,
                        itemHeight: 20,
                        itemOpacity: 0.75,
                        symbolSize: 12,
                        symbolShape: "circle",
                        symbolBorderColor: "rgba(0, 0, 0, .5)",
                        effects: [
                          {
                            on: "hover",
                            style: {
                              itemBackground: "rgba(0, 0, 0, .03)",
                              itemOpacity: 1,
                            },
                          },
                        ],
                      },
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
