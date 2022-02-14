export const countries: string[] = ["Default", "Spain", "Ghana", "Brazil"]; //here we should have all supported countries

export type FormConfig = {
  name: string;
  countryOfWork: boolean;
  firstName: boolean;
  lastName: boolean;
  dateOfBirth: boolean;
  holidayAllowance: boolean | { min: number; max: number };
  martialStatus: boolean;
  socialInsuranceNumber: boolean;
  workingHours: boolean;
};

const defaultConfig = {
  name: "Default",
  countryOfWork: true,
  firstName: true,
  lastName: true,
  dateOfBirth: true,
  holidayAllowance: true,
  martialStatus: false,
  socialInsuranceNumber: false,
  workingHours: false,
};

export const countriesConfig = [
  {
    ...defaultConfig,
    name: "Default",
  },
  {
    ...defaultConfig,
    name: "Spain",
    martialStatus: true,
    socialInsuranceNumber: true,
    holidayAllowance: { min: 30, max: undefined },
  },
  {
    ...defaultConfig,
    name: "Ghana",
    martialStatus: true,
    numberOfChildren: true,
  },
  {
    ...defaultConfig,
    name: "Brazil",
    workingHours: true,
    holidayAllowance: { min: undefined, max: 40 },
  },
];
