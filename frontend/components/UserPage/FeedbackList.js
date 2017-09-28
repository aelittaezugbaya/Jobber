import React from 'react';
import FeedbackListItem from './FeedbackListItem';
import Stars from './Stars';

export default class FeedbackList extends React.Component {
  constructor(props) {
    super(props);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onFormSubmit(ev) {
    ev.preventDefault();

    console.log(this.ratingSelector.value)
  }

  render() {
    const {
      feedbacks
    } = this.props;

    return (
      <div className="card">
        <div className="card-content">
          <span className="card-title">Feedback</span>
          <ul className="collection">
            {
              feedbacks.map(feedback => (
                <FeedbackListItem feedback={feedback}/>
              ))
            }
            <li className="collection-item avatar">
              <img
                src="http://rs600.pbsrc.com/albums/tt82/roadstar166/1-SquidooImages/Tired-Profile-Picture-Cartoon-Portrait-Avatars-are-Hot-SoyCandleMaker-Lover-Simpson.png~c200"
                alt="" className="circle"/>
              <span className="title">Leave your feedback</span>
              <form onSubmit={this.onFormSubmit}>
                <div className="input-field col s12">
                  <input ref={ ref=> this.comment = ref} id="comment" type="text" className="validate "/>
                  <label htmlFor="comment">Comment</label>
                </div>
                <div className="row right">
                  <button className="btn-flat " type="reset" href="#">Cancel</button>
                  <button className="btn-flat amber white-text" type="submit" href="#">Submit</button>
                </div>
              </form>
              <a href="#!" className="secondary-content">
                <Stars ref={ref => this.ratingSelector = ref} input/>
              </a>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}