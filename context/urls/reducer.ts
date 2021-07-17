import { Url } from "./types";

type State = {
  data: Url[];
};

export const initialState: State = {
  data: [
    {
      _id: "123",
      slug: "google",
      url: "https://google.com",
      opens: ["2021-07-16T23:36:25.941Z"],
    },
    {
      _id: "456",
      slug: "github",
      url: "https://github.com",
      opens: ["2021-06-15T23:36:25.941Z", "2021-07-16T23:36:25.941Z"],
    },
  ],
};

const reducer = (state = initialState, action: boolean) => {
  switch (action) {
    default:
      return state;
  }
};

export default reducer;
