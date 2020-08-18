export const dataReducer = (state, action) => {
  switch (action.type) {
    case "EDIT_CODE":
      return { ...state, code: action.newCode };
    case "SET_INPUT":
      return { ...state, input: action.input };
    case "SET_OUTPUT":
      return { ...state, output: action.output };
    case "SET_TAB":
      return { ...state, activeTab: action.tab };
    case "SET_LANGUAGE":
      const { language } = action;
      if (language.previousCode) {
        return {
          ...state,
          code: language.previousCode,
          extension: language.extension,
          language: language.name,
        };
      } else {
        return {
          ...state,
          code: language.defaultCode,
          extension: language.extension,
          language: language.name,
        };
      }
    default:
      return state;
  }
};
