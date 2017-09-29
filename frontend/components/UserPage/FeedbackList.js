import React from 'react';
import FeedbackListItem from './FeedbackListItem';
import Stars from './Stars';
import jwt_decode from 'jwt-decode'
import {connect} from 'react-redux'

class FeedbackList extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      UserSourceID: jwt_decode(window.localStorage.accessToken)._id, // TODO: GET FROM REDUX
      feedbacks: []
    }
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  componentWillMount() {
    this.fetchFeedbacks();
    setInterval(this.fetchFeedbacks.bind(this), 1000);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !(JSON.stringify(nextState) === JSON.stringify(this.state));
  }

  fetchFeedbacks() {
    window.fetch(`/api/feedback/${this.props.id}`,
      {
        method: 'GET',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          'Authorization':window.localStorage.accessToken
        }
      })
      .then(res=>res.json())
      .then(data=>{
        this.setState({
          feedbacks:data
        })
      })
  }

  onFormSubmit(ev) {
    ev.preventDefault();

    let info =
      'UserSourceID='+encodeURIComponent(this.state.UserSourceID)
      +'&UserReceiverID='+encodeURIComponent(this.props.receiver)
      +'&Comment='+encodeURIComponent(this.comment.value)
      +'&Rating='+encodeURIComponent(this.ratingSelector.value)

    window.fetch('/api/feedback/',
      {
        method: 'POST',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          'Authorization':window.localStorage.accessToken
        },
        body:info
      })
      .then(() => {
        this.fetchFeedbacks();
        if(this.props.onFormSubmit)
          this.props.onFormSubmit();
      })
      .catch(err=>console.log(err))
    this.form.reset()
    this.ratingSelector.reset()
  }

  render() {
    const {
      feedbacks
    } = this.state;

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
              <form ref={ref =>this.form = ref} onSubmit={this.onFormSubmit}>
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

const mapStateToProps = (state) => {
  return {
    receiver: state.receiver,

  }
};


export default connect(
  mapStateToProps,
)(FeedbackList);