import React, { useState, useContext, useEffect, useRef } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  Alert,
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
    dispatch({
      type: "SET_OUTPUT",
      output: { default: "Press Start...", success: "", error: "" },
    });
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
        console.log(data);

        if (data.stdout) {
          dispatch({
            type: "SET_OUTPUT",
            output: { default: "", success: data.stdout, error: "" },
          });
          socket.emit("completeSignal", {
            default: "",
            success: data.stdout,
            error: "",
          });
        } else {
          dispatch({
            type: "SET_OUTPUT",
            output: { default: "", success: "", error: data.stderr },
          });
          socket.emit("completeSignal", {
            default: "",
            success: "",
            error: data.stderr,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const syncRun = () => {
    socket.emit("runSignal");
    runCode();
  };

  useEffect(() => {
    socket.on("runSignal", () => {
      dispatch({
        type: "SET_OUTPUT",
        output: { default: "Press Start...", success: "", error: "" },
      });
      dispatch({ type: "SET_TAB", tab: "2" });
    });
    socket.on("completeSignal", (output) => {
      dispatch({ type: "SET_OUTPUT", output });
    });
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
  }, []);

  useEffect(() => {
    socket.on("syncReset", () => {
      clearCode();
    });
  }, []);

  const syncSelectLanguage = (e) => {
    selectLanguage(e.target.value);
    socket.emit("syncLanguage", { language: e.target.value, newUser: false });
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
        <svg
          width="1em"
          height="1em"
          viewBox="0 0 16 16"
          class="bi bi-caret-right"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M6 12.796L11.481 8 6 3.204v9.592zm.659.753l5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z"
          />
        </svg>
      </Button>

      <span className="ml-2">
        <Button color="danger" onClick={toggle} className="ml-2">
          Reset
          <span className="ml-1">
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              class="bi bi-arrow-repeat"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M2.854 7.146a.5.5 0 0 0-.708 0l-2 2a.5.5 0 1 0 .708.708L2.5 8.207l1.646 1.647a.5.5 0 0 0 .708-.708l-2-2zm13-1a.5.5 0 0 0-.708 0L13.5 7.793l-1.646-1.647a.5.5 0 0 0-.708.708l2 2a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0 0-.708z"
              />
              <path
                fill-rule="evenodd"
                d="M8 3a4.995 4.995 0 0 0-4.192 2.273.5.5 0 0 1-.837-.546A6 6 0 0 1 14 8a.5.5 0 0 1-1.001 0 5 5 0 0 0-5-5zM2.5 7.5A.5.5 0 0 1 3 8a5 5 0 0 0 9.192 2.727.5.5 0 1 1 .837.546A6 6 0 0 1 2 8a.5.5 0 0 1 .501-.5z"
              />
            </svg>
          </span>
        </Button>
      </span>
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

      <div className="float-right">
        <Input
          className="bg-secondary text-white"
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
    </div>
  );
};

export default Toolbar;
