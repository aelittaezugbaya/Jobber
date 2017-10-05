import React from 'react';
import {shallow} from 'enzyme';
import RadioButton from '../RadioButton';
import Adapter from 'enzyme-adapter-react-15';
import Enzyme from 'enzyme';
import ShallowRenderer from 'react-test-renderer/shallow';

Enzyme.configure({ adapter: new Adapter() });

test('Test for RadioButton component props', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<RadioButton id="female" text="Female" />);
  const result = renderer.getRenderOutput();

  expect(result.type).toBe('p');
  expect(result.props.children).toEqual([
    <input name="gender" type="radio" id="female" />,
    <label htmlFor="female">Female</label>
  ]);
});
