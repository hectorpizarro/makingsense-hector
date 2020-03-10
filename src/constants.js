const googleApiKey =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_GOOGLE_API_KEY
    : "";

const marvelApiKey = process.env.REACT_APP_MARVEL_API_KEY;

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
  }
};

const config = {
  googleApiKey,
  marvelApiKey,
  theme
};

export default config;
