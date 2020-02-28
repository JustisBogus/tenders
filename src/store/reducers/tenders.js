import * as actionTypes from '../actions/actionTypes';
import { hydraPageCount } from '../../apiUtils';

const initialState = {
    clicked: false,
    isFetching: false,
    tenders: null,
    currentPage: 1,
    pageCount: null,
    newTenderTitle: '',
    newTenderDescription: ''
    
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CLICK:
            return {
                ...state,
                    clicked: action.buttonClicked
            };
        case actionTypes.TENDER_LIST_REQUEST:
            return {
                ...state,
                    isFetching: true,
            };
        case actionTypes.TENDER_LIST_RECEIVED:
            return {
                ...state,
                    tenders: action.data['hydra:member'],
                    pageCount: hydraPageCount(action.data),
                    isFetching: false
                };
        case actionTypes.TENDER_LIST_ERROR:
            return {
                ...state,
                    isFetching: false,
                    tenders: null            
                };
        case actionTypes.TENDER_LIST_SET_PAGE:
            return {
                ...state,
                    currentPage: action.page
                };
        case actionTypes.REMOVE_TENDER:
            return {
                ...state,
                    tenders: action.tender
                        };
        case actionTypes.ADD_NEW_TENDER_TITLE:
            return {
                ...state,
                    newTenderTitle: action.title
                        };
        case actionTypes.ADD_NEW_TENDER_DESCRIPTION:
            return {
                ...state,
                    newTenderDescription: action.description
                        };
        default: 
            return state;
    }
};

export default reducer;