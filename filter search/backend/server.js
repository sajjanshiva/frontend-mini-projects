const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Enable CORS for frontend
app.use(cors());

// Add this line after app.use(cors());
app.get('/', (req, res) => {
  res.send('✅ API is running!');
});

// Sample movie data
const movies = [
  { id: 1, title: 'The Matrix', year: 1999, genre: 'Sci-Fi' },
  { id: 2, title: 'Inception', year: 2010, genre: 'Sci-Fi' },
  { id: 3, title: 'The Dark Knight', year: 2008, genre: 'Action' },
  { id: 4, title: 'Interstellar', year: 2014, genre: 'Sci-Fi' },
  { id: 5, title: 'Pulp Fiction', year: 1994, genre: 'Crime' },
  { id: 6, title: 'Forrest Gump', year: 1994, genre: 'Drama' },
  { id: 7, title: 'The Shawshank Redemption', year: 1994, genre: 'Drama' },
  { id: 8, title: 'Fight Club', year: 1999, genre: 'Drama' },
  { id: 9, title: 'Goodfellas', year: 1990, genre: 'Crime' },
  { id: 10, title: 'The Godfather', year: 1972, genre: 'Crime' },
  { id: 11, title: 'Avatar', year: 2009, genre: 'Sci-Fi' },
  { id: 12, title: 'Titanic', year: 1997, genre: 'Romance' },
  { id: 13, title: 'Gladiator', year: 2000, genre: 'Action' },
  { id: 14, title: 'The Departed', year: 2006, genre: 'Crime' },
  { id: 15, title: 'The Prestige', year: 2006, genre: 'Mystery' },

  // Hollywood (16–40)
  { id: 16, title: 'Joker', year: 2019, genre: 'Drama' },
  { id: 17, title: 'Avengers: Endgame', year: 2019, genre: 'Action' },
  { id: 18, title: 'Iron Man', year: 2008, genre: 'Action' },
  { id: 19, title: 'Doctor Strange', year: 2016, genre: 'Sci-Fi' },
  { id: 20, title: 'The Social Network', year: 2010, genre: 'Drama' },
  { id: 21, title: 'Whiplash', year: 2014, genre: 'Drama' },
  { id: 22, title: 'Parasite', year: 2019, genre: 'Thriller' },
  { id: 23, title: 'Django Unchained', year: 2012, genre: 'Western' },
  { id: 24, title: 'The Wolf of Wall Street', year: 2013, genre: 'Drama' },
  { id: 25, title: 'The Silence of the Lambs', year: 1991, genre: 'Thriller' },
  { id: 26, title: 'Se7en', year: 1995, genre: 'Crime' },
  { id: 27, title: 'Mad Max: Fury Road', year: 2015, genre: 'Action' },
  { id: 28, title: 'The Batman', year: 2022, genre: 'Action' },
  { id: 29, title: 'Blade Runner 2049', year: 2017, genre: 'Sci-Fi' },
  { id: 30, title: 'La La Land', year: 2016, genre: 'Romance' },
  { id: 31, title: 'The Grand Budapest Hotel', year: 2014, genre: 'Comedy' },
  { id: 32, title: 'Black Panther', year: 2018, genre: 'Action' },
  { id: 33, title: 'Logan', year: 2017, genre: 'Action' },
  { id: 34, title: 'The Imitation Game', year: 2014, genre: 'Drama' },
  { id: 35, title: 'A Beautiful Mind', year: 2001, genre: 'Drama' },
  { id: 36, title: 'Gravity', year: 2013, genre: 'Sci-Fi' },
  { id: 37, title: 'Shutter Island', year: 2010, genre: 'Mystery' },
  { id: 38, title: 'The Revenant', year: 2015, genre: 'Adventure' },
  { id: 39, title: 'Casino Royale', year: 2006, genre: 'Action' },
  { id: 40, title: 'John Wick', year: 2014, genre: 'Action' },

  // Telugu Movies (41–60)
  { id: 41, title: 'Baahubali: The Beginning', year: 2015, genre: 'Action' },
  { id: 42, title: 'Baahubali: The Conclusion', year: 2017, genre: 'Action' },
  { id: 43, title: 'RRR', year: 2022, genre: 'Action' },
  { id: 44, title: 'Magadheera', year: 2009, genre: 'Action' },
  { id: 45, title: 'Eega', year: 2012, genre: 'Fantasy' },
  { id: 46, title: 'Jersey', year: 2019, genre: 'Drama' },
  { id: 47, title: 'Arjun Reddy', year: 2017, genre: 'Drama' },
  { id: 48, title: 'Pushpa: The Rise', year: 2021, genre: 'Action' },
  { id: 49, title: 'Rangasthalam', year: 2018, genre: 'Drama' },
  { id: 50, title: 'Ala Vaikunta Puramuloo', year: 2020, genre: 'Drama' },
  { id: 51, title: 'Pokiri', year: 2006, genre: 'Action' },
  { id: 52, title: 'Athadu', year: 2005, genre: 'Action' },
  { id: 53, title: 'Leader', year: 2010, genre: 'Drama' },
  { id: 54, title: 'Oopiri', year: 2016, genre: 'Drama' },
  { id: 55, title: 'Sye', year: 2004, genre: 'Sports' },
  { id: 56, title: 'Tagore', year: 2003, genre: 'Drama' },
  { id: 57, title: 'Khaleja', year: 2010, genre: 'Fantasy' },
  { id: 58, title: 'Janatha Garage', year: 2016, genre: 'Drama' },
  { id: 59, title: 'Dasara', year: 2023, genre: 'Drama' },
  { id: 60, title: 'Kantara (Telugu Dub)', year: 2022, genre: 'Thriller' }
];


// Search endpoint - DEBOUNCED on frontend
app.get('/api/search', (req, res) => {
  const query = req.query.q?.toLowerCase() || '';
  
  console.log(`🔍 Search request: "${query}"`);
  
  // Simulate API delay
  setTimeout(() => {
    const results = movies.filter(m => 
      m.title.toLowerCase().includes(query)
    );
    res.json(results);
  }, 300);
});

// Get all movies - THROTTLED on frontend (scroll load)
app.get('/api/movies', (req, res) => {
  console.log('📄 Fetching all movies');
  res.json(movies);
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});