import React, { useState } from 'react';
import { TextField, Box, Typography } from '@mui/material';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh" 
      textAlign="center" 
      padding={2} 
    >
      <Typography variant="h5" component="h1" marginBottom={2}>
        Search
      </Typography>
      <TextField
        label="Search Movies"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearch}
        sx={{ width: '100%', maxWidth: 400 }}
      />
      {searchQuery && (
        <Typography variant="body1" marginTop={2}>
          Search results for: "{searchQuery}"
        </Typography>
      )}
    </Box>
  );
};

export default Search;
