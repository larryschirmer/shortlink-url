import { State } from "./types";

export const initialState: State = {
  data: [
    {
      _id: "123",
      name: "Google",
      slug: "google",
      url: "https://google.com",
      opens: ["2021-03-16T23:36:25.941Z"],
      isListed: false,
    },
    {
      _id: "456",
      name: "Github",
      slug: "github",
      url: "https://github.com",
      opens: ["2021-06-15T23:36:25.941Z", "2021-07-16T23:36:25.941Z"],
      isListed: true,
    },
    {
      _id: "789",
      name: "Twitter",
      slug: "twitter",
      url: "https://twitter.com",
      opens: [],
      isListed: true,
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
