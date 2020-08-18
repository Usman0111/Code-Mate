import React, { useState, useContext, useEffect, useRef } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  Alert,
  Label,
  Input,
} from "reactstrap";
import axios from "axios";
import { DataContext } from "../dataContext";
import { socket } from "../socket";
import languageSet from "./languages";

const baxios = axios.create({
  headers: {
    Authorization: "Token 8b0ebe3b-538e-4886-85f2-3bb8376c0e95",
  },
});

const Toolbar = () => {
  const { data, dispatch } = useContext(DataContext);
  const [languages, setLaguages] = useState(languageSet);
  const dataRef = useRef(data);
  dataRef.current = data;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const runCode = () => {
    dispatch({ type: "SET_OUTPUT", output: "Running Code..." });
    dispatch({ type: "SET_TAB", tab: "2" });
    baxios
      .post(
        `https://cors-anywhere.herokuapp.com/https://run.glot.io/languages/${data.language}/latest`,
        {
          stdin: data.input,
          files: [
            {
              name: `main.${data.extension}`,
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

    socket.on("syncLanguage", (option) => {
      selectLanguage(option);
      const list = document.getElementById("languages");
      list.value = option;
    });
  }, [dispatch]);

  const clearCode = () => {
    const currentLanguage = languages.find(
      (language) => language.name === data.language
    );
    currentLanguage.previousCode = "";

    setLaguages([
      ...languages.map((language) =>
        language.name === data.language ? currentLanguage : language
      ),
    ]);

    dispatch({ type: "EDIT_CODE", newCode: currentLanguage.defaultCode });
    socket.emit("editCode", currentLanguage.defaultCode);
    toggle();
  };

  const selectLanguage = (option) => {
    const currentLanguage = languages.find(
      (language) => language.name === dataRef.current.language
    );

    if (dataRef.current.code !== currentLanguage.defaultCode) {
      currentLanguage.previousCode = dataRef.current.code;

      setLaguages([
        ...languages.map((language) =>
          language.name === dataRef.current.language
            ? currentLanguage
            : language
        ),
      ]);
    }

    dispatch({
      type: "SET_LANGUAGE",
      language: languages.find((language) => language.name === option),
    });
  };

  const syncSelectLanguage = (e) => {
    selectLanguage(e.target.value);
    socket.emit("syncLanguage", e.target.value);
  };

  return (
    <div>
      <Button color="success" onClick={syncRun}>
        Run
      </Button>

      <Button color="danger" onClick={toggle}>
        Reset
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalBody>
          <Alert color="danger">
            <b>Warning!</b> you are about to reset the code for everyone in the
            room
          </Alert>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={clearCode}>
            Confirm
          </Button>{" "}
          <Button color="primary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      <Label for="languages">Language</Label>
      <Input
        type="select"
        name="languages"
        id="languages"
        onChange={syncSelectLanguage}
      >
        <option value="cpp">C++</option>
        <option value="python">Python</option>
      </Input>
    </div>
  );
};

export default Toolbar;
