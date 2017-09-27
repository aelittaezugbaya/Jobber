import React from 'react';

export default class OfferList extends React.Component {
  render() {
    const {
      offers
    } = this.props;

    return (
      <div>
        {
          offers.map(
            offer => (
              <div key={offer}>
                <li><a className="waves-effect" href="#!"><span>3,5  <i className="fa fa-star"> </i> </span>{offer} <span className="right">4,5$/hour</span></a></li>
                <li><div className="divider"></div></li>
              </div>
            )
          )
        }
      </div>
    );
  }
}