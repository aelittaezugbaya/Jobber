import React from 'react';
import Stars from './Stars';
import { withRouter } from 'react-router';

class FeedbackListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state= {
      name: null,
      loading: true
    }
  }

  componentWillMount() {
    this.getUserData();
  }

  getUserData() {
    window.fetch(`/api/user/${this.props.feedback.UserSourceID}`,
      {
        method: 'GET',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          'Authorization':window.localStorage.accessToken
        }
      })
      .then(res=>res.json())
      .then(data=>data[0])
      .then(data=>{
        this.setState({
          _id:data._id,
          name:data.FullName,
          loading: false
        })
        console.log(this.state)
      })
  }

  render() {
    console.log('topkek')

    const {
      feedback
    } = this.props;

    const {
      _id,
      name,
      loading
    } = this.state;

    if(loading)
      return null;
    else
      return (

        <li className="collection-item avatar">
          <a href="" onClick={() => this.props.history.push(`/user/${_id}`)}>
            <img src="https://www.w3schools.com/w3css/img_avatar3.png" alt="" className="circle"/>
            <span className="title">{name}</span>
          </a>
          <p>
            {feedback.Comment}
          </p>
          <a href="#!" className="secondary-content">
            <Stars rating={feedback.Rating} />
          </a>
        </li>

      )
  }
}

export default withRouter(FeedbackListItem)