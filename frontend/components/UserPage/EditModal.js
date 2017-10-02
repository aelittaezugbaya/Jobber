/**
 * Created by aelittaezugbaa on 29/09/2017.
 */
import React from 'react';
import Button from '../Button'

export default class EditModal extends React.Component{
  constructor(props){
    super(props);

    this.state={
      user:{
        id:props.user._id,
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
    this.setState({
      user:{
        id:nextProps.user._id,
        fullName:nextProps.user.FullName,
        email:nextProps.user.Email,
        dateOfBirth:nextProps.user.DateOfBirth,
        gender:nextProps.user.Gender,
        editInfo:nextProps.user.Description
      }
    })
  }
  inputOnChange(event){
    this.setState({
     user:Object.assign({}, this.state.user, {[event.target.id]: event.target.value})
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
      user:Object.assign({}, this.state.user, {gender: newGender})

    })

  }

  onSubmitEdit(){
    console.log(this.state)

    let data ='FullName='+encodeURIComponent(this.state.user.fullName)
      +'&Email='+encodeURIComponent(this.state.user.email)
      +'&DateOfBirth='+encodeURIComponent(this.state.user.dateOfBirth)
      +"&Gender="+encodeURIComponent(this.state.user.gender)
      +'&Description='+encodeURIComponent(this.state.user.editInfo);


    window.fetch(`/api/user/${this.state.user.id}`,
      {
        method: 'PUT',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          'Authorization':window.localStorage.accessToken
        },
        body:data
      }).then(res=>res.text())
      .then(res=>console.log(res))
      .catch(err=>console.log(err))
  }

  render(){

    return(
      <div id="editModal" className="modal  ">
        <form className="col s12" onSubmit={()=>this.onSubmitEdit()}>
          <div className="modal-content">
            <h4>Edit personal information</h4>
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
          </div>
          <div className="modal-footer">
            <Button href="#!" className="modal-action modal-close waves-effect waves-green btn-flat" type="reset">Cancel</Button>
            <Button href="#!" className="modal-action modal-close waves-effect waves-green btn-flat" type="submit" name="action" >Save</Button>
          </div>
        </form>
      </div>
    )
  }
}