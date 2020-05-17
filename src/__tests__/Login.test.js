import React from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import { mount, shallow, configure } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import Login from "../components/Login";


configure({adapter: new Adapter()});

describe("Login tests", () => {

  // Ovo samo dodaj ne pitaj ništa
  beforeAll(() => {  
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null, 
        addListener: jest.fn(),              // deprecated
        removeListener: jest.fn(),           // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  test("Login should be unsuccessful", () => {

    const wrapper = mount(<Router><Login /></Router> );

    let usernameInput =  wrapper.find("input").first().instance();
    let passwordInput =  wrapper.find("input").at(1).instance();

    usernameInput.value = "faris";
    passwordInput.value = "legitSifra";             // nije legit sifra

    console.log("Username: ", JSON.stringify(wrapper.find("input").first().instance().value));
    console.log("Password: ", JSON.stringify(wrapper.find("input").at(1).instance().value));

    wrapper.find('button').simulate('click');

    expect(usernameInput).not.toBeVisible();
  });

});