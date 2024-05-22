import React, { useEffect, useState } from "react";
import { RiQuestionFill } from "react-icons/ri";
import { InputAdornment, TextField } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { axiosPrivate } from "../services/apiService";
import { FaXmark } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa";
import { Option1Modal, Option2Modal } from "./ProductHelpfulTip";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useProductCode } from "../context/ProductContext";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 200,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

interface ProductCode {
  code1: string;
  code2: string;
  code3: string;
  code4: string;
  code5: string;
}

const ProductCodeBuilder = () => {
  const { inputProductCode, setInputProductCode} = useProductCode();
  const [tipOpen, setTipOpen] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState<string | null>(
    null
  );
  const [searchIndustryData, setSearchIndustryData] = useState([]);
  const [productByIndustryIdData, setProductByIndustryIdData] = useState([]);
  const [classByIndustryIdData, setClassByIndustryIdData] = useState([]);
  const [subClassByIndustryIdData, setSubClassByIndustryIdData] = useState([]);
  const [picByIndustryIdData, setPicByIndustryIdData] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubClass, setSelectedSubClass] = useState("");
  const [selectedPic, setSelectedPic] = useState("");
  const [selectedproduct, setSelectedproduct] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [searchClassChecked, setSearchClassChecked] = useState(false);
  const [isProductSelected, setIsProductSelected] = useState(false);
  const [keepProductChecked, setKeepProductChecked] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState({
    dropdown1: false,
    dropdown2: false,
    dropdown3: false,
    dropdown4: false,
  });
  const [currentStep, setCurrentStep] = useState(0);
  const [optionDisabled, setOptionDisabled] = useState([false, false]);
  const [industryCode, setIndustryCode] = useState<number | null>(null);
  const [industryName, setIndustryName] = useState<string>("");
  const [classCode, setClassCode] = useState<string>("");
  const [className, setClassName] = useState<string>("");
  const [subClassCode, setSubClassCode] = useState<string>("");
  const [subClassName, setSubClassName] = useState<string>("");
  const [picCode, setPicCode] = useState<string>("");
  const [picName, setPicName] = useState<string>("");
  const [productCode, setProductCode] = useState<number | null>(null);
  const [productName, setProductName] = useState("");

