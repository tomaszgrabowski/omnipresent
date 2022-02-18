import React, { useEffect } from "react";
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
import { countries } from "./form.config";
import { useDynamicForm } from "./hooks/useDynamicForm";
import EmployeeForm from "./components/EmployeeForm";

function App() {
  const styles = useStyles();
  const { formState, country, setCountry, handleSubmit, fields, register } =
    useDynamicForm();

  const submit = (data: any) => {
    console.log(data, formState);
  };

  useEffect(() => {
    console.log(formState.errors);
  }, [formState.errors]);

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
            <EmployeeForm
              handleSubmit={handleSubmit}
              country={country}
              fields={fields}
              register={register}
              formState={formState}
              submit={submit}
            />
          </FormControl>
        </Paper>
      </Box>
    </main>
  );
}

export default App;

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
