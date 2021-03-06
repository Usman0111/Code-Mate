import React, { createContext, useReducer } from "react";
import { dataReducer } from "./dataReducer";

export const DataContext = createContext();

const initialState = {
  code:
    '#include <iostream>\r\nusing namespace std;\r\n\r\nint main() {\r\n    cout << "Hello World!";\r\n    return 0;\r\n}',
  extension: ".cpp",
  input: "",
  output: { default: "Press Start...", success: "", error: "" },
  language: "cpp",
  activeTab: "1",
};

const DataContextProvider = (props) => {
  const [data, dispatch] = useReducer(dataReducer, initialState);
  return (
    <DataContext.Provider value={{ data, dispatch }}>
      {props.children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
