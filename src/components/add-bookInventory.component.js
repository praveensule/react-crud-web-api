import React, { Component } from "react";
import BookInventoryDataService from "../services/bookInventory.service";

export default class AddBookInventory extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.saveBookInventory = this.saveBookInventory.bind(this);
    this.newBookInventory = this.newBookInventory.bind(this);

    this.state = {
      id: null,
      title: "",
      author: "",
      dateCreated: "",
      published: false,

      submitted: false
    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      author: e.target.value
    });
  }

  saveBookInventory() {

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    var data = {
      title: this.state.title,
      author: this.state.author,
      dateCreated: today
    };

    BookInventoryDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          author: response.data.author,
          published: response.data.published,
          dateCreated: today,
          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newBookInventory() {
    this.setState({
      id: null,
      title: "",
      author: "",
      dateCreated: "",
      published: false,

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newBookInventory}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.title}
                onChange={this.onChangeTitle}
                name="title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="author">Author</label>
              <input
                type="text"
                className="form-control"
                id="author"
                required
                value={this.state.author}
                onChange={this.onChangeDescription}
                name="author"
              />
            </div>

            <button onClick={this.saveBookInventory} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
