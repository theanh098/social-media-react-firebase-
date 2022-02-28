export const initialState = {
  createpostModal: false,
};
export const reducer = (state, action) => {
  switch (action.type) {
    case "show_cpm":
      return {
        ...state,
        createpostModal: true,
      };
    case "close_cpm":
      return {
        ...state,
        createpostModal: false,
      };

    default:
      return state;
  }
};
