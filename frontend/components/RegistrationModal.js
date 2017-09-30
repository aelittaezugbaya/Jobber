import React from 'react';
import RadioButton from './RadioButton';
import InputLogin from './InputLogin';

export default class RegistrationModal extends React.Component{
    componentDidMount(){
        $(document).ready(function(){

            $('.datepicker').pickadate({
                selectMonths: true, // Creates a dropdown to control month
                selectYears: 100, // Creates a dropdown of 15 years to control year,
                today: 'Today',
                clear: 'Clear',
                close: 'Ok',
                closeOnSelect: false // Close upon selecting a date,
            });
        });
    }

    registerApi(fullName,email,password,dateOfBirth,gender){
        let data = 'FullName=' + encodeURIComponent(fullName)
            +'&Email=' + encodeURIComponent(email)
            +'&Password=' + encodeURIComponent(password)
            +'&DateOfBirth=' + encodeURIComponent(dateOfBirth)
            +'&Gender=' + encodeURIComponent(gender)
        fetch('/api/auth/register',
            {
                method:'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: data
            })
            .then(data => data.text())
            .then(data => console.log(jwt_decode(data)))
            .catch(err => console.log(err));
    }

    render(){
        return(
            <div id="registration" className="modal modal-fixed-footer">
                <div className="modal-content">
                    <h4>Registration</h4>
                    <InputLogin className="input-field" icon="face" id="FullName" type="text" inputClass="validate" text="Full Name" />
                    <InputLogin className="input-field" icon="email" id="Email" type="text" inputClass="validate" text="Email" />
                    <InputLogin className="input-field" icon="lock" id="Password" type="text" inputClass="validate" text="Password" />
                    <InputLogin className="input-field" icon="date_range" id="DateOfBirth" type="text" inputClass="datepicker" text="Date Of Birth" />
                    <p><i className="material-icons prefix">wc</i> Gender</p><hr/>
                    <div className="row">
                        <RadioButton id="male" text="Male" />
                        <RadioButton id="female" text="Female" />
                    </div>

                </div>
                <div className="modal-footer">
                    <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat " type="reset">Cancel</a>
                    <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat"
                       onClick={()=>this.registerApi(
                           document.getElementById('FullName').value,
                           document.getElementById('Email').value,
                           document.getElementById('Password').value,
                           document.getElementById('DateOfBirth').value,
                           document.getElementById('male').checked ? 'male': 'female'
                       )}>Register</a>
                </div>
            </div>
        )
    }
}
