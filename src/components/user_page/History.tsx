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
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { InputLabel, TextField } from "@mui/material";
import axios from "axios";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(
  name: number,
  calories: number,
  fat: number,
  carbs: number,
  protein: string
) {
  return { name, calories, fat, carbs, protein };
}


const History = () => {
  const [age, setAge] = React.useState("");
  const [historyData, setHistoryData] = useState([]);
  const fetchData = async () => {
    try {
      // Replace 'your-api-endpoint' with the actual endpoint of your API
      const response =  await axios.get("http://localhost:8082/convert/get-all");
      setHistoryData(response.data);
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); 
  
  const handleChangeage = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };
  return (
    <div className="history">
      <div className="history_container">
        <div className="history_container_top">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker />
          </LocalizationProvider>
          <TextField id="outlined-basic" label="Outlined" variant="outlined" />
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small-label">Status</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={age}
              label="Status"
              onChange={handleChangeage}
            >
              <MenuItem value={10}>Accepted</MenuItem>
              <MenuItem value={20}>Failure</MenuItem>
              <MenuItem value={30}>Pending</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className="history_container_section">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Sl No.</StyledTableCell>
                  <StyledTableCell align="center">Batch Id</StyledTableCell>
                  <StyledTableCell align="center">Refrence Id</StyledTableCell>
                  <StyledTableCell align="center">
                    Carbs&nbsp;(g)
                  </StyledTableCell>
                  <StyledTableCell align="center">Status</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {historyData.map((row) => (
                <StyledTableRow key={row.batchId}>
                  <StyledTableCell component="th" scope="row" align="center">
                    {row.batchId}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.calories}</StyledTableCell>
                  <StyledTableCell align="center">{row.fat}</StyledTableCell>
                  <StyledTableCell align="center">{row.carbs}</StyledTableCell>
                  <StyledTableCell align="center">{row.protein}</StyledTableCell>
                </StyledTableRow>
              ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default History;


