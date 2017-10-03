import React from 'react';
import {shallow} from 'enzyme';
import Checkbox from '../Checkbox';
import Adapter from 'enzyme-adapter-react-15';
import Enzyme from 'enzyme';
import ShallowRenderer from 'react-test-renderer/shallow';

Enzyme.configure({ adapter: new Adapter() });

test('Test for Checkbox component props', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<Checkbox id="beauty" text="Beauty"/>);
  const result = renderer.getRenderOutput();

  expect(result.type).toBe('p');
  expect(result.props.children).toEqual([
    <input id="beauty" className="filled-in" type="checkbox"/>,
    <label htmlFor="beauty">Beauty</label>
  ]);
});
