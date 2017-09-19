import React from 'react';

export default class AddForm extends React.Component{
    render(){
        return(
        <div id='form' className="modal modal-fixed-footer">

            <div className="modal-content">
                <h4>{this.props.purpose=='Buying'? 'New request' : 'New Offer'}</h4>
                <form className="col m12 s12">
                    <div className="row">
                        <div className="input-field col m6 s12">
                            <input id="subject" type="text" className="validate amber-text darken-3 "/>
                                <label htmlFor="subject" className="">Subject</label>
                        </div>
                        <div className="input-field col m6 s12">
                            <input id="price" type="text" className="validate"/>
                                <label htmlFor="price">Price</label>
                        </div>
                    </div>
                    <div className="divider"></div>
                    <div className="row">
                    <div className="col m4">
                        <h5>Category</h5>
                        <div >
                            <p>
                                <input type="checkbox" className="filled-in" id="pet_careM" />
                                <label htmlFor="pet_careM">Pet Care</label>
                            </p>
                            <p>
                                <input type="checkbox" className="filled-in" id="house_repairM" />
                                <label htmlFor="house_repairM">House repair</label>
                            </p>
                            <p>
                                <input type="checkbox" className="filled-in" id="children_careM" />
                                <label htmlFor="children_careM">Children care</label>
                            </p>
                        </div>
                        <div >
                            <p>
                                <input type="checkbox" className="filled-in" id="beautyM" />
                                <label htmlFor="beautyM">Beauty</label>
                            </p>
                            <p>
                                <input type="checkbox" className="filled-in" id="cleaningM" />
                                <label htmlFor="cleaningM">Cleaning</label>
                            </p>
                            <p>
                                <input type="checkbox" className="filled-in" id="otherM" />
                                <label htmlFor="otherM">Other</label>
                            </p>
                        </div>
                    </div>
                    <div className="col m8">
                        <div className="input-field col m12 s12">
                            <input id="time" type="text" className="validate"/>
                            <label htmlFor="time">Preferred time</label>
                        </div>
                        <div className="input-field col m12 s12">
                            <input id="location" type="text" className="validate"/>
                            <label htmlFor="location">Location</label>
                        </div>
                        <div className="input-field col m12 s12">
                            <textarea id="info" type="text" className="validate materialize-textarea"/>
                            <label htmlFor="info">Additional info</label>
                        </div>
                    </div></div>
                </form>
            </div>
            <div className="modal-footer">
                <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat">Disagree</a>
                <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat ">Agree</a>

            </div>
        </div>
        )
    }
}