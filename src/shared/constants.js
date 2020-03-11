const googleApiKey =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_GOOGLE_API_KEY
    : "";
const marvelApiKey =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_MARVEL_API_KEY
    : "foo";
const pageSize = 2;
const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://gateway.marvel.com:443/v1/public"
    : "http://localhost:9000";
const maxContentLength = 102400;
const maxPage = 9999;

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

const config = {
  googleApiKey,
  marvelApiKey,
  pageSize,
  baseUrl,
  maxContentLength,
  maxPage,
  theme
};

export default config;