const [successProductCode,setSuccessProductCode] = useState(false);
const [failedProductCode,setFailedProductCode] = useState(false);


  const handleOpen = (option: string) => {
    setSelectedOption(option);
    setTipOpen(true);
  };
  const handleSubmit = () => {
    const value = `${industryCode}${classCode}${subClassCode || "-"}${picCode || "-"}${productCode}`;
    setInputProductCode(value);
    setCurrentStep(0);
  };
  const handleClose = () => setTipOpen(false);

  const toggleDropdown = (dropdownKey: string) => {
    setDropdownOpen((prevState) => ({
      ...prevState,
      [dropdownKey]: !prevState[dropdownKey],
    }));
  };

  useEffect(() => {
    axiosPrivate
      .get(`/fda/industry`)
      .then((response) => setSearchIndustryData(response.data.RESULT.DATA))
      .catch((error) => console.error("Error making API call:", error));
  }, []);

  const handleSelectedIndustry = (
    industryName: string,
    industryCode: number | null
  ) => {
    setSelectedIndustry(`${industryName} - ${industryCode}`);

    setIndustryName(industryName);
    toggleDropdown("dropdown1");
    setOptionDisabled([false, true]);
    setIndustryCode(industryCode);
    setInputProductCode({
      code1: "",
      code2: "",
      code3: "",
      code4: "",
      code5: "",
    });
  };

  const handleProductByIndustryId = (
    productName: string,
    productCode1: string,
    productCode2: number | null
  ) => {
    setSelectedproduct(`${productName} (${productCode1}-${productCode2})`);
    toggleDropdown("dropdown4");
    setProductCode(productCode2);
    setProductName(productName);
    setClassCode(productCode1);
    setIsProductSelected(true);
    setKeepProductChecked(true);
  };

  const handleClassByIndustryId = (className: string, classCode: string) => {
    setSelectedClass(`${className}-${classCode}`);
    toggleDropdown("dropdown1");
    setClassCode(classCode);
    setClassName(className);
  };

  const handleSubClassByIndustryId = (
    subClassName: string,
    subClassCode: string
  ) => {
    setSelectedSubClass(`${subClassName}-${subClassCode}`);
    toggleDropdown("dropdown2");
    setSubClassCode(subClassCode);
    setSubClassName(subClassName);
  };
  const handlePicByIndustryId = (picName: string, picCode: string) => {
    setSelectedPic(`${picName}-${picCode}`);
    toggleDropdown("dropdown3");
    setPicCode(picCode);
    setPicName(picName);
  };

  const handleClearOption = () => {
    setSelectedIndustry("");
    setInputProductCode({
      code1: "",
      code2: "",
      code3: "",
      code4: "",
      code5: "",
    });
    setOptionDisabled([false, false]);
  };

  const nextStep = () => {
    setCurrentStep((prevStep: number) => prevStep + 1);
  };

  const prevStep = () => {
    setCurrentStep((prevStep: number) => prevStep - 1);
  };

  const startOver = () => {
    setCurrentStep(0);
    setSelectedIndustry("");
    setIndustryName("");
    setIndustryCode(null);
    setInputProductCode({
      code1: "",
      code2: "",
      code3: "",
      code4: "",
      code5: "",
    });
    setOptionDisabled([false, false]);
    setProductCode(null);
    setProductName("");
    setClassCode("");
    setClassName("");
    setSubClassCode("");
    setSubClassName("");
    setPicCode("");
    setPicName("");
    setSelectedproduct("");
    setSelectedPic("");
    setSelectedSubClass("");
    setSelectedClass("");
    setKeepProductChecked(false);
    setSearchClassChecked(false);
    setIsProductSelected(false);
  };

