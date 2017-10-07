import React from 'react';
import RadioButton from './RadioButton';
import InputField from './InputField';
import HeaderText from './HeaderText';
import Button from './Button';

export default class RegistrationModal extends React.Component{
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

    componentDidMount(){
      $('.datepicker').pickadate({
          selectMonths: true, // Creates a dropdown to control month
          selectYears: 100, // Creates a dropdown of 15 years to control year,
          today: 'Today',
          clear: 'Clear',
          close: 'Ok',
          closeOnSelect: false // Close upon selecting a date,
      });
    }

    registerApi(fullName,email,password,dateOfBirth,gender){
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lon: position.coords.longitude
            };
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
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: data
            })
            .then(data => data.text())
            .catch(err => console.log(err));
        });
    }

    onSubmit(ev){
      ev.preventDefault();
      let gender= this.Male.value?'Male':'Female';
      this.registerApi(this.FullName.value,this.Email.value,this.Password.value,this.DateOfBirth.value,gender )
    }

    render(){
        return(
          <div id="registration" className="modal modal-fixed-footer">
            <form onSubmit={this.onSubmit}>
              <div className="modal-content">
                <HeaderText text="Registration" />
                <InputField className="input-field" ref={ref=>this.FullName=ref} icon="face" id="FullName" type="text" inputClass="validate" text="Full Name" />
                <InputField className="input-field" ref={ref=>this.Email=ref} icon="email" id="Email" type="text" inputClass="validate" text="Email" />
                <InputField className="input-field" ref={ref=>this.Password=ref} icon="lock" id="Password" type="password" inputClass="validate" text="Password" />
                <InputField className="input-field" ref={ref=>this.DateOfBirth=ref} icon="date_range" id="DateOfBirth" type="text" inputClass="datepicker" text="Date Of Birth" />
                <p><i className="material-icons prefix">wc</i> Gender</p><hr/>
                <div className="row">
                  <RadioButton id="male" ref={ref=>this.Male=ref} text="Male" />
                  <RadioButton id="female" text="Female" />
                </div>
            </div>
            <div className="modal-footer">
              <Button href="#!" className="modal-action modal-close waves-effect waves-green btn-flat " type="reset">Cancel</Button>
              <Button href="#!" className="modal-action modal-close waves-effect waves-green btn-flat" type="submit">Register</Button>
              </div>
            </form>
          </div>
        )
    }
}
