import * as yup from 'yup';
export const AuthorValidation = yup.object().shape({
    name: yup.string().required(),
    birthyear: yup.number().integer().positive().required(),
    genre: yup.string().required(),
    isDead: yup.boolean().required(),
    isMale: yup.boolean().required(),
    imageURL: yup.string().required()
});
