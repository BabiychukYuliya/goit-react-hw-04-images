import { Component } from 'react';

export default class Searchbar extends Component {
  state = {
    imageName: '',
  };

  handleNameCange = evn => {
    this.setState({ imageName: evn.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.imageName.trim() === '') {
      alert('Input your request pleace');
      return;
    }

    this.props.onSearch(this.state.imageName);
    this.setState({ imageName: '' });
  };

  render() {
    return (
      <header className="Searchbar">
        <form onSubmit={this.handleSubmit} className="SearchForm">
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleNameCange}
            value={this.state.imageName}
          />
        </form>
      </header>
    );
  }
}
