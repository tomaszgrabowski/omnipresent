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
import {
  countries,
  countriesConfig,
  FormConfig,
  FormConfigAllowedType,
} from "./form.config";
import FormItem from "./FormItem";

function App() {
  const styles = useStyles();
  const [country, setCountry] = useState(countriesConfig[0].name);
  useEffect(() => {
    console.log(country);
  }, [country]);
  return (
    <main className={styles.container}>
      <Box>
        <Paper className={styles.paper}>
          <Typography variant={"h2"}>Employee form</Typography>
          <hr />
          <form action="">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                pick country
              </InputLabel>
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
            {country &&
              getCountryConfig(country).map((item) => (
                <FormItem name={item.name} value={item.value} />
              ))}
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
  const formItems: { name: string; value: FormConfigAllowedType }[] = [];
  if (config) {
    Object.keys(config).map((item) => {
      const shouldRenderFormItem = config[item as keyof FormConfig];
      if (shouldRenderFormItem) {
        formItems.push({ name: item, value: shouldRenderFormItem });
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
});
