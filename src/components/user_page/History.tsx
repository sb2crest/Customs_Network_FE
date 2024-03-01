import React, { useState } from "react";
import "../../assets/sass/components/_history.scss";
import { alpha, styled, Theme, useTheme } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import SearchIcon from "@mui/icons-material/Search";
import { InputBase } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 200,
    },
  },
};

const names = ["Accepted", "Rejected", "Pending"];

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

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

const rows = [
  createData(1, 159, 6.0, 24, "Accepted"),
  createData(2, 237, 9.0, 37, "Rejected"),
  createData(3, 262, 16.0, 24, "Pending"),
  createData(4, 305, 3.7, 67, "Accepted"),
  createData(5, 356, 16.0, 49, "Pending"),
];

const History = () => {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState<string[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value }
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div className="container">
      <div className="history">
        <div className="history_container">
          <div className="history_container_top">
            <FormControl sx={{ m: 1, width: 200, mt: 3 }} size="small">
              <Select
                multiple
                displayEmpty
                value={personName}
                onChange={handleChange}
                input={<OutlinedInput />}
                renderValue={(selected) => {
                  if (selected.length === 0) {
                    return <em>Status</em>;
                  }

                  return selected.join(", ");
                }}
                MenuProps={MenuProps}
                inputProps={{ "aria-label": "Without label" }}
                style={{ backgroundColor: "#E8E8E8", marginTop: "-15px" }}
              >
                {names.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, personName, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="datePickerCalendar"
              placeholderText="Start Date"
            />

            <Search style={{ width: '30%' }}>
              <SearchIconWrapper>
                <SearchIcon className="icon" />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search"
                inputProps={{ "aria-label": "search" }}
                className="search"
              />
            </Search>
          </div>

          <div className="history_container_section">

            <TableContainer component={Paper} style={{ background: "transparent" }}>
              <Table sx={{
                minWidth: 700,
              }}
                aria-label="customized table"
              >
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center" style={{ backgroundColor: "#eee1", fontWeight: "700" }}>Sl No.</StyledTableCell>
                    <StyledTableCell align="center" style={{ backgroundColor: "#eee1", fontWeight: "700" }}>Batch Id</StyledTableCell>
                    <StyledTableCell align="center" style={{ backgroundColor: "#eee1", fontWeight: "700" }}>Refrence Id</StyledTableCell>
                    <StyledTableCell align="center" style={{ backgroundColor: "#eee1", fontWeight: "700" }}>
                      Carbs&nbsp;(g)
                    </StyledTableCell>
                    <StyledTableCell align="center" style={{ backgroundColor: "#eee1", fontWeight: "700" }}>Status</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <StyledTableRow key={row.name} >
                      <StyledTableCell component="th" scope="row" align="center" style={{fontWeight:"900", color:"#404040"}}>
                        {row.name}
                      </StyledTableCell>
                      <StyledTableCell align="center" style={{fontWeight:"900" , color:"#404040"}}>
                        {row.calories}
                      </StyledTableCell>
                      <StyledTableCell align="center" style={{fontWeight:"900" , color:"#404040"}}>{row.fat}</StyledTableCell>
                      <StyledTableCell align="center" style={{fontWeight:"900" , color:"#404040"}}>
                        {row.carbs}
                      </StyledTableCell>
                      <StyledTableCell align="center" style={{fontWeight:"900" , color:"#404040"}}>
                        {row.protein}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
