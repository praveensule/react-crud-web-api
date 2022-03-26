import React, { Component } from "react";
import BookInventoryDataService from "../services/bookInventory.service";

export default class BookInventory extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getBookInventory = this.getBookInventory.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateBookInventory = this.updateBookInventory.bind(this);
    this.deleteBookInventory = this.deleteBookInventory.bind(this);

    this.state = {
      currentBookInventory: {
        id: null,
        title: "",
        author: "",
        dateCreated: "",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getBookInventory(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentBookInventory: {
          ...prevState.currentBookInventory,
          title: title
        }
      };
    });
  }

  onChangeDescription(e) {
    const author = e.target.value;
    
    this.setState(prevState => ({
      currentBookInventory: {
        ...prevState.currentBookInventory,
        author: author
      }
    }));
  }

  getBookInventory(id) {
    BookInventoryDataService.get(id)
      .then(response => {
        this.setState({
          currentBookInventory: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentBookInventory.id,
      title: this.state.currentBookInventory.title,
      author: this.state.currentBookInventory.author,
      dateCreated: this.state.currentBookInventory.dateCreated,
      published: status
    };

    BookInventoryDataService.update(this.state.currentBookInventory.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentBookInventory: {
            ...prevState.currentBookInventory,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateBookInventory() {
    BookInventoryDataService.update(
      this.state.currentBookInventory.id,
      this.state.currentBookInventory
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The bookInventory was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteBookInventory() {
    BookInventoryDataService.delete(this.state.currentBookInventory.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/bookInventorys')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentBookInventory } = this.state;

    return (
      <div>
        {currentBookInventory ? (
          <div className="edit-form">
            <h4>BookInventory</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentBookInventory.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="author">Author</label>
                <input
                  type="text"
                  className="form-control"
                  id="author"
                  value={currentBookInventory.author}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentBookInventory.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentBookInventory.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteBookInventory}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateBookInventory}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a BookInventory...</p>
          </div>
        )}
      </div>
    );
  }
}
