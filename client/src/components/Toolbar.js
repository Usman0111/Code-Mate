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
import { DataContext } from "../dataContext";
import { socket } from "../socket";
import languageSet from "./languages";

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
    fetch(
      `https://cors-anywhere.herokuapp.com/https://run.glot.io/languages/${data.language}/latest`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token 8b0ebe3b-538e-4886-85f2-3bb8376c0e95",
        },
        body: JSON.stringify({
          stdin: data.input,
          files: [
            {
              name: `Main${data.extension}`,
              content: data.code,
            },
          ],
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        data.stderr
          ? dispatch({ type: "SET_OUTPUT", output: data.stderr })
          : dispatch({ type: "SET_OUTPUT", output: data.stdout });
        socket.emit("completeSignal", data.stdout || data.stderr);
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

  const clearCode = () => {
    const currentLanguage = languages.find(
      (language) => language.name === dataRef.current.language
    );
    currentLanguage.previousCode = "";

    setLaguages([
      ...languages.map((language) =>
        language.name === dataRef.current.language ? currentLanguage : language
      ),
    ]);

    dispatch({ type: "EDIT_CODE", newCode: currentLanguage.defaultCode });
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

  useEffect(() => {
    socket.on("syncLanguage", (option) => {
      selectLanguage(option);
      const list = document.getElementById("languages");
      list.value = option;
    });
    socket.on("syncReset", () => {
      clearCode();
    });
  }, []);

  const syncSelectLanguage = (e) => {
    selectLanguage(e.target.value);
    socket.emit("syncLanguage", e.target.value);
  };

  const syncClearCode = () => {
    clearCode();
    socket.emit("syncReset");
    toggle();
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
          <Button color="danger" onClick={syncClearCode}>
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
        <option value="javascript">JavaScript</option>
        <option value="java">Java</option>
        <option value="go">Go</option>
        <option value="csharp">C#</option>
      </Input>
    </div>
  );
};

export default Toolbar;
