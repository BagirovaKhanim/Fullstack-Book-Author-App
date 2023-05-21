import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import { editAuthor, getAuthorByID } from '../../api/httprequest'
import { AuthorValidation } from '../../schema'

const EditAuthor = () => {
    const [author, setAuthor] = useState({});
    const { id } = useParams()
    const navigate = useNavigate()

    async function fetchData() {
        const data = await getAuthorByID(id);
        setAuthor(data);
        formik.setValues({
            name: data.name,
            birthyear: data.birthyear,
            genre: data.genre,
            isDead: data.isDead,
            isMale: data.isMale,
            imageURL: data.imageURL
        });
    }

    useEffect(() => {
        fetchData();
    }, [id])

    const handleEdit = async (values, actions) => {
        await editAuthor(id, values)
        navigate('/authors')
        actions.resetForm();
    }

    const formik = useFormik({
        initialValues: {
            name: author.name,
            birthyear: author.birthyear,
            genre: author.genre,
            isDead: author.isDead,
            isMale: author.isMale,
            imageURL: author.imageURL
        },
        validationSchema:AuthorValidation,
        onSubmit: handleEdit,
    });

    return (
        <>
            <Typography style={{ textAlign: 'center', marginTop: '40px', fontSize: '30px', color: 'red' }}>{author.name} Edit</Typography>
            <form action="" onSubmit={formik.handleSubmit}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div>
                        <TextField
                            type='text'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name='name'
                            value={formik.values.name}
                            style={{ display: 'block', margin: '10px 0' }}
                            placeholder="Author Name..."
                        />
                        <TextField
                            type='number'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name='birthyear'
                            value={formik.values.birthyear}
                            style={{ display: 'block', margin: '10px 0' }}
                            placeholder="Author Birthyear..."
                        />
                        <TextField
                            type='text'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name='genre'
                            value={formik.values.genre}
                            style={{ display: 'block', margin: '10px 0' }}
                            placeholder="Author Genre..."
                        />
                        <TextField
                            type='text'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name='isDead'
                            value={formik.values.isDead}
                            style={{ display: 'block', margin: '10px 0' }}
                            placeholder="Author isDead..."
                        />
                        <TextField
                            type='text'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name='isMale'
                            value={formik.values.isMale}
                            style={{ display: 'block', margin: '10px 0' }}
                            placeholder="Author isMale..."
                        />
                        <TextField
                            type='text'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name='imageURL'
                            value={formik.values.imageURL}
                            style={{ display: 'block', margin: '10px 0' }}
                            placeholder="Author imageURL..."
                        />
                        <Button
                            variant="contained"
                            color="warning"
                            style={{ display: 'block', margin: '0 auto' }}
                            type='submit'
                        >
                            Edit
                        </Button>
                    </div>
                </div>
            </form>
        </>
    );
}

export default EditAuthor;