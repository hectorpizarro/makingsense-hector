import React from "react";
import { shallow, mount } from "enzyme";
import { ThemeProvider } from "styled-components";
import Card, { StyledIconNo, StyledIconYes } from "./card";
import config from "../../shared/constants";

const character = {
  id: 1009146,
  name: "Abomination (Emil Blonsky)",
  image: "/testimages/4ce18691cbf04.jpg",
  nComics: 53,
  nSeries: 26,
  nStories: 1,
  nEvents: 0
};

const MyThemeProvider = ({ children }) => (
  <ThemeProvider theme={config.theme}>{children}</ThemeProvider>
);

describe.skip("<Card />", () => {
  it("Renders without crashing", () => {
    shallow(<Card character={character} />);
  });

  it("Contains image", () => {
    const wrapper = mount(<Card character={character} />, {
      wrappingComponent: MyThemeProvider
    });

    const div = wrapper.find(".thumb");
    expect(div).toHaveLength(1);
    expect(div.html()).toMatch(new RegExp(`<img.*?${character.image}`));
  });

  it("Contains title", () => {
    const wrapper = shallow(<Card character={character} />);
    const div = wrapper.find(".title");
    expect(div).toHaveLength(1);
    expect(div.text()).toEqual(character.name);
  });

  it("Show YES flag for 1 story", () => {
    const wrapper = mount(<Card character={character} />, {
      wrappingComponent: MyThemeProvider
    });
    const div = wrapper.find(".nstories");
    expect(div).toHaveLength(1);
    const icon = div.find(StyledIconYes);
    expect(icon).toHaveLength(1);
    const span = div.find("span");
    expect(span.text()).toEqual("1 story");
  });

  it("Show NO flag for 0 events", () => {
    const wrapper = mount(<Card character={character} />, {
      wrappingComponent: MyThemeProvider
    });
    const div = wrapper.find(".nevents");
    expect(div).toHaveLength(1);
    const icon = div.find(StyledIconNo);
    expect(icon).toHaveLength(1);
    const span = div.find("span");
    expect(span.text()).toEqual("No events");
  });
});
