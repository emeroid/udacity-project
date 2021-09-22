import React from "react";

export default class BooksShelfChanger extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        this.props.onChange(e.target.value);
        const index = e.target.options.selectedIndex;
        this.props.onIdChange(e.target.options[index].getAttribute('data-key'));
    }
    
    render(){
        const {shelf, book} = this.props;
        return (
            <>
                <div className="book-shelf-changer">
                    <select value={shelf} onChange={this.handleChange}>
                        <option value="move" disabled>Move to...</option>
                        <option value="none" data-key={book}>None</option>
                        <option value="currentlyReading" data-key={book}>Currently Reading</option>
                        <option value="wantToRead" data-key={book}>Want to Read</option>
                        <option value="read" data-key={book}>Read</option>
                    </select>
                </div>
            </>
        );

    };

}