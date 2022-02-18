import { useEffect, useState } from "react";
import { countriesConfig } from "../form.config";
import { useFieldArray, useForm } from "react-hook-form";
import { getCountryConfig } from "../hepers";

export const useDynamicForm = () => {
  const [country, setCountry] = useState(countriesConfig[0].name);
  const { handleSubmit, control, register, formState } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });
  useEffect(() => {
    remove();
    getCountryConfig(country).map((field, index) =>
      append({ name: field.name, rules: field.rules })
    );
  }, [country]);

  return {
    formState,
    country,
    setCountry,
    handleSubmit,
    fields,
    register,
  };
};
