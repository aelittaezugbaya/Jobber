import React from 'react';
import {shallow} from 'enzyme';
import RadioButton from '../RadioButton';
import Adapter from 'enzyme-adapter-react-15';
import Enzyme from 'enzyme';

Enzyme.configure({ adapter: new Adapter() });

test('Radiobutton changes after selection', () => {
  // Render a checkbox with label in the document
  const wrapper = shallow(
    <div>
      <RadioButton id="male" text="Male" />
      <RadioButton id="female" text="Female" />
    </div>
  );

  wrapper.find({id: 'male'}).simulate('change');
  wrapper.find({id: 'male'}).equals('(checked={false})');
  //wrapper.find({id: 'female'}).simulate('change');

  //expect(wrapper.contains('hannu is an ass')).toEqual(false);





});
