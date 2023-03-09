import {useState } from 'react';

export default function Searchbar({ onSearch }) {
  
  const [imageName, setImageName] = useState('');

  const handleNameCange = evn => {
    setImageName(evn.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (imageName.trim() === '') {
      alert('Input your request pleace');
      return;
    }

    onSearch(imageName);
    setImageName('');
  };

 
    return (
      <header className="Searchbar">
        <form onSubmit={handleSubmit} className="SearchForm">
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={handleNameCange}
            value={imageName}
          />
        </form>
      </header>
    );
  }
