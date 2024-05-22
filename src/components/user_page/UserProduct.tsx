import { FaBoxOpen } from "react-icons/fa6";
import { BiSolidRightArrow } from "react-icons/bi";
import { useEffect, useState } from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { TimePicker } from "antd";
import IDropdownStates from "../../types/UserProductDropdown.type";
import { axiosPrivate } from "../../services/apiService";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import React from "react";
import ProductCodeBuilder from "../../utilities/ProductCodeBuilder";
import { useProductCode } from "../../context/ProductContext";

dayjs.extend(customParseFormat);

const dateFormat = "DD/MM/YYYY";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

const UserProduct = () => {
  const [dropdownStates, setDropdownStates] = useState<IDropdownStates>({
    pgaIdentifier: true,
    productIdentifier: true,
    productConstituentElement: false,
    productOrigin: true,
    productTradeNames: false,
    productCharacteristics: true,
    entityData: true,
    entityAddress: true,
    pointOfContact: true,
    affirmationOfCompliance: false,
    remarks: false,
    productCondition: false,
    productPackaging: false,
    shippingContainerInformation: false,
    anticipatedArrivalInformation: true,
    additionalInformation: false,
    dataSubstitution: false,
  });
  const { concatenatedProductCode,closeProductCode } = useProductCode();
  const [currentStep, setCurrentStep] = useState(1);
  const today = dayjs();


  //pga Identifier
  const [selectedGvtAgencyProgramCode, setSelectedGvtAgencyProgramCode] = useState<string>("");
  const [governmentAgencyProcessingCodes, setGovernmentAgencyProcessingCodes] = useState<string[]>([]);
  const [selectedGvtAgencyProcessingCodes,setSelectedGvtAgencyProcessingCodes] = useState<string>("");
  const [intendedUseCodes, setIntendedUseCodes] = useState<string[]>([]);
  const [selectedIntendedUseCodes,setSelectedIntendedUseCodes] = useState<string>("");
  const [intendedUseDescription,setIntendedUseDescription] = useState<string>("");
  const [correctionIndicator,setCorrectionIndicator] = useState<string>("");
  const [disclaimer,setDisclaimer] = useState<string>("");
  const [governmentAgencyCode,setGovernmentAgencyCode] = useState<string>("FDP");

  //product identifier
  const [openProductCodeBuilder, setOpenProductCodeBuilder] = React.useState(false);
  const [itemType,setItemType] = useState<string>("P");
  const [productCodeQualifier,setProductCodeQualifiere] = useState<string>("FDP");

  //Product Origin
  const [selectedSourceTypeCodes, setSelectedSourceTypeCodes] =useState<string>("");
  const [sourceTypeCode, setSourceTypeCode] = useState<string[]>([]);
  const [countryCode, setCountryCode] = useState<string[]>([]);
  const [selectedCountryCode, setSelectedCountryCode] =useState<string>("");

//Product Characteristics
const [commodityDesc,setCommodityDesc] = useState<string>("");

//Entity Data
// const [commodityDesc,setCommodityDesc] = useState<string>("");

  const handleOpen = () => setOpenProductCodeBuilder(true);
  const handleClose = () => setOpenProductCodeBuilder(false);

  const toggleDropdown = (dropdownName: keyof IDropdownStates) => {
    setDropdownStates({
      ...dropdownStates,
      [dropdownName]: !dropdownStates[dropdownName],
    });
  };

  const nextButtonClick = () => {
    setCurrentStep(currentStep + 1);
  };

  useEffect(() => {
    if (selectedGvtAgencyProgramCode) {
      gvtAgencyProgramCodeApi(
        selectedGvtAgencyProgramCode,
        selectedGvtAgencyProcessingCodes
      );``
    }
  }, [selectedGvtAgencyProgramCode, selectedGvtAgencyProcessingCodes]);

  const handleProgramCodeChange = (e) => {
    setSelectedGvtAgencyProgramCode(e.target.value);
    setIntendedUseCodes([]);
    setSelectedGvtAgencyProcessingCodes("");
  };
  const GvtAgencyProcessingCodesChange = (e) => {
    setSelectedGvtAgencyProcessingCodes(e.target.value);
    setIntendedUseCodes([]);
  };
  const intendedUseCodeschange = (e) => {
    setSelectedIntendedUseCodes(e.target.value);
  };
  const sourceTypeCodechange = (e) => {
    setSelectedSourceTypeCodes(e.target.value);
  };
  const gvtAgencyProgramCodeApi = (
    selectedGvtAgencyProgramCode: string,
    selectedGvtAgencyProcessingCodes: string
  ) => {
    let requestParam;

if (
  selectedGvtAgencyProgramCode === "FOOD" ||
  selectedGvtAgencyProgramCode === "Non_PN" ||
  selectedGvtAgencyProgramCode === "Standalone_PN"
) {
  requestParam = "FOO";
} else {
  requestParam = selectedGvtAgencyProgramCode;
}

    axiosPrivate.get(`/pgaIdentifier/get-agency-program-code?governmentAgencyProgramCode=${requestParam}`)
      .then((res) => {
        const { programCodeData } = res.data;
        //For FOO code 
        switch (selectedGvtAgencyProgramCode) {
            case "Non_PN":
              setGovernmentAgencyProcessingCodes(
                programCodeData["Non-PN_Food"].governmentAgencyProcessingCodes
              );
              setIntendedUseCodes(programCodeData["Non-PN_Food"].intendedUseCodes);
              setSourceTypeCode(programCodeData["Non-PN_Food"].sourceTypeCode);
              break;
            case "FOOD":
              setGovernmentAgencyProcessingCodes(
                programCodeData.Food.governmentAgencyProcessingCodes
              );
              setIntendedUseCodes(programCodeData.Food.intendedUseCodes);
              setSourceTypeCode(programCodeData.Food.sourceTypeCode);
              break;
            case "Standalone_PN":
              setGovernmentAgencyProcessingCodes(
                programCodeData["Standalone-PN_Food"].governmentAgencyProcessingCodes
              );
              setIntendedUseCodes(programCodeData["Standalone-PN_Food"].intendedUseCodes);
              setSourceTypeCode(programCodeData["Standalone-PN_Food"].sourceTypeCode);
              break;
            default:
                setGovernmentAgencyProcessingCodes(programCodeData.governmentAgencyProcessingCodes);
          }

          //For normal and DRU code
        if (Array.isArray(programCodeData.intendedUseCodes)) {
          setIntendedUseCodes(programCodeData.intendedUseCodes);
          setSourceTypeCode(programCodeData.sourceTypeCode);
        } else if (
          selectedGvtAgencyProcessingCodes &&
          programCodeData.intendedUseCodes[selectedGvtAgencyProcessingCodes]
        ) {
          setIntendedUseCodes(
            programCodeData.intendedUseCodes[selectedGvtAgencyProcessingCodes]
          );
          setSourceTypeCode(programCodeData.sourceTypeCode);
        } else {
          setIntendedUseCodes([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
const countryCodeApi = ()=>{
  axiosPrivate.get(`/pgaIdentifier/get-all-country-codes`).then((response)=>{
    setCountryCode(response.data);
  }).catch((err) => {
    console.log(err);
  });
}
  return (
    <div className="userproduct">
      <div className="userproduct_container">
        <div className="userproduct_heading">
          <h2>
            Product &nbsp;
            <FaBoxOpen className="sidebar_icon" />
          </h2>
        </div>
        <div className="userproduct_container_section">
          {currentStep === 1 && (
            <div className="step1">
              <div className="dropdown_container">
                <div
                  className="dropdown_header"
                  onClick={() => toggleDropdown("pgaIdentifier")}
                >
                  <div className="dropdown_header_icon">
                    <BiSolidRightArrow className="dropdown_icon" />
                  </div>
                  <div className="dropdown_header_text">
                    <h3>PGA Identifier</h3>
                  </div>
                </div>
                {dropdownStates.pgaIdentifier && (
                  <div className="dropdown_items">
                    <div className="items">
                      <div className="input_field">
                        <label>Government Agency Code</label>
                        <input type="text" value={governmentAgencyCode} disabled />
                      </div>
                      <div className="select_dropdown">
                        <label>Government Agency Program Code</label>
                        <select
                          name="gvt_agency_program_code"
                          id="gvt_agency_program_code"
                          onChange={handleProgramCodeChange}
                          value={selectedGvtAgencyProgramCode}
                        >
                          <option value="" disabled selected>
                            Select an option
                          </option>
                          <option value="BIO">BIO</option>
                          <option value="COS">COS</option>
                          <option value="DRU">DRU</option>
                          <option value="Standalone_PN">Standalone PN - FOO</option>
                          <option value="FOOD">FOOD - FOO</option>
                          <option value="Non_PN">Non-PN - FOO</option>
                          <option value="DEV">DEV</option>
                          <option value="TOB">TOB</option>
                          <option value="RAD">RAD</option>
                          <option value="VME">VME</option>
                        </select>
                      </div>
                      <div className="select_dropdown">
                        <label>Government Agency Processing Code</label>
                        <select
                          name="governmentAgencyProcessingCodes"
                          id="governmentAgencyProcessingCodes"
                          onChange={GvtAgencyProcessingCodesChange}
                          value={selectedGvtAgencyProcessingCodes}
                        >
                          <option value="" selected>
                            Select an option
                          </option>
                          {governmentAgencyProcessingCodes.map(
                            (code, index) => (
                              <option key={index} value={code}>
                                {code}
                              </option>
                            )
                          )}
                        </select>
                      </div>
                      <div className="select_dropdown">
                        <label>Intended Use Code</label>
                        <select name="intendedUseCodes" id="intendedUseCodes" onChange={intendedUseCodeschange} value={selectedIntendedUseCodes}>
                          <option value="" selected>
                            Select an option
                          </option>
                          {intendedUseCodes.map((code, index) => (
                            <option key={index} value={code}>
                              {code}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="input_field">
                        <label>Intended Use Description</label>
                        <input type="text" value={intendedUseDescription} onChange={(e)=>setIntendedUseDescription(e.target.value)}/>
                      </div>
                      <div className="input_field">
                        <label>Correction Indicator</label>
                        <input type="text" value={correctionIndicator} onChange={(e)=>setCorrectionIndicator(e.target.value)}/>
                      </div>
                      <div className="select_dropdown">
                        <label>Disclaimer</label>
                        <select name="disclaimer" id="disclaimer" value={disclaimer} onChange={(e)=>setDisclaimer(e.target.value)}>
                          <option value="" selected>
                            Select an option
                          </option>
                          <option value="A">A</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="dropdown_container">
                <div
                  className="dropdown_header"
                  onClick={() => toggleDropdown("productIdentifier")}
                >
                  <div className="dropdown_header_icon">
                    <BiSolidRightArrow className="dropdown_icon" />
                  </div>
                  <div className="dropdown_header_text">
                    <h3>Product Identifier</h3>
                  </div>
                </div>
                {dropdownStates.productIdentifier && (
                  <div className="dropdown_items">
                    <div className="items">
                      <div className="input_field">
                        <label>Item type</label>
                        <input type="text" value={itemType} disabled />
                      </div>
                      <div className="input_field">
                        <label>Product Code Qualifier</label>
                        <input type="text" value={productCodeQualifier} disabled />
                      </div>
                      <div className="input_field">
                        <label>Product Code Number</label>
                        <input type="text" value={concatenatedProductCode} onClick={handleOpen} readOnly/>
                        <Modal
                            open={openProductCodeBuilder}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description">
                            <Box sx={style}>
                              <ProductCodeBuilder/>
                            </Box>
                        </Modal>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="dropdown_container">
                <div
                  className="dropdown_header"
                  onClick={() => toggleDropdown("productConstituentElement")}
                >
                  <div className="dropdown_header_icon">
                    <BiSolidRightArrow className="dropdown_icon" />
                  </div>
                  <div className="dropdown_header_text">
                    <h3>Product Constituent Element</h3>
                  </div>
                </div>
                {dropdownStates.productConstituentElement && (
                  <div className="dropdown_items">
                    <div className="items">
                      <div className="select_dropdown">
                        <label>Constituent Active Ingredient Qualifier</label>
                        <select name="cars" id="cars">
                          <option value="volvo">Volvo</option>
                          <option value="saab">Saab</option>
                          <option value="mercedes">Mercedes</option>
                          <option value="audi">Audi</option>
                        </select>
                      </div>
                      <div className="input_field">
                        <label>Name of the Constituent Element</label>
                        <input type="text" />
                      </div>
                      <div className="input_field">
                        <label>Quantity of Constituent Element</label>
                        <input type="text" />
                      </div>
                      <div className="input_field">
                        <label>Unit of Measure</label>
                        <input type="text" />
                      </div>
                      <div className="input_field">
                        <label>Percent of Constituent Element</label>
                        <input type="text" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="dropdown_container">
                <div
                  className="dropdown_header"
                  onClick={() => toggleDropdown("productOrigin")}
                >
                  <div className="dropdown_header_icon">
                    <BiSolidRightArrow className="dropdown_icon" />
                  </div>
                  <div className="dropdown_header_text">
                    <h3>Product Origin</h3>
                  </div>
                </div>
                {dropdownStates.productOrigin && (
                  <div className="dropdown_items">
                    <div className="items">
                      <div className="select_dropdown">
                        <label>Source Type Code</label>
                        <select name="cars" id="cars" onChange={sourceTypeCodechange}
                          value={selectedSourceTypeCodes}>
                            <option value="" selected>select the option</option>
                          {sourceTypeCode.map((code, index) => (
                            <option key={index} value={code}>
                              {code}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="select_dropdown">
                        <label>Country Code</label>
                        <select name="cars" id="cars" onClick={countryCodeApi} value={selectedCountryCode} onChange={(e)=>setSelectedCountryCode(e.target.value)}>
                        <option value="" selected>select the option</option>
                        {countryCode.map((code, index) => (
                            <option key={index} value={code}>
                              {code}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="dropdown_container">
                <div
                  className="dropdown_header"
                  onClick={() => toggleDropdown("productTradeNames")}
                >
                  <div className="dropdown_header_icon">
                    <BiSolidRightArrow className="dropdown_icon" />
                  </div>
                  <div className="dropdown_header_text">
                    <h3>Product Trade Names</h3>
                  </div>
                </div>
                {dropdownStates.productTradeNames && (
                  <div className="dropdown_items">
                    <div className="items">
                      <div className="input_field">
                        <label>Trade Name/Brand Name</label>
                        <input type="text" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="next_button">
                <button onClick={nextButtonClick}>NEXT</button>
              </div>
            </div>
          )}
          {currentStep === 2 && (
            <div className="step2">
              <div className="dropdown_container">
                <div
                  className="dropdown_header"
                  onClick={() => toggleDropdown("productCharacteristics")}
                >
                  <div className="dropdown_header_icon">
                    <BiSolidRightArrow className="dropdown_icon" />
                  </div>
                  <div className="dropdown_header_text">
                    <h3>Product Characteristics</h3>
                  </div>
                </div>
                {dropdownStates.productCharacteristics && (
                  <div className="dropdown_items">
                    <div className="items">
                      <div className="input_field">
                        <label>Commodity Characteristic Description</label>
                        <input type="text" value={commodityDesc} onChange={(e)=>setCommodityDesc(e.target.value)}/>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="dropdown_container">
                <div
                  className="dropdown_header"
                  onClick={() => toggleDropdown("entityData")}
                >
                  <div className="dropdown_header_icon">
                    <BiSolidRightArrow className="dropdown_icon" />
                  </div>
                  <div className="dropdown_header_text">
                    <h3>Entity Data</h3>
                  </div>
                </div>
                {dropdownStates.entityData && (
                  <div className="dropdown_items">
                    <div className="items">
                      <div className="select_dropdown">
                        <label>Entity Role Code</label>
                        <select name="cars" id="cars">
                          <option value="volvo">Volvo</option>
                          <option value="saab">Saab</option>
                          <option value="mercedes">Mercedes</option>
                          <option value="audi">Audi</option>
                        </select>
                      </div>
                      <div className="input_field">
                        <label>Entity Identification Code</label>
                        <select name="entityIdentificationCode" id="entityIdentificationCode">
                          <option value="" selected>Select an option</option>
                          <option value="16">16</option>
                          <option value="47">47</option>
                        </select>
                      </div>
                      <div className="input_field">
                        <label>Entity Number</label>
                        <input type="tel"/>
                      </div>
                      <div className="input_field">
                        <label>Entity Name</label>
                        <input type="text" />
                      </div>
                      <div className="input_field">
                        <label>Entity Address 1</label>
                        <input type="text" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="dropdown_container">
                <div
                  className="dropdown_header"
                  onClick={() => toggleDropdown("entityAddress")}
                >
                  <div className="dropdown_header_icon">
                    <BiSolidRightArrow className="dropdown_icon" />
                  </div>
                  <div className="dropdown_header_text">
                    <h3>Entity Address</h3>
                  </div>
                </div>
                {dropdownStates.entityAddress && (
                  <div className="dropdown_items">
                    <div className="items">
                      <div className="input_field">
                        <label>Entity Address 2</label>
                        <input type="text" />
                      </div>
                      <div className="input_field">
                        <label>Entity Apartment Number</label>
                        <input type="text" />
                      </div>
                      <div className="input_field">
                        <label>Entity City</label>
                        <input type="text" />
                      </div>
                      <div className="select_dropdown">
                        <label>Entity State</label>
                        <select name="cars" id="cars">
                          <option value="volvo">Volvo</option>
                          <option value="saab">Saab</option>
                          <option value="mercedes">Mercedes</option>
                          <option value="audi">Audi</option>
                        </select>
                      </div>
                      <div className="select_dropdown">
                        <label>Entity Country</label>
                        <select name="cars" id="cars">
                          <option value="volvo">Volvo</option>
                          <option value="saab">Saab</option>
                          <option value="mercedes">Mercedes</option>
                          <option value="audi">Audi</option>
                        </select>
                      </div>
                      <div className="input_field">
                        <label>Entity Zip</label>
                        <input type="text" />
                      </div>
                      <div className="input_field">
                        <label>Filler</label>
                        <input type="text" disabled/>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="dropdown_container">
                <div
                  className="dropdown_header"
                  onClick={() => toggleDropdown("pointOfContact")}
                >
                  <div className="dropdown_header_icon">
                    <BiSolidRightArrow className="dropdown_icon" />
                  </div>
                  <div className="dropdown_header_text">
                    <h3>Point of Contact</h3>
                  </div>
                </div>
                {dropdownStates.pointOfContact && (
                  <div className="dropdown_items">
                    <div className="items">
                      <div className="select_dropdown">
                        <label>Individual Qualifier</label>
                        <select name="cars" id="cars">
                          <option value="volvo">Volvo</option>
                          <option value="saab">Saab</option>
                          <option value="mercedes">Mercedes</option>
                          <option value="audi">Audi</option>
                        </select>
                      </div>
                      <div className="input_field">
                        <label>Individual Name</label>
                        <input type="text" />
                      </div>
                      <div className="input_field">
                        <label>Telephone Number</label>
                        <input type="text" />
                      </div>
                      <div className="input_field">
                        <label>Email</label>
                        <input type="text" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="next_button">
                <button onClick={nextButtonClick}>NEXT</button>
              </div>
            </div>
          )}
          {currentStep === 3 && (
            <div className="step3">
              <div className="dropdown_container">
                <div
                  className="dropdown_header"
                  onClick={() => toggleDropdown("affirmationOfCompliance")}
                >
                  <div className="dropdown_header_icon">
                    <BiSolidRightArrow className="dropdown_icon" />
                  </div>
                  <div className="dropdown_header_text">
                    <h3>Affirmation of Compliance</h3>
                  </div>
                </div>
                {dropdownStates.affirmationOfCompliance && (
                  <div className="dropdown_items">
                    <div className="items">
                      <div className="select_dropdown">
                        <label>Affirmation of Compliance Code</label>
                        <select name="cars" id="cars">
                          <option value="volvo">Volvo</option>
                          <option value="saab">Saab</option>
                          <option value="mercedes">Mercedes</option>
                          <option value="audi">Audi</option>
                        </select>
                      </div>
                      <div className="input_field">
                        <label>Affirmation of Compliance Qualifier</label>
                        <input type="text" />
                      </div>
                      <div className="input_field">
                        <label>Filler</label>
                        <input type="text" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="dropdown_container">
                <div
                  className="dropdown_header"
                  onClick={() => toggleDropdown("remarks")}
                >
                  <div className="dropdown_header_icon">
                    <BiSolidRightArrow className="dropdown_icon" />
                  </div>
                  <div className="dropdown_header_text">
                    <h3>Remarks</h3>
                  </div>
                </div>
                {dropdownStates.remarks && (
                  <div className="dropdown_items">
                    <div className="items">
                      <div className="input_field">
                        <label>Remarks Type Code</label>
                        <input type="text" />
                      </div>
                      <div className="input_field">
                        <label>Remarks Text</label>
                        <input type="text" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="dropdown_container">
                <div
                  className="dropdown_header"
                  onClick={() => toggleDropdown("productCondition")}
                >
                  <div className="dropdown_header_icon">
                    <BiSolidRightArrow className="dropdown_icon" />
                  </div>
                  <div className="dropdown_header_text">
                    <h3>Product Condition</h3>
                  </div>
                </div>
                {dropdownStates.productCondition && (
                  <div className="dropdown_items">
                    <div className="items">
                      <div className="select_dropdown">
                        <label>Temperature Qualifier</label>
                        <select name="cars" id="cars">
                          <option value="volvo">Volvo</option>
                          <option value="saab">Saab</option>
                          <option value="mercedes">Mercedes</option>
                          <option value="audi">Audi</option>
                        </select>
                      </div>
                      <div className="input_field">
                        <label>Lot Number Qualifier</label>
                        <input type="text" />
                      </div>
                      <div className="input_field">
                        <label>Lot Number</label>
                        <input type="text" />
                      </div>
                      <div className="input_field">
                        <label>PGA Line Value</label>
                        <input type="text" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="dropdown_container">
                <div
                  className="dropdown_header"
                  onClick={() => toggleDropdown("productPackaging")}
                >
                  <div className="dropdown_header_icon">
                    <BiSolidRightArrow className="dropdown_icon" />
                  </div>
                  <div className="dropdown_header_text">
                    <h3>Product Packaging</h3>
                  </div>
                </div>
                {dropdownStates.productPackaging && (
                  <div className="dropdown_items">
                    <div className="items">
                      <div className="select_dropdown">
                        <label>Packaging Qualifier</label>
                        <select name="cars" id="cars">
                          <option value="volvo">Volvo</option>
                          <option value="saab">Saab</option>
                          <option value="mercedes">Mercedes</option>
                          <option value="audi">Audi</option>
                        </select>
                      </div>
                      <div className="input_field">
                        <label>Quantity</label>
                        <input type="text" />
                      </div>
                      <div className="select_dropdown">
                        <label>Unit of Measure (Packaging Level)</label>
                        <select name="cars" id="cars">
                          <option value="volvo">Volvo</option>
                          <option value="saab">Saab</option>
                          <option value="mercedes">Mercedes</option>
                          <option value="audi">Audi</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="next_button">
                <button onClick={nextButtonClick}>NEXT</button>
              </div>
            </div>
          )}
          {currentStep === 4 && (
            <div className="step4">
              <div className="dropdown_container">
                <div
                  className="dropdown_header"
                  onClick={() => toggleDropdown("shippingContainerInformation")}
                >
                  <div className="dropdown_header_icon">
                    <BiSolidRightArrow className="dropdown_icon" />
                  </div>
                  <div className="dropdown_header_text">
                    <h3>Shipping Container Information</h3>
                  </div>
                </div>
                {dropdownStates.shippingContainerInformation && (
                  <div className="dropdown_items">
                    <div className="items">
                      <div className="input_field">
                        <label>Container-1 No.</label>
                        <input type="text" />
                      </div>
                      <div className="input_field">
                        <label>Container-2 No.</label>
                        <input type="text" />
                      </div>
                      <div className="input_field">
                        <label>Container-3 No.</label>
                        <input type="text" />
                      </div>
                      <div className="input_field">
                        <label>Filler</label>
                        <input type="text" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="dropdown_container">
                <div
                  className="dropdown_header"
                  onClick={() =>
                    toggleDropdown("anticipatedArrivalInformation")
                  }
                >
                  <div className="dropdown_header_icon">
                    <BiSolidRightArrow className="dropdown_icon" />
                  </div>
                  <div className="dropdown_header_text">
                    <h3>Anticipated Arrival Information</h3>
                  </div>
                </div>
                {dropdownStates.anticipatedArrivalInformation && (
                  <div className="dropdown_items">
                    <div className="items">
                      <div className="input_field">
                        <label>Anticipated Arrival Information</label>
                        <input type="text" />
                      </div>
                      <div className="created_date">
                        <label>Anticipated Arrival Date at Port Entry</label>
                        <DatePicker defaultValue={today} format={dateFormat} />
                      </div>
                      <div className="created_date">
                        <label>Anticipated Arrival Time at Port Entry</label>
                        <TimePicker
                          format="HH:mm"
                          onChange={(value) => console.log(value)}
                        />{" "}
                      </div>
                      <div className="input_field">
                        <label>Arrival Location Code</label>
                        <input type="text" />
                      </div>
                      <div className="select_dropdown">
                        <label> Arrival Location</label>
                        <select name="cars" id="cars">
                          <option value="volvo">Volvo</option>
                          <option value="saab">Saab</option>
                          <option value="mercedes">Mercedes</option>
                          <option value="audi">Audi</option>
                        </select>
                      </div>
                      <div className="input_field">
                        <label>Filler</label>
                        <input type="text" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="next_button">
                <button onClick={nextButtonClick}>NEXT</button>
              </div>
            </div>
          )}
          {currentStep === 5 && (
            <div className="step5">
              <div className="dropdown_container">
                <div
                  className="dropdown_header"
                  onClick={() => toggleDropdown("affirmationOfCompliance")}
                >
                  <div className="dropdown_header_icon">
                    <BiSolidRightArrow className="dropdown_icon" />
                  </div>
                  <div className="dropdown_header_text">
                    <h3>Additional Information</h3>
                  </div>
                </div>
                {dropdownStates.affirmationOfCompliance && (
                  <div className="dropdown_items">
                    <div className="items">
                      <div className="select_dropdown">
                        <label>Additional information qualifier code</label>
                        <select name="cars" id="cars">
                          <option value="volvo">Volvo</option>
                          <option value="saab">Saab</option>
                          <option value="mercedes">Mercedes</option>
                          <option value="audi">Audi</option>
                        </select>
                      </div>
                      <div className="input_field">
                        <label>Additional Information</label>
                        <input type="text" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="dropdown_container">
                <div
                  className="dropdown_header"
                  onClick={() => toggleDropdown("dataSubstitution")}
                >
                  <div className="dropdown_header_icon">
                    <BiSolidRightArrow className="dropdown_icon" />
                  </div>
                  <div className="dropdown_header_text">
                    <h3>Data Substitution</h3>
                  </div>
                </div>
                {dropdownStates.dataSubstitution && (
                  <div className="dropdown_items">
                    <div className="items">
                      <div className="select_dropdown">
                        <label>Substitution Indicator</label>
                        <select name="cars" id="cars">
                          <option value="volvo">Volvo</option>
                          <option value="saab">Saab</option>
                          <option value="mercedes">Mercedes</option>
                          <option value="audi">Audi</option>
                        </select>
                      </div>
                      <div className="input_field">
                        <label>Substitution Number</label>
                        <input type="text" />
                      </div>
                      <div className="input_field">
                        <label>Filler</label>
                        <input type="text" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="next_button">
                <button>SUBMIT</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default UserProduct;