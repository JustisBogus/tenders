import { requests } from '../../agent';
import { CLICK, TENDER_LIST_REQUEST, TENDER_LIST_RECEIVED, TENDER_LIST_ERROR,
    TENDER_LIST_SET_PAGE, REMOVE_TENDER, ADD_NEW_TENDER_TITLE, 
    ADD_NEW_TENDER_DESCRIPTION, EDIT_TENDER, SHOW_NEW_TENDER_BUTTON } from './actionTypes';

export const click = (buttonClicked) => {
    return {
        type: CLICK,
        buttonClicked
    };
};

export const tenderListFetch = (page = 1) => {
    return (dispatch) => {
        dispatch(tenderListRequest());
        return requests.get(`/tenders?page=${page}`)
            .then(response => dispatch(tenderListReceived(response)))
            .catch(error => dispatch(tenderListError(error)));
    };
};

export const tenderListRequest = () => {
    return {
        type: TENDER_LIST_REQUEST,
    };
};

export const tenderListReceived = (data) => {
    return {
        type: TENDER_LIST_RECEIVED,
        data
    };
};

export const tenderListError = (buttonClicked) => {
    return {
        type: TENDER_LIST_ERROR,
        buttonClicked
    };
};

export const tenderListSetPage = (page) => {
    return {
        type: TENDER_LIST_SET_PAGE,
        page
    };
};

export const editTender = (id, title, description, updatedTenders) => {
    return {
        type: EDIT_TENDER,
        id, 
        title, 
        description, 
        updatedTenders
    }    
}

export const updateTender = (id, title, description, updatedTenders) => {
    return (dispatch) => {
        return requests.put(`/tenders/${id}`, {
            title, 
            description
        }).then(() => dispatch(editTender(id, title, description, updatedTenders)));
    };
};

export const deleteTender = (id, tender) => {
    return (dispatch) => {
        return requests.delete(`/tenders/${id}`)
        .then(() => dispatch(removeTender(id, tender)));
      };
};

export const removeTender = (id, tender) => {
    return {
        type: REMOVE_TENDER,
        id,
        tender
    };
};

export const addNewTenderTitle = (title) => {
    return {     
        type: ADD_NEW_TENDER_TITLE,
        title
    };
};

export const addNewTenderDescription = (description) => {
    return {     
        type: ADD_NEW_TENDER_DESCRIPTION,
        description
    };
};

export const addNewTender = (title, description) => {
        return requests.post('/tenders', {
            title,
            description
    });
};

export const showNewTenderButton = (button) => {
    return {     
        type: SHOW_NEW_TENDER_BUTTON,
        button
    };
};
