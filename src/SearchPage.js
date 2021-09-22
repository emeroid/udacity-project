import React from 'react';
import { search, get, update } from './BooksAPI';
import { Link } from 'react-router-dom';
import BooksShelfChanger from './component/BookShelfChanger';

export default class Search extends React.Component  {

  _isMounted = false;

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.handleBookIdChange = this.handleBookIdChange.bind(this);
    this.state = {data: [], query: '', shelf: 'none'};
  }

    handleQueryChange(e) {
        this.setState({query: e.target.value});
        search(e.target.value).then(resp => {
          if(resp.error !== 'empty query'){
            this.setState({data: resp});
          }else{
            this.setState({data: []});
          }
          //console.log(resp);
      }).catch(error => console.log(error));
        
    }

    handleChange(shelfValue) {
      this.setState({shelf: shelfValue});
    }

    handleBookIdChange(bookId) {
      //console.log(bookId);
      get(bookId)
      .then((response) => {
            update(response, this.state.shelf)
            .then(
              (response) => {
                //console.log(response);
              }
            )
            .catch(error => console.log(error));
      })
      .catch((error) => {
          console.log(error);
      });
    }

    componentDidUpdate (prevState) {
        this._isMounted = true
        if(this.state.query !== prevState.query || this.state.shelf !== prevState.shelf){
          if(this._isMounted){
            this.getComponent();
            //console.log('updated');
          }
        }
    }

    componentWillUnmount() {
      this._isMounted = false;
      this.setState = (state,callback)=>{
        return;
    };
    }

    getComponent(){

      if(this.state.query === ''){
        return [];
      }else{
        return this.state.data.map((book, index) =>
        <li key={index}>
       {
          <div className="book">
                    <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks !== undefined ? book.imageLinks.thumbnail : 'No Image'}")` }}></div>
                        <BooksShelfChanger shelf={book.shelf} onIdChange={this.handleBookIdChange} onChange={this.handleChange} book={book.id} />
                    </div>
           <div className="book-title">{book.title}</div>
           <div className="book-authors">{ book.authors !== null ? book.authors : 'No Author'}</div>
           </div>
        }
       </li>
      );
      }
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
              {this.getComponent()}
          </ol>
        </div>
      </div>
    );
  }
}