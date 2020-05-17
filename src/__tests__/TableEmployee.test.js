import React from "react";
import ReactDOM from 'react-dom';
import { render } from "@testing-library/react";
import TableEmployee from '../components/TableEmployee'
import { mount, shallow, configure, describeWithDOM, spyLifecycle } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import { ExceptionMap } from "antd/lib/result";

configure({ adapter: new Adapter() });

describe("TableEmployee tests", () => {
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

    test("Initial test",  () => {

        const wrapper = document.createElement("div");
        ReactDOM.render(<TableEmployee />, wrapper);
        ReactDOM.unmountComponentAtNode(wrapper);
    });

    test("Existing table test", async () => {

        await setTimeout(() => {
            const wrapper = render(<TableEmployee />);
            expect(wrapper.container.querySelector("wrap")).not.toBeNull();
        }, 2000);
    })
});