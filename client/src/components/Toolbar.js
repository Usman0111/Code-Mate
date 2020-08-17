import React, { useContext, useEffect } from "react";
import { Button } from "reactstrap";
import axios from "axios";
import { DataContext } from "../dataContext";
import { socket } from "../socket";

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
        socket.emit("completeSignal", res.data.stdout || res.data.stderr);
      })
      .catch((err) => console.log(err));
  };

  const syncRun = () => {
    socket.emit("runSignal");
    runCode();
  };

  useEffect(() => {
    socket.on("runSignal", () => {
      dispatch({ type: "SET_OUTPUT", output: "Running Code..." });
      dispatch({ type: "SET_TAB", tab: "2" });
    });
    socket.on("completeSignal", (output) =>
      dispatch({ type: "SET_OUTPUT", output })
    );
  }, [dispatch]);

  return (
    <div>
      <Button color="success" onClick={syncRun}>
        Run
      </Button>
    </div>
  );
};

export default Toolbar;
