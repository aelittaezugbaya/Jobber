import React from 'react';
import InputRange from 'react-input-range';
import Checkbox from '../../Checkbox';

const filterLiStyle={
  category: {height: '190px'},
  gender:{height: '115px'},
  raiting:{height: '190px'}
};

export default class FilterList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: { min: 0, max: 50 },
    };
  }

  render() {
    return (
      <form action="#">
        <li style={filterLiStyle.category}><a>Category</a>
          <div className="left checkLeft">
            <Checkbox id="pet_care" text="Pet care"/>
            <Checkbox id="house_repair" text="House repair"/>
            <Checkbox id="children_care" text="Children care"/>
          </div>
          <div className="right checkRight">
            <Checkbox id="beauty" text="Beauty"/>
            <Checkbox id="cleaning" text="Cleaning"/>
            <Checkbox id="other" text="Other"/>
          </div>
        </li>
        <hr/>
        <li style={filterLiStyle.gender}><a>Gender</a>
          <Checkbox id="male" text="Male" className="checkLeft left"/>
          <Checkbox id="female" text="Female" className="checkRight right"/>
        </li>
        <hr/>
        <li style={filterLiStyle.raiting}><a>Raiting</a>
          <div className="left checkLeft">
            <Checkbox id="five" text="5"/>
            <Checkbox id="four" text="4"/>
            <Checkbox id="three" text="3"/>
          </div>
          <div className="right checkRight">
            <Checkbox id="two" text="2"/>
            <Checkbox id="one" text="1"/>
            <Checkbox id="none" text="none"/>
          </div>
        </li>
        <hr/>
        <li><a>Price Range</a>
          <InputRange
            formatLabel={value => `${value}€`}
            name={'Till'}
            maxValue={50}
            minValue={0}
            value={this.state.value}
            onChange={value => this.setState({ value })} />
        </li>
      </form>
    );
  }
}
