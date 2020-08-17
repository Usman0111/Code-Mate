import React, { useContext } from "react";
import { Button } from "reactstrap";
import axios from "axios";
import { DataContext } from "../dataContext";

const baxios = axios.create({
  headers: {
    Authorization: "Token 8b0ebe3b-538e-4886-85f2-3bb8376c0e95",
  },
});

const Toolbar = () => {
  const { data, dispatch } = useContext(DataContext);

  const runCode = () => {
    dispatch({ type: "SET_OUTPUT", output: "Running Code..." });
    dispatch({ type: "SET_TAB", tab: "2" });
    baxios
      .post(
        "https://cors-anywhere.herokuapp.com/https://run.glot.io/languages/cpp/latest",
        {
          stdin: data.input,
          files: [
            {
              name: "main.cpp",
              content: data.code,
            },
          ],
        },
        {
          "Content-Type": "application/json",
        }
      )
      .then((res) => {
        res.data.stderr
          ? dispatch({ type: "SET_OUTPUT", output: res.data.stderr })
          : dispatch({ type: "SET_OUTPUT", output: res.data.stdout });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Button color="success" onClick={runCode}>
        Run
      </Button>
    </div>
  );
};

export default Toolbar;
