import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { addNewTenderTitle, addNewTenderDescription, addNewTender, 
    showNewTenderButton } from '../../store/actions/tenders';

const mapStateToProps = state => {
    return {
        ...state.tenders
    };
};

const mapDispatchToProps = {
    addNewTenderTitle,
    addNewTenderDescription,
    addNewTender,
    showNewTenderButton,
}

class NewTender extends Component {
 
    handleTitleInput = (title) => {
        const { addNewTenderTitle, showNewTenderButton} = this.props
        addNewTenderTitle(title);
        if (title.length >= 3) {
            showNewTenderButton(true);
        } else {
            showNewTenderButton(false);
        }
    }

    handleDescriptionInput = (description) => {
        const { addNewTenderDescription } = this.props;
        addNewTenderDescription(description);
    }

    handleAddNewTender = () => {
        let { newTenderTitle, newTenderDescription } = this.props;
        addNewTender(newTenderTitle, newTenderDescription);
    }

render() {

let saveButton;

    if (this.props.showNewTenderSaveButton) {
        saveButton = ( <div onClick={() => this.handleAddNewTender()} className="waves-effect waves-light btn green margin">Save</div>)
    } else {
        saveButton = ( <div className="waves-effect waves-light btn grey lighten-4 margin">Save</div>)
    }

return (  
<div className="container">  
    <div className="col s12 m7">
        <div className="card horizontal">
            <div className="card-stacked">
                <div className="card-content">
                    <div className="row">
                        <div className="input-field col s6">
                            <input
                                onChange={(event) => this.handleTitleInput(event.target.value)} 
                                value={this.props.newTenderTitle} 
                                placeholder="Title" 
                                id="title" 
                                type="text" 
                                className="validate"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <textarea
                                onChange={(event) => this.handleDescriptionInput(event.target.value)} 
                                value={this.props.newTenderDescription}
                                placeholder="Description" 
                                id="textarea1" 
                                className="materialize-textarea">
                            </textarea>
                        </div>
                    </div>
                </div>
                <div className="card-action">
                    {saveButton}
                    <NavLink
                        to="/">
                        <div className="waves-effect waves-light btn red lighten-1 margin">Go Back</div>
                    </NavLink>
                </div>
            </div>
        </div>
    </div>
    <div><h2>{this.props.newTenderMessage}</h2></div>
</div>
  )
}
}
export default connect(mapStateToProps, mapDispatchToProps)(NewTender);
