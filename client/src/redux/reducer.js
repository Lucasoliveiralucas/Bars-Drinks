import { LOGGEDIN, LOGGEDOUT, SET } from "./actions";

export const initialState = {
  userDataStatus: {
    user: {
      id: null,
      name: null,
      email: null,
      password: null,
      fav_components: null,
      age: 18,
      gender: "something",
    },
    logged: false,
  },
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGGEDIN: {
      return {
        userDataStatus: { user: { ...action.payload.user }, logged: true },
      };
    }
    case LOGGEDOUT: {
      return {
        userDataStatus: {
          user: { ...initialState.userDataStatus.user },
          logged: false,
        },
      };
    }
    case SET: {
    }

    default: {
      return state;
    }
  }
};
