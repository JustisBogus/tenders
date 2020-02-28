import React, { Component } from 'react';

class Paginator extends Component {
    constructor(props) {
        super(props);
        const {pageCount, currentPage} = this.props;
        this.range = [];

        for (let i = 1; i <= pageCount; i++) {
            if ((i <= currentPage && i > (currentPage - 10)) 
                || (i >= currentPage && i < (currentPage + 10))) {
                this.range.push(i);
            }    
        };
    }
        
    render() {
        const {currentPage, setPage, prevPage, nextPage} = this.props;

        return (
            <div>
                <ul className="pagination">
                    <li className="waves-effect"><div onClick={prevPage}><i className="material-icons">chevron_left</i></div></li>
                    {
                        this.range.map(page => {
                            const onClick = e => {
                                e.preventDefault();
                                setPage(page);
                            };
                                return ( <li key={page} className={page === currentPage ? "active blue lighten-1" : "waves-effect"}>
                                <div onClick={onClick} className="paginator-item">
                                    {page}
                                </div>
                            </li>
                            );              
                        })
                    }
                    <li className="waves-effect"><div onClick={nextPage}><i className="material-icons">chevron_right</i></div></li>
                </ul>
            </div>
        );
    }
}

export default Paginator;