import React from "react";
import * as BooksAPI from '../BooksAPI';


export default class SearchBooks extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {searchData: [], found: false};
    }

    handleChange(e) {
        this.props.onShelfChange(e.target.value);
        const index = e.target.options.selectedIndex;
        this.props.onBookIdChange(e.target.options[index].getAttribute('data-key'));
    }

    search (data, query){
        if(query === '' || query === undefined){
            return [];
        }
        
        BooksAPI.search(query).then(
            search => {
                if(search.error !== "empty query"){
                    this.setState({searchData: search});
                    this.setState({found: true});
                    //console.log(search);
                }
                if(query === '' || query === undefined || search.error === "empty query"){
                    this.setState({found: false});
                }
            },
            error => {
              return 'Something went wrong'+ error;
            }
          );
        return this.state.searchData;
    }

    render(){
        const query = this.props.query;
        const books = this.props.books;
        
        return (
            <>
                {
                  this.search(books, query).map((book, index) =>
                    <li key={index}>
                       {
                           <div className="book">
                                    <div className="book-top">
                                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.thumbnail ? book.imageLinks.thumbnail : 'No Image'}")` }}></div>
                                        <div className="book-shelf-changer">
                                        <select value={book.shelf} onChange={this.handleChange}>
                                            <option value="move" disabled>Move to...</option>
                                            <option value="currentlyReading" data-key={book.id}>Currently Reading</option>
                                            <option value="wantToRead" data-key={book.id}>Want to Read</option>
                                            <option value="read" data-key={book.id}>Read</option>
                                            <option value="none">None</option>
                                        </select>
                                        </div>
                                    </div>
                           <div className="book-title">{book.title}</div>
                           <div className="book-authors">{ book.author }</div>
                           </div>
                        }
                    </li>
                  )
                }

                {!this.state.found && (<div className="loading"> No Book found</div>)}
                
            </>
        );

    };

}