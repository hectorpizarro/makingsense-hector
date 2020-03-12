// unit tests "characters" slice actions, reducers.
import {
  startLoading,
  endLoading,
  storeError,
  storePage,
  storePageId
} from "./index";
import charactersReducer from "./index";
import {
  STATUS_IDLE,
  STATUS_LOADING,
  STATUS_LOADED
} from "../../../shared/constants";

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
    const initialState = {
      attributionText: "",
      byPage: {},
      status: STATUS_LOADING,
      totalPages: 0,
      page: 1,
      error: ""
    };

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
  //   describe("Test async actions", () => {
  //     it("should handle fetchPageCharacters()", () => {

  //     });
  // });
});
