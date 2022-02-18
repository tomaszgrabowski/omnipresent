import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { countries, countriesConfig, FormConfig } from "./form.config";
import { useFieldArray, useForm } from "react-hook-form";

function App() {
  const styles = useStyles();
  const [country, setCountry] = useState(countriesConfig[0].name);
  const { handleSubmit, control, register, formState } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });
  useEffect(() => {
    remove();
    getCountryConfig(country).map((field, index) =>
      append({ name: field.name })
    );
  }, [country]);

  const submit = (data: any) => console.log(data, formState);

  return (
    <main className={styles.container}>
      <Box className={styles.box}>
        <Paper className={styles.paper}>
          <Typography variant={"h2"}>Employee form</Typography>
          <hr />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">pick country</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={country}
              label="pick country"
              onChange={(event: SelectChangeEvent) =>
                setCountry(event.target.value)
              }
            >
              {countries.map((country) => (
                <MenuItem key={country} value={country}>
                  {country}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <form onSubmit={handleSubmit(submit)}>
            {country &&
              fields.map((item, index) => (
                <FormControl fullWidth={true} key={item.id}>
                  <label>{camelToLabel((item as any).name)}</label>
                  <input
                    style={{ padding: `10px` }}
                    {...register(`items.${index}.value`, {
                      required: true,
                    })}
                  />
                  {formState.errors?.items?.[index]?.value && (
                    <small className={styles.error}>*field is required</small>
                  )}
                </FormControl>
              ))}
            <input type={"submit"} />
          </form>
        </Paper>
      </Box>
    </main>
  );
}

export default App;

const getCountryConfig = (countryName: string) => {
  const config = countriesConfig.find(
    (country) => country.name === countryName
  );
  const formItems: { name: string }[] = [];
  if (config) {
    Object.keys(config).map((item) => {
      const shouldRenderFormItem = config[item as keyof FormConfig];
      if (shouldRenderFormItem) {
        formItems.push({ name: item });
      }
    });
  }
  return formItems;
};

const useStyles = makeStyles({
  container: {
    width: "100%",
    backgroundColor: "lightgray",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "start",
  },
  paper: {
    padding: "50px",
  },
  box: {
    width: `700px`,
  },
  error: {
    color: `red`,
  },
});

const camelToLabel = (text: string) =>
  text.replace(/([a-z])([A-Z])/g, "$1 $2").toLocaleLowerCase();
