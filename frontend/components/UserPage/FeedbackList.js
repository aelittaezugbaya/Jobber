import React from 'react';
import FeedbackListItem from './FeedbackListItem';
import Stars from './Stars';
import jwt_decode from 'jwt-decode';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import fetch from 'utils/fetch';
import Loading from '../Loading';

class FeedbackList extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      UserSourceID: jwt_decode(window.localStorage.accessToken)._id, // TODO: GET FROM REDUX
      feedbacks: [],
      loading: true
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  componentWillMount() {
    this.fetchFeedbacks();
    this.refreshInterval = setInterval(this.fetchFeedbacks.bind(this), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.refreshInterval);
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   return !(JSON.stringify(nextState) === JSON.stringify(this.state)) || !(JSON.stringify(nextProps) === JSON.stringify(this.props));
  // }

  fetchFeedbacks() {
    console.log(this.props.id)
    if(this.props.id){
      fetch(`/api/feedback/${this.props.id}`, {
        headers: {
          'Authorization': window.localStorage.accessToken
        }
      })
        .then(res=>res.json())
        .then(data=>{
          this.setState({
            feedbacks:data,
          })
        })
        .catch(err => clearInterval(this.refreshInterval));
    }

  }

  onFeedbackItemLoad(){
    if(this.state.loading)
      this.setState({
        loading: false
      })
  }

  onFormSubmit(ev) {
    ev.preventDefault();

    let info =
      'UserSourceID='+encodeURIComponent(this.state.UserSourceID)
      +'&UserReceiverID='+encodeURIComponent(this.props.receiver)
      +'&Comment='+encodeURIComponent(this.comment.value)
      +'&Rating='+encodeURIComponent(this.ratingSelector.value)

    fetch('/api/feedback/',
      {
        method: 'POST',
        headers: {
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
    let {
      feedbacks,
      loading
    } = this.state;
    let feedbackItems = null;

    if(feedbacks && feedbacks.length === 0) {
      this.onFeedbackItemLoad();
    } else {
      feedbackItems = feedbacks.map(feedback => (
        <FeedbackListItem feedback={feedback} key={feedback._id} onLoad={() => this.onFeedbackItemLoad()}/>
      ));
    }

    return (
      <div className="card">
        <div className="card-content">
          <span className="card-title">Feedback</span>
          <ul className="collection">
            {
              loading &&
                (
                  <li className="collection-item">
                    <Loading size="big"/>
                  </li>
                )
            }
            <div className={loading && "loading-content"}>
              {feedbackItems}
            </div>
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


export default withRouter(
  connect(
  mapStateToProps,
)(FeedbackList));
