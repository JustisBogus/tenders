import React, { useState } from 'react'

const Tender = (props) => {
    const [state, toggle] = useState(true)
 
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
                <div class="row">
                    <div class="input-field col s6">
                        <input placeholder="Title" id="first_name" type="text" class="validate"/>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <textarea placeholder="Description" id="textarea1" class="materialize-textarea"></textarea>
                    </div>
                </div>
            </div>
            <div className="card-action">
                <div onClick={() => toggle(!state)} className="waves-effect waves-light btn blue lighten-1 margin">Cancel</div>
                <div onClick={() => props.delete(props.tender.id)} className="waves-effect waves-light btn green margin">Save</div>
            </div>
        </div>
    </div> )
      }       
</div>
  )
}

export default Tender;

