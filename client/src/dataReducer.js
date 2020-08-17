export const dataReducer = (state, action) => {
  switch (action.type) {
    case "EDIT_CODE":
      // console.log(action.newCode);
      return { ...state, code: action.newCode };
    case "SET_INPUT":
      return { ...state, input: action.input };
    case "SET_OUTPUT":
      return { ...state, output: action.output };
    case "SET_TAB":
      return { ...state, activeTab: action.tab };
    default:
      return state;
  }
};
