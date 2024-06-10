import { FaBoxOpen } from "react-icons/fa6";
import { BiSolidRightArrow } from "react-icons/bi";
import { useEffect, useState } from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import type { Dayjs } from 'dayjs';
import customParseFormat from "dayjs/plugin/customParseFormat";
import { TimePicker } from "antd";
import IDropdownStates from "../../types/UserProductDropdown.type";
import { axiosPrivate } from "../../services/apiService";
import React from "react";
import ProductCodeBuilder from "../../utilities/ProductCodeBuilder";
import { useProductCode } from "../../context/ProductContext";
import InputField from "../../utilities/InputField";
import SelectField from "../../utilities/SelectField";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import IProductField from "../../types/UserProductFields.types";
import { Box, Fab, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useProduct } from "../../context/UpdateProductContext";
dayjs.extend(customParseFormat);

const dateFormat = "MM/DD/YYYY";
const formatDate = (date: Dayjs | null | undefined) => (date ? dayjs(date).format('MM-DD-YYYY') : '');

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
const partyModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3,
  borderRadius: "10px",
};

const UserProduct = () => {
  const { selectedProduct } = useProduct();

  useEffect(() => {
    if (selectedProduct) {
      setUserProductForm(selectedProduct);
    }
  }, [selectedProduct]);
  console.log(selectedProduct);

  const [dropdownStates, setDropdownStates] = useState<IDropdownStates>({
    recordIdentifier: true,
    pgaIdentifier: true,
    productIdentifier: true,
    productConstituentElement: false,
    productOrigin: true,
    productTradeNames: false,
    productCharacteristics: true,
    licensePlateIssuer: false,
    licensePlateNumber: false,
    parties: true,
    entityData: true,
    entityAddress: false,
    pointOfContact: false,
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
  const { concatenatedProductCode, setInputProductCode } = useProductCode();
  const [currentStep, setCurrentStep] = useState(1);
  const today = dayjs();
  const uniqueUserIdentifier = localStorage.getItem("uniqueUserIdentifier");
  const [editingIndex, setEditingIndex] = useState(-1);

  const getInitialProductFormState = (): IProductField => ({
    controlIdentifier: "",
    commercialDesc: "",
    //pga Identifier
    pgaLineNumber: "001",
    governmentAgencyCode: "FDA",
    governmentAgencyProgramCode: "",
    governmentAgencyProcessingCode: "",
    intendedUseCode: "",
    intendedUseDescription: "",
    correctionIndicator: "",
    disclaimer: "",
    //product identifier
    itemType: "P",
    productCodeQualifier: "FDP",
    productCodeNumber: "",
    //Product Constituent Element
    constituentActiveIngredientQualifier: "",
    constituentElementName: "",
    constituentElementQuantity: "",
    constituentElementUnitOfMeasure: "",
    percentOfConstituentElement: "",
    //Product Origin
    sourceTypeCode: "",
    countryCode: "",
    //Product Trade Names
    tradeOrBrandName: "",
    //Product Characteristics
    commodityDesc: "",
    //License Plate Issuer
    issuerOfLPCO: "",
    governmentGeographicCodeQualifier: "",
    locationOfIssuerOfTheLPCO: "",
    issuingAgencyLocation: "",
    //License Plate Number //PN Confirmation Number
    transactionType: "",
    lpcoOrCodeType: "",
    lpcoOrPncNumber: "",
    //Entity Data
    partyType: "",
    partyIdentifierType: "",
    partyIdentifierNumber: "",
    partyName: "",
    address1: "",
    //Entity Address
    address2: "",
    apartmentOrSuiteNo: "",
    city: "",
    country: "",
    stateOrProvince: "",
    postalCode: "",
    //Point of Contact
    individualQualifier: "",
    contactPerson: "",
    telephoneNumber: "",
    email: "",
    //Affirmation of Compliance
    affirmationComplianceCode: "",
    affirmationComplianceQualifier: "",
    //Remarks
    remarksTypeCode: "GEN",
    remarksText: "",
    //Product Condition
    temperatureQualifier: "",
    degreeType: "",
    negativeNumber: "",
    actualTemperature: "",
    lotNumberQualifier: "",
    locationOfTemperatureRecording: "",
    lotNumber: "",
    productionStartDate: null,
    productionEndDate: null,
    pgaLineValue: "",
    //Product Packaging
    packagingQualifier: "",
    quantity: "",
    uom: "",
    //Shipping Container Information
    containerNumberOne: "",
    containerNumberTwo: "",
    containerNumberThree: "",
    //Express Courier Tracking Number
    packageTrackingNumberCode: "",
    packageTrackingNumber: "",
    //Express Courier Tracking and Container Dimensions – AF and LACF
    containerDimensionsOne: "",
    containerDimensionsTwo: "",
    containerDimensionsThree: "",
    //Anticipated Arrival Information
    anticipatedArrivalInformation: "",
    anticipatedArrivalDate: today,
    anticipatedArrivalTime: dayjs(),
    inspectionOrArrivalLocationCode: "",
    inspectionOrArrivalLocation: "",
    //Additional Information
    additionalInformationQualifierCode: "",
    additionalInformation: "",
    //Data Substitution
    substitutionIndicator: "",
    substitutionNumber: "",
  });
  const [userProductForm, setUserProductForm] = useState<IProductField>(getInitialProductFormState());
  const {
    pgaLineNumber,
    remarksTypeCode,
    remarksText,
    governmentAgencyCode,
    governmentAgencyProgramCode,
    governmentAgencyProcessingCode,
    itemType,
    tradeOrBrandName,
    commercialDesc,
    issuerOfLPCO,
    governmentGeographicCodeQualifier,
    locationOfIssuerOfTheLPCO,
    issuingAgencyLocation,
    transactionType,
    lpcoOrCodeType,
    lpcoOrPncNumber,
    containerDimensionsOne,
    containerDimensionsTwo,
    containerDimensionsThree,
    substitutionIndicator,
    substitutionNumber,
    commodityDesc,
    productCodeQualifier,
    packageTrackingNumberCode,
    packageTrackingNumber,
    intendedUseCode,
    intendedUseDescription,
    correctionIndicator,
    disclaimer,
  } = userProductForm;
  const [gvtAgencyProcessingCodeData, setGvtAgencyProcessingCodeData] = useState<string[]>([]);
  const [intendedUseCodeData, setIntendedUseCodeData] = useState<string[]>([]);
  const [individualQualifierData, setIndividualQualifierData] = useState<string[]>([]);
  const [openProductCodeBuilder, setOpenProductCodeBuilder] = React.useState(false);
  const [openPartiesModal, setOpenPartiesModal] = React.useState(false);
  const [sourceTypeCodeData, setSourceTypeCodeData] = useState<string[]>([]);
  const [countryCodeData, setCountryCodeData] = useState<string[]>([]);
  const [roleCodeData, setRoleCodeData] = useState<string[]>([]);
  const [stateCodeData, setStateCodeData] = useState<string[]>([]);
  const [productConstituentElements, setProductConstituentElements] = useState<Partial<IProductField>[]>([]);
  const [productOrigin, setProductOrigin] = useState<Partial<IProductField>[]>([]);
  const [partyDetails, setPartyDetails] = useState<Partial<IProductField>[]>([]);
  const [affirmationOfComliance, setAffirmationOfComliance] = useState<Partial<IProductField>[]>([]);
  const [productCondition, setProductCondition] = useState<Partial<IProductField>[]>([]);
  const [productPackaging, setProductPackaging] = useState<Partial<IProductField>[]>([]);
  const [containerInformation, setContainerInformation] = useState<Partial<IProductField>[]>([]);
  const [anticipatedArrivalInformationArray, setAnticipatedArrivalInformationArray] = useState<Partial<IProductField>[]>([]);
  const [additionalInformations, setAdditionalInformations] = useState<Partial<IProductField>[]>([]);

  const handleOpen = () => setOpenProductCodeBuilder(true);
  const handleClose = () => setOpenProductCodeBuilder(false);
  const handleOpenPartiesModal = () => setOpenPartiesModal(true);
  const handleClosePartiesModal = () => {
    setOpenPartiesModal(false);
    setEditingIndex(-1);
  };
  const toggleDropdown = (dropdownName: keyof IDropdownStates) => {
    setDropdownStates({
      ...dropdownStates,
      [dropdownName]: !dropdownStates[dropdownName],
    });
  };

  const partiesDropdown = (dropdown: keyof IDropdownStates) => {
    setDropdownStates((prevState) => {
      const newState = {
        ...prevState,
        entityData: false,
        entityAddress: false,
        pointOfContact: false,
      };
      newState[dropdown] = !prevState[dropdown];
      return newState;
    });
  };

  const nextButtonClick = () => {
    setCurrentStep(currentStep + 1);
  };
  const backButtonClick = () => {
    setCurrentStep(currentStep - 1);
  };

  useEffect(() => {
    if (userProductForm.governmentAgencyProgramCode) {
      gvtAgencyProgramCodeApi(
        userProductForm.governmentAgencyProgramCode,
        userProductForm.governmentAgencyProcessingCode
      );
      ``;
    }
  }, [userProductForm.governmentAgencyProgramCode, userProductForm.governmentAgencyProcessingCode]);

  const handleProgramCodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserProductForm({ ...userProductForm, governmentAgencyProgramCode: e.target.value, governmentAgencyProcessingCode: "" });
    setIntendedUseCodeData([]);
    setSourceTypeCodeData([]);
    setRoleCodeData([]);
  };
  const GvtAgencyProcessingCodesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserProductForm({ ...userProductForm, governmentAgencyProcessingCode: e.target.value });
    setIntendedUseCodeData([]);
    setSourceTypeCodeData([]);
    setRoleCodeData([]);
  };

  const gvtAgencyProgramCodeApi = (governmentAgencyProgramCode: string, governmentAgencyProcessingCodes: string) => {

    const requestParam = ["FOOD", "Non_PN", "Standalone_PN"].includes(governmentAgencyProgramCode) ? "FOO" : governmentAgencyProgramCode;


    axiosPrivate.get(`/pgaIdentifier/get-agency-program-code?governmentAgencyProgramCode=${requestParam}`)
      .then((res) => {
        const { programCodeData } = res.data;
        //For FOO code 
        switch (userProductForm.governmentAgencyProgramCode) {
          case "Non_PN":
            setGvtAgencyProcessingCodeData(programCodeData["Non-PN_Food"].governmentAgencyProcessingCodes || []);
            setIntendedUseCodeData(programCodeData["Non-PN_Food"].intendedUseCodes || []);
            setRoleCodeData(programCodeData["Non-PN_Food"].entityRoleCode || []);
            setSourceTypeCodeData(programCodeData["Non-PN_Food"].sourceTypeCode || []);
            setIndividualQualifierData(programCodeData["Non-PN_Food"].individualQualifier || []);
            break;
          case "FOOD":
            setGvtAgencyProcessingCodeData(programCodeData.Food.governmentAgencyProcessingCodes || []);
            setIntendedUseCodeData(programCodeData.Food.intendedUseCodes || []);
            setSourceTypeCodeData(programCodeData.Food.sourceTypeCode || []);
            setRoleCodeData(programCodeData.Food.entityRoleCode || []);
            setIndividualQualifierData(programCodeData.Food.individualQualifier || []);
            break;
          case "Standalone_PN":
            setGvtAgencyProcessingCodeData(programCodeData["Standalone-PN_Food"].governmentAgencyProcessingCodes || []);
            setIntendedUseCodeData(programCodeData["Standalone-PN_Food"].intendedUseCodes || []);
            setSourceTypeCodeData(programCodeData["Standalone-PN_Food"].sourceTypeCode || []);
            setRoleCodeData(programCodeData["Standalone-PN_Food"].entityRoleCode || []);
            setIndividualQualifierData(programCodeData["Standalone-PN_Food"].individualQualifier || []);
            break;
          default:
            setGvtAgencyProcessingCodeData(programCodeData.governmentAgencyProcessingCodes || []);
            setIntendedUseCodeData(programCodeData.intendedUseCodes[governmentAgencyProcessingCodes] || []);
            setSourceTypeCodeData(programCodeData.sourceTypeCode || []);
            setRoleCodeData(programCodeData.entityRoleCode || []);
            setIndividualQualifierData(programCodeData.individualQualifier || []);
            break;
        }

        //For normal and DRU code
        if (Array.isArray(programCodeData.intendedUseCodes)) {
          setIntendedUseCodeData(programCodeData.intendedUseCodes);
          setSourceTypeCodeData(programCodeData.sourceTypeCode);
          setRoleCodeData(programCodeData.entityRoleCode);
          setIndividualQualifierData(programCodeData.individualQualifier);
        }
      })
      .catch((err) => {
        console.log(err);
        setIntendedUseCodeData([]);
        setSourceTypeCodeData([]);
        setRoleCodeData([]);
        setIndividualQualifierData([]);
      });
  };
  const countryCodeApi = () => {
    axiosPrivate.get(`/pgaIdentifier/get-all-country-codes`).then((response) => {
      setCountryCodeData(response.data);
    }).catch((err) => {
      console.log(err);
    });
  }
  const stateCodeApi = () => {
    axiosPrivate.get(`/pgaIdentifier/get-state-codes?countryCode=${userProductForm.country}`).then((response) => {
      setStateCodeData(response.data.stateCodes);
    }).catch((err) => {
      console.log(err);
    });
  };

  const handleChangeFields = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setUserProductForm({
      ...userProductForm,
      [name]: value,
    });
    if (editingIndex !== -1) {
      const newPartyDetails = [...partyDetails];
      newPartyDetails[editingIndex][name] = value;
      setPartyDetails(newPartyDetails);
    }
  };
  const handleDateChange = (date: Dayjs | null) => {
    setUserProductForm(prevState => ({
      ...prevState,
      anticipatedArrivalDate: date,
    }));
  };

  const handleTimeChange = (time: Dayjs | null) => {
    setUserProductForm(prevState => ({
      ...prevState,
      anticipatedArrivalTime: time,
    }));
  };

  const handleAddArrayData = (
    formDataArray: Partial<IProductField>[],
    setFormDataArray: React.Dispatch<React.SetStateAction<Partial<IProductField>[]>>,
    fieldsToReset: string[]
  ) => {
    const newData: Partial<IProductField> = {};

    fieldsToReset.forEach(field => {
      newData[field] = userProductForm[field];
    });

    setFormDataArray([...formDataArray, newData]);

    const resetForm: Partial<IProductField> = {};
    fieldsToReset.forEach(field => {
      resetForm[field] = '';
    });

    setUserProductForm(prevState => ({
      ...prevState,
      ...resetForm
    }));
    handleClosePartiesModal();
    setEditingIndex(-1);
  };

  const editArrayList = (
    index: number,
    dataArray: Partial<IProductField>[],
    setArrayState: React.Dispatch<React.SetStateAction<Partial<IProductField>[]>>,
    setUserFormState: React.Dispatch<React.SetStateAction<IProductField>>,
    setEditingIndex: React.Dispatch<React.SetStateAction<number>>
  ) => {
    const elementToEdit = dataArray[index];
    setUserFormState({
      ...userProductForm,
      ...elementToEdit
    });
    setEditingIndex(index);
    const updatedArray = [...dataArray];
    updatedArray.splice(index, 1);
    setArrayState(updatedArray);
  };


  const deleteArrayList = (
    index: number,
    dataArray: Partial<IProductField>[],
    setArrayState: React.Dispatch<React.SetStateAction<Partial<IProductField>[]>>,
  ) => {
    const updatedElements = [...dataArray];
    updatedElements.splice(index, 1);
    setArrayState(updatedElements);
  };


  const saveInputFieldsData = () => {
    const payload = {
      productCode: concatenatedProductCode,
      uniqueUserIdentifier: uniqueUserIdentifier,
      productInfo: {
        baseUOM: "",
        anticipatedArrivalInformation: anticipatedArrivalInformationArray,
        baseQuantity: 0,
        productConstituentElements,
        productOrigin,
        tradeOrBrandName,
        partyDetails,
        productPackaging,
        commodityDesc,
        productCodeNumber: concatenatedProductCode,
        productCodeQualifier,
        commercialDesc,
        priorNoticeNumber: 1,
        packageTrackingNumberCode,
        packageTrackingNumber,
        intendedUseCode,
        intendedUseDescription,
        correctionIndicator,
        disclaimer,
        affirmationOfComliance,
        productCondition,
        containerInformation,
        additionalInformations,
        pgaLineNumber,
        remarksTypeCode,
        remarksText,
        governmentAgencyCode,
        governmentAgencyProgramCode,
        governmentAgencyProcessingCode,
        itemType,
        issuerOfLPCO,
        governmentGeographicCodeQualifier,
        locationOfIssuerOfTheLPCO,
        issuingAgencyLocation,
        transactionType,
        lpcoOrCodeType,
        lpcoOrPncNumber,
        containerDimensionsOne,
        containerDimensionsTwo,
        containerDimensionsThree,
        substitutionIndicator,
        substitutionNumber,
      },
    };
    axiosPrivate.post(`/products/save`, payload).then((response) => {
      console.log(response.data);
      setUserProductForm(getInitialProductFormState());
      setInputProductCode("")
      setCurrentStep(1);
    }).catch((error) => {
      console.log(error);
    });
  }

  const isAnyFieldFilled = (fields: string[]) => {
    return fields.some(field => !!userProductForm[field]);
  };

  const handleDeleteRow = (index: number) => {
    const newPartyDetails = partyDetails.filter((_, i) => i !== index);
    setPartyDetails(newPartyDetails);
  };

  const handleEditRow = (party: Partial<IProductField>, index: number) => {
    setUserProductForm({
      ...userProductForm,
      partyType: party.partyType || userProductForm.partyType,
      partyIdentifierType: party.partyIdentifierType || userProductForm.partyIdentifierType,
      partyIdentifierNumber: party.partyIdentifierNumber || userProductForm.partyIdentifierNumber,
      partyName: party.partyName || userProductForm.partyName,
      address1: party.address1 || userProductForm.address1,
      address2: party.address2 || userProductForm.address2,
      apartmentOrSuiteNo: party.apartmentOrSuiteNo || userProductForm.apartmentOrSuiteNo,
      city: party.city || userProductForm.city,
      country: party.country || userProductForm.country,
      stateOrProvince: party.stateOrProvince || userProductForm.stateOrProvince,
      postalCode: party.postalCode || userProductForm.postalCode,
      individualQualifier: party.individualQualifier || userProductForm.individualQualifier,
      contactPerson: party.contactPerson || userProductForm.contactPerson,
      telephoneNumber: party.telephoneNumber || userProductForm.telephoneNumber,
      email: party.email || userProductForm.email,
    });
    setEditingIndex(index);
    setOpenPartiesModal(true);
  };


  const renderTable = () => {
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ fontSize: "14px" }}>PartyType</TableCell>
              <TableCell align="center" sx={{ fontSize: "14px" }}>IdentifierType</TableCell>
              <TableCell align="center" sx={{ fontSize: "14px" }}>IdentifierNumber</TableCell>
              <TableCell align="center" sx={{ fontSize: "14px" }}>Name</TableCell>
              <TableCell align="center" sx={{ fontSize: "14px" }}>IndividualQualifier</TableCell>
              <TableCell align="center" sx={{ fontSize: "14px" }}>ContactPerson</TableCell>
              <TableCell align="center" sx={{ fontSize: "14px" }}>Telephone</TableCell>
              <TableCell align="center" sx={{ fontSize: "14px" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {partyDetails.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10} align="center">
                  <h6 style={{ margin: "5px", color: "rgba(2, 118, 164, 0.5)" }}>Add Party Details</h6>
                </TableCell>
              </TableRow>
            ) : (
              partyDetails.map((party, index) => (
                <TableRow key={index}>
                  <TableCell className="truncate" component="th" scope="row">
                    {party.partyType}
                  </TableCell>
                  <TableCell className="truncate" align="center" sx={{ fontSize: "12px" }}>{party.partyIdentifierType}</TableCell>
                  <TableCell className="truncate" align="center" sx={{ fontSize: "12px" }}>{party.partyIdentifierNumber}</TableCell>
                  <TableCell className="truncate" align="center" sx={{ fontSize: "12px" }}>{party.partyName}</TableCell>
                  <TableCell className="truncate" align="center" sx={{ fontSize: "12px" }}>{party.individualQualifier}</TableCell>
                  <TableCell className="truncate" align="center" sx={{ fontSize: "12px" }}>{party.contactPerson}</TableCell>
                  <TableCell className="truncate" align="center" sx={{ fontSize: "12px" }}>{party.telephoneNumber}</TableCell>
                  <TableCell align="center" sx={{ fontSize: "12px", display: "flex" }}>
                    <Tooltip title="Edit">
                      <IconButton onClick={() => handleEditRow(party, index)} size="small">
                        <EditIcon fontSize="inherit" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton onClick={() => handleDeleteRow(index)} size="small">
                        <DeleteIcon fontSize="inherit" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    );
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
                  onClick={() => toggleDropdown("recordIdentifier")}
                >
                  <div className="dropdown_header_icon">
                    <BiSolidRightArrow className={`dropdown_icon ${dropdownStates.recordIdentifier ? "rotate" : ""}`} />
                  </div>
                  <div className="dropdown_header_text">
                    <h3>Record Identifier</h3>
                  </div>
                </div>
                {dropdownStates.recordIdentifier && (
                  <div className="dropdown_items">
                    <div className="items">
                      <InputField type="text" name="controlIdentifier" label="Control Identifier" value={userProductForm.controlIdentifier} onChange={handleChangeFields} />
                      <InputField type="text" name="commercialDesc" label="Commercial Description" value={userProductForm.commercialDesc} onChange={handleChangeFields} />
                    </div>
                  </div>
                )}
              </div>
              <div className="dropdown_container">
                <div
                  className="dropdown_header"
                  onClick={() => toggleDropdown("pgaIdentifier")}
                >
                  <div className="dropdown_header_icon">
                    <BiSolidRightArrow className={`dropdown_icon ${dropdownStates.pgaIdentifier ? "rotate" : ""}`} />
                  </div>
                  <div className="dropdown_header_text">
                    <h3>PGA Identifier</h3>
                  </div>
                </div>
                {dropdownStates.pgaIdentifier && (
                  <div className="dropdown_items">
                    <div className="items">
                      <InputField type="text" name="pgaLineNumber" label="PGA Line Number" value={userProductForm.pgaLineNumber} disabled />
                      <InputField type="text" name="governmentAgencyCode" label="Government Agency Code" value={userProductForm.governmentAgencyCode} disabled />
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
                      <InputField type="text" label="Intended Use Description" name="intendedUseDescription" value={userProductForm.intendedUseDescription} onChange={handleChangeFields} />
                      <InputField type="text" label="Correction Indicator" name="correctionIndicator" value={userProductForm.correctionIndicator} onChange={handleChangeFields} />
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
                      <InputField type="text" label="Item type" name="itemType" value={userProductForm.itemType} disabled />
                      <InputField type="text" label="Product Code Qualifier" name="productCodeQualifier" value={userProductForm.productCodeQualifier} disabled />
                      <InputField type="text" label="Product Code Number" name="productCodeNumber" value={concatenatedProductCode} readOnly onClick={handleOpen} />
                      <Modal
                        open={openProductCodeBuilder}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description">
                        <Box sx={style}>
                          <ProductCodeBuilder />
                        </Box>
                      </Modal>
                    </div>
                  </div>
                )}
              </div>
              {(["BIO", "VME"].includes(userProductForm.governmentAgencyProgramCode) || ["OTC", "PRE", "INV", "RND"].includes(userProductForm.governmentAgencyProcessingCode)) && (
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
                          options={userProductForm.governmentAgencyProcessingCode === "PHN" ? [] : ["Y"]}
                        />
                        <InputField type="text" label="Name of the Constituent Element" name="constituentElementName" value={userProductForm.constituentElementName} onChange={handleChangeFields} />
                        <InputField type="text" label="Quantity of Constituent Element" name="constituentElementQuantity" value={userProductForm.constituentElementQuantity} onChange={handleChangeFields} />
                        <InputField type="text" label="Unit of Measure" name="constituentElementUnitOfMeasure" value={userProductForm.constituentElementUnitOfMeasure} onChange={handleChangeFields} />
                        <InputField type="text" label="Percent of Constituent Element" name="percentOfConstituentElement" value={userProductForm.percentOfConstituentElement} onChange={handleChangeFields} />
                        <button
                          onClick={() => handleAddArrayData(productConstituentElements, setProductConstituentElements, [
                            'constituentActiveIngredientQualifier',
                            'constituentElementName',
                            'constituentElementQuantity',
                            'constituentElementUnitOfMeasure',
                            'percentOfConstituentElement',
                          ])}
                          disabled={!isAnyFieldFilled([
                            'constituentActiveIngredientQualifier',
                            'constituentElementName',
                            'constituentElementQuantity',
                            'constituentElementUnitOfMeasure',
                            'percentOfConstituentElement',
                          ])}
                        >Add More +
                        </button>
                        {productConstituentElements.length > 0 && (
                          <><p>Product Constituent Element List</p><table>
                            <thead>
                              <tr>
                                <th>Active Ingredient Qualifier</th>
                                <th>Element Name</th>
                                <th>Quantity</th>
                                <th>Unit of Measure</th>
                                <th>Percent</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {productConstituentElements.map((element, index) => (
                                <tr key={index}>
                                  <td>{element.constituentActiveIngredientQualifier}</td>
                                  <td>{element.constituentElementName}</td>
                                  <td>{element.constituentElementQuantity}</td>
                                  <td>{element.constituentElementUnitOfMeasure}</td>
                                  <td>{element.percentOfConstituentElement}</td>
                                  <td>
                                    <Tooltip title="Edit">
                                      <IconButton onClick={() => editArrayList(index, productConstituentElements, setProductConstituentElements, setUserProductForm, setEditingIndex)} size="small">
                                        <EditIcon fontSize="inherit" />
                                      </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete">
                                      <IconButton onClick={() => deleteArrayList(index, productConstituentElements, setProductConstituentElements)} size="small">
                                        <DeleteIcon fontSize="inherit" />
                                      </IconButton>
                                    </Tooltip>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table></>
                        )}
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
                      <button onClick={() => handleAddArrayData(productOrigin, setProductOrigin, [
                        'countryCode',
                        'sourceTypeCode'
                      ])}
                        disabled={!isAnyFieldFilled([
                          'countryCode',
                          'sourceTypeCode'
                        ])}
                      >Add More +</button><br />
                      {productOrigin.length > 0 && (
                        <><p>Product Origin List</p>
                          <table>
                            <thead>
                              <tr>
                                <th>Source Type Code</th>
                                <th>Country Code</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {productOrigin.map((element, index) => (
                                <tr key={index}>
                                  <td>{element.sourceTypeCode}</td>
                                  <td>{element.countryCode}</td>
                                  <td>
                                    <Tooltip title="Edit">
                                      <IconButton onClick={() => editArrayList(index, productOrigin, setProductOrigin, setUserProductForm, setEditingIndex)} size="small">
                                        <EditIcon fontSize="inherit" />
                                      </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete">
                                      <IconButton onClick={() => deleteArrayList(index, productOrigin, setProductOrigin)} size="small">
                                        <DeleteIcon fontSize="inherit" />
                                      </IconButton>
                                    </Tooltip>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table></>
                      )}
                    </div>
                  </div>
                )}
              </div>
              {userProductForm.governmentAgencyProgramCode !== "Standalone_PN" && (
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
                        <InputField type="text" label="Trade Name/Brand Name" name="tradeOrBrandName" value={userProductForm.tradeOrBrandName} onChange={handleChangeFields} />
                      </div>
                    </div>
                  )}
                </div>
              )}
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
                      <InputField type="text" label="Commodity Characteristic Description" name="commodityDesc" value={userProductForm.commodityDesc} onChange={handleChangeFields} />
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
                          <InputField type="text" label="Issuer of LPCO" name="issuerOfLPCO" value={userProductForm.issuerOfLPCO} onChange={handleChangeFields} />
                          <InputField type="text" label="LPCO Issuer - Government Geographic Code Qualifier" name="governmentGeographicCodeQualifier" value={userProductForm.governmentGeographicCodeQualifier} onChange={handleChangeFields} />
                          <InputField type="text" label="Location (Country/State/Province) of Issuer of the LPCO" name="locationOfIssuerOfTheLPCO" value={userProductForm.locationOfIssuerOfTheLPCO} onChange={handleChangeFields} />
                          <InputField type="text" label="Regional description of location of Agency Issuing the LPCO" name="issuingAgencyLocation" value={userProductForm.issuingAgencyLocation} onChange={handleChangeFields} />
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
                          <InputField type="text" label="LPCO Transaction Type" name="transactionType" value={userProductForm.transactionType} onChange={handleChangeFields} />
                          <InputField type="text" label="LPCO Type" name="lpcoOrCodeType" value={userProductForm.lpcoOrCodeType} onChange={handleChangeFields} />
                          <InputField type="text" label="LPCO Number (or Name)" name="lpcoOrPncNumber" value={userProductForm.lpcoOrPncNumber} onChange={handleChangeFields} />
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
              {userProductForm.governmentAgencyProgramCode === "Non_PN" && (
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
                        <InputField type="text" label="Transaction Type" name="transactionType" value={userProductForm.transactionType} onChange={handleChangeFields} />
                        <InputField type="text" label="Code Type" name="lpcoOrCodeType" value={userProductForm.lpcoOrCodeType} onChange={handleChangeFields} />
                        <InputField type="text" label="PNC Number" name="lpcoOrPncNumber" value={userProductForm.lpcoOrPncNumber} onChange={handleChangeFields} />
                      </div>
                    </div>
                  )}
                </div>
              )}
              <div className="next_button">
                <button onClick={nextButtonClick} >NEXT &nbsp;<FaChevronRight /></button>
              </div>
            </div>
          )}
          {currentStep === 2 && (
            <div className="step2">
              <div className="dropdown_container">
                <div
                  className="dropdown_header"
                  onClick={() => toggleDropdown("parties")}
                >
                  <div className="dropdown_header_icon">
                    <BiSolidRightArrow className={`dropdown_icon ${dropdownStates.parties ? "rotate" : ""}`} />
                  </div>
                  <div className="dropdown_header_text">
                    <h3>Parties</h3>
                  </div>
                </div>
                {dropdownStates.parties && (
                  <div className="dropdown_items flex-column">
                    <div className="items">
                      <div className="add_details">
                        <Box sx={{ '& > :not(style)': { m: 1 } }} onClick={handleOpenPartiesModal}>
                          <Fab variant="extended" sx={{ padding: 0 }}>
                            <AddIcon sx={{ mr: 0.5, fontSize: "16px" }} />
                            Add Details
                          </Fab>
                        </Box>
                      </div>
                    </div>
                    {renderTable()}
                  </div>
                )}
              </div>
              <div className="next_previous_button">
                <button onClick={backButtonClick}><FaChevronLeft /> &nbsp;BACK</button>
                <button onClick={nextButtonClick}>NEXT &nbsp;<FaChevronRight /></button>
              </div>
              <Modal
                open={openPartiesModal}
                onClose={handleClosePartiesModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={partyModalStyle}>
                  <div className="dropdown_container">
                    <div
                      className="dropdown_header"
                      onClick={() => partiesDropdown("entityData")}
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
                            options={["16", "47"]}
                          />
                          <InputField type="tel" label="Entity Number" name="partyIdentifierNumber" maxLength={9} value={userProductForm.partyIdentifierNumber} onChange={handleChangeFields} />
                          <InputField type="text" label="Entity Name" name="partyName" value={userProductForm.partyName} onChange={handleChangeFields} />
                          <InputField type="text" label="Entity Address 1" name="address1" value={userProductForm.address1} onChange={handleChangeFields} />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="dropdown_container">
                    <div
                      className="dropdown_header"
                      onClick={() => partiesDropdown("entityAddress")}
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
                          <InputField type="text" label="Entity Address 2" name="address2" value={userProductForm.address2} onChange={handleChangeFields} />
                          <InputField type="text" label="Entity Apartment Number" name="apartmentOrSuiteNo" value={userProductForm.apartmentOrSuiteNo} onChange={handleChangeFields} />
                          <InputField type="text" label="Entity City" value={userProductForm.city} name="city" onChange={handleChangeFields} />
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
                          <InputField type="text" label="Entity Zip" name="postalCode" value={userProductForm.postalCode} onChange={handleChangeFields} />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="dropdown_container">
                    <div
                      className="dropdown_header"
                      onClick={() => partiesDropdown("pointOfContact")}
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
                            options={individualQualifierData}
                          />
                          <InputField type="text" label="Individual Name" name="contactPerson" value={userProductForm.contactPerson} onChange={handleChangeFields} />
                          <InputField type="tel" label="Telephone Number" name="telephoneNumber" value={userProductForm.telephoneNumber} onChange={handleChangeFields} />
                          <InputField type="email" label="Email" name="email" value={userProductForm.email} onChange={handleChangeFields} />
                        </div>
                      </div>
                    )}
                  </div>
                  {editingIndex !== -1 ? (
                    <button className="saveChanges" onClick={handleClosePartiesModal}>Save Changes</button>
                  ) : (
                    <button className="saveDetails" onClick={() => handleAddArrayData(partyDetails, setPartyDetails, [
                      'partyType',
                      'partyIdentifierType',
                      'partyIdentifierNumber',
                      'partyName',
                      'address1',
                      'address2',
                      'apartmentOrSuiteNo',
                      'city',
                      'country',
                      'stateOrProvince',
                      'postalCode',
                      'individualQualifier',
                      'contactPerson',
                      'telephoneNumber',
                      'email',
                    ])}
                      disabled={!isAnyFieldFilled([
                        'partyType',
                        'partyIdentifierType',
                        'partyIdentifierNumber',
                        'partyName',
                        'address1',
                        'address2',
                        'apartmentOrSuiteNo',
                        'city',
                        'country',
                        'stateOrProvince',
                        'postalCode',
                        'individualQualifier',
                        'contactPerson',
                        'telephoneNumber',
                        'email',
                      ])}>
                      Save Details
                    </button>
                  )}
                </Box>
              </Modal>
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
                        options={["a", "b", "c", "d", "e", "f", "g", "h", "i"]}
                        onClick={stateCodeApi}
                      />
                      <InputField type="text" label="Affirmation of Compliance Qualifier" name="affirmationComplianceQualifier" value={userProductForm.affirmationComplianceQualifier} onChange={handleChangeFields} />
                      <button
                        onClick={() => handleAddArrayData(affirmationOfComliance, setAffirmationOfComliance, [
                          'affirmationComplianceCode',
                          'affirmationComplianceQualifier',
                        ])}
                        disabled={!isAnyFieldFilled([
                          'affirmationComplianceCode',
                          'affirmationComplianceQualifier',
                        ])}
                      >
                        Add More +
                      </button>
                      {affirmationOfComliance.length > 0 && (
                        <><p>Affirmation of Compliance List</p>
                          <table>
                            <thead>
                              <tr>
                                <th>Affirmation of Compliance Code</th>
                                <th>Affirmation of Compliance Qualifier</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {affirmationOfComliance.map((element, index) => (
                                <tr key={index}>
                                  <td>{element.affirmationComplianceCode}</td>
                                  <td>{element.affirmationComplianceQualifier}</td>
                                  <td>
                                    <Tooltip title="Edit">
                                      <IconButton onClick={() => editArrayList(index, affirmationOfComliance, setAffirmationOfComliance, setUserProductForm, setEditingIndex)} size="small">
                                        <EditIcon fontSize="inherit" />
                                      </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete">
                                      <IconButton onClick={() => deleteArrayList(index, affirmationOfComliance, setAffirmationOfComliance)} size="small">
                                        <DeleteIcon fontSize="inherit" />
                                      </IconButton>
                                    </Tooltip>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table></>
                      )}
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
                      <InputField type="text" label="Remarks Type Code" name="remarksTypeCode" value={userProductForm.remarksTypeCode} onChange={handleChangeFields} readOnly />
                      <InputField type="text" label="Remarks Text" name="remarksText" value={userProductForm.remarksText} onChange={handleChangeFields} />
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
                        options={["A", "F", "R", "D", "H", "U", "P"]}
                      />
                      {userProductForm.governmentAgencyProgramCode === "DRU" && (
                        <>
                          <InputField type="text" label="Degree Type" name="degreeType" value={userProductForm.degreeType} onChange={handleChangeFields} />
                          <InputField type="text" label="Negative Number" name="negativeNumber" value={userProductForm.negativeNumber} onChange={handleChangeFields} />
                          <InputField type="text" label="Actual Temperature" name="actualTemperature" value={userProductForm.actualTemperature} onChange={handleChangeFields} />
                          <InputField type="text" label="Location of Temperature Recording" name="locationOfTemperatureRecording" value={userProductForm.locationOfTemperatureRecording} onChange={handleChangeFields} />
                          <div className="created_date">
                            <label>Production Start date of the Lot</label>
                            <DatePicker
                              defaultValue={userProductForm.productionStartDate}
                              format={dateFormat}
                              onChange={handleDateChange}
                            />
                          </div>
                          <div className="created_date">
                            <label>Production End Date of the Lot</label>
                            <DatePicker
                              defaultValue={userProductForm.productionEndDate}
                              format={dateFormat}
                              onChange={handleDateChange}
                            />
                          </div>
                        </>
                      )}
                      <SelectField label="Lot Number Qualifier" name="lotNumberQualifier" value={userProductForm.lotNumberQualifier} onChange={handleChangeFields}
                        options={((["FOOD", "Non_PN"].includes(userProductForm.governmentAgencyProgramCode) && userProductForm.governmentAgencyProcessingCode === "NSF") ||
                          userProductForm.governmentAgencyProgramCode === "TOB") ? ["3"] : ["1"]} />
                      <InputField type="text" label="Lot Number" name="lotNumber" value={userProductForm.lotNumber} onChange={handleChangeFields} />
                      <InputField type="text" label="PGA Line Value" name="pgaLineValue" value={userProductForm.pgaLineValue} onChange={handleChangeFields} />
                      <button
                        onClick={() => handleAddArrayData(productCondition, setProductCondition, [
                          'temperatureQualifier',
                          'lotNumberQualifier',
                          'lotNumber',
                          'pgaLineValue',
                          'productionStartDate',
                          'productionEndDate',
                          'degreeType',
                          'negativeNumber',
                          'actualTemperature',
                          'locationOfTemperatureRecording',
                        ])}
                        disabled={!isAnyFieldFilled([
                          'temperatureQualifier',
                          'lotNumberQualifier',
                          'lotNumber',
                          'pgaLineValue',
                          'productionStartDate',
                          'productionEndDate',
                          'degreeType',
                          'negativeNumber',
                          'actualTemperature',
                          'locationOfTemperatureRecording',
                        ])}
                      >
                        Add More +
                      </button>
                      {productCondition.length > 0 && (
                        <><p>Product Condition List</p>
                          <table>
                            <thead>
                              <tr>
                                <th>Temperature Qualifier</th>
                                {userProductForm.governmentAgencyProgramCode === "DRU" && (
                                  <><th>Degree Type</th>
                                    <th>Negative Number</th>
                                    <th>Actual Temperature</th>
                                    <th>Location of Temperature Recording</th>
                                    <th>Production Start date</th>
                                    <th>Production End date</th>
                                  </>
                                )}
                                <th>Lot Number Qualifier</th>
                                <th>Lot Number</th>
                                <th>PGA Line Value</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {productCondition.map((element, index) => (
                                <tr key={index}>
                                  <td>{element.temperatureQualifier}</td>
                                  {userProductForm.governmentAgencyProgramCode === "DRU" && (
                                    <><td>{element.degreeType}</td><td>{element.negativeNumber}</td><td>{element.actualTemperature}</td>
                                      <td>{element.locationOfTemperatureRecording}</td>
                                      <td>{formatDate(element.productionStartDate)}</td>
                                      <td>{formatDate(element.productionEndDate)}</td>
                                    </>
                                  )}
                                  <td>{element.lotNumberQualifier}</td>
                                  <td>{element.lotNumber}</td>
                                  <td>{element.pgaLineValue}</td>
                                  <td>
                                    <Tooltip title="Edit">
                                      <IconButton onClick={() => editArrayList(index, productCondition, setProductCondition, setUserProductForm, setEditingIndex)} size="small">
                                        <EditIcon fontSize="inherit" />
                                      </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete">
                                      <IconButton onClick={() => deleteArrayList(index, productCondition, setProductCondition)} size="small">
                                        <DeleteIcon fontSize="inherit" />
                                      </IconButton>
                                    </Tooltip>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table></>
                      )}
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
                        options={["1", "2", "3", "4", "5", "6"]}
                      />
                      <InputField type="text" label="Quantity" name="quantity" value={userProductForm.quantity} onChange={handleChangeFields} />
                      <SelectField
                        label="Unit of Measure (Packaging Level)"
                        name="uom"
                        onChange={handleChangeFields}
                        value={userProductForm.uom}
                        options={["a", "b", "c", "d", "e", "f", "g", "h", "i"]}
                      />
                      <button
                        onClick={() => handleAddArrayData(productPackaging, setProductPackaging, [
                          'packagingQualifier',
                          'uom',
                          'quantity',
                        ])}
                        disabled={!isAnyFieldFilled([
                          'packagingQualifier',
                          'uom',
                          'quantity',
                        ])}
                      >
                        Add More +
                      </button>
                      {productPackaging.length > 0 && (
                        <><p>Product Packaging List</p>
                          <table>
                            <thead>
                              <tr>
                                <th>Packaging Qualifier</th>
                                <th>Quantity</th>
                                <th>Unit of Measure</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {productPackaging.map((element, index) => (
                                <tr key={index}>
                                  <td>{element.packagingQualifier}</td>
                                  <td>{element.quantity}</td>
                                  <td>{element.uom}</td>
                                  <td>
                                    <Tooltip title="Edit">
                                      <IconButton onClick={() => editArrayList(index, productPackaging, setProductPackaging, setUserProductForm, setEditingIndex)} size="small">
                                        <EditIcon fontSize="inherit" />
                                      </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete">
                                      <IconButton onClick={() => deleteArrayList(index, productPackaging, setProductPackaging)} size="small">
                                        <DeleteIcon fontSize="inherit" />
                                      </IconButton>
                                    </Tooltip>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table></>
                      )}
                    </div>
                  </div>
                )}
              </div>
              <div className="next_previous_button">
                <button onClick={backButtonClick}><FaChevronLeft /> &nbsp;BACK</button>
                <button onClick={nextButtonClick}>NEXT &nbsp;<FaChevronRight /></button>
              </div>
            </div>
          )}
          {currentStep === 4 && (
            <div className="step4">
              {(userProductForm.governmentAgencyProgramCode !== "DRU" && userProductForm.governmentAgencyProgramCode !== "TOB" && userProductForm.governmentAgencyProgramCode !== "VME") && (
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
                        <InputField type="text" label="Container-1 No." name="containerNumberOne" value={userProductForm.containerNumberOne} onChange={handleChangeFields} />
                        <InputField type="text" label="Container-2 No." name="containerNumberTwo" value={userProductForm.containerNumberTwo} onChange={handleChangeFields} />
                        <InputField type="text" label="Container-3 No." name="containerNumberThree" value={userProductForm.containerNumberThree} onChange={handleChangeFields} />
                        <button
                          onClick={() => handleAddArrayData(containerInformation, setContainerInformation, [
                            'containerNumberOne',
                            'containerNumberTwo',
                            'containerNumberThree',
                          ])}
                          disabled={!isAnyFieldFilled([
                            'containerNumberOne',
                            'containerNumberTwo',
                            'containerNumberThree',
                          ])}
                        >
                          Add More +
                        </button>
                        {containerInformation.length > 0 && (
                          <><p>Shipping Container Information List</p>
                            <table>
                              <thead>
                                <tr>
                                  <th>Container-1 No.</th>
                                  <th>Container-2 No.</th>
                                  <th>Container-3 No.</th>
                                  <th>Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {containerInformation.map((element, index) => (
                                  <tr key={index}>
                                    <td>{element.containerNumberOne}</td>
                                    <td>{element.containerNumberTwo}</td>
                                    <td>{element.containerNumberThree}</td>
                                    <td>
                                      <Tooltip title="Edit">
                                        <IconButton onClick={() => editArrayList(index, containerInformation, setContainerInformation, setUserProductForm, setEditingIndex)} size="small">
                                          <EditIcon fontSize="inherit" />
                                        </IconButton>
                                      </Tooltip>
                                      <Tooltip title="Delete">
                                        <IconButton onClick={() => deleteArrayList(index, containerInformation, setContainerInformation)} size="small">
                                          <DeleteIcon fontSize="inherit" />
                                        </IconButton>
                                      </Tooltip>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table></>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
              {userProductForm.governmentAgencyProgramCode === "Standalone_PN" && (
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
                        <InputField type="text" label="Package Tracking Number Code" name="packageTrackingNumberCode" value={userProductForm.packageTrackingNumberCode} onChange={handleChangeFields} />
                        <InputField type="text" label="Package Tracking Number" name="packageTrackingNumber" value={userProductForm.packageTrackingNumber} onChange={handleChangeFields} />
                      </div>
                    </div>
                  )}
                </div>
              )}
              {userProductForm.governmentAgencyProgramCode === "FOOD" && (
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
                        <InputField type="text" label="Container Dimensions #1" name="containerDimensionsOne" value={userProductForm.containerDimensionsOne} onChange={handleChangeFields} />
                        <InputField type="text" label="Container Dimensions #2" name="containerDimensionsTwo" value={userProductForm.containerDimensionsTwo} onChange={handleChangeFields} />
                        <InputField type="text" label="Container Dimensions #3" name="containerDimensionsThree" value={userProductForm.containerDimensionsThree} onChange={handleChangeFields} />
                        <InputField type="text" label="Package Tracking Number Code" name="packageTrackingNumberCode" value={userProductForm.packageTrackingNumberCode} onChange={handleChangeFields} />
                        <InputField type="text" label="Package Tracking Number" name="packageTrackingNumber" value={userProductForm.packageTrackingNumber} onChange={handleChangeFields} />
                      </div>
                    </div>
                  )}
                </div>
              )}
              {userProductForm.governmentAgencyProgramCode === "Non_PN" && (
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
                        <InputField type="text" label="Container Dimensions #1" name="containerDimensionsOne" value={userProductForm.containerDimensionsOne} onChange={handleChangeFields} />
                        <InputField type="text" label="Container Dimensions #2" name="containerDimensionsTwo" value={userProductForm.containerDimensionsTwo} onChange={handleChangeFields} />
                        <InputField type="text" label="Container Dimensions #3" name="containerDimensionsThree" value={userProductForm.containerDimensionsThree} onChange={handleChangeFields} />
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
                      <SelectField label="Anticipated Arrival Information" name="anticipatedArrivalInformation" value={userProductForm.anticipatedArrivalInformation} onChange={handleChangeFields}
                        options={["FOOD", "Standalone_PN"].includes(userProductForm.governmentAgencyProgramCode) ? ["A"] :
                          ["BIO", "COS", "DRU", "Non_PN", "DEV", "TOB", "RAD", "VME"].includes(userProductForm.governmentAgencyProgramCode) ? ["A", "F"] : []}
                      />
                      <div className="created_date">
                        <label>Anticipated Arrival Date at Port Entry</label>
                        <DatePicker
                          defaultValue={userProductForm.anticipatedArrivalDate}
                          format={dateFormat}
                          onChange={handleDateChange}
                        />
                      </div>
                      <div className="created_date">
                        <label>Anticipated Arrival Time at Port Entry</label>
                        <TimePicker
                          format="HH:mm"
                          value={userProductForm.anticipatedArrivalTime}
                          onChange={handleTimeChange}
                        />
                      </div>
                      <SelectField label="Arrival Location Code" name="inspectionOrArrivalLocationCode" value={userProductForm.inspectionOrArrivalLocationCode} onChange={handleChangeFields} options={["FOOD", "Standalone_PN"].includes(userProductForm.governmentAgencyProgramCode) ? ["2"] : ["4"]} />
                      <SelectField
                        label="Arrival Location"
                        name="inspectionOrArrivalLocation"
                        onChange={handleChangeFields}
                        value={userProductForm.inspectionOrArrivalLocation}
                        options={["a", "b", "c", "d", "e", "f", "g", "h", "i"]}
                      />
                      <button
                        onClick={() => handleAddArrayData(anticipatedArrivalInformationArray, setAnticipatedArrivalInformationArray, [
                          'anticipatedArrivalInformation',
                          'anticipatedArrivalDate',
                          'anticipatedArrivalTime',
                          'inspectionOrArrivalLocation',
                          'inspectionOrArrivalLocationCode',
                        ])}
                        disabled={!isAnyFieldFilled([
                          'anticipatedArrivalInformation',
                          'anticipatedArrivalDate',
                          'anticipatedArrivalTime',
                          'inspectionOrArrivalLocation',
                          'inspectionOrArrivalLocationCode',
                        ])}
                      >
                        Add More +
                      </button>
                      {additionalInformations.length > 0 && (
                        <><p>Anticipated Arrival Information List</p>
                          <table>
                            <thead>
                              <tr>
                                <th>Anticipated Arrival Information</th>
                                <th>Arrival Date at Port Entry</th>
                                <th>Arrival Time at Port Entry</th>
                                <th>Arrival Location Code</th>
                                <th>Arrival Location</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {productPackaging.map((element, index) => (
                                <tr key={index}>
                                  <td>{element.anticipatedArrivalInformation}</td>
                                  <td>{formatDate(element.anticipatedArrivalDate)}</td>
                                  <td>{formatDate(element.anticipatedArrivalTime)}</td>
                                  <td>{element.inspectionOrArrivalLocationCode}</td>
                                  <td>{element.inspectionOrArrivalLocation}</td>
                                  <td>
                                    <Tooltip title="Edit">
                                      <IconButton onClick={() => editArrayList(index, additionalInformations, setAdditionalInformations, setUserProductForm, setEditingIndex)} size="small">
                                        <EditIcon fontSize="inherit" />
                                      </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete">
                                      <IconButton onClick={() => deleteArrayList(index, additionalInformations, setAdditionalInformations)} size="small">
                                        <DeleteIcon fontSize="inherit" />
                                      </IconButton>
                                    </Tooltip>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table></>
                      )}
                    </div>
                  </div>
                )}
              </div>
              <div className="next_previous_button">
                <button onClick={backButtonClick}><FaChevronLeft /> &nbsp;BACK</button>
                <button onClick={nextButtonClick}>NEXT &nbsp;<FaChevronRight /></button>
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
                {dropdownStates.additionalInformation && (
                  <div className="dropdown_items">
                    <div className="items">
                      <SelectField
                        label="Additional information qualifier code"
                        name="additionalInformationQualifierCode"
                        onChange={handleChangeFields}
                        value={userProductForm.additionalInformationQualifierCode}
                        options={["ENA", "AD1", "AD2", "AD3", "AD4", "AD5", "ECI", "INA", "EMA", "TBN"]}
                      />
                      <InputField type="text" label="Additional Information" name="additionalInformation" value={userProductForm.additionalInformation} onChange={handleChangeFields} />
                      <button
                        onClick={() => handleAddArrayData(additionalInformations, setAdditionalInformations, [
                          'additionalInformationQualifierCode',
                          'additionalInformation',
                        ])}
                        disabled={!isAnyFieldFilled([
                          'additionalInformationQualifierCode',
                          'additionalInformation',
                        ])}
                      >
                        Add More +
                      </button>
                      {additionalInformations.length > 0 && (
                        <><p>Additional Information List</p>
                          <table>
                            <thead>
                              <tr>
                                <th>Additional information qualifier code</th>
                                <th>Additional Information</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {productPackaging.map((element, index) => (
                                <tr key={index}>
                                  <td>{element.additionalInformationQualifierCode}</td>
                                  <td>{element.additionalInformation}</td>
                                  <td>
                                    <Tooltip title="Edit">
                                      <IconButton onClick={() => editArrayList(index, additionalInformations, setAdditionalInformations, setUserProductForm, setEditingIndex)} size="small">
                                        <EditIcon fontSize="inherit" />
                                      </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete">
                                      <IconButton onClick={() => deleteArrayList(index, additionalInformations, setAdditionalInformations)} size="small">
                                        <DeleteIcon fontSize="inherit" />
                                      </IconButton>
                                    </Tooltip>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table></>
                      )}
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
                        options={["S", "E", "R"]}
                      />
                      <InputField type="text" label="Substitution Number" name="substitutionNumber" value={userProductForm.substitutionNumber} onChange={handleChangeFields} />
                    </div>
                  </div>
                )}
              </div>
              <div className="next_previous_button">
                <button onClick={backButtonClick}><FaChevronLeft /> &nbsp;BACK</button>
                <button onClick={saveInputFieldsData}>SUBMIT</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default UserProduct;