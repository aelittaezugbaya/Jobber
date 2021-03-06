/**
 * Created by aelit on 24-Sep-17.
 */
import React from 'react';
import Header from '../Header';
import UserPageContent from './UserPageContent';
import {connect} from 'react-redux';
import Actions from '../../common/actions';
import Button from "../Button";


class UserPage extends React.Component{

  componentWillMount(){
    this.props.receiver(this.props.match.params.id)
  }

  render(){

    return(
      <div>
        <Header
          tabs={
            <Button className="btn-flat white-text back" onClick={()=> this.props.history.push('/')}>
              Go back to main page
            </Button>
          }
        />
        <UserPageContent id={this.props.match.params.id} />
      </div>

    )
  }
}



const mapDispatchToProps = (dispatch) => {
  return {
    receiver: (receiver) => {
      dispatch(Actions.saveReceiverUser(receiver));
    }
  }
};

export default connect(
  null,
  mapDispatchToProps
)(UserPage);