// "characters" slice, used on Main to manage characters list.
import { createSlice } from "@reduxjs/toolkit";
import Axios from "axios";
import config, {
  STATUS_IDLE,
  STATUS_LOADING,
  STATUS_LOADED
} from "../../../shared/constants";

const charactersSlice = createSlice({
  name: "characters", // slice name, used in components as state.characters
  initialState: {
    attributionText: "", // received on all API requests, required by Marvel
    byPage: {}, // for each child key is page, content is characters array
    status: STATUS_LOADING, // used to toggle loader
    totalPages: 0, // set after every API request
    // Originally defined as URL param, stored here as single point of truth.
    // Anytime a component wants to update the page it is updated in the url
    // and eventually cascades to be updated here.
    page: 1,
    error: "" // error message from an API request
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
      const { totalPages, characters, page, attributionText } = action.payload;
      state.attributionText = attributionText;
      state.byPage[page] = characters;
      state.totalPages = totalPages;
      state.status = STATUS_LOADED;
      state.error = "";
    },

    // Store page number as received from URL param
    storePageId(state, action) {
      const { page } = action.payload;
      state.page = page;
    }
  }
});

// Export and make actions available
export const {
  startLoading,
  endLoading,
  storeError,
  storePage,
  storePageId
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
  dispatch(storePageId({ page })); // First store page id
  if (charactersByPage[page]) {
    return; // Page already stored, exit
  }
  // Page was not stored, start request

  dispatch(startLoading()); // Set status to show loader
  const params = {
    offset: (page - 1) * config.pageSize,
    orderBy: "name",
    limit: config.pageSize
  };
  try {
    // Send API request. base url and apiKey are added in Axios setup in app.js
    const response = await Axios.get("/api/characters", { params });

    // Destructure response to obtain total and results
    const {
      data: {
        attributionText,
        data: { total, results }
      }
    } = response;

    // Calculate total pages based on total records and page size
    const totalPages = total === 0 ? 1 : Math.ceil(total / config.pageSize);

    // Store results in 'characters' array, destructuring each record to get only relevant information.
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
    dispatch(storePage({ attributionText, totalPages, characters, page }));
  } catch (error) {
    // In a production environment we should store error details
    // in an external service like Sentry (https://sentry.io)
    // Request error, store error message
    dispatch(storeError({ error: error.message || "Unknown error" }));
  }
};

// Reducer function as used by combineReducers
export default charactersSlice.reducer;
