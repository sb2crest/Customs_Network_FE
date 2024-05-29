import dayjs from "dayjs";
import type { Dayjs } from 'dayjs';

export default interface IProductField{
    pgaLineNumber:"001",
    governmentAgencyCode:"FDA",
    governmentAgencyProgramCode: string;
    governmentAgencyProcessingCode: string;
    intendedUseCode: string;
    intendedUseDescription: string;
    correctionIndicator: string;
    disclaimer: string;
    itemType: "P";
    productCodeQualifier: "FDP";
    constituentActiveIngredientQualifier: string;
    constituentElementName: string;
    constituentElementQuantity: string;
    constituentElementUnitOfMeasure: string;
    percentOfConstituentElement: string;
    sourceTypeCode: string;
    countryCode: string;
    tradeOrBrandName: string;
    commodityDesc: string;
    issuerOfLPCO: string;
    governmentGeographicCodeQualifier: string;
    locationOfIssuerOfTheLPCO: string;
    issuingAgencyLocation: string;
    transactionType: string;
    lpcoOrCodeType: string;
    lpcoOrPncNumber: string;
    partyType: string;
    partyIdentifierType: string;
    partyIdentifierNumber: string;
    partyName: string;
    address1: string;
    address2: string;
    apartmentOrSuiteNo: string;
    city: string;
    country: string;
    stateOrProvince: string;
    postalCode: string;
    individualQualifier: string;
    contactPerson: string;
    telephoneNumber: string;
    email: string;
    affirmationComplianceCode: string;
    affirmationComplianceQualifier: string;
    remarksTypeCode: string;
    remarksText: string;
    temperatureQualifier: string;
    degreeType: string;
    negativeNumber: string;
    actualTemperature: string;
    lotNumberQualifier: string;
    locationOfTemperatureRecording: string;
    lotNumber: string;
    productionStartDate: Dayjs | null;
    productionEndDate: Dayjs | null;
    pgaLineValue: string;
    packagingQualifier: string;
    quantity: string;
    uom: string;
    containerNumberOne: string;
    containerNumberTwo: string;
    containerNumberThree: string;
    packageTrackingNumberCode: string;
    packageTrackingNumber: string;
    containerDimensionsOne: string;
    containerDimensionsTwo: string;
    containerDimensionsThree: string;
    anticipatedArrivalInformation: string;
    anticipatedArrivalDate: Dayjs | null;
    anticipatedArrivalTime: Dayjs | null;
    anticipatedArrivalLocationCode: string;
    anticipatedArrivalLocation: string;
    additionalInformationQualifierCode: string;
    additionalInformation: string;
    substitutionIndicator: string;
    substitutionNumber: string;
    [key: string]: string | dayjs.Dayjs | Date | null | undefined;
  }