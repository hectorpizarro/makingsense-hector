// unit tests "characters" slice actions, reducers.
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import mockAxios from "axios";

import {
  startLoading,
  endLoading,
  storeError,
  storePage,
  storePageId,
  fetchPageCharacters
} from "./index";
import charactersReducer from "./index";
import {
  STATUS_IDLE,
  STATUS_LOADING,
  STATUS_LOADED
} from "../../../shared/constants";

const initialState = {
  attributionText: "",
  byPage: {},
  status: STATUS_LOADING,
  totalPages: 0,
  page: 1,
  error: ""
};

// Used to test async action using dispatch(), see "Test async actions" down
const middlewares = [thunk];
// Used to test async action using dispatch(), see "Test async actions" down
const mockStore = configureMockStore(middlewares);

describe("Redux characters slice", () => {
  describe("Test actions", () => {
    it("startLoading()", () => {
      const expectedAction = {
        type: "characters/startLoading"
      };
      expect(startLoading()).toEqual(expectedAction);
    });

    it("endLoading()", () => {
      const expectedAction = {
        type: "characters/endLoading"
      };
      expect(endLoading()).toEqual(expectedAction);
    });

    it("storeError()", () => {
      const error = "error message 01";
      const expectedAction = {
        type: "characters/storeError",
        payload: { error }
      };
      expect(storeError({ error })).toEqual(expectedAction);
    });

    it("storePage()", () => {
      const totalPages = 2;
      const characters = [];
      const page = 1;
      const expectedAction = {
        type: "characters/storePage",
        payload: { totalPages, characters, page }
      };
      expect(storePage({ totalPages, characters, page })).toEqual(
        expectedAction
      );
    });

    it("storePageId()", () => {
      const page = 123;
      const expectedAction = {
        type: "characters/storePageId",
        payload: { page }
      };
      expect(storePageId({ page })).toEqual(expectedAction);
    });
  });

  describe("Test reducers", () => {
    it("should return the initial state", () => {
      expect(charactersReducer(undefined, {})).toEqual(initialState);
    });

    it("should handle startLoading()", () => {
      const initial = { ...initialState, status: STATUS_IDLE, error: "msg" };
      expect(charactersReducer(initial, startLoading())).toEqual(initialState);
    });

    it("should handle endLoading()", () => {
      const initial = { ...initialState, error: "msg" };
      expect(charactersReducer(initial, endLoading())).toEqual({
        ...initialState,
        status: STATUS_IDLE,
        error: ""
      });
    });

    it("should handle storeError()", () => {
      const initial = { ...initialState };
      const error = "error01";
      expect(charactersReducer(initial, storeError({ error }))).toEqual({
        ...initialState,
        status: STATUS_LOADED,
        error
      });
    });

    it("should handle storePage()", () => {
      const initial = { ...initialState };
      const attributionText = "foo";
      const totalPages = 2;
      const characters = [];
      const page = 1;
      expect(
        charactersReducer(
          initial,
          storePage({ attributionText, totalPages, characters, page })
        )
      ).toEqual({
        ...initialState,
        attributionText,
        totalPages,
        status: STATUS_LOADED,
        error: "",
        byPage: {
          [page]: characters
        }
      });
    });

    it("should handle storePageId()", () => {
      const initial = { ...initialState };
      const page = 3;
      expect(charactersReducer(initial, storePageId({ page }))).toEqual({
        ...initialState,
        page
      });
    });
  });

  // Test fetchPageCharacters async action, uses multiple dispatch()
  describe("Test async actions with fetchPageCharacters()", () => {
    // Page was already stored, no API call
    it("Page data already stored", () => {
      const expectedActions = [
        { type: "characters/storePageId", payload: { page: 1 } }
      ];
      const store = mockStore({ characters: initialState });

      return store
        .dispatch(fetchPageCharacters(1, { 1: { foo: "bar" } }))
        .then(() => {
          // return of async actions
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    // API response is invalid
    it("Bad API response", () => {
      mockAxios.get.mockResolvedValueOnce({
        data: { data: {} }
      });

      const expectedActions = [
        { type: "characters/storePageId", payload: { page: 1 } },
        { type: "characters/startLoading", payload: undefined },
        {
          type: "characters/storeError",
          payload: {
            error: "Cannot read property 'map' of undefined"
          }
        }
      ];
      const store = mockStore({ characters: initialState });

      return store.dispatch(fetchPageCharacters(1, {})).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    // API response valid, no characters returned
    it("No characters on response", () => {
      mockAxios.get.mockResolvedValueOnce({
        data: {
          code: 200,
          status: "Ok",
          attributionText: "Data provided by Marvel. © 2020 MARVEL",
          data: {
            offset: 0,
            limit: 5,
            total: 0,
            count: 0,
            results: []
          }
        }
      });

      const expectedActions = [
        { type: "characters/storePageId", payload: { page: 1 } },
        { type: "characters/startLoading", payload: undefined },
        {
          type: "characters/storePage",
          payload: {
            attributionText: "Data provided by Marvel. © 2020 MARVEL",
            characters: [],
            page: 1,
            totalPages: 1
          }
        }
      ];
      const store = mockStore({ characters: initialState });

      return store.dispatch(fetchPageCharacters(1, {})).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    // API response returns network error
    it("Network error", () => {
      const createError = require("http-errors");

      mockAxios.get.mockRejectedValueOnce(createError(401, "foo bar"));

      const expectedActions = [
        { type: "characters/storePageId", payload: { page: 1 } },
        { type: "characters/startLoading", payload: undefined },
        {
          type: "characters/storeError",
          payload: {
            error: "foo bar"
          }
        }
      ];
      const store = mockStore({ characters: initialState });

      return store.dispatch(fetchPageCharacters(1, {})).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});