useEffect(() =>{
handleClearOption();
},[]);

  const productByIndustryId = () => {
    axiosPrivate
      .get(`/fda/industryproduct/${industryCode}`)
      .then((response) => {
        setProductByIndustryIdData(response.data.RESULT.DATA);
        const productData = response.data.RESULT.DATA;
        const productCodeToMatch = productCode;
        const classCodeToMatch = classCode;
        let matchedProduct;
        for (let i = 0; i < productData.length; i++) {
          const productClassCode = productData[i][3];
          const productGroupCode = productData[i][4];
          if (
            productClassCode === classCodeToMatch &&
            productGroupCode === productCodeToMatch
          ) {
            matchedProduct = productData[i];
            break;
          }
        }

        if (matchedProduct) {
          const productName1 = matchedProduct[2];
          const productCode = matchedProduct[4];
          setSelectedproduct(`${productName1}-${productCode}`);
          setProductName(productName1);
          setProductCode(productCode);
        }
      })
      .catch((error) => {
        console.error("Error making API call:", error);
      });
  };
  const picByIndustryId = () => {
    axiosPrivate
      .get(`/fda/industryPic/${industryCode}`)
      .then((response) => {
        setPicByIndustryIdData(response.data.RESULT.DATA);
        const picData = response.data.RESULT.DATA;
        const picCodeToMatch = picCode;
        let matchedPic;
        for (let i = 0; i < picData.length; i++) {
          if (picData[i][2] === picCodeToMatch) {
            matchedPic = picData[i];
            break;
          }
        }
        if (matchedPic) {
          const picName = matchedPic[3];
          const picCode = matchedPic[2];
          setSelectedPic(`${picName}-${picCode}`);
          setPicName(picName);
          setPicCode(picCode);
        }
      })
      .catch((error) => {
        console.error("Error making API call:", error);
      });
  };
  const classByIndustryId = () => {
    axiosPrivate
      .get(`/fda/industryclass/${industryCode}`)
      .then((response) => {
        setClassByIndustryIdData(response.data.RESULT.DATA);
        const classData = response.data.RESULT.DATA;
        const classCodeToMatch = classCode;
        let matchedClass;
        for (let i = 0; i < classData.length; i++) {
          if (classData[i][1] === classCodeToMatch) {
            matchedClass = classData[i];
            break;
          }
        }
        if (matchedClass) {
          const className = matchedClass[2];
          const classCode = matchedClass[1];
          setSelectedClass(`${className}-${classCode}`);
          setClassName(className);
          setClassCode(classCode);
        }
      })
      .catch((error) => {
        console.error("Error making API call:", error);
      });
  };

  const subClassByIndustryId = () => {
    axiosPrivate
      .get(`/fda/industrysubclass/${industryCode}`)
      .then((response) => {
        setSubClassByIndustryIdData(response.data.RESULT.DATA);
        const subClassData = response.data.RESULT.DATA;
        const subClassCodeToMatch = subClassCode;
        let matchedSubClass;
        for (let i = 0; i < subClassData.length; i++) {
          if (subClassData[i][2] === subClassCodeToMatch) {
            matchedSubClass = subClassData[i];
            break;
          }
        }
        if (matchedSubClass) {
          const subClassName = matchedSubClass[3];
          const subClassCode = matchedSubClass[2];
          setSelectedSubClass(`${subClassName}-${subClassCode}`);
          setSubClassName(subClassName);
          setSubClassCode(subClassCode);
        }
      })
      .catch((error) => {
        console.error("Error making API call:", error);
      });
  };
  useEffect(() => {
    classByIndustryId();
    productByIndustryId();
    picByIndustryId();
    subClassByIndustryId();
  }, [classCode, productCode, subClassCode, picCode]);

  const verifyProductCode = () => {
    const combinedInputProductCode = Object.values(inputProductCode).join("");
    axiosPrivate
      .get(`/fda/productCode/${combinedInputProductCode}`)
      .then((response) => {
        if (response.data.APIRETURNCODE === 403) {
          setIndustryCode(parseInt(inputProductCode.code1));
          setClassCode(inputProductCode.code2);
          setSubClassCode(inputProductCode.code3);
          setPicCode(inputProductCode.code4);
          setProductCode(parseInt(inputProductCode.code5));
          setSuccessProductCode(true);
        }else{
          setFailedProductCode(true);
        }
      })
      .catch((error) => {
        console.error("Error making API call:", error);
      });
  };

  const productCodeModalClose = ()=>{
    setSuccessProductCode(false);
    setFailedProductCode(false);
  }

  const productCodeSubmit = ()=>{
    setSuccessProductCode(false);
  }

  const nextButtonApi = () => {
    const isOption1Filled = selectedIndustry !== "";
    const isOption2Filled = Object.values(inputProductCode).every(
      (code) => code.trim() !== ""
    );
    if (isOption1Filled) {
      productByIndustryId();
      setCurrentStep(1);
      classByIndustryId();
      subClassByIndustryId();
      picByIndustryId();
      setOptionDisabled([true, true]);
    } else if (isOption2Filled) {
      verifyProductCode();
      setOptionDisabled([true, false]);
    }
  };
  return (
    <div className="products">
      <div className="products_container">
        <div className="products_container_section">
          <div
            className={`products_container_section_left ${
              currentStep !== 0 ? "with_right" : ""
            }`}
          >
            <div className="option1">
              <div className="heading">
                <h2>
                  OPTION-1
                  <Tooltip title="Helpful Tips">
                    <IconButton>
                      <RiQuestionFill
                        onClick={() => handleOpen("Option 1")}
                        style={{
                          cursor: "pointer",
                          fontSize: "18px",
                          color: "#05729d",
                        }}
                      />
                    </IconButton>
                  </Tooltip>
                </h2>
                <Option1Modal
                  tipOpen={tipOpen}
                  handleClose={handleClose}
                  selectedOption={selectedOption}
                />
                <p>Search Industry</p>
              </div>
              <div className="textfield">
                <TextField
                  id="industry type"
                  type="text"
                  name="industry type"
                  className="custom-placeholder"
                  placeholder="Search with Industry type"
                  required
                  fullWidth
                  value={selectedIndustry}
                  disabled={currentStep !== 0 || optionDisabled[0]}
                  InputProps={{
                    style: {
                      fontWeight: "500",
                      background: "white",
                      color: "#808080",
                      height: "40px",
                      caretColor: "transparent",
                      cursor: optionDisabled[0] ? "not-allowed" : "pointer",
                    },
                    endAdornment: (
                      <React.Fragment>
                        <InputAdornment position="end">
                          <ExpandMoreIcon
                            sx={{
                              color: "#EEEEEE",
                              fontSize: "1.2rem",
                              borderLeft: "0.5px solid #EEEEEE",
                              height: "40px",
                              paddingLeft: "10px",
                              cursor: optionDisabled[0]
                                ? "not-allowed"
                                : "pointer",
                            }}
                          />
                        </InputAdornment>
                      </React.Fragment>
                    ),
                    onClick: () => toggleDropdown("dropdown1"),
                  }}
                />
                {currentStep === 0 && (
                  <div
                    className="dropdown"
                    style={{
                      display: dropdownOpen.dropdown1 ? "block" : "none",
                    }}
                  >
                    {searchIndustryData.length > 0 && (
                      <div className="dropdown-content">
                        <ul>
                          {searchIndustryData.map((item, index) => (
                            <li
                              key={index}
                              onClick={() =>
                                handleSelectedIndustry(item[1], item[0])
                              }
                            >
                              <span>{item[1]}</span> - <span>{item[0]}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="option2">
              <div className="heading">
                <h2>
                  OPTION-2
                  <Tooltip title="Helpful Tips">
                    <IconButton>
                      <RiQuestionFill
                        onClick={() => handleOpen("Option 2")}
                        style={{
                          cursor: "pointer",
                          fontSize: "18px",
                          color: "#05729d",
                        }}
                      />
                    </IconButton>
                  </Tooltip>
                </h2>
                <Option2Modal
                  tipOpen={tipOpen}
                  handleClose={handleClose}
                  selectedOption={selectedOption}
                />
                <p>Verify Product Code</p>
              </div>
              <div className="textfield">
                <div className="input_fields">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <TextField
                      key={index}
                      id={`product code${index + 1}`}
                      type="text"
                      name={`product code${index + 1}`}
                      className="custom-placeholder"
                      required
                      fullWidth
                      disabled={optionDisabled[1]}
                      value={
                        inputProductCode[
                          `code${index + 1}` as keyof ProductCode
                        ]
                      }
                      onChange={(e) => {
                        const value = e.target.value.trim();
                        setInputProductCode({
                          ...inputProductCode,
                          [`code${index + 1}` as keyof ProductCode]: value,
                        });
                        const anyFieldFilled = Object.values(
                          inputProductCode
                        ).some((code) => code.trim() !== "");
                        setOptionDisabled([anyFieldFilled, false]);
                      }}
                      InputProps={{
                        style: {
                          fontWeight: "500",
                          background: "white",
                          color: "#808080",
                          height: "40px",
                        },
                      }}
                      inputProps={{
                        maxLength: index === 0 || index === 4 ? 2 : 1,
                      }}
                    />
                  ))}
                </div>
              </div>
              <Modal
                open={successProductCode}
                onClose={productCodeModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                 <h2>Success</h2>
                 <p>It is valid Product code.</p>
                 <button onClick={productCodeSubmit}>Submit</button>
                </Box>
              </Modal>
              <Modal
                open={failedProductCode}
                onClose={productCodeModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                <h2>Failed</h2>
                 <p>It is not a valid Product code!!!</p>
                 <button onClick={productCodeModalClose}>Retry</button>
                </Box>
              </Modal>
            </div>
            <div className="clear_next_buttons">
              <button onClick={handleClearOption}>
                Clear <FaXmark className="icon" />
              </button>
              <button onClick={nextButtonApi}>
                Next <FaChevronRight className="icon" />
              </button>
            </div>
          </div>
          {currentStep !== 0 && (
            <div className="products_container_section_right">
              <div className="right_container">
                <h2>
                  {currentStep === 1
                    ? "INDUSTRY & PRODUCT CODE/PRODUCT NAME"
                    : currentStep === 2
                    ? "INDUSTRY & PRODUCT CODE/ADDITIONAL PRODUCT CODE PORTIONS"
                    : "FINAL RESULTS"}
                </h2>
                {(currentStep === 1 || currentStep === 2) && (
                  <>
                    <div className="input_fields">
                      {Object.entries({
                        industryCode,
                        classCode,
                        subClassCode,
                        picCode,
                        productCode,
                      }).map(([key, value], index) => (
                        <TextField
                          key={index}
                          id={`input_${index}`}
                          type="text"
                          name={`input_${index}`}
                          className="custom-placeholder"
                          required
                          fullWidth
                          disabled={
                            (index === 0 && optionDisabled[1]) ||
                            value === null ||
                            value === ""
                          }
                          value={value !== null ? value : ""}
                          InputProps={{
                            style: {
                              fontWeight: "500",
                              background: "white",
                              color: "#808080",
                              height: "40px",
                              cursor: "not-allowed",
                            },
                          }}
                        />
                      ))}
                    </div>
                  </>
                )}
                {currentStep === 1 && (
                  <div className="step1">
                    <div className="checkox_container">
                      {classByIndustryIdData.length > 0 &&
                        subClassByIndustryIdData.length > 0 &&
                        picByIndustryIdData.length > 0 && (
                          <div className="terms">
                            <input
                              id="searchClassCheckbox"
                              type="checkbox"
                              required
                              checked={searchClassChecked}
                              onChange={(e) =>
                                setSearchClassChecked(e.target.checked)
                              }
                            />
                            <label
                              style={{
                                fontSize: "14px",
                                paddingRight: "10px",
                                fontWeight: "540",
                              }}
                            >
                              Search Class
                            </label>
                          </div>
                        )}
                      <div className="terms">
                        <input
                          id="checkbox"
                          type="checkbox"
                          required
                          disabled={!isProductSelected}
                          checked={keepProductChecked}
                          onChange={() =>
                            setKeepProductChecked(!keepProductChecked)
                          }
                        />
                        <label
                          style={{
                            fontSize: "14px",
                            paddingRight: "10px",
                            fontWeight: "540",
                          }}
                        >
                          Keep Product
                        </label>
                      </div>
                    </div>
                    <div className="product_dropdown">
                      <TextField
                        id="option1"
                        type="text"
                        name="Search with Industry type"
                        className="custom-placeholder"
                        placeholder="Select Product (Optional)"
                        required
                        fullWidth
                        value={selectedproduct}
                        InputProps={{
                          style: {
                            fontWeight: "500",
                            background: "white",
                            color: "#808080",
                            height: "40px",
                          },
                          endAdornment: (
                            <React.Fragment>
                              <InputAdornment position="end">
                                <ExpandMoreIcon
                                  sx={{
                                    color: "#EEEEEE",
                                    fontSize: "1.2rem",
                                    height: "40px",
                                    paddingLeft: "10px",
                                    borderLeft: "0.5px solid #EEEEEE",
                                  }}
                                />
                              </InputAdornment>
                            </React.Fragment>
                          ),
                          onClick: () => toggleDropdown("dropdown4"),
                        }}
                      />
                      <div
                        className="dropdown"
                        style={{
                          display: dropdownOpen.dropdown4 ? "block" : "none",
                        }}
                      >
                        {productByIndustryIdData.length > 0 && (
                          <div className="dropdown-content">
                            <ul>
                              {productByIndustryIdData.map((item, index) => (
                                <li
                                  key={index}
                                  onClick={() =>
                                    handleProductByIndustryId(
                                      item[2],
                                      item[3],
                                      item[4]
                                    )
                                  }
                                >
                                  <span>{`${item[2]} (${item[3]}-${item[4]})`}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="buttons">
                      <button onClick={startOver}>START OVER</button>
                      {currentStep < 4 && (
                        <button
                          onClick={nextStep}
                          disabled={!searchClassChecked && !selectedproduct}
                        >
                          NEXT
                        </button>
                      )}
                    </div>
                  </div>
                )}
                {currentStep === 2 && (
                  <div className="step2">
                    <div className="product_dropdown">
                      {classByIndustryIdData.length > 0 &&
                      subClassByIndustryIdData.length > 0 &&
                      picByIndustryIdData.length > 0 ? (
                        <div
                          className="product_dropdown1"
                          style={{ margin: "0" }}
                        >
                          <TextField
                            id="option1"
                            type="text"
                            name="Search with Industry type"
                            className="custom-placeholder"
                            placeholder="Select Class"
                            required
                            fullWidth
                            value={selectedClass}
                            InputProps={{
                              style: {
                                fontWeight: "500",
                                background: "white",
                                color: "#808080",
                                height: "40px",
                              },
                              endAdornment: (
                                <React.Fragment>
                                  <InputAdornment position="end">
                                    <ExpandMoreIcon
                                      sx={{
                                        color: "#EEEEEE",
                                        fontSize: "1.2rem",
                                        height: "40px",
                                        paddingLeft: "10px",
                                        borderLeft: "0.5px solid #EEEEEE",
                                      }}
                                    />
                                  </InputAdornment>
                                </React.Fragment>
                              ),
                              onClick: () => toggleDropdown("dropdown1"),
                            }}
                          />
                          <div
                            className="dropdown"
                            style={{
                              display: dropdownOpen.dropdown1
                                ? "block"
                                : "none",
                            }}
                          >
                            {classByIndustryIdData.length > 0 && (
                              <div className="dropdown-content">
                                <ul>
                                  {classByIndustryIdData.map((item, index) => (
                                    <li
                                      key={index}
                                      onClick={() =>
                                        handleClassByIndustryId(
                                          item[2],
                                          item[1]
                                        )
                                      }
                                    >
                                      <span>{`${item[2]}-${item[1]}`}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                      ) : (
                        <p className="empty">
                          Class is dependent upon Product *
                        </p>
                      )}
                      {subClassByIndustryIdData.length > 0 ? (
                        <div
                          className="product_dropdown2"
                          style={{ margin: "0" }}
                        >
                          <TextField
                            id="option1"
                            type="text"
                            name="Search with Industry type"
                            className="custom-placeholder"
                            placeholder="Select Subclass"
                            required
                            value={selectedSubClass}
                            fullWidth
                            InputProps={{
                              style: {
                                fontWeight: "500",
                                background: "white",
                                color: "#808080",
                                height: "40px",
                              },
                              endAdornment: (
                                <React.Fragment>
                                  <InputAdornment position="end">
                                    <ExpandMoreIcon
                                      sx={{
                                        color: "#EEEEEE",
                                        fontSize: "1.2rem",
                                        height: "40px",
                                        paddingLeft: "10px",
                                        borderLeft: "0.5px solid #EEEEEE",
                                      }}
                                    />
                                  </InputAdornment>
                                </React.Fragment>
                              ),
                              onClick: () => toggleDropdown("dropdown2"),
                            }}
                          />
                          <div
                            className="dropdown"
                            style={{
                              display: dropdownOpen.dropdown2
                                ? "block"
                                : "none",
                            }}
                          >
                            {subClassByIndustryIdData.length > 0 && (
                              <div className="dropdown-content">
                                <ul>
                                  {subClassByIndustryIdData.map(
                                    (item, index) => (
                                      <li
                                        key={index}
                                        onClick={() =>
                                          handleSubClassByIndustryId(
                                            item[3],
                                            item[2]
                                          )
                                        }
                                      >
                                        <span>{`${item[3]}-${item[2]}`}</span>
                                      </li>
                                    )
                                  )}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                      ) : (
                        <p className="empty">No SubClass</p>
                      )}
                      {picByIndustryIdData.length > 0 ? (
                        <div
                          className="product_dropdown3"
                          style={{ margin: "0" }}
                        >
                          <TextField
                            id="option1"
                            type="text"
                            name="Search with Industry type"
                            className="custom-placeholder"
                            placeholder="Select Pic"
                            required
                            fullWidth
                            value={selectedPic}
                            InputProps={{
                              style: {
                                fontWeight: "500",
                                background: "white",
                                color: "#808080",
                                height: "40px",
                              },
                              endAdornment: (
                                <React.Fragment>
                                  <InputAdornment position="end">
                                    <ExpandMoreIcon
                                      sx={{
                                        color: "#EEEEEE",
                                        fontSize: "1.2rem",
                                        height: "40px",
                                        paddingLeft: "10px",
                                        borderLeft: "0.5px solid #EEEEEE",
                                      }}
                                    />
                                  </InputAdornment>
                                </React.Fragment>
                              ),
                              onClick: () => toggleDropdown("dropdown3"),
                            }}
                          />
                          <div
                            className="dropdown"
                            style={{
                              display: dropdownOpen.dropdown3
                                ? "block"
                                : "none",
                            }}
                          >
                            {picByIndustryIdData.length > 0 && (
                              <div className="dropdown-content">
                                <ul>
                                  {picByIndustryIdData.map((item, index) => (
                                    <li
                                      key={index}
                                      onClick={() =>
                                        handlePicByIndustryId(item[3], item[2])
                                      }
                                    >
                                      <span>{`${item[3]}-${item[2]}`}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                      ) : (
                        <p className="empty">No Pic</p>
                      )}

                      <div
                        className="product_dropdown4"
                        style={{ margin: "0" }}
                      >
                        <TextField
                          id="option1"
                          type="text"
                          name="Search with Industry type"
                          className="custom-placeholder"
                          placeholder="Select Product (Optional)"
                          required
                          fullWidth
                          value={selectedproduct}
                          InputProps={{
                            style: {
                              fontWeight: "500",
                              background: "white",
                              color: "#808080",
                              height: "40px",
                            },
                            endAdornment: (
                              <React.Fragment>
                                <InputAdornment position="end">
                                  <ExpandMoreIcon
                                    sx={{
                                      color: "#EEEEEE",
                                      fontSize: "1.2rem",
                                      height: "40px",
                                      paddingLeft: "10px",
                                      borderLeft: "0.5px solid #EEEEEE",
                                    }}
                                  />
                                </InputAdornment>
                              </React.Fragment>
                            ),
                            onClick: () => toggleDropdown("dropdown4"),
                          }}
                        />
                        <div
                          className="dropdown"
                          style={{
                            display: dropdownOpen.dropdown4 ? "block" : "none",
                          }}
                        >
                          {productByIndustryIdData.length > 0 && (
                            <div className="dropdown-content">
                              <ul>
                                {productByIndustryIdData.map((item, index) => (
                                  <li
                                    key={index}
                                    onClick={() =>
                                      handleProductByIndustryId(
                                        item[2],
                                        item[3],
                                        item[4]
                                      )
                                    }
                                  >
                                    <span>{`${item[2]} (${item[3]}-${item[4]})`}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="buttons">
                      <button onClick={startOver}>START OVER</button>
                      <div className="prev_next_button">
                        {currentStep > 1 && (
                          <button onClick={prevStep}>PREVIOUS</button>
                        )}
                        {currentStep < 4 && (
                          <button onClick={nextStep}>NEXT</button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                {currentStep === 3 && (
                  <div className="step3">
                    <table>
                      <thead>
                        <tr>
                          <th>Industry</th>
                          <th>Product</th>
                          <th>Code</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{`${industryName}`}</td>
                          <td>
                            {`${className}/${subClassName}/${picName}/${productName}`}
                          </td>
                          <td>{`${industryCode} ${classCode} ${
                            subClassCode || "-"
                          } ${picCode || "-"} ${productCode}`}</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="buttons">
                      <button onClick={startOver}>START OVER</button>
                      <div>
                        <div className="prev_next_button">
                          {currentStep > 1 && (
                            <button onClick={prevStep}>PREVIOUS</button>
                          )}
                          {currentStep < 4 && (
                            <button onClick={handleSubmit}>SUBMIT</button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCodeBuilder;
