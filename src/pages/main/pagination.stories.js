// Storybook tests for Pagination component
import React from "react";
import { PurePagination } from "./pagination";

export default {
  title: "Main / Pagination",
  component: PurePagination,
  parameters: {
    notes: "Main - pagination component."
  }
};

// Test buttons active
export const Desktop = () => (
  <PurePagination totalPages={3} page={2} history={[]} />
);
Desktop.story = {
  parameters: {
    viewport: { defaultViewport: "desktop" }
  }
};

// Test buttons disabled
export const DesktopAllDisabled = () => (
  <PurePagination totalPages={1} page={1} history={[]} />
);
DesktopAllDisabled.story = {
  parameters: {
    viewport: { defaultViewport: "desktop" }
  }
};

// Test Previous button disabled
export const DesktopAllNoPrevious = () => (
  <PurePagination totalPages={2} page={1} history={[]} />
);
DesktopAllNoPrevious.story = {
  parameters: {
    viewport: { defaultViewport: "desktop" }
  }
};

// Test Next button disabled
export const DesktopAllNoNext = () => (
  <PurePagination totalPages={2} page={2} history={[]} />
);
DesktopAllNoNext.story = {
  parameters: {
    viewport: { defaultViewport: "desktop" }
  }
};

// Test on mobile
export const Mobile320x568 = () => (
  <PurePagination totalPages={3} page={2} history={[]} />
);
Mobile320x568.story = {
  parameters: {
    viewport: { defaultViewport: "iphone5" }
  }
};
