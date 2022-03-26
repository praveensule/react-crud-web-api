import React, { Component } from "react";
import BookInventoryDataService from "../services/bookInventory.service";
import { Link } from "react-router-dom";

export default class BookInventorysList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveBookInventorys = this.retrieveBookInventorys.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveBookInventory = this.setActiveBookInventory.bind(this);
    this.removeAllBookInventorys = this.removeAllBookInventorys.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      bookInventorys: [],
      currentBookInventory: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveBookInventorys();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveBookInventorys() {
    BookInventoryDataService.getAll()
      .then(response => {
        this.setState({
          bookInventorys: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveBookInventorys();
    this.setState({
      currentBookInventory: null,
      currentIndex: -1
    });
  }

  setActiveBookInventory(bookInventory, index) {
    this.setState({
      currentBookInventory: bookInventory,
      currentIndex: index
    });
  }

  removeAllBookInventorys() {
    BookInventoryDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    this.setState({
      currentBookInventory: null,
      currentIndex: -1
    });

    BookInventoryDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          bookInventorys: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, bookInventorys, currentBookInventory, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>BookInventorys List</h4>

          <ul className="list-group">
            {bookInventorys &&
              bookInventorys.map((bookInventory, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveBookInventory(bookInventory, index)}
                  key={index}
                >
                  {bookInventory.title}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllBookInventorys}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentBookInventory ? (
            <div>
              <h4>BookInventory</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentBookInventory.title}
              </div>
              <div>
                <label>
                  <strong>Author:</strong>
                </label>{" "}
                {currentBookInventory.author}
              </div>
              <div>
                  <label>
                    <strong>Date Created:</strong>
                  </label>{" "}
                  {currentBookInventory.dateCreated}
                </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentBookInventory.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/bookInventorys/" + currentBookInventory.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a BookInventory...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
