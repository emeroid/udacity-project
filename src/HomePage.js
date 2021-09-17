import React from 'react';
import BookList from './component/BookList';
import * as BooksAPI from './BooksAPI';
import { Link } from 'react-router-dom';

export default class Home extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.handleBookIdChange = this.handleBookIdChange.bind(this);
      this.state = {books: [], shelf: ''};
    }

    handleChange(shelfValue) {
        this.setState({shelf: shelfValue});
    }
  
    handleBookIdChange(bookId) {
      BooksAPI.get(bookId).then(
        book => {
          BooksAPI.update(book, this.state.shelf).then(
            response => {
              this.componentDidMount();
            }
          )
        },
        error => { }
      );
    }

    componentDidMount(){
        BooksAPI.getAll().then(
              response => {
                this.setState({books: response});
                //console.log(this.state.books);
              },
              error => { }
        );
      }

  render() {
    return (
          <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    <BookList books={this.state.books} shelf={"currentlyReading"} onBookIdChange={this.handleBookIdChange} onShelfChange={this.handleChange}></BookList>
                  </ol>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Want to Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    <BookList books={this.state.books} shelf={"wantToRead"} onBookIdChange={this.handleBookIdChange} onShelfChange={this.handleChange}></BookList>
                  </ol>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    <BookList books={this.state.books} shelf={"read"} onBookIdChange={this.handleBookIdChange} onShelfChange={this.handleChange}></BookList>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div className="open-search">
          <Link to="/search" style={{color: 'inherit', textDecoration: 'none'}}><button>Add a book</button></Link>
          </div>
        </div>
    );
  }
}