/**
 * Created by aelit on 24-Sep-17.
 */
import React from 'react';
import Header from './Header';
import UserPageContent from './UserPageContent';

export default class UserPage extends React.Component{
  render(){
    console.log(this.props.match)
    return(
      <div>
        <Header/>
        <UserPageContent id={this.props.match.id} />
      </div>

    )
  }
}