import React, { Component } from 'react';
import Tender from './Tender/Tender';
import Paginator from './UI/Paginator';
import { NavLink } from 'react-router-dom';
import './Main.scss';
import { connect } from 'react-redux';
import { click, tenderListFetch, tenderListSetPage, deleteTender } from '../store/actions/tenders';

const mapStateToProps = state => {
    return {
        ...state.tenders
    };
};

const mapDispatchToProps = {
        click,
        tenderListFetch,
        tenderListSetPage,
        deleteTender
}

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = { 
        };
    }

    componentDidMount() {
        this.props.tenderListFetch();
        document.body.style.background = "#eee";
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

    toggleClick() {
        let buttonClicked = this.props.clicked;
        if (buttonClicked) {
            buttonClicked = false
            document.body.style.background = "#eee"
            console.log(this.props.tenders);
        } else {
            buttonClicked = true;
            document.body.style.background = "#121212"
            console.log(this.props.tenders);
        }
        this.props.click(buttonClicked);
    }

    changePage(page) {
        const {tenderListSetPage} = this.props;
        tenderListSetPage(page);
      }

    onNextPageClick = (e) => {
        const {currentPage, pageCount} = this.props;
        const newPage = Math.min(currentPage + 1, pageCount);
        this.changePage(newPage);
    }

    onPrevPageClick = (e) => {
        const {currentPage} =this.props;
        const newPage = Math.max(currentPage -1, 1);
        this.changePage(newPage);
    }

    editTender = (id) => {
        
    }

    deleteTender = (id) => {
        let {tenders, deleteTender} = this.props;
        tenders = tenders.filter((tender) => {
            return tender.id !== id
        });
        deleteTender(tenders);
/*
        const requestOptions = {method: 'DELETE'};
        fetch("http://localhost:8000/api/tenders/" + id, requestOptions).then((response) => {
            return response.json();
          }).then((result) => {});
          */
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
                        delete={this.deleteTender}
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
                     <div  class="btn-floating btn-large waves-effect waves-light blue"><i class="material-icons">add</i></div>
                </NavLink>
                <div className="button" onClick={() => this.toggleClick()}>Click</div>
                {content}
               <div>
                {paginator}
               </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);