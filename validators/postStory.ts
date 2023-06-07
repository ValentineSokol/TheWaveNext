import * as Yup from 'yup';

export const postStorySchema = Yup.object({
    name: Yup.string()
        .min(10, 'Your story name should be at least 10 characters')
        .max(100, 'Your story name should be at most 100 characters'),
    summary: Yup.object().test(
        'min',
        'Your story summary should be at least 10 characters',
        (value) => value?.toPlainText()?.length >= 10
    )
        .test(
            'max',
            'Your story summary should be at most 255 characters',
            (value) => {
                return value?.toPlainText()?.length <= 255
            }
        ),
    characters: Yup.array().min(1, 'Your story should have at least one character'),
    fandoms: Yup.array().min(1, 'Your story should belong to at least one fandom')
});
