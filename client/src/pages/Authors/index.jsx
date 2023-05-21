import { Box, Button, Container, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Card, Typography } from 'antd';
import { deleteAuthor, getAllAuthors } from '../../api/httprequest';
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    getAllAuthors().then(res => {
      setAuthors(res);
    });
  }, []);

  function handleSearch(e) {
    getAllAuthors(e.target.value).then(res => {
      setAuthors(res);
    });
  }

  function handleFilter(e) {
    setFilter(e.target.value);
  }

  function handleDelete(id) {
    deleteAuthor(id)
      .then(() => {
        setAuthors(prevAuthors => prevAuthors.filter(author => author._id !== id))
      })
      .catch(error => {
        console.log(error);
      });
  }

  const calculateAge = birthyear => {
    const currentYear = new Date().getFullYear();
    return currentYear - birthyear;
  };

  const filteredAuthors = authors.filter(author => {
    if (filter === 'All') {
      return true;
    } else {
      return author.isMale === (filter === 'Male');
    }
  });

  return (
    <>
      <Container maxWidth="lg" style={{ padding: '3rem 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', height: "100px", marginBottom: "2rem" }}>
          <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search Authors"
              onChange={e => handleSearch(e)}
              inputProps={{ 'aria-label': 'search google maps' }}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
          <Box sx={{ minWidth: 120 }} style={{ marginLeft: '1rem' }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Age</InputLabel>
              <Select
                value={filter}
                onChange={e => handleFilter(e)}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Authors"
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
        <Grid container spacing={2}>
          {filteredAuthors.map(author => (
            <Grid item lg={4} md={6} sm={12} xs={12} key={author._id}>
              <Card
                hoverable
                style={{
                  width: 240,
                }}
                cover={<img alt="example" src={author.imageURL} height={"250px"} />}
              >
                <Typography>
                  <b>Name:</b>
                  <Link
                    style={{ color: author.isDead ? 'red' : 'black' }}
                    to={`/author/detail/${author._id}`}
                  >
                    {author.name}
                  </Link>
                </Typography>
                <Typography>
                  <b>Age:</b> {calculateAge(author.birthyear)}
                </Typography>
                <Typography>
                  <b>Genre:</b> {author.genre}
                </Typography>
                <Typography>
                  <b>isMale:</b> {author.isMale ? 'Male' : 'Female'}
                </Typography>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '0.5rem' }}>
                  <Button variant='contained' color='error'
                    onClick={(e) => handleDelete(author._id)}
                  >Delete</Button>
                  <Button variant='contained' color='warning' style={{marginLeft:'0.5rem'}}><Link style={{color:'white'}} to={`/author/edit/${author._id}`}>Edit</Link></Button>
                </div>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Authors;
