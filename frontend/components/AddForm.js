import React from 'react';
import Checkbox from'./Checkbox';
import InputField from './InputField'
import Button from './Button'
import fetch from '../common/utils/fetch';
import Select from './Select';
import { connect } from 'react-redux';

class AddForm extends React.Component{
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }
  
  serviceApi(userId,isRequest,subject,category,lon,lat,gender,description,price){
    debugger;
    let data = 'UserOwnerID=' + encodeURIComponent(userId)
      +'&isRequest=' + encodeURIComponent(isRequest)
      +'&Subject=' + encodeURIComponent(subject)
      +'&Category=' + encodeURIComponent(category)
      +'&Gender=' + encodeURIComponent(gender)
      +'&Lat=' + encodeURIComponent(lat)
      +'&Lon=' + encodeURIComponent(lon)
      +'&Description' + encodeURIComponent(description)
      +'&Price' + encodeURIComponent(price);

    fetch('/api/service',
      {
        method:'POST',
        headers: {
          'Authorization':window.localStorage.accessToken          
        },
        body: data
      })
      .then(data => data.text())
      .catch(err => console.log(err));

  }
  onSubmit(ev){
    ev.preventDefault();
    const {
      props,
      subject,
      price,
      category,
      lat,
      lng,
      description
    } = this;

    const {
      user,
      openTab,
    } = props;

    this.serviceApi(
      user._id,
      openTab === 'buying',
      subject.value,
      category.value,
      lng.value,
      lat.value,
      user.Gender,
      description.value,
      price.value
    )
  }

  render() {
    const {
      chosenPosition
    } = this.props;

    return (
      <div id='form' className="modal modal-fixed-footer">
        <form className="col m12 s12" onSubmit={this.onSubmit}>
          <div className="modal-content">
            <h4>{this.props.purpose == 'Buying' ? 'New request' : 'New Offer'}</h4>
              <div className="row">
                <InputField required ref={ref=>this.subject=ref} className="input-field col m6 s12" id="subject" type="text" inputClass="validate  " text="Subject"/>
                <InputField required ref={ref=>this.price=ref} className="input-field col m6 s12" id="price" type="text" inputClass="validate " text="Price"/>
              </div>
                <div className="row">
                  <div className="input-field col m4">
                    <Select ref={ref=>this.category=ref} 
                      label="Select category"
                      options={[
                        { 
                          value:"pet_care",
                          text:"Pet Care"
                        },
                        { 
                          value:"house_repair",
                          text:"House repair"
                        },
                        { 
                          value:"children_care",
                          text:"Children care"
                        },
                        {
                          value:"beauty",
                          text:"Beauty"
                        },
                        { 
                          value:"cleaning",
                          text:"Cleaning"
                        },
                        { 
                          value:"other",
                          text:'Other'
                        }
                      ]}
                    />
                </div>
                <div className="col m8">
                  <InputField required ref={ref=>this.lat=ref} className="input-field col m12 s12" id="lat" type="text" inputClass="validate" value={chosenPosition && chosenPosition.lat} text="Lat"/>
                  <InputField required ref={ref=>this.lng=ref} className="input-field col m12 s12" id="lon" type="text" inputClass="validate" value={chosenPosition && chosenPosition.lng} text="Lon"/>
                  <div className="input-field col m12 s12">
                    <textarea required id="info" ref={ref=>this.description=ref} type="text" className="validate materialize-textarea"/>
                    <label htmlFor="info">Description</label>
                  </div>
                </div>
              </div>
          </div>
          <div className="modal-footer">
            <Button href="#!"  className="modal-action modal-close waves-effect waves-green btn-flat">Disagree</Button>
            <Button href="#!" type="submit" className=" waves-effect waves-green btn-flat ">Agree</Button>

          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = ({chosenPosition, user, openTab}) => {
  return {
    chosenPosition,
    user,
    openTab
  }
}

export default connect(
  mapStateToProps
)(AddForm);