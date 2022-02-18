import React, { FC } from "react";
import { FormControl } from "@mui/material";
import { camelToLabel } from "../hepers";
import { makeStyles } from "@mui/styles";
import {
  FormState,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form/dist/types/form";
import { FieldArrayWithId } from "react-hook-form/dist/types/fieldArray";

export type EmployeeFormProps = {
  handleSubmit: UseFormHandleSubmit<any>;
  country: string;
  fields: FieldArrayWithId[];
  register: UseFormRegister<any>;
  formState: FormState<any>;
  submit: (data: any) => void;
};

const EmployeeForm: FC<EmployeeFormProps> = ({
  formState,
  country,
  fields,
  handleSubmit,
  register,
  submit,
}) => {
  const styles = useStyles();
  const getValidationRules = (
    rules:
      | { min: number | undefined; max: number | undefined }
      | boolean
      | string
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

  return (
    <form onSubmit={handleSubmit(submit)}>
      {country &&
        fields.map((item, index) => (
          <FormControl fullWidth={true} key={item.id}>
            <label>{camelToLabel((item as any).name)}</label>
            <input
              style={{ padding: `10px` }}
              {...register(
                `items.${index}.value`,
                getValidationRules((item as any).rules)
              )}
            />
            {formState.errors?.items?.[index]?.value && (
              <small className={styles.error}>
                *{formState.errors?.items?.[index]?.value.message}
              </small>
            )}
          </FormControl>
        ))}
      <input type={"submit"} />
    </form>
  );
};

export default EmployeeForm;

const useStyles = makeStyles({
  error: {
    color: `red`,
  },
});
