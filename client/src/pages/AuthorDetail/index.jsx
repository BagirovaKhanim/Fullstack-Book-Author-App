import React, { useEffect, useState } from 'react'
import { Button, Container, Grid, Typography } from '@mui/material'
import { Card } from 'antd'
import { Link, useParams } from 'react-router-dom'
import { getAuthorByID } from '../../api/httprequest'

const AuthorDetail = () => {
  const [author, setAuthor] = useState({})
  const { id } = useParams()
  useEffect(() => {
    getAuthorByID(id).then(res => {
      setAuthor(res)
    })
  }, [id])
  const calculateAge = birthyear => {
    const currentYear = new Date().getFullYear();
    return currentYear - birthyear;
  };


  return (
    <>
      <Container maxWidth="lg" style={{ padding: '3rem 0' }}>
        <Grid container spacing={2}>
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
                {author.name}
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
                <Button variant='contained' color='success'
                ><Link style={{color:'white'}} to='/authors'>Go Back</Link></Button>
              </div>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default AuthorDetail