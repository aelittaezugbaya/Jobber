import React from 'react';

export default class Stars extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      hover: 0
    }
  }

  get value() {
    return this.state.chosen;
  }

  onMouseEnter(i) {
    this.setState({
      hover: i
    });
  }

  onMouseOut() {
    this.setState({
      hover: 0
    });
  }

  render() {
    let starsToDraw;

    const {
      input,
      rating,
    } = this.props;
    const {
      hover,
      chosen
    } = this.state;

    if(input){
      starsToDraw = hover;
      if(chosen > hover)
        starsToDraw = chosen;
    }



    else if(rating)
      starsToDraw = rating;

    const stars=[];

    for(let i = 0; i < 5; i++){
      stars.push(
        <i
          key={i}
          className="material-icons"
          onMouseEnter={
            () => this.onMouseEnter(i+1)
          }
          onMouseOut={
            () => this.onMouseOut()
          }
          onClick = {
            () => this.setState({ chosen: i+1 })
          }
        >
          {
            i < starsToDraw ? 'star' : 'star_border'
          }
        </i>
      )
    }

    return (
      <div>
        {stars}
      </div>
    )

  }

}