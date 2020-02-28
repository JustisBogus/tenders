import React, { useState } from 'react'

const Tender = (props) => {
    const [state, toggle] = useState(true)
    const [titleInput = props.tender.title, setTitleInput] = useState();
    const [descriptionInput = props.tender.description, setDescriptionInput] = useState();

  return (  

  <div className="col s12 m7">
      { state ? (
    <div className="card horizontal">
        <div className="card-stacked">
            <div className="card-content">
                <h3 className="header center-align">{props.tender.title}</h3>
                <p>{props.tender.description}</p>
            </div>
            <div className="card-action">
                <div onClick={() => toggle(!state)} className="waves-effect waves-light btn blue lighten-1 margin">Edit</div>
                <div onClick={() => props.delete(props.tender.id)} className="waves-effect waves-light btn red lighten-1 margin">Delete</div>
            </div>
        </div>
    </div> ) : (
    <div className="card horizontal">
        <div className="card-stacked">
            <div className="card-content">
                <div className="row">
                    <div className="input-field col s6">
                        <input 
                            onChange={(e) => setTitleInput(e.target.value)}
                            value={titleInput}
                            placeholder="Title" 
                            id="first_name" 
                            type="text" 
                            className="validate"
                            />
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <textarea
                            onChange={(e) => setDescriptionInput(e.target.value)} 
                            placeholder="Description" 
                            id="textarea1" 
                            className="materialize-textarea"
                            value={descriptionInput}
                            >
                        </textarea>
                    </div>
                </div>
            </div>
            <div className="card-action">
                <div onClick={() => toggle(!state)} className="waves-effect waves-light btn red lighten-1 margin">Close</div>
                <div onClick={() => props.edit(props.tender.id, titleInput, descriptionInput)} className="waves-effect waves-light btn green margin">Save</div>
            </div>
        </div>
    </div> )
      }       
</div>
  )
}

export default Tender;

