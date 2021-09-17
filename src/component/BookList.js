import React from "react";

export default class BooksList extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.onShelfChange(e.target.value);
        const index = e.target.options.selectedIndex;
        this.props.onBookIdChange(e.target.options[index].getAttribute('data-key'));
    }

    render(){
        const books = this.props.books;
        const shelf = this.props.shelf;
        return (
            <>
                {books.map((book, index) =>
                    <li key={index}> 
                       {
                       book.shelf === shelf && 
                       <div className="book">
                       <div className="book-top">
                           <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.thumbnail}")` }}></div>
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
                       <div className="book-authors">{book.authors[0]}</div>
                      </div>
                      
                       }
                      
                    </li>
                  
               )}
            </>
        );

    };

}