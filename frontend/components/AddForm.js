import React from 'react';
import Checkbox from'./Checkbox';
import InputField from './InputField'
import Button from './Button'
import fetch from '../common/utils/fetch';

export default class AddForm extends React.Component{
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }
  serviceApi(_id,isRequest,subject,category,lon,lat,gender,description,price){
    let data = 'FullName=' + encodeURIComponent(fullName)
      +'&Email=' + encodeURIComponent(email)
      +'&Password=' + encodeURIComponent(password)
      +'&DateOfBirth=' + encodeURIComponent(dateOfBirth)
      +'&Gender=' + encodeURIComponent(gender)
      +'&Lat=' + encodeURIComponent(pos.lat)
      +'&Lon=' + encodeURIComponent(pos.lon)
    fetch('/api/auth/register',
      {
        method:'POST',
        body: data
      })
      .then(data => data.text())
      .catch(err => console.log(err));

  }
  onSubmit(ev){
    ev.preventDefault();
    console.log(this.subject.value)
  }

  render() {
    return (
      <div id='form' className="modal modal-fixed-footer">
          <form className="col m12 s12" onSubmit={this.onSubmit}>

        <div className="modal-content">
          <h4>{this.props.purpose == 'Buying' ? 'New request' : 'New Offer'}</h4>
            <div className="row">
              <InputField  ref={ref=>this.subject=ref} className="input-field col m6 s12" id="subject" type="text" inputClass="validate  " text="Subject"/>
              <InputField className="input-field col m6 s12" id="price" type="text" inputClass="validate " text="Price"/>
            </div>
            <div className="divider"></div>
            <div className="row">
              <div className="col m4">
                <h5>Category</h5>
                <div>
                  <Checkbox id="pet_careM" text="Pet Care"/>
                  <Checkbox id="house_repairM" text="House repair"/>
                  <Checkbox id="children_careM" text="Children care"/>
                  <Checkbox id="beautyM" text="Beauty"/>
                  <Checkbox id="cleaningM" text="Cleaning"/>
                  <Checkbox id="otherM" text='Other'/>
                </div>
              </div>
              <div className="col m8">
                <InputField className="input-field col m12 s12" id="lat" type="text" inputClass="validate " text="Lat"/>
                <InputField className="input-field col m12 s12" id="lon" type="text" inputClass="validate " text="Lon"/>
                <div className="input-field col m12 s12">
                  <textarea id="info" type="text" className="validate materialize-textarea"/>
                  <label htmlFor="info">Additional info</label>
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