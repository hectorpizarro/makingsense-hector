// Mock react-router-dom BrowserRouter to test routing using MemoryRouter
import React from "react";
const rrd = require("react-router-dom");

// Just render plain div with its children
rrd.BrowserRouter = ({ children }) => <div>{children}</div>;

module.exports = rrd;
