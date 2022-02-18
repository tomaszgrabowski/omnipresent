import React, { FC } from "react";
import { FormControl } from "@mui/material";
import { camelToLabel, getValidationRules } from "../hepers";
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
