import React from 'react';
import {shallow} from 'enzyme';
import CardImage from '../CardImage';
import Card from '../Card';
import Adapter from 'enzyme-adapter-react-15';
import Enzyme from 'enzyme';
import ShallowRenderer from 'react-test-renderer/shallow';

Enzyme.configure({ adapter: new Adapter() });

test('Test for CardImage component props', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<Card
  title="Bob"
  src="Bob.jpg"
  email="bob@gmail.com"
  age="20"
  gender="Male"
  additionalInfo="Lorem ipsum posuere pellentesque"
  />);
  const result = renderer.getRenderOutput();

  expect(result.type).toBe('div');
  expect(result.props.children).toEqual([
    <CardImage title="Bob" src="Bob.jpg"/>,
    <div className="card-content">
      <ul>
        <li><i className="material-icons">star</i><i className="material-icons">star</i><i className="material-icons">star</i></li>
        <li><strong>Email: </strong>bob@gmail.com</li>
        <li><strong>Age: </strong>20</li>
        <li><strong>Gender: </strong>Male</li>
        <li><strong>Additional information: </strong>Lorem ipsum posuere pellentesque</li>
      </ul>
    </div>
  ]);
});
