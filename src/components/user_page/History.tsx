import React, { useEffect, useState } from "react";
import "../../assets/sass/components/_history.scss";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import "react-datepicker/dist/react-datepicker.css";
import { DialogContentText, InputLabel, TextField } from "@mui/material";
import axios from "axios";
import { IoEye } from "react-icons/io5";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import dayjs from "dayjs";
import "dayjs/locale/en";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

const JsonViewer = ({ jsonData, onClose }) => {
  return (
    <Dialog open={!!jsonData} onClose={onClose}>
      <DialogContent>
        <DialogContentText>
          <pre>{JSON.stringify(jsonData, null, 2)}</pre>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#103290",
    color: "#103290",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const History = () => {
  const [historyData, setHistoryData] = useState([]);
  const [age, setAge] = React.useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [displayedJsonType, setDisplayedJsonType] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [referenceId, setReferenceId] = useState("");
  const [batchId, setBatchId] = useState("");

  const handleEyeIconClick = (row, jsonType) => {
    setSelectedRow(row);
    setDisplayedJsonType(jsonType);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedRow(null);
    setModalOpen(false);
  };

  const handleStatusChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  const fetchData = async () => {
    try {
      // Replace 'your-api-endpoint' with the actual endpoint of your API
      const response = await axios.get("http://localhost:8082/convert/get-all");
      setHistoryData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = async () => {
    try {
      const formattedDate = selectedDate
        ? dayjs(selectedDate).format("DD-MM-YYYY")
        : "";
      const url = `http://localhost:8082/convert/getFdaPn-records?date=${formattedDate}&referenceId=${referenceId}&batchId=${batchId}&status=${age}`;

      const response = await axios.get(url);
      setHistoryData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="container">
      <div className="history">
        <div className="history_container_top">
          <div className="filters">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                className="datepicker"
                sx={{ width: "200px" }}
                value={selectedDate}
                onChange={(date) => setSelectedDate(date)}
              />
            </LocalizationProvider>

            <TextField
              id="outlined-basic"
              label="Reference ID"
              variant="outlined"
              size="small"
              color="primary"
              style={{ width: "160px" }}
              value={referenceId}
              onChange={(e) => setReferenceId(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Batch ID"
              variant="outlined"
              size="small"
              color="primary"
              style={{ width: "160px" }}
              value={batchId}
              onChange={(e) => setBatchId(e.target.value)}
            />

            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-select-small-label">Status</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={age}
                label="Status"
                onChange={handleStatusChange}
                style={{ width: "160px" }}
              >
                <MenuItem value="SUCCESS">SUCCESS</MenuItem>
                <MenuItem value="FAILED">FAILED</MenuItem>
              </Select>
            </FormControl>

            <button className="search" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
        <div className="history_container">
          <div className="history_container_section">
            <TableContainer
              component={Paper}
              style={{ background: "transparent" }}
            >
              <Table
                sx={{
                  minWidth: 700,
                }}
                aria-label="customized table"
              >
                <TableHead>
                  <TableRow>
                    <StyledTableCell
                      align="center"
                      style={{ backgroundColor: "#eee1", fontWeight: "700" }}
                    >
                      Batch Id
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      style={{ backgroundColor: "#eee1", fontWeight: "700" }}
                    >
                      User Id
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      style={{ backgroundColor: "#eee1", fontWeight: "700" }}
                    >
                      Refrence Id
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      style={{ backgroundColor: "#eee1", fontWeight: "700" }}
                    >
                      Created Date
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      style={{ backgroundColor: "#eee1", fontWeight: "700" }}
                    >
                      Status
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      style={{ backgroundColor: "#eee1", fontWeight: "700" }}
                    >
                      Request Json
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      style={{ backgroundColor: "#eee1", fontWeight: "700" }}
                    >
                      Response Json
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {historyData.map((row) => (
                    <StyledTableRow key={row.batchId}>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                        {row.batchId}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.userId}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.referenceId}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.createdOn}
                      </StyledTableCell>

                      <StyledTableCell align="center">
                        {row.status}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <IoEye
                          style={{ cursor: "pointer" }}
                          onClick={() => handleEyeIconClick(row, "requestJson")}
                        />
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <IoEye
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            handleEyeIconClick(row, "responseJson")
                          }
                        />
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
      <Dialog open={modalOpen} onClose={handleCloseModal}>
        <DialogTitle>Details</DialogTitle>
        <DialogContent>
          {selectedRow && (
            <div>
              {displayedJsonType === "requestJson" && (
                <JsonViewer
                  jsonData={selectedRow.requestJson}
                  onClose={handleCloseModal}
                />
              )}
              {displayedJsonType === "responseJson" && (
                <JsonViewer
                  jsonData={selectedRow.responseJson}
                  onClose={handleCloseModal}
                />
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default History;
