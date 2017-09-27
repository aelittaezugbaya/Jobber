/**
 * Created by aelit on 24-Sep-17.
 */
import React from 'react';
import Card from './Card';

export default class UserPage extends React.Component{
  render(){
    return(
        <div className="row">
          <div className="col s12 m4">
            <Card
            title="Aelitta Ezugbaya"
            src="https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAYtAAAAJGY0MDE1YWVhLTA4NWYtNGE2MS04Mzc3LWVjNmU1MzFiNjhkMg.jpg"
            email="aelittae@gmail.com"
            age="20"
            gender="Female"
            additionalInfo="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer et mauris in diam pulvinar imperdiet. Vestibulum lacinia, magna vitae posuere pellentesque, ante nulla pellentesque leo, et venenatis neque odio non odio."
            />
          </div>
          <div className="col s12 m8">
            <div className="card">
              <div className="card-content">
                <span className="card-title">Feedback</span>
                <ul className="collection">
                  <li className="collection-item avatar">
                    <img src="https://www.w3schools.com/w3css/img_avatar3.png" alt="" className="circle"/>
                      <span className="title">Full Name of User</span>
                      <p><strong>Comment:</strong><br/>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur congue suscipit nisl quis suscipit. Nulla.
                      </p>
                      <a href="#!" className="secondary-content"><i className="material-icons">star</i><i className="material-icons">star</i><i className="material-icons">star</i><i className="material-icons">star</i></a>
                  </li>
                  <li className="collection-item avatar">
                    <img src="https://i.pinimg.com/736x/7f/79/6d/7f796d57218d9cd81a92d9e6e8e51ce4--free-avatars-online-profile.jpg" alt="" className="circle"/>
                    <span className="title">User Name 1</span>
                    <p><strong>Comment:</strong><br/>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent in ornare quam. Cras aliquet magna et ornare dapibus. Nam fermentum elit a tortor suscipit, eget molestie risus mollis.                    </p>
                    <a href="#!" className="secondary-content"><i className="material-icons">star</i><i className="material-icons">star</i><i className="material-icons">star</i><i className="material-icons">star</i></a>
                  </li>
                  <li className="collection-item avatar">
                    <img src="https://media.cackle.me/7/28/c79b935831fa311bf83174b159103287.jpg" alt="" className="circle"/>
                    <span className="title">User Name 2</span>
                    <p><strong>Comment:</strong><br/>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent in ornare quam. Cras aliquet magna et ornare dapibus. Nam fermentum elit a tortor suscipit, eget molestie risus mollis.                    </p>
                    <a href="#!" className="secondary-content"><i className="material-icons">star</i><i className="material-icons">star</i><i className="material-icons">star</i><i className="material-icons">star</i></a>
                  </li>
                  <li className="collection-item avatar">
                    <img src="http://rs600.pbsrc.com/albums/tt82/roadstar166/1-SquidooImages/Tired-Profile-Picture-Cartoon-Portrait-Avatars-are-Hot-SoyCandleMaker-Lover-Simpson.png~c200" alt="" className="circle"/>
                    <span className="title">Leave your feedback</span>
                    <p><strong>Comment:</strong><br/>

                    </p>

                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

    )
  }
}