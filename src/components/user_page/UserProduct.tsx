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

const [userProductForm,setUserProductForm] = useState({
  //pga Identifier
  pgaLineNumber:"001",
  governmentAgencyCode:"FDA",
  governmentAgencyProgramCode:"",
  governmentAgencyProcessingCode:"",
  intendedUseCode:"",
  intendedUseDescription:"",
  correctionIndicator:"",
  disclaimer:"",
  //product identifier
  itemType:"P",
  productCodeQualifier:"FDP",
  //Product Constituent Element
  constituentActiveIngredientQualifier:"",
  constituentElementName:"",
  constituentElementQuantity:"",
  constituentElementUnitOfMeasure:"",
  percentOfConstituentElement:"",
  //Product Origin
  sourceTypeCode:"",
  countryCode:"",
  //Product Trade Names
  tradeOrBrandName:"",
  //Product Characteristics
  commodityDesc:"",
  //License Plate Issuer
  issuerOfLPCO:"",
  governmentGeographicCodeQualifier:"",
  locationOfIssuerOfTheLPCO:"",
  issuingAgencyLocation:"",
  //License Plate Number //PN Confirmation Number
  transactionType:"",
  lpcoOrCodeType:"",
  lpcoOrPncNumber:"",
  //Entity Data
  partyType:"",
  partyIdentifierType:"",
  partyIdentifierNumber:"",
  partyName:"",
  address1:"",
  //Entity Address
  address2:"",
  apartmentOrSuiteNo:"",
  city:"",
  country:"",
  stateOrProvince:"",
  postalCode:"",
  //Point of Contact
  individualQualifier:"",
  contactPerson:"",
  telephoneNumber:"",
  email:"",
  //Affirmation of Compliance
  affirmationComplianceCode:"",
  affirmationComplianceQualifier:"",
  //Remarks
  remarksTypeCode:"",
  remarksText:"",
  //Product Condition
  temperatureQualifier:"",
  degreeType:"",
  negativeNumber:"",
  actualTemperature:"",
  lotNumberQualifier:"",
  locationOfTemperatureRecording:"",
  lotNumber:"",
  pgaLineValue:"",
  //Product Packaging
  packagingQualifier:"",
  quantity:"",
  uom:"",
  //Shipping Container Information
  containerNumberOne:"",
  containerNumberTwo:"",
  containerNumberThree:"",
  //Express Courier Tracking Number
  packageTrackingNumberCode:"",
  packageTrackingNumber:"",
  //Express Courier Tracking and Container Dimensions – AF and LACF
  containerDimensionsOne:"",
  containerDimensionsTwo:"",
  containerDimensionsThree:"",
  //Anticipated Arrival Information
  anticipatedArrivalInformation:"",
  anticipatedArrivalLocationCode:"",
  arrivalLocation:"",
  //Additional Information
  additionalInformationQualifierCode:"",
  additionalInformation:"",
  //Data Substitution
  substitutionIndicator:"",
  substitutionNumber:"",
});
  const [gvtAgencyProcessingCodeData, setGvtAgencyProcessingCodeData] = useState<string[]>([]);
  const [intendedUseCodeData, setIntendedUseCodeData] = useState<string[]>([]);
  const [openProductCodeBuilder, setOpenProductCodeBuilder] = React.useState(false);
  const [sourceTypeCodeData, setSourceTypeCodeData] = useState<string[]>([]);
  const [countryCodeData, setCountryCodeData] = useState<string[]>([]);
  const [roleCodeData,setRoleCodeData] = useState<string[]>([]);
  const [stateCodeData,setStateCodeData] = useState<string[]>([]);

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
    if (userProductForm.governmentAgencyProgramCode) {
      gvtAgencyProgramCodeApi(
        userProductForm.governmentAgencyProgramCode,
        userProductForm.governmentAgencyProcessingCode
      );``
    }
  }, [userProductForm.governmentAgencyProgramCode, userProductForm.governmentAgencyProcessingCode]);

  const handleProgramCodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserProductForm({...userProductForm,governmentAgencyProgramCode:e.target.value, governmentAgencyProcessingCode:""});
    setIntendedUseCodeData([]);
  };
  const GvtAgencyProcessingCodesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserProductForm({...userProductForm, governmentAgencyProcessingCode:e.target.value});
    setIntendedUseCodeData([]);
  };
 
  const gvtAgencyProgramCodeApi = (
    governmentAgencyProgramCode: string,
    governmentAgencyProcessingCodes: string
  ) => {
    let requestParam;

if (
  governmentAgencyProgramCode === "FOOD" ||
  governmentAgencyProgramCode === "Non_PN" ||
  governmentAgencyProgramCode === "Standalone_PN"
) {
  requestParam = "FOO";
} else {
  requestParam = governmentAgencyProgramCode;
}

    axiosPrivate.get(`/pgaIdentifier/get-agency-program-code?governmentAgencyProgramCode=${requestParam}`)
      .then((res) => {
        const { programCodeData } = res.data;
        //For FOO code 
        switch (userProductForm.governmentAgencyProgramCode) {
            case "Non_PN":
              setGvtAgencyProcessingCodeData(
                programCodeData["Non-PN_Food"].governmentAgencyProcessingCodes
              );
              setIntendedUseCodeData(programCodeData["Non-PN_Food"].intendedUseCodes);
              setSourceTypeCodeData(programCodeData["Non-PN_Food"].sourceTypeCode);
              setRoleCodeData(programCodeData["Non-PN_Food"].entityRoleCode);
              break;
            case "FOOD":
              setGvtAgencyProcessingCodeData(
                programCodeData.Food.governmentAgencyProcessingCodes
              );
              setIntendedUseCodeData(programCodeData.Food.intendedUseCodes);
              setSourceTypeCodeData(programCodeData.Food.sourceTypeCode);
              setRoleCodeData(programCodeData.Food.entityRoleCode);
              break;
            case "Standalone_PN":
              setGvtAgencyProcessingCodeData(
                programCodeData["Standalone-PN_Food"].governmentAgencyProcessingCodes
              );
              setIntendedUseCodeData(programCodeData["Standalone-PN_Food"].intendedUseCodes);
              setSourceTypeCodeData(programCodeData["Standalone-PN_Food"].sourceTypeCode);
              setRoleCodeData(programCodeData["Standalone-PN_Food"].entityRoleCode);
              break;
            default:
              setGvtAgencyProcessingCodeData(programCodeData.governmentAgencyProcessingCodes);
          }

          //For normal and DRU code
        if (Array.isArray(programCodeData.intendedUseCodes)) {
          setIntendedUseCodeData(programCodeData.intendedUseCodes);
          setSourceTypeCodeData(programCodeData.sourceTypeCode);
          setRoleCodeData(programCodeData.entityRoleCode);
        } else if (
          governmentAgencyProcessingCodes &&
          programCodeData.intendedUseCodes[governmentAgencyProcessingCodes]
        ) {
          setIntendedUseCodeData(
            programCodeData.intendedUseCodes[governmentAgencyProcessingCodes]
          );
          setSourceTypeCodeData(programCodeData.sourceTypeCode);
          setRoleCodeData(programCodeData.entityRoleCode);
        } else {
          setIntendedUseCodeData([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
const countryCodeApi = ()=>{
  axiosPrivate.get(`/pgaIdentifier/get-all-country-codes`).then((response)=>{
    setCountryCodeData(response.data);
  }).catch((err) => {
    console.log(err);
  });
}
const stateCodeApi = ()=>{
  axiosPrivate.get(`/pgaIdentifier/get-state-codes?countryCode=${userProductForm.country}`).then((response)=>{
    setStateCodeData(response.data.stateCodes);
  }).catch((err) => {
    console.log(err);
  });
};

const handleChangeFields = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>)=>{
  setUserProductForm({
    ...userProductForm,
    [e.target.name]: e.target.value
  })
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
                      <InputField type="text" name="pgaLineNumber" label="PGA Line Number" value={userProductForm.pgaLineNumber} disabled/>
                      <InputField type="text" name="governmentAgencyCode" label="Government Agency Code" value={userProductForm.governmentAgencyCode} disabled/>
                      <div className="select_dropdown">
                        <label>Government Agency Program Code</label>
                        <select
                          name="governmentAgencyProgramCode"
                          onChange={handleProgramCodeChange}
                          value={userProductForm.governmentAgencyProgramCode}
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
                         name="governmentAgencyProcessingCode"
                         onChange={GvtAgencyProcessingCodesChange}
                         value={userProductForm.governmentAgencyProcessingCode}
                         options={gvtAgencyProcessingCodeData}
                       />
                      <SelectField
                         label="Intended Use Code"
                         name="intendedUseCode"
                         onChange={handleChangeFields}
                         value={userProductForm.intendedUseCode}
                         options={intendedUseCodeData}
                       />
                      <InputField type="text" label="Intended Use Description" name="intendedUseDescription" value={userProductForm.intendedUseDescription} onChange={handleChangeFields}/>
                      <InputField type="text" label="Correction Indicator" name="correctionIndicator" value={userProductForm.correctionIndicator} onChange={handleChangeFields}/>
                      <SelectField
                         label="Disclaimer"
                         name="disclaimer"
                         onChange={handleChangeFields}
                         value={userProductForm.disclaimer}
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
                      <InputField type="text" label="Item type" name="itemType" value={userProductForm.itemType} disabled/>
                      <InputField type="text" label="Product Code Qualifier" name="productCodeQualifier" value={userProductForm.productCodeQualifier} disabled/>
                      <InputField type="text" label="Product Code Number" name="productCodeNumber" value={concatenatedProductCode} readOnly onClick={handleOpen}/>
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
              {(userProductForm.governmentAgencyProgramCode === "BIO" || userProductForm.governmentAgencyProgramCode === "DRU" || userProductForm.governmentAgencyProgramCode === "VME") && (
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
                         onChange={handleChangeFields}
                         value={userProductForm.constituentActiveIngredientQualifier}
                         options={["A","B","C","D","E","F","G","H","I"]}
                       />
                      <InputField type="text" label="Name of the Constituent Element" name="constituentElementName" value={userProductForm.constituentElementName} onChange={handleChangeFields}/>
                      <InputField type="text" label="Quantity of Constituent Element" name="constituentElementQuantity" value={userProductForm.constituentElementQuantity} onChange={handleChangeFields}/>
                      <InputField type="text" label="Unit of Measure" name="constituentElementUnitOfMeasure" value={userProductForm.constituentElementUnitOfMeasure} onChange={handleChangeFields}/>
                      <InputField type="text" label="Percent of Constituent Element" name="percentOfConstituentElement" value={userProductForm.percentOfConstituentElement} onChange={handleChangeFields}/>
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
                         onChange={handleChangeFields}
                         value={userProductForm.sourceTypeCode}
                         options={sourceTypeCodeData}
                       />
                      <SelectField
                         label="Country Code"
                         name="countryCode"
                         onClick={countryCodeApi}
                         onChange={handleChangeFields}
                         value={userProductForm.countryCode}
                         options={countryCodeData}
                       />
                    </div>
                  </div>
                )}
              </div>
              {userProductForm.governmentAgencyProgramCode !== "Standalone_PN" &&(
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
                      <InputField type="text" label="Trade Name/Brand Name" name="tradeOrBrandName" value={userProductForm.tradeOrBrandName} onChange={handleChangeFields}/>
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
                      <InputField type="text" label="Commodity Characteristic Description" name="commodityDesc"  value={userProductForm.commodityDesc} onChange={handleChangeFields}/>
                    </div>
                  </div>
                )}
              </div>
              {(userProductForm.governmentAgencyProgramCode === "Standalone_PN" || userProductForm.governmentAgencyProgramCode === "FOOD") && (
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
                     <InputField type="text" label="Issuer of LPCO" name="issuerOfLPCO" value={userProductForm.issuerOfLPCO} onChange={handleChangeFields}/>
                     <InputField type="text" label="LPCO Issuer - Government Geographic Code Qualifier" name="governmentGeographicCodeQualifier" value={userProductForm.governmentGeographicCodeQualifier} onChange={handleChangeFields}/>
                     <InputField type="text" label="Location (Country/State/Provi nce) of Issuer of the LPCO" name="locationOfIssuerOfTheLPCO" value={userProductForm.locationOfIssuerOfTheLPCO} onChange={handleChangeFields}/>
                     <InputField type="text" label="Regional description of location of Agency Issuing the LPCO" name="issuingAgencyLocation" value={userProductForm.issuingAgencyLocation} onChange={handleChangeFields}/>
                     <InputField type="text" label="Filler" name="Filler" disabled value={" "}/>
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
                     <InputField type="text" label="LPCO Transaction Type" name="transactionType" value={userProductForm.transactionType} onChange={handleChangeFields}/>
                     <InputField type="text" label="LPCO Type" name="lpcoOrCodeType" value={userProductForm.lpcoOrCodeType} onChange={handleChangeFields}/>
                     <InputField type="text" label="LPCO Number (or Name)" name="lpcoOrPncNumber" value={userProductForm.lpcoOrPncNumber} onChange={handleChangeFields}/>
                    </div>
                  </div>
                )}
              </div>
              </>
              )}
               {userProductForm.governmentAgencyProgramCode === "Non_PN"&& (
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
                    <InputField type="text" label="Transaction Type" name="transactionType" value={userProductForm.transactionType} onChange={handleChangeFields}/>
                     <InputField type="text" label="Code Type" name="lpcoOrCodeType" value={userProductForm.lpcoOrCodeType} onChange={handleChangeFields}/>
                     <InputField type="text" label="PNC Number" name="lpcoOrPncNumber" value={userProductForm.lpcoOrPncNumber} onChange={handleChangeFields}/>
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
                         onChange={handleChangeFields}
                         value={userProductForm.partyType}
                         options={roleCodeData}
                       />
                      <SelectField
                         label="Entity Identification Code"
                         name="partyIdentifierType"
                         onChange={handleChangeFields}
                         value={userProductForm.partyIdentifierType}
                         options={["16","47"]}
                       />
                     <InputField type="tel" label="Entity Number" name="partyIdentifierNumber" maxLength={9} value={userProductForm.partyIdentifierNumber} onChange={handleChangeFields}/>
                     <InputField type="text" label="Entity Name" name="partyName" value={userProductForm.partyName} onChange={handleChangeFields}/>
                     <InputField type="text" label="Entity Address 1" name="address1" value={userProductForm.address1} onChange={handleChangeFields}/>
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
                     <InputField type="text" label="Entity Address 2" name="address2" value={userProductForm.address2} onChange={handleChangeFields}/>
                     <InputField type="text" label="Entity Apartment Number" name="apartmentOrSuiteNo" value={userProductForm.apartmentOrSuiteNo} onChange={handleChangeFields}/>
                     <InputField type="text" label="Entity City" value={userProductForm.city} name="city" onChange={handleChangeFields}/>
                     <SelectField
                         label="Entity Country"
                         name="country"
                         onChange={handleChangeFields}
                         value={userProductForm.country}
                         options={countryCodeData}
                         onClick={countryCodeApi}
                       />
                     <SelectField
                         label="Entity State"
                         name="stateOrProvince"
                         onChange={handleChangeFields}
                         value={userProductForm.stateOrProvince}
                         options={stateCodeData}
                         onClick={stateCodeApi}
                       />
                     <InputField type="text" label="Entity Zip" name="postalCode" value={userProductForm.postalCode} onChange={handleChangeFields}/>
                     <InputField type="text" label="Filler" name="Filler" disabled value={""}/>
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
                         onChange={handleChangeFields}
                         value={userProductForm.individualQualifier}
                         options={["a","b","c","d","e","f","g","h","i"]}
                         onClick={stateCodeApi}
                       />
                     <InputField type="text" label="Individual Name" name="contactPerson" value={userProductForm.contactPerson} onChange={handleChangeFields}/>
                     <InputField type="tel" label="Telephone Number" name="telephoneNumber" value={userProductForm.telephoneNumber} onChange={handleChangeFields}/>
                     <InputField type="email" label="Email" name="email" value={userProductForm.email} onChange={handleChangeFields}/>
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
                         onChange={handleChangeFields}
                         value={userProductForm.affirmationComplianceCode}
                         options={["a","b","c","d","e","f","g","h","i"]}
                         onClick={stateCodeApi}
                       />
                     <InputField type="text" label="Affirmation of Compliance Qualifier" name="affirmationComplianceQualifier" value={userProductForm.affirmationComplianceQualifier} onChange={handleChangeFields}/>
                     <InputField type="text" label="Filler" name="Filler" disabled value={" "}/>
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
                     <InputField type="text" label="Remarks Type Code" name="remarksTypeCode" value={userProductForm.remarksTypeCode} onChange={handleChangeFields}/>
                     <InputField type="text" label="Remarks Text" name="remarksText" value={userProductForm.remarksText} onChange={handleChangeFields}/>
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
                         onChange={handleChangeFields}
                         value={userProductForm.temperatureQualifier}
                         options={["a","b","c","d","e","f","g","h","i"]}
                       />
                  {userProductForm.governmentAgencyProgramCode === "DRU" && (
                     <>
                     <InputField type="text" label="Degree Type" name="degreeType" value={userProductForm.degreeType} onChange={handleChangeFields} />
                     <InputField type="text" label="Negative Number" name="negativeNumber" value={userProductForm.negativeNumber} onChange={handleChangeFields} />
                     <InputField type="text" label="Actual Temperature" name="actualTemperature" value={userProductForm.actualTemperature} onChange={handleChangeFields} />
                     <InputField type="text" label="Location of Temperature Recording" name="locationOfTemperatureRecording" value={userProductForm.locationOfTemperatureRecording} onChange={handleChangeFields} />
                     </>
                  )}
                     <InputField type="text" label="Lot Number Qualifier" name="lotNumberQualifier" value={userProductForm.lotNumberQualifier} onChange={handleChangeFields}/>
                     <InputField type="text" label="Lot Number" name="lotNumber" value={userProductForm.lotNumber} onChange={handleChangeFields}/>
                     <InputField type="text" label="PGA Line Value" name="pgaLineValue" value={userProductForm.pgaLineValue} onChange={handleChangeFields}/>
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
                         onChange={handleChangeFields}
                         value={userProductForm.packagingQualifier}
                         options={["1","2","3","4","5","6"]}
                       />
                     <InputField type="text" label="Quantity" name="quantity" value={userProductForm.quantity} onChange={handleChangeFields}/>
                      <SelectField
                         label="Unit of Measure (Packaging Level)"
                         name="uom"
                         onChange={handleChangeFields}
                         value={userProductForm.uom}
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
                {(userProductForm.governmentAgencyProgramCode!== "DRU" && userProductForm.governmentAgencyProgramCode!== "TOB" && userProductForm.governmentAgencyProgramCode!== "VME") && (
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
                     <InputField type="text" label="Container-1 No." name="containerNumberOne" value={userProductForm.containerNumberOne} onChange={handleChangeFields}/>
                     <InputField type="text" label="Container-2 No." name="containerNumberTwo" value={userProductForm.containerNumberTwo} onChange={handleChangeFields}/>
                     <InputField type="text" label="Container-3 No." name="containerNumberThree" value={userProductForm.containerNumberThree} onChange={handleChangeFields}/>
                     <InputField type="text" label="Filler" name="Filler" disabled value={" "}/>
                    </div>
                  </div>
                )}
              </div>
              )}
                {userProductForm.governmentAgencyProgramCode=== "Standalone_PN" && (
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
                     <InputField type="text" label="Package Tracking Number Code" name="packageTrackingNumberCode" value={userProductForm.packageTrackingNumberCode} onChange={handleChangeFields}/>
                     <InputField type="text" label="Package Tracking Number" name="packageTrackingNumber" value={userProductForm.packageTrackingNumber} onChange={handleChangeFields}/>
                    </div>
                  </div>
                )}
              </div>
              )}
                {userProductForm.governmentAgencyProgramCode=== "FOOD" && (
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
                     <InputField type="text" label="Container Dimensions #1" name="containerDimensionsOne" value={userProductForm.containerDimensionsOne} onChange={handleChangeFields}/>
                     <InputField type="text" label="Container Dimensions #2" name="containerDimensionsTwo" value={userProductForm.containerDimensionsTwo} onChange={handleChangeFields}/>
                     <InputField type="text" label="Container Dimensions #3" name="containerDimensionsThree" value={userProductForm.containerDimensionsThree} onChange={handleChangeFields}/>
                     <InputField type="text" label="Package Tracking Number Code" name="packageTrackingNumberCode" value={userProductForm.packageTrackingNumberCode} onChange={handleChangeFields}/>
                     <InputField type="text" label="Package Tracking Number" name="packageTrackingNumber" value={userProductForm.packageTrackingNumber} onChange={handleChangeFields}/>
                    </div>
                  </div>
                )}
              </div>
              )}
                {userProductForm.governmentAgencyProgramCode=== "Non_PN" && (
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
                    <InputField type="text" label="Container Dimensions #1" name="containerDimensionsOne" value={userProductForm.containerDimensionsOne} onChange={handleChangeFields}/>
                     <InputField type="text" label="Container Dimensions #2" name="containerDimensionsTwo" value={userProductForm.containerDimensionsTwo} onChange={handleChangeFields}/>
                     <InputField type="text" label="Container Dimensions #3" name="containerDimensionsThree" value={userProductForm.containerDimensionsThree} onChange={handleChangeFields}/>
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
                     <InputField type="text" label="Anticipated Arrival Information" name="anticipatedArrivalInformation" value={userProductForm.anticipatedArrivalInformation} onChange={handleChangeFields}/>
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
                     <InputField type="text" label="Arrival Location Code" name="anticipatedArrivalLocationCode" value={userProductForm.anticipatedArrivalLocationCode} onChange={handleChangeFields}/>
                      <SelectField
                         label="Arrival Location"
                         name="arrivalLocation"
                         onChange={handleChangeFields}
                         value={userProductForm.arrivalLocation}
                         options={["a","b","c","d","e","f","g","h","i"]}
                       />
                     <InputField type="text" label="Filler" name="Filler" disabled value={" "}/>
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
                         onChange={handleChangeFields}
                         value={userProductForm.additionalInformationQualifierCode}
                         options={["a","b","c","d","e","f","g","h","i"]}
                       />
                     <InputField type="text" label="Additional Information" name="additionalInformation" value={userProductForm.additionalInformation} onChange={handleChangeFields}/>
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
                         onChange={handleChangeFields}
                         value={userProductForm.substitutionIndicator}
                         options={["a","b","c","d","e","f","g","h","i"]}
                       />
                     <InputField type="text" label="Substitution Number" name="substitutionNumber" value={userProductForm.substitutionNumber} onChange={handleChangeFields}/>
                     <InputField type="text" label="Filler" name="Filler" disabled value={" "}/>
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