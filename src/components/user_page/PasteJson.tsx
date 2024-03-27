import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import '../../assets/sass/components/_paste_json.scss';
import { Modal, Box, CircularProgress } from "@mui/material";
import { FaXmark } from "react-icons/fa6";
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const PasteJson = () => {
  const [inputValue, setInputValue] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    AOS.init({
      duration: 1000, 
    });
  }, []);

  const modalStyle = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 5,
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSuccessModalClose = () => {
    setShowPopup(false);
  };

  const handleSubmit = () => {
    try {
      const parsedValue = JSON.parse(inputValue);
      const beautifiedValue = JSON.stringify(parsedValue, null, 2);
      setInputValue(beautifiedValue);
      setFormattedValue(beautifiedValue);
    } catch (error) {
      console.error('Invalid JSON format');
    }
  };

  const handleSubmission = async () => {
    setIsLoading(true);
    if (!formattedValue.trim()) {
      console.error('Submission attempt with empty JSON.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await axiosPrivate.post('/convert/json-to-xml', formattedValue, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        setShowPopup(true);
        setInputValue("")
      } else {
        console.error('API call failed:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error during API call:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="submit-json-page">
      <div className="input-container">
        {inputValue === '' && (
          <label htmlFor="jsonInput">Enter JSON here:</label>
        )}
        <textarea
          id="jsonInput"
          value={inputValue}
          onChange={handleInputChange}
          className="large-placeholder"
          data-aos="fade-up"
        />
      </div>
      <div className='buttons'>
        <button onClick={handleSubmit}>Beautify</button>
        <div className="submit-button-container">
          <button onClick={handleSubmission} disabled={!inputValue.trim()}>Submit</button>
        </div>
      </div>
      {isLoading && <CircularProgress color="primary" className="loader" />}
      <Modal
        open={showPopup}
        onClose={handleSuccessModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...modalStyle, textAlign: "center" }}>
          <div className="checkmark">
            <div className="check-container">
              <div className="check-background">
                <svg
                  viewBox="0 0 65 51"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 25L27.3077 44L58.5 7"
                    stroke="white"
                    strokeWidth="13"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="check-shadow"></div>
            </div>
          </div>

          <FaXmark className="close_button" onClick={handleSuccessModalClose} />
          <h2 id="modal-modal-title">File Uploaded Successfully!</h2>
          <p id="modal-modal-description">
            Your files have been successfully uploaded.
          </p>
        </Box>
      </Modal>
    </div>
  );
};

export default PasteJson;
