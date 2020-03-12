// ----------------------------------------------------------
// --- Values to provide to the app in a config object    ---
// ----------------------------------------------------------
// Google API key. Analytics is used only if this is defined.
const googleApiKey =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_GOOGLE_API_KEY
    : "";

// Marvel API key. In development we use mockserver and a fake key.
const marvelApiKey =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_MARVEL_API_KEY
    : "foo";

// Url prefix to use on all API requests
const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://gateway.marvel.com:443/v1/public"
    : "http://localhost:9000";

// Size of a page in Mainnpm start

const pageSize = 2;

// Max content length supported by Axios requests in bytes
const maxContentLength = 102400;

// Hard limit - max value for page in Main
const maxPage = 999999;

// Labels to use for url in Detail component
const urlLabels = {
  detail: "More details",
  wiki: "Character Wiki",
  comiclink: "Comics"
};

// Marvel url used for required attribution
const marvelUrl = "http://marvel.com";

// styled-components theme object
const theme = {
  fontsize: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl1: "1.25rem",
    xl2: "1.5rem",
    xl3: "1.875rem",
    xl4: "2.25rem",
    xl5: "3rem"
  },
  dim: {
    size1: "0.25rem",
    size2: "0.5rem",
    size3: "0.75rem",
    size4: "1rem",
    size5: "1.25rem",
    size6: "1.5rem",
    size7: "2rem",
    size8: "2.5rem",
    size9: "4rem",
    size10: "5rem",
    size11: "6rem",
    size12: "8rem",
    size13: "10rem"
  },
  color: {
    gray1: "#f7fafc",
    gray2: "#edf2f7",
    gray3: "#e2e8f0",
    gray4: "#cbd5e0",
    gray5: "#a0aec0",
    gray7: "#4a5568",
    gray9: "#1a202c",
    red: "#f56565",
    blue: "#4299e1"
  },
  boxShadow:
    "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
};

// ----------------------------------------------------------
// --- Constant values to use directly, outside of config ---
// ----------------------------------------------------------

// Request is completed, show list.
export const STATUS_IDLE = "status_idle";

// API request in progress, used to show loader.
export const STATUS_LOADING = "status_loading";

// Page is loaded, result or error is waiting to be handled.
// Used to show error message if available.
export const STATUS_LOADED = "status_loaded";

const config = {
  googleApiKey,
  marvelApiKey,
  pageSize,
  baseUrl,
  maxContentLength,
  maxPage,
  urlLabels,
  marvelUrl,
  theme
};

export default config;
