// Unit tests Card component
import React from "react";
import { mount } from "enzyme";
import { ThemeProvider } from "styled-components";
import Card, { StyledIconNo, StyledIconYes } from "./card";
import config from "../../shared/constants";
import { Provider } from "react-redux";
import store from "../../store";
import { MemoryRouter } from "react-router-dom";

// Mock a character information
const character = {
  id: 1009146,
  name: "Abomination (Emil Blonsky)",
  image: "/testimages/4ce18691cbf04.jpg",
  nComics: 53,
  nSeries: 26,
  nStories: 1,
  nEvents: 0
};

/**
 * Return Card component as child:
 * - MemoryRouter to avoid Route errors.
 * - ThemeProvider provides styled-components global theme.
 * - Provider provides Redux store
 */
const CardWithProviders = ({ character }) => (
  <Provider store={store}>
    <ThemeProvider theme={config.theme}>
      <MemoryRouter>
        <Card character={character} />
      </MemoryRouter>
    </ThemeProvider>
  </Provider>
);

describe("<Card />", () => {
  it("Contains image", () => {
    const wrapper = mount(<CardWithProviders character={character} />);
    const div = wrapper.find(".thumb");
    expect(div).toHaveLength(1); // componet .thumb
    // thumb contains an image with provided src
    expect(div.html()).toMatch(new RegExp(`<img.*?${character.image}`));
  });

  it("Contains title", () => {
    const wrapper = mount(<CardWithProviders character={character} />);
    const div = wrapper.find(".title"); // component .title
    expect(div).toHaveLength(1);
    expect(div.text()).toEqual(character.name); // contains provided name
  });

  it("Show YES flag for 1 story", () => {
    const wrapper = mount(<CardWithProviders character={character} />);

    // find .nstories DIV
    const div = wrapper.find(".nstories");
    expect(div).toHaveLength(1);
    const icon = div.find(StyledIconYes);
    expect(icon).toHaveLength(1); // Yes icon found
    const span = div.find("span");
    expect(span.text()).toEqual("1 story"); // Shows counter and label
  });

  it("Show NO flag for 0 events", () => {
    const wrapper = mount(<CardWithProviders character={character} />);

    // find .nevents DIV
    const div = wrapper.find(".nevents");
    expect(div).toHaveLength(1);
    const icon = div.find(StyledIconNo);
    expect(icon).toHaveLength(1); // No icon found
    const span = div.find("span");
    expect(span.text()).toEqual("No events"); // Shows counter and label
  });
});
