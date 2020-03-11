import React from "react";
import Loader from "./loader";

export default {
  title: "Shared / Loader",
  component: Loader,
  parameters: {
    notes:
      "Shared component: loader shown on API requests. Dotted border added for better visualization."
  },
  decorators: [
    storyFn => <div style={{ border: "1px dotted black" }}>{storyFn()}</div>
  ]
};

export const Desktop1024x768 = () => <Loader />;
Desktop1024x768.story = {
  parameters: {
    viewport: { defaultViewport: "desktop" }
  }
};

export const Mobile320x568 = () => <Loader />;
Mobile320x568.story = {
  parameters: {
    viewport: { defaultViewport: "iphone5" }
  }
};
