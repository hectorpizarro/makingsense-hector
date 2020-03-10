import { createSlice } from "@reduxjs/toolkit";
import Axios from "axios";
import config from "../../../constants";

export const STATUS_IDLE = "status_idle";
export const STATUS_LOADING = "status_loading";
export const STATUS_LOADED = "status_loaded";

const charactersSlice = createSlice({
  name: "characters",
  initialState: {
    curPage: 1,
    byPage: {}, // pageId: characters
    status: STATUS_LOADING,
    totalPages: 0,
    error: ""
  },
  reducers: {
    startLoading(state, action) {
      const { page } = action.payload;
      state.status = STATUS_LOADING;
      state.curPage = page;
      state.error = "";
    },
    endLoading(state, action) {
      state.status = STATUS_IDLE;
      state.error = "";
    },
    storeError(state, action) {
      const { error = "Unknown error" } = action.payload;
      state.status = STATUS_LOADED;
      state.error = error;
    },
    storePage(state, action) {
      const { totalPages, characters } = action.payload;
      state.byPage[state.curPage] = characters;
      state.totalPages = totalPages;
      state.status = STATUS_LOADED;
      state.error = "";
    }
  }
});

export const {
  startLoading,
  endLoading,
  storeError,
  storePage
} = charactersSlice.actions;

export const fetchCharacters = page => async dispatch => {
  dispatch(startLoading({ page }));
  const params = {
    page,
    orderBy: "name",
    limit: config.pageSize
  };
  try {
    const response = await Axios.get("/characters", { params });

    const {
      data: {
        data: { total, results }
      }
    } = response;
    const totalPages = total === 0 ? 1 : Math.ceil(total / config.pageSize);
    const characters = results.map(
      ({
        id,
        name,
        thumbnail: { path: imagePath, extension: imageExtension },
        comics: { available: nComics },
        series: { available: nSeries },
        stories: { available: nEvents },
        events: { available: nStories }
      }) => ({
        id,
        name,
        image: `${imagePath}.${imageExtension}`,
        nComics,
        nSeries,
        nEvents,
        nStories
      })
    );
    dispatch(storePage({ totalPages, characters }));
  } catch (error) {
    // In a production environment we should store error details
    // in an external service like Sentry (https://sentry.io)
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    dispatch(storeError(error.message));
  }
};

export default charactersSlice.reducer;
