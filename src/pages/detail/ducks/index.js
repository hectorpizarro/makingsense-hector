// "detail" slice, used on Detail to show a character information.
import { createSlice } from "@reduxjs/toolkit";
import Axios from "axios";
import {
  STATUS_IDLE,
  STATUS_LOADING,
  STATUS_LOADED
} from "../../../shared/constants";

const detailSlice = createSlice({
  name: "detail", // slice name, used in components as state.detail
  initialState: {
    attributionText: "", // received on all API requests, required by Marvel
    status: STATUS_LOADING, // used to toggle loader
    // for each child key is character id, content is character object
    charactersById: {},
    error: "", // error message from API request
    // current character id. On Detail unmount is reset to null
    id: null
  },
  reducers: {
    // Set status to 'loading', shows loader
    startCharacterLoading(state, action) {
      state.status = STATUS_LOADING;
      state.error = "";
    },

    // Set status to 'idle', show character info
    endCharacterLoading(state, action) {
      state.status = STATUS_IDLE;
      state.error = "";
    },

    // Set status to 'loaded' and store error
    storeCharacterError(state, action) {
      const { error = "Unknown error" } = action.payload;
      state.status = STATUS_LOADED;
      state.error = error;
    },

    // Set status to loaded, store character
    storeCharacter(state, action) {
      const { id, character, attributionText } = action.payload;
      state.attributionText = attributionText;
      state.charactersById[id] = character;
      state.status = STATUS_LOADED;
      state.error = "";
    },

    // Store character id from URL param
    storeCharacterId(state, action) {
      const { id } = action.payload;
      state.id = id;
    },

    // Resets store when Detail is unmounted
    resetCharacterPage(state, action) {
      state.status = STATUS_LOADING;
      state.id = null;
    }
  }
});

// Export and make actions available
export const {
  startCharacterLoading,
  endCharacterLoading,
  storeCharacterError,
  storeCharacter,
  storeCharacterId,
  resetCharacterPage
} = detailSlice.actions;

/**
 * Stores character. Sends API request only if character wasn't already stored.
 * Array item is an object with format:
 *   {id, name, description, image, nComics, nSeries, nEvents, nStories, urls [{type, url}]}
 * @param {Number} characterId - Character id
 * @param {Object} charactersById - Characters by id stored in slice
 */
export const fetchCharacter = (
  characterId,
  charactersById
) => async dispatch => {
  dispatch(storeCharacterId({ id: characterId })); // Store character id
  if (charactersById[characterId]) {
    dispatch(endCharacterLoading()); // Character ready
    return; // Character already stored, exit
  }
  // Character not stored, start request

  dispatch(startCharacterLoading()); // Set status to show loader
  try {
    const response = await Axios.get(`/api/characters/${characterId}`);

    // Destructure response to obtain total and results
    const {
      data: {
        attributionText,
        data: { total, results }
      }
    } = response;
    if (total !== 1) {
      // Response didn't bring character info, error
      throw new Error("Character not found");
    }

    // Store character destructuring to get only relevant information.
    const {
      id,
      name,
      description,
      thumbnail: { path: imagePath, extension: imageExtension },
      comics: { available: nComics },
      series: { available: nSeries },
      stories: { available: nEvents },
      events: { available: nStories },
      urls
    } = results[0];
    const character = {
      id,
      name,
      description,
      image: `${imagePath}.${imageExtension}`,
      nComics,
      nSeries,
      nEvents,
      nStories,
      urls
    };

    // Request successful, store character
    dispatch(storeCharacter({ attributionText, id, character }));
  } catch (error) {
    // In a production environment we should store error details
    // in an external service like Sentry (https://sentry.io)
    // Request error, store error message
    dispatch(storeCharacterError(error.message || "Unknown error"));
  }
};

export default detailSlice.reducer;
