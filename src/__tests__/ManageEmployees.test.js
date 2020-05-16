import React from "react";
import ReactDOM from 'react-dom';
import { render } from "@testing-library/react";
import ManageEmployees from '../components/TableEmployees'
import { mount, shallow, configure, describeWithDOM, spyLifecycle} from "enzyme";
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

describe("ManageEmployees tests", () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  test("Initial test", () => {

    const wrapper = document.createElement("div");
    ReactDOM.render(<ManageEmployees/>, wrapper);
    ReactDOM.unmountComponentAtNode(wrapper);

  });
});