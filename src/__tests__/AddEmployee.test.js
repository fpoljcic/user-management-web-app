import React from "react";
import ReactDOM from 'react-dom';
import AddEmployee from '../components/AddEmployee'
import { mount, shallow, configure, describeWithDOM, spyLifecycle} from "enzyme";
import Adapter from 'enzyme-adapter-react-16';

import { BrowserRouter as Router } from 'react-router-dom';


configure({adapter: new Adapter()});

describe("AddEmployee tests", () => {
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
    ReactDOM.render(<AddEmployee/>, wrapper);
    ReactDOM.unmountComponentAtNode(wrapper);

  });

  test("Submit should not be allowed", () => {

    const wrapper = mount(<Router><AddEmployee /></Router> );

    let name =  wrapper.find("input").first().instance();
    let surname =  wrapper.find("input").at(1).instance();

    name.value = "Novi";
    surname.value = "Radnik";            

    console.log("Name: ", JSON.stringify(wrapper.find("input").first().instance().value));
    console.log("Surname: ", JSON.stringify(wrapper.find("input").at(1).instance().value));

    wrapper.find('button').simulate('change', {
        target: { value: 'Invalid input!' }
      })

      console.log("Wrapper", wrapper.children().getElements());

       //expect(wrapper.hasClass('ant-modal-confirm-title')).toBeTruthy();

  });

  test('Input should be empty by default', () => {

    const props = {
        className: 'custom-class'
    };

    const BaseFieldLayoutComponent = mount(<AddEmployee />);
    expect(BaseFieldLayoutComponent.find('input').first().hasClass(props.className)).toBeFalsy();
});

});