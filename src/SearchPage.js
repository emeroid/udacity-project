import React from 'react';
import SearchBooks from './component/SearchBooks';
import * as BooksAPI from './BooksAPI';
import { Link } from 'react-router-dom';

export default class Search extends React.Component {

    constructor(props) {
      super(props);
      this.handleQueryChange = this.handleQueryChange.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleBookIdChange = this.handleBookIdChange.bind(this);
      this.state = {books: [], loading: false, searchbooks: [], query: '', shelf: 'none'};
    }

    handleQueryChange(e) {
        this.setState({query: e.target.value});
        
    }

    handleChange(shelfValue) {
      this.setState({shelf: shelfValue});
    }

  handleBookIdChange(bookId) {
    //this.setState({loading: true});
    BooksAPI.get(bookId).then(
      book => {
        BooksAPI.update(book, this.state.shelf).then(
          response => {
            this.componentDidMount();
            //this.setState({loading: false});
          }
        )
      },
      error => { }
    );
  }

    componentDidMount(){
      this.setState({loading: true});
        BooksAPI.getAll().then(
              response => {
                this.setState({books: response});
                this.setState({loading: false});
              },
              error => { }
        );
      }

  render() {
    return (
        <div className="search-books">
        <div className="search-books-bar">
          <Link to={"/"} style={{color: 'inherit', textDecoration: 'none'}}><button className="close-search">Close</button></Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" onChange={this.handleQueryChange} />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            { <SearchBooks books={this.state.books} query={this.state.query} onBookIdChange={this.handleBookIdChange} onShelfChange={this.handleChange}></SearchBooks>}
          </ol>
        </div>
      </div>
    );
  }
}