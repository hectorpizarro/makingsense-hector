import { createSlice } from "@reduxjs/toolkit";
import Axios from "axios";
import {
  STATUS_IDLE,
  STATUS_LOADING,
  STATUS_LOADED
} from "../../../shared/constants";

const detailSlice = createSlice({
  name: "detail",
  initialState: {
    status: STATUS_LOADING, // used to toggle loader
    charactersById: {},
    error: "", // error message from API request
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
      const { id, character } = action.payload;
      state.charactersById[id] = character;
      state.status = STATUS_LOADED;
      state.error = "";
    },

    // Store character id from URL param
    storeCharacterId(state, action) {
      const { id } = action.payload;
      state.id = id;
    }
  }
});

export const {
  startCharacterLoading,
  endCharacterLoading,
  storeCharacterError,
  storeCharacter,
  storeCharacterId
} = detailSlice.actions;
/*
The biography of the superhero
Any links available for the superhero (urls)

https://gateway.marvel.com:443/v1/public/characters/1011334?apikey=4b31859bc9d554de059b279b79aea0c5
*/

/**
 * Stores character. Sends API request only if character wasn't already stored.
 * Array item is an object with format:
 *   {id, name, image, nComics, nSeries, nEvents, nStories, bio, urls [{type, url}]}
 * @param {Number} characterId - Character id
 * @param {Object} charactersById - Characters by id stored in slice
 */
export const fetchCharacter = (
  characterId,
  charactersById
) => async dispatch => {
  dispatch(storeCharacterId({ id: characterId })); // Store character id

  console.log("fetch character:", characterId, charactersById);

  if (charactersById[characterId]) {
    return; // Character already stored, exit
  }
  // Character not stored, start request

  dispatch(startCharacterLoading()); // Set status to show loader
  try {
    const response = await Axios.get(`/characters/${characterId}`);

    const {
      data: {
        data: { total, results }
      }
    } = response;
    if (total !== 1) {
      throw new Error("Character not found");
    }
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
    dispatch(storeCharacter({ id, character }));
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
    dispatch(storeCharacterError(error.message));
  }
};

export default detailSlice.reducer;
