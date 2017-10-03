import React from 'react';
import {shallow} from 'enzyme';
import CardImage from '../CardImage';
import Adapter from 'enzyme-adapter-react-15';
import Enzyme from 'enzyme';
import ShallowRenderer from 'react-test-renderer/shallow';

Enzyme.configure({ adapter: new Adapter() });

test('Test for CardImage component props', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<CardImage title="Bob" src="Bob.png"/>);
  const result = renderer.getRenderOutput();

  expect(result.type).toBe('div');
  expect(result.props.children).toEqual([
      <img src="Bob.png"/>,
        <span className="card-title">Bob</span>
  ]);
});
