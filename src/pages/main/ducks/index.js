import { createSlice } from "@reduxjs/toolkit";
import Axios from "axios";
import config from "../../../shared/constants";

// Request is completed, show list.
export const STATUS_IDLE = "status_idle";

// API request in progress, used to show loader.
export const STATUS_LOADING = "status_loading";

// Page is loaded, result or error is waiting to be handled.
// Used to show error message if available.
export const STATUS_LOADED = "status_loaded";

const charactersSlice = createSlice({
  name: "characters",
  initialState: {
    byPage: {}, // key is page, content is characters array
    status: STATUS_LOADING, // used to toggle loader
    totalPages: 0, // sent on every request
    page: 1, // current page ,as received from URL param
    error: "" // error message from API request
  },
  reducers: {
    // Set status to 'loading', shows loader
    startLoading(state, action) {
      state.status = STATUS_LOADING;
      state.error = "";
    },

    // Set status to 'idle', show characters list
    endLoading(state, action) {
      state.status = STATUS_IDLE;
      state.error = "";
    },

    // Set status to 'loaded' and store error
    storeError(state, action) {
      const { error = "Unknown error" } = action.payload;
      state.status = STATUS_LOADED;
      state.error = error;
    },

    // Set status to loaded, store page characters and total pages
    storePage(state, action) {
      const { totalPages, characters, page } = action.payload;
      state.byPage[page] = characters;
      state.totalPages = totalPages;
      state.status = STATUS_LOADED;
      state.error = "";
    },

    // Store page as received from URL param
    setPage(state, action) {
      const { page } = action.payload;
      state.page = page;
    }
  }
});

export const {
  startLoading,
  endLoading,
  storeError,
  storePage,
  setPage
} = charactersSlice.actions;

/**
 * Stores provided page characters list. Sends API request only if page wasn't
 * already stored. Array item is an object with format:
 *   {id, name, image, nComics, nSeries, nEvents, nStories}
 * @param {Number} page - Page , will be stored on reducer
 * @param {Array} charactersByPage - store.characters.byPage
 */
export const fetchPageCharacters = (
  page,
  charactersByPage
) => async dispatch => {
  dispatch(setPage({ page })); // Store page
  if (charactersByPage[page]) {
    return; // Page already stored, exit
  }
  // Page was not stored, start request

  dispatch(startLoading()); // Set status to show loader
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

    // Request successful, store pages total, characters array, page
    dispatch(storePage({ totalPages, characters, page }));
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

    // Request error, store error message
    dispatch(storeError(error.message));
  }
};

export default charactersSlice.reducer;
