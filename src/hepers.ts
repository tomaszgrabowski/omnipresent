import { countriesConfig, FormConfig } from "./form.config";

export const getCountryConfig = (countryName: string) => {
  const config = countriesConfig.find(
    (country) => country.name === countryName
  );
  const formItems: {
    name: string;
    rules:
      | { min: number | undefined; max: number | undefined }
      | boolean
      | string;
  }[] = [];
  if (config) {
    Object.keys(config).map((item) => {
      const shouldRenderFormItem = config[item as keyof FormConfig];
      if (shouldRenderFormItem) {
        formItems.push({ name: item, rules: config[item as keyof FormConfig] });
      }
    });
  }
  return formItems;
};

export const camelToLabel = (text: string) =>
  text.replace(/([a-z])([A-Z])/g, "$1 $2").toLocaleLowerCase();

export const getValidationRules = (
  rules: { min: number | undefined; max: number | undefined } | boolean | string
) => {
  let _rules: any = {
    required: { value: true, message: "This field is required" },
  };
  if (typeof rules === "object") {
    if (rules.min) {
      _rules = { ..._rules, min: { value: rules.min, message: "Too low" } };
    }
    if (rules.max) {
      _rules = { ..._rules, max: { value: rules.max, message: "Too high" } };
    }
  }
  return _rules;
};
