
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Container } from '@mui/material';
import Header from './components/Header';
import SimpleBottomNavigation from './components/MainNav';
import Movies from './components/Movies';
import Search from './components/Search';


function App() {
  return (

    <BrowserRouter>
      <Header />
      <div className="app">
        <Container>
          <Routes>
            <Route path="/movies" element={<Movies />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </Container>
      </div>
      <SimpleBottomNavigation />
    </BrowserRouter>
  );
}

export default App;

