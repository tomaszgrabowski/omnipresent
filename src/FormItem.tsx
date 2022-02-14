import React, { FC } from "react";
import { FormControl, TextField } from "@mui/material";
import { FormConfigAllowedType } from "./form.config";

export type FormItemProps = {
  name: string;
  value: FormConfigAllowedType;
};

const FormItem: FC<FormItemProps> = (props) => {
  return <FormControl fullWidth>{getFormItem(props)}</FormControl>;
};

export default FormItem;

const camelToLabel = (text: string) =>
  text.replace(/([a-z])([A-Z])/g, "$1 $2").toLocaleLowerCase();

const getFormItem = (data: FormItemProps) => {
  if (typeof data.value === "boolean") {
    return (
      <TextField
        label={camelToLabel(data.name)}
        variant="outlined"
        sx={{ margin: "5px 0" }}
      />
    );
  }
  if (typeof data.value === "string") {
    return;
  }
  if (typeof data.value === "object") {
    return (
      <>
        <TextField
          label={camelToLabel(data.name + "From")}
          variant="outlined"
          sx={{ margin: "5px 0" }}
        />
        <TextField
          label={camelToLabel(data.name + "To")}
          variant="outlined"
          sx={{ margin: "5px 0" }}
        />
      </>
    );
  }
};
