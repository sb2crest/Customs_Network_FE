import * as React from "react";
import { styled } from "@mui/system";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useLocation } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from 'axios';

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function InputFileUpload() {
  const [selectedFiles, setSelectedFiles] = React.useState<File[]>([]);
  const location = useLocation();
  const accessToken = location.state?.accessToken;

  const isExcelFile = (fileName: string) => {
    return fileName.endsWith(".xlsx") || fileName.endsWith(".xls");
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      // Filter only Excel files
      const excelFiles = Array.from(files).filter((file) =>
        isExcelFile(file.name)
      );
      setSelectedFiles(excelFiles);
    }
  };

  const uploadFiles = async () => {
    const formData = new FormData();
  
    selectedFiles.forEach((file) => {
      formData.append("file", file);
    });
  
    try {
      const response = await axios.post(
        "http://localhost:8080/convert/excel-to-xml",
        formData,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data', 
          },
          withCredentials: true, 
        }
      );
  
      if (response.status === 200) {
        console.log("Files uploaded successfully");
        // You can add further logic or state update here if needed
      } else {
        console.error("Failed to upload files");
      }
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };
  

  const handleOkButtonClick = () => {
    // Call the API when the "OK" button is clicked
    // You can add further logic or state update here if needed
    uploadFiles();
    console.log("OK button clicked");
  };
  return (
    <div style={{ width: "50%", margin: "50px" }}>
      <Card sx={{ minWidth: 275, padding: 5 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Please Upload files in the .xlsx, .xls format
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            Upload
            <VisuallyHiddenInput
              type="file"
              onChange={handleFileChange}
              accept=".xlsx, .xls"
              multiple
            />
          </Button>
          {selectedFiles.length > 0 && (
            <div>
              <strong>Selected Excel Files:</strong>
              <ul>
                {selectedFiles.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            </div>
          )}
          <Button variant="contained" onClick={handleOkButtonClick}>
            OK
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
