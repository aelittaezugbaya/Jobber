import React from 'react';

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
    render(){
        return(
            <div id="registration" className="modal modal-fixed-footer">
                <div className="modal-content">
                    <h4>Registration</h4>
                    <div className="input-field">
                        <i className="material-icons prefix">face</i>
                        <input id="FullName" type="text" className="validate  "/>
                        <label htmlFor="FullName" className="">Full Name</label>
                    </div>
                    <div className="input-field ">
                        <i className="material-icons prefix">email</i>
                        <input id="Email" type="text" className="validate "/>
                        <label htmlFor="Email" className="">Email</label>
                    </div>
                    <div className="input-field ">
                        <i className="material-icons prefix">lock</i>
                        <input id="Password" type="text" className="validate "/>
                        <label htmlFor="Password" className="">Password</label>
                    </div>
                    <div className="input-field ">
                        <i className="material-icons prefix">date_range</i>
                        <input type="text" className="datepicker" id="DateOfBirth"/>
                        <label htmlFor="DateOfBirth" className="">Date Of Birth</label>
                    </div>

                    <p><i className="material-icons prefix">wc</i> Gender</p><hr/>
                    <div className="row">
                        <p className="col m6">
                            <input name="group1" type="radio" id="male"/>
                            <label htmlFor="male">Male</label>
                        </p>
                        <p className="col m6 ">
                            <input name="group1" type="radio" id="female" />
                            <label htmlFor="female">Female</label>
                        </p>
                    </div>

                </div>
                <div className="modal-footer">
                    <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat ">Cancel</a>
                    <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat ">Register</a>
                </div>
            </div>
        )
    }
}