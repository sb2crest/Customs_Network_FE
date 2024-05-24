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
import InputField from "../../utilities/InputField";
import SelectField from "../../utilities/SelectField";

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
    licensePlateIssuer: false,
    licensePlateNumber: false,
    entityData: true,
    entityAddress: true,
    pointOfContact: true,
    affirmationOfCompliance: false,
    remarks: false,
    productCondition: false,
    productPackaging: false,
    shippingContainerInformation: false,
    expressCourierTrackingNumber: false,
    expressCourierTrackingContainerDimensions: false,
    containerDimensionsForAFnLACF: false,
    anticipatedArrivalInformation: true,
    additionalInformation: false,
    dataSubstitution: false,
  });
  const { concatenatedProductCode } = useProductCode();
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
  const [governmentAgencyCode,setGovernmentAgencyCode] = useState<string>("FDA");

  //product identifier
  const [openProductCodeBuilder, setOpenProductCodeBuilder] = React.useState(false);
  const [itemType,setItemType] = useState<string>("P");
  const [productCodeQualifier,setProductCodeQualifier] = useState<string>("FDP");

  //Product Constituent Element
  const [constituentActiveIngredientQualifier,setConstituentActiveIngredientQualifier] = useState<string>("");
  const [constituentElementName,setConstituentElementName] = useState<string>("");
  const [constituentElementQuantity,setConstituentElementQuantity] = useState<string>("");
  const [constituentElementUnitOfMeasure,setConstituentElementUnitOfMeasure] = useState<string>("");
  const [percentOfConstituentElement,setPercentOfConstituentElement] = useState<string>("");

  //Product Origin
  const [selectedSourceTypeCodes, setSelectedSourceTypeCodes] =useState<string>("");
  const [sourceTypeCode, setSourceTypeCode] = useState<string[]>([]);
  const [countryCode, setCountryCode] = useState<string[]>([]);
  const [selectedCountryCode, setSelectedCountryCode] =useState<string>("");

  //Product Trade Names
  const [tradeOrBrandName, setTradeOrBrandName] =useState<string>("");

  //Product Characteristics
  const [commodityDesc,setCommodityDesc] = useState<string>("");

  //License Plate Issuer
  const [issuerOfLPCO,setIssuerOfLPCO] = useState<string>("");
  const [governmentGeographicCodeQualifier,setGovernmentGeographicCodeQualifier] = useState<string>("");
  const [locationOfIssuerOfTheLPCO,setLocationOfIssuerOfTheLPCO] = useState<string>("");
  const [issuingAgencyLocation,setIssuingAgencyLocation] = useState<string>("");
  
  //License Plate Number //PN Confirmation Number
  const [transactionType,setTransactionType] = useState<string>("");
  const [lpcoOrCodeType,setLpcoOrCodeType] = useState<string>("");
  const [lpcoOrPncNumber,setLpcoOrPncNumber] = useState<string>("");

  //Entity Data
  const [partyIdentifierType,setPartyIdentifierType] = useState<string>("");
  const [partyIdentifierNumber,setPartyIdentifierNumber] = useState<number|null>(null);
  const [partyName,setPartyName] = useState<string>("");
  const [address1,setAddress1] = useState<string>("");
  const [partyType,setPartyType] = useState<string>("");
  const [roleCodeData,setRoleCodeData] = useState<string[]>([]);
  
  //Entity Address
  const [address2,setAddress2] = useState<string>("");
  const [apartmentOrSuiteNo,setApartmentOrSuiteNo] = useState<string>("");
  const [city,setCity] = useState<string>("");
  const [country,setCountry] = useState<string>("");
  const [stateCodeData,setStateCodeData] = useState<string[]>([]);
  const [stateOrProvince,setStateOrProvince] = useState<string>("");
  const [postalCode,setPostalCode] = useState<string>("");

  //Point of Contact
  const [contactPerson,setContactPerson] = useState<string>("");
  const [telephoneNumber,setTelephoneNumber] = useState<string>("");
  const [email,setEmail] = useState<string>("");
  const [individualQualifier,setIndividualQualifier] = useState<string>("");

  //Affirmation of Compliance
  const [affirmationComplianceCode,setAffirmationComplianceCode] = useState<string>("");
  const [affirmationComplianceQualifier,setAffirmationComplianceQualifier] = useState<string>("");
  
  //Remarks
  const [remarksTypeCode,setRemarksTypeCode] = useState<string>("");
  const [remarksText,setRemarksText] = useState<string>("");

  //Product Condition
  const [lotNumberQualifier,setLotNumberQualifier] = useState<string>("");
  const [lotNumber,setLotNumber] = useState<string>("");
  const [pgaLineValue,setPgaLineValue] = useState<string>("");
  const [temperatureQualifier,setTemperatureQualifier] = useState<string>("");

  //Product Packaging
  const [packagingQualifier,setPackagingQualifier] = useState<string>("");
  const [quantity,setQuantity] = useState<string>("");
  const [uom,setUom] = useState<string>("");


  //Shipping Container Information
  const [containerNumberOne,setContainerNumberOne] = useState<string>("");
  const [containerNumberTwo,setContainerNumberTwo] = useState<string>("");
  const [containerNumberThree,setContainerNumberThree] = useState<string>("");

  //Express Courier Tracking Number
  const [packageTrackingNumber,setPackageTrackingNumber] = useState<string>("");
  const [packageTrackingNumberCode,setPackageTrackingNumberCode] = useState<string>("");

  //Express Courier Tracking and Container Dimensions – AF and LACF
  const [containerDimensionsOne,setContainerDimensionsOne] = useState<string>("");
  const [containerDimensionsTwo,setContainerDimensionsTwo] = useState<string>("");
  const [containerDimensionsThree,setContainerDimensionsThreee] = useState<string>("");

  //Anticipated Arrival Information
  const [anticipatedArrivalInformation,setAnticipatedArrivalInformation] = useState<string>("");
  const [anticipatedArrivalLocationCode,setAnticipatedArrivalLocationCode] = useState<string>("");
  const [arrivalLocation,setArrivalLocation] = useState<string>("");
  const [additionalInformationQualifierCode,setAdditionalInformationQualifierCode] = useState<string>("");
  const [additionalInformation,setAdditionalInformation] = useState<string>("");

  //Data Substitution
  const [substitutionIndicator,setSubstitutionIndicator] = useState<string>("");
  const [substitutionNumber,setSubstitutionNumber] = useState<string>("");

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

  const handleProgramCodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGvtAgencyProgramCode(e.target.value);
    setIntendedUseCodes([]);
    setSelectedGvtAgencyProcessingCodes("");
  };
  const GvtAgencyProcessingCodesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGvtAgencyProcessingCodes(e.target.value);
    setIntendedUseCodes([]);
  };
  const intendedUseCodeschange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedIntendedUseCodes(e.target.value);
  };
  const sourceTypeCodechange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSourceTypeCodes(e.target.value);
  };
  const handlePartyIdentifierNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numericValue = value === '' ? null : Number(value);
    setPartyIdentifierNumber(numericValue);
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
              setRoleCodeData(programCodeData["Non-PN_Food"].entityRoleCode);
              break;
            case "FOOD":
              setGovernmentAgencyProcessingCodes(
                programCodeData.Food.governmentAgencyProcessingCodes
              );
              setIntendedUseCodes(programCodeData.Food.intendedUseCodes);
              setSourceTypeCode(programCodeData.Food.sourceTypeCode);
              setRoleCodeData(programCodeData.Food.entityRoleCode);
              break;
            case "Standalone_PN":
              setGovernmentAgencyProcessingCodes(
                programCodeData["Standalone-PN_Food"].governmentAgencyProcessingCodes
              );
              setIntendedUseCodes(programCodeData["Standalone-PN_Food"].intendedUseCodes);
              setSourceTypeCode(programCodeData["Standalone-PN_Food"].sourceTypeCode);
              setRoleCodeData(programCodeData["Standalone-PN_Food"].entityRoleCode);
              break;
            default:
                setGovernmentAgencyProcessingCodes(programCodeData.governmentAgencyProcessingCodes);
          }

          //For normal and DRU code
        if (Array.isArray(programCodeData.intendedUseCodes)) {
          setIntendedUseCodes(programCodeData.intendedUseCodes);
          setSourceTypeCode(programCodeData.sourceTypeCode);
          setRoleCodeData(programCodeData.entityRoleCode);
        } else if (
          selectedGvtAgencyProcessingCodes &&
          programCodeData.intendedUseCodes[selectedGvtAgencyProcessingCodes]
        ) {
          setIntendedUseCodes(
            programCodeData.intendedUseCodes[selectedGvtAgencyProcessingCodes]
          );
          setSourceTypeCode(programCodeData.sourceTypeCode);
          setRoleCodeData(programCodeData.entityRoleCode);
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
const stateCodeApi = ()=>{
  axiosPrivate.get(`/pgaIdentifier/get-state-codes?countryCode=${country}`).then((response)=>{
    setStateCodeData(response.data.stateCodes);
  }).catch((err) => {
    console.log(err);
  });
};
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
                    <BiSolidRightArrow className={`dropdown_icon ${dropdownStates.pgaIdentifier ? "rotate" : ""}`}/>
                  </div>
                  <div className="dropdown_header_text">
                    <h3>PGA Identifier</h3>
                  </div>
                </div>
                {dropdownStates.pgaIdentifier && (
                  <div className="dropdown_items">
                    <div className="items">
                      <InputField type="text" label="Government Agency Code" value={governmentAgencyCode} disabled/>
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
                      <SelectField
                         label="Government Agency Processing Code"
                         name="governmentAgencyProcessingCodes"
                         id="governmentAgencyProcessingCodes"
                         onChange={GvtAgencyProcessingCodesChange}
                         value={selectedGvtAgencyProcessingCodes}
                         options={governmentAgencyProcessingCodes}
                       />
                      <SelectField
                         label="Intended Use Code"
                         name="intendedUseCodes"
                         id="intendedUseCodes"
                         onChange={intendedUseCodeschange}
                         value={selectedIntendedUseCodes}
                         options={intendedUseCodes}
                       />
                      <InputField type="text" label="Intended Use Description" value={intendedUseDescription} onChange={(e)=>setIntendedUseDescription(e.target.value)}/>
                      <InputField type="text" label="Correction Indicator" value={correctionIndicator} onChange={(e)=>setCorrectionIndicator(e.target.value)}/>
                      <SelectField
                         label="Disclaimer"
                         name="disclaimer"
                         id="disclaimer"
                         onChange={(e)=>setDisclaimer(e.target.value)}
                         value={disclaimer}
                         options={["A"]}
                       />
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
                    <BiSolidRightArrow className={`dropdown_icon ${dropdownStates.productIdentifier ? "rotate" : ""}`} />
                  </div>
                  <div className="dropdown_header_text">
                    <h3>Product Identifier</h3>
                  </div>
                </div>
                {dropdownStates.productIdentifier && (
                  <div className="dropdown_items">
                    <div className="items">
                      <InputField type="text" label="Item type" value={itemType} disabled/>
                      <InputField type="text" label="Product Code Qualifier" value={productCodeQualifier} disabled/>
                      <InputField type="text" label="Product Code Number" value={concatenatedProductCode} readOnly onClick={handleOpen}/>
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
                )}
              </div>
              {(selectedGvtAgencyProgramCode === "BIO" || selectedGvtAgencyProgramCode === "DRU" || selectedGvtAgencyProgramCode === "VME") && (
              <div className="dropdown_container">
                <div
                  className="dropdown_header"
                  onClick={() => toggleDropdown("productConstituentElement")}
                >
                  <div className="dropdown_header_icon">
                    <BiSolidRightArrow className={`dropdown_icon ${dropdownStates.productConstituentElement ? "rotate" : ""}`} />
                  </div>
                  <div className="dropdown_header_text">
                    <h3>Product Constituent Element</h3>
                  </div>
                </div>
                {dropdownStates.productConstituentElement && (
                  <div className="dropdown_items">
                    <div className="items">
                      <SelectField
                         label="Constituent Active Ingredient Qualifier"
                         name="constituentActiveIngredientQualifier"
                         id="constituentActiveIngredientQualifier"
                         onChange={(e)=>setConstituentActiveIngredientQualifier(e.target.value)}
                         value={constituentActiveIngredientQualifier}
                         options={["A","B","C","D","E","F","G","H","I"]}
                       />
                      <InputField type="text" label="Name of the Constituent Element" value={constituentElementName} onChange={(e)=>setConstituentElementName(e.target.value)}/>
                      <InputField type="text" label="Quantity of Constituent Element" value={constituentElementQuantity} onChange={(e)=>setConstituentElementQuantity(e.target.value)}/>
                      <InputField type="text" label="Unit of Measure" value={constituentElementUnitOfMeasure} onChange={(e)=>setConstituentElementUnitOfMeasure(e.target.value)}/>
                      <InputField type="text" label="Percent of Constituent Element" value={percentOfConstituentElement} onChange={(e)=>setPercentOfConstituentElement(e.target.value)}/>
                    </div>
                  </div>
                )}
              </div>
                )}
              <div className="dropdown_container">
                <div
                  className="dropdown_header"
                  onClick={() => toggleDropdown("productOrigin")}
                >
                  <div className="dropdown_header_icon">
                    <BiSolidRightArrow className={`dropdown_icon ${dropdownStates.productOrigin ? "rotate" : ""}`} />
                  </div>
                  <div className="dropdown_header_text">
                    <h3>Product Origin</h3>
                  </div>
                </div>
                {dropdownStates.productOrigin && (
                  <div className="dropdown_items">
                    <div className="items">
                      <SelectField
                         label="Source Type Code"
                         name="sourceTypeCode"
                         id="sourceTypeCode"
                         onChange={sourceTypeCodechange}
                         value={selectedSourceTypeCodes}
                         options={sourceTypeCode}
                       />
                      <SelectField
                         label="Country Code"
                         name="countryCode"
                         id="countryCode"
                         onClick={countryCodeApi}
                         onChange={(e)=>setSelectedCountryCode(e.target.value)}
                         value={selectedCountryCode}
                         options={countryCode}
                       />
                    </div>
                  </div>
                )}
              </div>
              {selectedGvtAgencyProgramCode !== "Standalone_PN" &&(
              <div className="dropdown_container">
                <div
                  className="dropdown_header"
                  onClick={() => toggleDropdown("productTradeNames")}
                >
                  <div className="dropdown_header_icon">
                    <BiSolidRightArrow className={`dropdown_icon ${dropdownStates.productTradeNames ? "rotate" : ""}`} />
                  </div>
                  <div className="dropdown_header_text">
                    <h3>Product Trade Names</h3>
                  </div>
                </div>
                {dropdownStates.productTradeNames && (
                  <div className="dropdown_items">
                    <div className="items">
                      <InputField type="text" label="Trade Name/Brand Name" value={tradeOrBrandName} onChange={(e)=>setTradeOrBrandName(e.target.value)}/>
                    </div>
                  </div>
                )}
              </div>
              )}
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
                    <BiSolidRightArrow className={`dropdown_icon ${dropdownStates.productCharacteristics ? "rotate" : ""}`} />
                  </div>
                  <div className="dropdown_header_text">
                    <h3>Product Characteristics</h3>
                  </div>
                </div>
                {dropdownStates.productCharacteristics && (
                  <div className="dropdown_items">
                    <div className="items">
                      <InputField type="text" label="Commodity Characteristic Description"  value={commodityDesc} onChange={(e)=>setCommodityDesc(e.target.value)}/>
                    </div>
                  </div>
                )}
              </div>
              {(selectedGvtAgencyProgramCode === "Standalone_PN" || selectedGvtAgencyProgramCode === "FOOD") && (
                <>
              <div className="dropdown_container">
                <div
                  className="dropdown_header"
                  onClick={() => toggleDropdown("licensePlateIssuer")}
                >
                  <div className="dropdown_header_icon">
                    <BiSolidRightArrow className={`dropdown_icon ${dropdownStates.licensePlateIssuer ? "rotate" : ""}`} />
                  </div>
                  <div className="dropdown_header_text">
                    <h3>License Plate Issuer</h3>
                  </div>
                </div>
                {dropdownStates.licensePlateIssuer && (
                  <div className="dropdown_items">
                    <div className="items">
                     <InputField type="text" label="Issuer of LPCO" value={issuerOfLPCO} onChange={(e)=>setIssuerOfLPCO(e.target.value)}/>
                     <InputField type="text" label="LPCO Issuer - Government Geographic Code Qualifier" value={governmentGeographicCodeQualifier} onChange={(e)=>setGovernmentGeographicCodeQualifier(e.target.value)}/>
                     <InputField type="text" label="Location (Country/State/Provi nce) of Issuer of the LPCO" value={locationOfIssuerOfTheLPCO} onChange={(e)=>setLocationOfIssuerOfTheLPCO(e.target.value)}/>
                     <InputField type="text" label="Regional description of location of Agency Issuing the LPCO" value={issuingAgencyLocation} onChange={(e)=>setIssuingAgencyLocation(e.target.value)}/>
                     <InputField type="text" label="Filler" disabled value={" "}/>
                    </div>
                  </div>
                )}
              </div>
              <div className="dropdown_container">
                <div
                  className="dropdown_header"
                  onClick={() => toggleDropdown("licensePlateNumber")}
                >
                  <div className="dropdown_header_icon">
                    <BiSolidRightArrow className={`dropdown_icon ${dropdownStates.licensePlateNumber ? "rotate" : ""}`} />
                  </div>
                  <div className="dropdown_header_text">
                    <h3>License Plate Number</h3>
                  </div>
                </div>
                {dropdownStates.licensePlateNumber && (
                  <div className="dropdown_items">
                    <div className="items">
                     <InputField type="text" label="LPCO Transaction Type" value={transactionType} onChange={(e)=>setTransactionType(e.target.value)}/>
                     <InputField type="text" label="LPCO Type" value={lpcoOrCodeType} onChange={(e)=>setLpcoOrCodeType(e.target.value)}/>
                     <InputField type="text" label="LPCO Number (or Name)" value={lpcoOrPncNumber} onChange={(e)=>setLpcoOrPncNumber(e.target.value)}/>
                    </div>
                  </div>
                )}
              </div>
              </>
              )}
               {selectedGvtAgencyProgramCode === "Non_PN"&& (
              <div className="dropdown_container">
                <div
                  className="dropdown_header"
                  onClick={() => toggleDropdown("licensePlateNumber")}
                >
                  <div className="dropdown_header_icon">
                    <BiSolidRightArrow className={`dropdown_icon ${dropdownStates.licensePlateNumber ? "rotate" : ""}`} />
                  </div>
                  <div className="dropdown_header_text">
                    <h3>PN Confirmation Number</h3>
                  </div>
                </div>
                {dropdownStates.licensePlateNumber && (
                  <div className="dropdown_items">
                    <div className="items">
                    <InputField type="text" label="LPCO Transaction Type" value={transactionType} onChange={(e)=>setTransactionType(e.target.value)}/>
                     <InputField type="text" label="LPCO Type" value={lpcoOrCodeType} onChange={(e)=>setLpcoOrCodeType(e.target.value)}/>
                     <InputField type="text" label="LPCO Number (or Name)" value={lpcoOrPncNumber} onChange={(e)=>setLpcoOrPncNumber(e.target.value)}/>
                    </div>
                  </div>
                )}
              </div>
               )}
              <div className="dropdown_container">
                <div
                  className="dropdown_header"
                  onClick={() => toggleDropdown("entityData")}
                >
                  <div className="dropdown_header_icon">
                    <BiSolidRightArrow className={`dropdown_icon ${dropdownStates.entityData ? "rotate" : ""}`} />
                  </div>
                  <div className="dropdown_header_text">
                    <h3>Entity Data</h3>
                  </div>
                </div>
                {dropdownStates.entityData && (
                  <div className="dropdown_items">
                    <div className="items">
                      <SelectField
                         label="Entity Role Code"
                         name="partyType"
                         id="partyType"
                         onChange={(e)=>setPartyType(e.target.value)}
                         value={partyType}
                         options={roleCodeData}
                       />
                      <SelectField
                         label="Entity Identification Code"
                         name="entityIdentificationCode"
                         id="entityIdentificationCode"
                         onChange={(e)=>setPartyIdentifierType(e.target.value)}
                         value={partyIdentifierType}
                         options={["16","47"]}
                       />
                     <InputField type="tel" label="Entity Number" maxLength={9} value={partyIdentifierNumber !== null ? partyIdentifierNumber.toString() : ''} onChange={handlePartyIdentifierNumberChange}/>
                     <InputField type="text" label="Entity Name" value={partyName} onChange={(e)=>setPartyName(e.target.value)}/>
                     <InputField type="text" label="Entity Address 1" value={address1} onChange={(e)=>setAddress1(e.target.value)}/>
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
                    <BiSolidRightArrow className={`dropdown_icon ${dropdownStates.entityAddress ? "rotate" : ""}`} />
                  </div>
                  <div className="dropdown_header_text">
                    <h3>Entity Address</h3>
                  </div>
                </div>
                {dropdownStates.entityAddress && (
                  <div className="dropdown_items">
                    <div className="items">
                     <InputField type="text" label="Entity Address 2" value={address2} onChange={(e)=>setAddress2(e.target.value)}/>
                     <InputField type="text" label="Entity Apartment Number" value={apartmentOrSuiteNo} onChange={(e)=>setApartmentOrSuiteNo(e.target.value)}/>
                     <InputField type="text" label="Entity City" value={city} onChange={(e)=>setCity(e.target.value)}/>
                     <SelectField
                         label="Entity Country"
                         name="entityCountry"
                         id="entityCountry"
                         onChange={(e)=>setCountry(e.target.value)}
                         value={country}
                         options={countryCode}
                         onClick={countryCodeApi}
                       />
                     <SelectField
                         label="Entity State"
                         name="entityState"
                         id="entityState"
                         onChange={(e)=>setStateOrProvince(e.target.value)}
                         value={stateOrProvince}
                         options={stateCodeData}
                         onClick={stateCodeApi}
                       />
                     <InputField type="text" label="Entity Zip" value={postalCode} onChange={(e)=>setPostalCode(e.target.value)}/>
                     <InputField type="text" label="Filler" disabled value={""}/>
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
                    <BiSolidRightArrow className={`dropdown_icon ${dropdownStates.pointOfContact ? "rotate" : ""}`} />
                  </div>
                  <div className="dropdown_header_text">
                    <h3>Point of Contact</h3>
                  </div>
                </div>
                {dropdownStates.pointOfContact && (
                  <div className="dropdown_items">
                    <div className="items">
                      <SelectField
                         label="Individual Qualifier"
                         name="individualQualifier"
                         id="individualQualifier"
                         onChange={(e)=>setIndividualQualifier(e.target.value)}
                         value={individualQualifier}
                         options={["a","b","c","d","e","f","g","h","i"]}
                         onClick={stateCodeApi}
                       />
                     <InputField type="text" label="Individual Name" value={contactPerson} onChange={(e)=>setContactPerson(e.target.value)}/>
                     <InputField type="tel" label="Telephone Number" value={telephoneNumber} onChange={(e)=>setTelephoneNumber(e.target.value)}/>
                     <InputField type="email" label="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
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
                    <BiSolidRightArrow className={`dropdown_icon ${dropdownStates.affirmationOfCompliance ? "rotate" : ""}`} />
                  </div>
                  <div className="dropdown_header_text">
                    <h3>Affirmation of Compliance</h3>
                  </div>
                </div>
                {dropdownStates.affirmationOfCompliance && (
                  <div className="dropdown_items">
                    <div className="items">
                      <SelectField
                         label="Affirmation of Compliance Code"
                         name="affirmationComplianceCode"
                         id="affirmationComplianceCode"
                         onChange={(e)=>setAffirmationComplianceCode(e.target.value)}
                         value={affirmationComplianceCode}
                         options={["a","b","c","d","e","f","g","h","i"]}
                         onClick={stateCodeApi}
                       />
                     <InputField type="text" label="Affirmation of Compliance Qualifier" value={affirmationComplianceQualifier} onChange={(e)=>setAffirmationComplianceQualifier(e.target.value)}/>
                     <InputField type="text" label="Filler" disabled value={" "}/>
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
                    <BiSolidRightArrow className={`dropdown_icon ${dropdownStates.remarks ? "rotate" : ""}`} />
                  </div>
                  <div className="dropdown_header_text">
                    <h3>Remarks</h3>
                  </div>
                </div>
                {dropdownStates.remarks && (
                  <div className="dropdown_items">
                    <div className="items">
                     <InputField type="text" label="Remarks Type Code" value={remarksTypeCode} onChange={(e)=>setRemarksTypeCode(e.target.value)}/>
                     <InputField type="text" label="Remarks Text" value={remarksText} onChange={(e)=>setRemarksText(e.target.value)}/>
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
                    <BiSolidRightArrow className={`dropdown_icon ${dropdownStates.productCondition ? "rotate" : ""}`} />
                  </div>
                  <div className="dropdown_header_text">
                    <h3>Product Condition</h3>
                  </div>
                </div>
                {dropdownStates.productCondition && (
                  <div className="dropdown_items">
                    <div className="items">
                      <SelectField
                         label="Temperature Qualifier"
                         name="temperatureQualifier"
                         id="temperatureQualifier"
                         onChange={(e)=>setTemperatureQualifier(e.target.value)}
                         value={temperatureQualifier}
                         options={["a","b","c","d","e","f","g","h","i"]}
                       />
                     <InputField type="text" label="Lot Number Qualifier" value={lotNumberQualifier} onChange={(e)=>setLotNumberQualifier(e.target.value)}/>
                     <InputField type="text" label="Lot Number" value={lotNumber} onChange={(e)=>setLotNumber(e.target.value)}/>
                     <InputField type="text" label="PGA Line Value" value={pgaLineValue} onChange={(e)=>setPgaLineValue(e.target.value)}/>
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
                    <BiSolidRightArrow className={`dropdown_icon ${dropdownStates.productPackaging ? "rotate" : ""}`} />
                  </div>
                  <div className="dropdown_header_text">
                    <h3>Product Packaging</h3>
                  </div>
                </div>
                {dropdownStates.productPackaging && (
                  <div className="dropdown_items">
                    <div className="items">
                      <SelectField
                         label="Packaging Qualifier"
                         name="packagingQualifier"
                         id="packagingQualifier"
                         onChange={(e)=>setPackagingQualifier(e.target.value)}
                         value={packagingQualifier}
                         options={["1","2","3","4","5","6"]}
                       />
                     <InputField type="text" label="Quantity" value={quantity} onChange={(e)=>setQuantity(e.target.value)}/>
                      <SelectField
                         label="Unit of Measure (Packaging Level)"
                         name="uom"
                         id="uom"
                         onChange={(e)=>setUom(e.target.value)}
                         value={uom}
                         options={["a","b","c","d","e","f","g","h","i"]}
                       />
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
                {(selectedGvtAgencyProgramCode!== "DRU" && selectedGvtAgencyProgramCode!== "TOB" && selectedGvtAgencyProgramCode!== "VME") && (
              <div className="dropdown_container">
                <div
                  className="dropdown_header"
                  onClick={() => toggleDropdown("shippingContainerInformation")}
                >
                  <div className="dropdown_header_icon">
                    <BiSolidRightArrow className={`dropdown_icon ${dropdownStates.shippingContainerInformation ? "rotate" : ""}`} />
                  </div>
                  <div className="dropdown_header_text">
                    <h3>Shipping Container Information</h3>
                  </div>
                </div>
                {dropdownStates.shippingContainerInformation && (
                  <div className="dropdown_items">
                    <div className="items">
                     <InputField type="text" label="Container-1 No." value={containerNumberOne} onChange={(e)=>setContainerNumberOne(e.target.value)}/>
                     <InputField type="text" label="Container-2 No." value={containerNumberTwo} onChange={(e)=>setContainerNumberTwo(e.target.value)}/>
                     <InputField type="text" label="Container-3 No." value={containerNumberThree} onChange={(e)=>setContainerNumberThree(e.target.value)}/>
                     <InputField type="text" label="Filler" disabled value={" "}/>
                    </div>
                  </div>
                )}
              </div>
              )}
                {selectedGvtAgencyProgramCode=== "Standalone_PN" && (
              <div className="dropdown_container">
                <div
                  className="dropdown_header"
                  onClick={() => toggleDropdown("expressCourierTrackingNumber")}
                >
                  <div className="dropdown_header_icon">
                    <BiSolidRightArrow className={`dropdown_icon ${dropdownStates.expressCourierTrackingNumber ? "rotate" : ""}`} />
                  </div>
                  <div className="dropdown_header_text">
                    <h3>Express Courier Tracking Number</h3>
                  </div>
                </div>
                {dropdownStates.expressCourierTrackingNumber && (
                  <div className="dropdown_items">
                    <div className="items">
                     <InputField type="text" label="Package Tracking Number Code" value={packageTrackingNumberCode} onChange={(e)=>setPackageTrackingNumberCode(e.target.value)}/>
                     <InputField type="text" label="Package Tracking Number" value={packageTrackingNumber} onChange={(e)=>setPackageTrackingNumber(e.target.value)}/>
                    </div>
                  </div>
                )}
              </div>
              )}
                {selectedGvtAgencyProgramCode=== "FOOD" && (
              <div className="dropdown_container">
                <div
                  className="dropdown_header"
                  onClick={() => toggleDropdown("expressCourierTrackingContainerDimensions")}
                >
                  <div className="dropdown_header_icon">
                    <BiSolidRightArrow className={`dropdown_icon ${dropdownStates.expressCourierTrackingContainerDimensions ? "rotate" : ""}`} />
                  </div>
                  <div className="dropdown_header_text">
                    <h3>Express Courier Tracking and Container Dimensions – AF and LACF</h3>
                  </div>
                </div>
                {dropdownStates.expressCourierTrackingContainerDimensions && (
                  <div className="dropdown_items">
                    <div className="items">
                     <InputField type="text" label="Container Dimensions #1" value={containerDimensionsOne} onChange={(e)=>setContainerDimensionsOne(e.target.value)}/>
                     <InputField type="text" label="Container Dimensions #2" value={containerDimensionsTwo} onChange={(e)=>setContainerDimensionsTwo(e.target.value)}/>
                     <InputField type="text" label="Container Dimensions #3" value={containerDimensionsThree} onChange={(e)=>setContainerDimensionsThreee(e.target.value)}/>
                     <InputField type="text" label="Package Tracking Number Code" value={packageTrackingNumberCode} onChange={(e)=>setPackageTrackingNumberCode(e.target.value)}/>
                     <InputField type="text" label="Package Tracking Number" value={packageTrackingNumber} onChange={(e)=>setPackageTrackingNumber(e.target.value)}/>

                    </div>
                  </div>
                )}
              </div>
              )}
                {selectedGvtAgencyProgramCode=== "Non_PN" && (
              <div className="dropdown_container">
                <div
                  className="dropdown_header"
                  onClick={() => toggleDropdown("containerDimensionsForAFnLACF")}
                >
                  <div className="dropdown_header_icon">
                    <BiSolidRightArrow className={`dropdown_icon ${dropdownStates.containerDimensionsForAFnLACF ? "rotate" : ""}`} />
                  </div>
                  <div className="dropdown_header_text">
                    <h3>Container Dimensions for AF and LACF</h3>
                  </div>
                </div>
                {dropdownStates.containerDimensionsForAFnLACF && (
                  <div className="dropdown_items">
                    <div className="items">
                    <InputField type="text" label="Container Dimensions #1" value={containerDimensionsOne} onChange={(e)=>setContainerDimensionsOne(e.target.value)}/>
                     <InputField type="text" label="Container Dimensions #2" value={containerDimensionsTwo} onChange={(e)=>setContainerDimensionsTwo(e.target.value)}/>
                     <InputField type="text" label="Container Dimensions #3" value={containerDimensionsThree} onChange={(e)=>setContainerDimensionsThreee(e.target.value)}/>
                    </div>
                  </div>
                )}
              </div>
              )}
              <div className="dropdown_container">
                <div
                  className="dropdown_header"
                  onClick={() =>
                    toggleDropdown("anticipatedArrivalInformation")
                  }
                >
                  <div className="dropdown_header_icon">
                    <BiSolidRightArrow className={`dropdown_icon ${dropdownStates.anticipatedArrivalInformation ? "rotate" : ""}`} />
                  </div>
                  <div className="dropdown_header_text">
                    <h3>Anticipated Arrival Information</h3>
                  </div>
                </div>
                {dropdownStates.anticipatedArrivalInformation && (
                  <div className="dropdown_items">
                    <div className="items">
                     <InputField type="text" label="Anticipated Arrival Information" value={anticipatedArrivalInformation} onChange={(e)=>setAnticipatedArrivalInformation(e.target.value)}/>
                      <div className="created_date">
                        <label>Anticipated Arrival Date at Port Entry</label>
                        <DatePicker defaultValue={today} format={dateFormat} />
                      </div>
                      <div className="created_date">
                        <label>Anticipated Arrival Time at Port Entry</label>
                        <TimePicker
                          format="HH:mm"
                          onChange={(value) => console.log(value)}
                        />
                      </div>
                     <InputField type="text" label="Arrival Location Code" value={anticipatedArrivalLocationCode} onChange={(e)=>setAnticipatedArrivalLocationCode(e.target.value)}/>
                      <SelectField
                         label="Arrival Location"
                         name="arrivalLocation"
                         id="arrivalLocation"
                         onChange={(e)=>setArrivalLocation(e.target.value)}
                         value={arrivalLocation}
                         options={["a","b","c","d","e","f","g","h","i"]}
                       />
                     <InputField type="text" label="Filler" disabled value={" "}/>
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
                    <BiSolidRightArrow className={`dropdown_icon ${dropdownStates.affirmationOfCompliance ? "rotate" : ""}`} />
                  </div>
                  <div className="dropdown_header_text">
                    <h3>Additional Information</h3>
                  </div>
                </div>
                {dropdownStates.affirmationOfCompliance && (
                  <div className="dropdown_items">
                    <div className="items">
                      <SelectField
                         label="Additional information qualifier code"
                         name="additionalInformationQualifierCode"
                         id="additionalInformationQualifierCode"
                         onChange={(e)=>setAdditionalInformationQualifierCode(e.target.value)}
                         value={additionalInformationQualifierCode}
                         options={["a","b","c","d","e","f","g","h","i"]}
                       />
                     <InputField type="text" label="Additional Information" value={additionalInformation} onChange={(e)=>setAdditionalInformation(e.target.value)}/>
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
                    <BiSolidRightArrow className={`dropdown_icon ${dropdownStates.dataSubstitution ? "rotate" : ""}`} />
                  </div>
                  <div className="dropdown_header_text">
                    <h3>Data Substitution</h3>
                  </div>
                </div>
                {dropdownStates.dataSubstitution && (
                  <div className="dropdown_items">
                    <div className="items">                  
                      <SelectField
                         label="Substitution Indicator"
                         name="substitutionIndicator"
                         id="substitutionIndicator"
                         onChange={(e)=>setSubstitutionIndicator(e.target.value)}
                         value={substitutionIndicator}
                         options={["a","b","c","d","e","f","g","h","i"]}
                       />
                     <InputField type="text" label="Substitution Number" value={substitutionNumber} onChange={(e)=>setSubstitutionNumber(e.target.value)}/>
                     <InputField type="text" label="Filler" disabled value={" "}/>
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