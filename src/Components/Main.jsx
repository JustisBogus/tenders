import React, { Component } from 'react';
import Tender from './Tender/Tender';
import Paginator from './UI/Paginator';
import { NavLink } from 'react-router-dom';
import './Main.scss';
import { connect } from 'react-redux';
import { click, tenderListFetch, tenderListSetPage, deleteTender, 
    updateTender} from '../store/actions/tenders';

const mapStateToProps = state => {
    return {
        ...state.tenders
    };
};

const mapDispatchToProps = {
        click,
        tenderListFetch,
        tenderListSetPage,
        updateTender,
        deleteTender,
}

class Main extends Component {

    componentDidMount() {
        this.props.tenderListFetch();
    }

    componentDidUpdate(prevProps) {
        const {currentPage, tenderListFetch} = this.props;

        if (prevProps.currentPage !== currentPage) {
            tenderListFetch(currentPage);
        }
    }

    getQueryParamPage() {
        return Number(this.props.match.params.page) || 1;
    }

    changePage(page) {
        const {tenderListSetPage} = this.props;
        tenderListSetPage(page);
    }

    onNextPageClick = () => {
        const {currentPage, pageCount} = this.props;
        const newPage = Math.min(currentPage + 1, pageCount);
        this.changePage(newPage);
    }

    onPrevPageClick = () => {
        const {currentPage} = this.props;
        const newPage = Math.max(currentPage -1, 1);
        this.changePage(newPage);
    }

    onEditTender = (id, title, description) => {
        const { updateTender, tenders} = this.props
        const updatedTenders = tenders.map(tender => (tender.id === id ? {...tender, title, description} : tender));
        updateTender(id, title, description, updatedTenders);
    }

    onDeleteTender = (id) => {
        let {tenders, deleteTender} = this.props;
        tenders = tenders.filter((tender) => {
            return tender.id !== id
        });
        deleteTender(id, tenders);
    }
     
    render() {

        let content;
        let paginator;
        const { tenders, isFetching, tenderListSetPage, currentPage, pageCount} = this.props

        if (isFetching) {
            content = (
                <div className="progress">
                    <div className="indeterminate"></div>
                </div> );
                  
        } 
        if (!isFetching && tenders) {
            content = (
                tenders.map(tender => {
                   return <Tender
                        key={tender.id}
                        tender={tender}
                        edit={this.onEditTender}
                        delete={this.onDeleteTender}
                    />
                })
            );

            paginator = ( <Paginator 
                currentPage={currentPage}
                pageCount={pageCount}
                setPage={tenderListSetPage}
                nextPage={this.onNextPageClick}
                prevPage={this.onPrevPageClick}/> 
            )
        } 
        if (!isFetching && (tenders && tenders.length === 0)) {
            content = ( <div className="center-align">No Tenders</div> )
        }

        return (
            <div className="container">
                <NavLink
                    to="/newtender">
                     <div  className="btn-floating btn-large waves-effect waves-light blue"><i className="material-icons">add</i></div>
                </NavLink>
                {content}
               <div>
                {paginator}
               </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);