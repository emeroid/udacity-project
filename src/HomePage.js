import React from 'react';
import {update, get, getAll} from './BooksAPI';
import { Link } from 'react-router-dom';
import BooksShelfChanger from './component/BookShelfChanger';


const shelfs = ['currentlyReading','wantToRead','read'];


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
      get(bookId)
      .then((response) => {
            update(response, this.state.shelf)
            .then(
              (response) => {
                this.componentDidMount();
              }
            )
            .catch();
      })
      .catch((error) => {
          console.log(error);
      });
    }

    getComponent() {
      //console.log(items)
      return shelfs.map((shelf, i) => 
          <div className="bookshelf" key={i}>
          <h2 className="bookshelf-title">{shelf.charAt(0).toUpperCase() + shelf.slice(1).replace(/([a-z0-9])([A-Z])/g, '$1 $2')}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
                {
                  this.state.books.map((item, index) => 
                     { //console.log(item);
                      return item.shelf === shelf &&
                      (<li key={index}> 
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${item.imageLinks !== undefined ? item.imageLinks.thumbnail : 'No Image'}")` }}></div>
                              <BooksShelfChanger onChange={this.handleChange} onIdChange={this.handleBookIdChange} shelf={item.shelf} book={item.id}/>
                          </div>
                          <div className="book-title">{item.title}</div>
                          <div className="book-authors">{item.authors.length !== 0 ? item.authors[0] : 'No Author'}</div>
                        </div>
                       </li>
                      )}
                 )
                }
            </ol>
          </div>
         </div>
        );
    }

    componentDidMount(){
       getAll().then(
        response => {
              this.setState({books: response});
        }
      ).catch(error => console.log('Unable to fetch data' + error));
    }


  render() {
    return (
          <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
                {this.getComponent()}
            </div>
          </div>
          <div className="open-search">
          <Link to="/search" style={{color: 'inherit', textDecoration: 'none'}}><button>Add a book</button></Link>
          </div>
        </div>
    );
  }
}