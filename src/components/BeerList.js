import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './BeerList.module.css'; 


function BeerList() {
  const [beers, setBeers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('https://api.punkapi.com/v2/beers')
      .then(response => {
        setBeers(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <input
        type="text"
        placeholder="Search beers..."
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.searchInput}
      />
      <div className={styles.beerList}>
        {beers
          .filter(beer => beer.name.toLowerCase().includes(searchTerm.toLowerCase()))
          .map(beer => (
            <div key={beer.id} className={styles.beerCard}>
              <img src={beer.image_url} alt={beer.name} />
              <h3>{beer.name}</h3>
              <p>Tagline: {beer.tagline}</p>
              <p>ABV: {beer.abv}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default BeerList;