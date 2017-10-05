import React from 'react';
import {shallow} from 'enzyme';
import HeaderText from '../HeaderText';
import Adapter from 'enzyme-adapter-react-15';
import Enzyme from 'enzyme';
import ShallowRenderer from 'react-test-renderer/shallow';

Enzyme.configure({ adapter: new Adapter() });

test('Test for HeaderText component props', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<HeaderText text="Hubba"/>);
  const result = renderer.getRenderOutput();

  expect(result.type).toBe('div');
  expect([result.props.children]).toEqual([
    <h5 className="center">Hubba</h5>
  ]);
});
