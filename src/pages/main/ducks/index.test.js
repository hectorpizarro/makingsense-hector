import {
  startLoading,
  endLoading,
  storeError,
  storePage,
  setPage,
  STATUS_LOADING,
  STATUS_IDLE,
  STATUS_LOADED
} from "./index";
import charactersReducer from "./index";

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

    it("setPage()", () => {
      const page = 123;
      const expectedAction = {
        type: "characters/setPage",
        payload: { page }
      };
      expect(setPage({ page })).toEqual(expectedAction);
    });
  });

  describe("Test reducers", () => {
    const initialState = {
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
      const totalPages = 2;
      const characters = [];
      const page = 1;
      expect(
        charactersReducer(initial, storePage({ totalPages, characters, page }))
      ).toEqual({
        ...initialState,
        totalPages,
        status: STATUS_LOADED,
        error: "",
        byPage: {
          [page]: characters
        }
      });
    });

    it("should handle setPage()", () => {
      const initial = { ...initialState };
      const page = 3;
      expect(charactersReducer(initial, setPage({ page }))).toEqual({
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
