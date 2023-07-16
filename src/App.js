import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [albums, setAlbums] = useState([]);
  const [newAlbum, setNewAlbum] = useState('');

  // Fetch albums from the API
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/albums')
      .then(response => response.json())
      .then(data => setAlbums(data))
      .catch(error => console.log('Error:', error));
  }, []);

  // Add an album
  const addAlbum = () => {
    // Create a new album object
    const album = {
      title: newAlbum,
      userId: 1, // Replace with the desired user ID
    };

    // Make a POST request to add the album (dummy request)
    fetch('https://jsonplaceholder.typicode.com/albums', {
      method: 'POST',
      body: JSON.stringify(album),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(data => {
        setAlbums(prevAlbums => [...prevAlbums, data]);
        setNewAlbum('');
      })
      .catch(error => console.log('Error:', error));
  };

  // Update an album
  const updateAlbum = albumId => {
    // Create an updated album object
    const updatedAlbum = {
      title: 'Updated Title', // Replace with the desired updated title
      userId: 1, // Replace with the desired user ID
    };

    // Make a PUT request to update the album (dummy request)
    fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}`, {
      method: 'PUT',
      body: JSON.stringify(updatedAlbum),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(data => {
        setAlbums(prevAlbums =>
          prevAlbums.map(album => (album.id === albumId ? data : album))
        );
      })
      .catch(error => console.log('Error:', error));
  };

  // Delete an album
  const deleteAlbum = albumId => {
    // Make a DELETE request to delete the album (dummy request)
    fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(() => {
        setAlbums(prevAlbums =>
          prevAlbums.filter(album => album.id !== albumId)
        );
      })
      .catch(error => console.log('Error:', error));
  };

  return (
    <div className="container">
      <h1>Albums</h1>
      <ul className="album-list">
        {albums.map(album => (
          <li key={album.id} className="album-item">
            {album.title}
            <div className="button-group">
              <button
                className="update-button"
                onClick={() => updateAlbum(album.id)}
              >
                Update
              </button>
              <button
                className="delete-button"
                onClick={() => deleteAlbum(album.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="add-album">
        <input
          type="text"
          value={newAlbum}
          onChange={e => setNewAlbum(e.target.value)}
          placeholder="Enter album title"
        />
        <button className="add-button" onClick={addAlbum}>
          Add Album
        </button>
      </div>
    </div>
  );
};

export default App;
