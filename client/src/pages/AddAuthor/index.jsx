import React, { useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import style from './index.module.css'
import { useFormik } from 'formik';
import { AuthorValidation } from '../../schema/index'
import { useNavigate } from 'react-router-dom';
import { addAuthor } from '../../api/httprequest';

const AddAuthor = () => {
    const [author, setAuthor] = useState({})
    const navigate = useNavigate()
    const handleSubmit = async (values, actions) => {
        await addAuthor(values)
        setAuthor(values)
        // console.log(values);
        navigate('/authors')
        actions.resetForm()
    }
    const formik = useFormik({
        initialValues: {
            name: '',
            birthyear: '',
            genre: '',
            isDead: '',
            isMale: '',
            imageURL: ''
        },
        validationSchema: AuthorValidation,
        onSubmit: handleSubmit
    })
    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <div className={style.formWrapper}>
                    <div>
                        <h1>Add New Author</h1>
                        <TextField
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={style.textField}
                            id="outlined-basic"
                            label="Enter Name..."
                            variant="outlined"
                            type='text'
                            name='name'
                            value={formik.values.name} />
                        {(formik.errors.name && formik.touched.name) && <span style={{ color: 'red' }}>{formik.errors.name}</span>}
                        <TextField
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={style.textField}
                            id="outlined-basic"
                            label="Enter birthyear..."
                            variant="outlined"
                            type='number'
                            name='birthyear'
                            value={formik.values.birthyear} />
                        {(formik.errors.birthyear && formik.touched.birthyear) && <span style={{ color: 'red' }}>{formik.errors.birthyear}</span>}
                        <TextField
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={style.textField}
                            id="outlined-basic"
                            label="Enter genre..."
                            variant="outlined"
                            type="text"
                            name='genre'
                            value={formik.values.genre} />
                        {(formik.errors.genre && formik.touched.genre) && <span style={{ color: 'red' }}>{formik.errors.genre}</span>}
                        <TextField
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={style.textField}
                            id="outlined-basic"
                            label="Enter isDead..."
                            variant="outlined"
                            type="text"
                            name='isDead'
                            value={formik.values.isDead} />
                        {(formik.errors.isDead && formik.touched.isDead) && <span style={{ color: 'red' }}>{formik.errors.isDead}</span>}
                        <TextField
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={style.textField}
                            id="outlined-basic"
                            label="Enter isMale..."
                            variant="outlined"
                            type="text"
                            name='isMale'
                            value={formik.values.isMale} />
                        {(formik.errors.isMale && formik.touched.isMale) && <span style={{ color: 'red' }}>{formik.errors.isMale}</span>}
                        <TextField
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={style.textField}
                            id="outlined-basic"
                            label="Enter imageURL..."
                            variant="outlined"
                            type="url"
                            name='imageURL'
                            value={formik.values.imageURL} />
                        {(formik.errors.imageURL && formik.touched.imageURL) && <span style={{ color: 'red' }}>{formik.errors.imageURL}</span>}
                        <Button
                            className={style.button}
                            variant="contained"
                            type='submit'
                            disabled={Object.keys(formik.errors).length !== 0 ? true : false}
                        >
                            Add</Button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default AddAuthor