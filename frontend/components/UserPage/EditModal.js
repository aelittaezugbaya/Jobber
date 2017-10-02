/**
 * Created by aelittaezugbaa on 29/09/2017.
 */
import React from 'react';


export default class EditModal extends React.Component{
  constructor(props){
    super(props);

    this.state={
      user:{
        fullName:props.user.FullName,
        email:props.user.Email,
        dateOfBirth:props.user.DateOfBirth,
        gender:props.user.Gender,
        editInfo:props.user.Description
      }
    }
    this.inputOnChange=this.inputOnChange.bind(this)
  }

  componentWillMount(){
    $('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 80, // Creates a dropdown of 15 years to control year,
      today: 'Today',
      clear: 'Clear',
      close: 'Ok',
      closeOnSelect: false // Close upon selecting a date,
    });
  }

  componentWillReceiveProps(nextProps){
    this.state={
      user:{
        fullName:nextProps.user.FullName,
        email:nextProps.user.Email,
        dateOfBirth:nextProps.user.DateOfBirth,
        gender:nextProps.user.Gender,
        editInfo:nextProps.user.Description
      }
    }
  }
  inputOnChange(event){
    this.setState({
     user:{
       [event.target.id]: event.target.value
     }
    })
  }

  radioOnChange(event){
    let newGender;
    if(event.target.id=='EditFemale'){
      newGender='female'
    }else{
      newGender='male'
    }
    this.setState({
      user:{
        gender: newGender
      }
    })

  }

  render(){
    console.log(this.state.user)
    return(
      <div id="editModal" className="modal  ">
        <div className="modal-content">
          <h4>Edit personal information</h4>
          <form className="col s12">
            <div className="row">
              <div className="input-field col s12 m6">
                <i className="material-icons prefix ">face</i>
                <input  id="fullName" type="text" className="validate" value={this.state.user.fullName} onChange={this.inputOnChange}/>
                {/*<label htmlFor="fullName" className="active">Full Name</label>*/}
              </div>
              <div className="input-field col s6">
                <i className="material-icons prefix">email</i>
                <input id="email" type="text" className="validate" value={this.state.user.email} onChange={this.inputOnChange}/>
                {/*<label htmlFor="email" className="active">Email</label>*/}
              </div>
              <div className="input-field col s12 ">
                <i className="material-icons prefix">date_range</i>
                <input type="text" id="dateOfBirth" className="datepicker" value={this.state.user.dateOfBirth ? this.state.user.dateOfBirth.toDateString():""} onChange={this.inputOnChange}/>
                {/*<label htmlFor="dateOfBirth" className="active">Date Of Birth</label>*/}
              </div>
              <div className="col s12 ">
                <p className="col m6">
                  <input name="groupGender" type="radio" id="EditMale" checked={this.state.user.gender=='male'? 'checked' : ""} onChange={(ev)=>this.radioOnChange(ev)}/>
                  <label htmlFor="EditMale">Male</label>
                </p>
                <p className="col m6">
                  <input name="groupGender" type="radio" id="EditFemale" checked={this.state.user.gender=='female'? 'checked' : ""} onChange={(ev)=>this.radioOnChange(ev)}/>
                  <label htmlFor="EditFemale">Female</label>
                </p>
              </div>
              <div className="input-field  col s12">
                <div className="row">
                  <textarea id="editInfo" className="materialize-textarea" value={this.state.user.editInfo} onChange={this.inputOnChange}/>
                  <label htmlFor="editInfo">Additional information</label>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat">Cancel</a>
          <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat">Save</a>
        </div>
      </div>
    )
  }
}