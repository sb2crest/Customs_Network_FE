import * as React from "react";
import { styled } from "@mui/system";
import { SlCloudUpload } from "react-icons/sl";
import { useLocation } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import axios from "axios";
import "../../assets/sass/components/_submit_excel.scss";
import { Modal, Box } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

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

const SubmitExcel = () => {
  const [selectedFiles, setSelectedFiles] = React.useState<File[]>([]);
  const [isDragOver, setIsDragOver] = React.useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = React.useState(false);

  const handleSuccessModalOpen = () => {
    setIsSuccessModalOpen(true);
  };

  const handleSuccessModalClose = () => {
    setIsSuccessModalOpen(false);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);

    const files = event.dataTransfer.files;
    if (files) {
      const excelFiles = Array.from(files).filter((file) =>
        isExcelFile(file.name)
      );
      setSelectedFiles(excelFiles);
    }
  };

  const location = useLocation();
  const accessToken = location.state?.accessToken;

  const isExcelFile = (fileName: string) => {
    return fileName.endsWith(".xlsx") || fileName.endsWith(".xls");
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
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
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        handleSuccessModalOpen();
        console.log("Files uploaded successfully");
      } else {
        console.error("Failed to upload files");
      }
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  const handleOkButtonClick = () => {
    uploadFiles();
    console.log("OK button clicked");
  };

  const modalStyle = {
    position: "absolute" as const,
    top: "50%",
    left: "60%",
    transform: "translate(-50%, -50%)",
    width: 300,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div
      style={{ width: "50%", margin: "50px" }}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <Card
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          backdropFilter: 'blur(1px)', borderRadius: "15px"
        }}
        className={isDragOver ? "drag-over" : ""}
      >
        <CardContent>
          <div className="browsefile">
            <div className="browsefile_container">
              <p className="p-text">Upload Files Here</p>
              <div className="browsefile_container_section">
                <div className="icon">
                  <SlCloudUpload className="upload_icon" />
                </div>
                <p className="content">Drag & drop files or</p>

                <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  className="browse"
                >
                  Browse Files
                  <VisuallyHiddenInput
                    type="file"
                    onChange={handleFileChange}
                    accept=".xlsx, .xls"
                    multiple
                  />
                </Button>
                <p className="supported_formats">
                  Supported formats: .xlsx & .xls
                </p>
              </div>
              <span style={{ color: "#414142" , fontWeight:"500"}} >Selected Excel Files</span>
              {selectedFiles.length > 0 && (
                <ul>
                  {selectedFiles.map((file, index) => (
                    <li key={index}>{file.name}</li>
                  ))}
                </ul>
              )}
            </div>
            <CardActions>
              <Button
                variant="contained"
                onClick={handleOkButtonClick}
                className="submit_btn"
              >
                Submit
              </Button>
            </CardActions>
          </div>
        </CardContent>
      </Card>
      <Modal
        open={isSuccessModalOpen}
        onClose={handleSuccessModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...modalStyle, textAlign: "center" }}>
          <CheckCircleIcon className="success_icon" />
          <h2 id="modal-modal-title">File Uploaded Successfully!</h2>
          <p id="modal-modal-description">
            Your files have been successfully uploaded.
          </p>
        </Box>
      </Modal>
    </div>
  );
};

export default SubmitExcel;
