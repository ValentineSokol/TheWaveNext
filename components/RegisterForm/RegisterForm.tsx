import React, {useState} from "react";
import styles from "./RegisterForm.module.scss";
import {Input} from "@/components/Input/Input";
import {PasswordInput} from "@/components/PasswordInput/PasswordInput";
import {Button} from "@/components/Button/Button";
import {Modal} from "@/components/Modal/Modal";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {registerSchema, loginSchema} from "@/validators/register";
import {useLocalAuth} from "@/api/UserApi";
import {useDebounce} from "@/utils/hooks/useDebounce";
import Trans from "next-translate/Trans";
import {ErrorText} from "@/components/ErrorText/ErrorText";
import {Heading} from "@/components/Heading/Heading";
import {Text} from "@/components/Text/Text";

export const RegisterModal = ({t, login = false, onClose, open = true}) => {
    const [isLogin, setIsLogin] = useState(login);
    const [showRequestError, setShowRequestError] = useState(false);

    const toggleIsLogin = (e) => {
        e.preventDefault();
        setIsLogin(prev => !prev);
        clearErrors();
        setShowRequestError(false);
    }

    const formAPI = useForm({
        mode: 'onBlur',
        resolver: yupResolver(isLogin ? loginSchema : registerSchema),
    });

    const {setValue, handleSubmit, clearErrors, formState: {errors}} = formAPI;

    const {mutate, isLoading, error} = useLocalAuth(isLogin, {onError: () => setShowRequestError(true), delay: 10000});


    const onSubmit = async (data, e) => {
        e.preventDefault();
        await mutate(data);
    }

    const getRequestErrorMessage = () => {
        if (isLogin && error?.status === 401) return 'Incorrect username or password';
        return 'We are sorry, something went wrong! Please, try again later.';
    }

    const validateUsername = useDebounce((e) => {
        if (isLogin || e.target.value.length < 4 || e.target.value.length > 20) return;
        setValue('username', e.target.value, {shouldValidate: true})
    }, 200);
    return (
        <Modal open={open} onClose={onClose}>
            <div className={styles.container}>
                <Heading level={2} fontSize={5}>{t(`register:${isLogin ? 'logIn' : 'register'}`)}</Heading>
                <form className={styles.form}>
                    <div className={styles.fields}>
                        <Input
                            autoFocus={open}
                            variant='filled'
                            name='username'
                            onChange={validateUsername}
                            error={errors?.username?.message && t(`register:${errors?.username?.message}`)}
                            label={t('register:usernameLabel')}
                            fullWidth
                            formAPI={formAPI}
                        />
                        <PasswordInput
                            fullWidth
                            variant='filled'
                            error={errors?.password?.message && t(`register:${errors?.password?.message}`)}
                            label={t('register:passwordLabel')} name='password'
                            formAPI={formAPI}
                        />
                        <Trans
                            ns='register'
                            i18nKey={isLogin ? 'registerCTA' : 'loginCTA'}
                            components={[
                                <Text className={styles.modeToggle}/>,
                                <Button size='s' onClick={toggleIsLogin} variant="link_dark"></Button>
                            ]}
                        />
                        {showRequestError && <ErrorText>{getRequestErrorMessage()}</ErrorText>}
                    </div>
                    <Button className={styles.btn} onClick={handleSubmit(onSubmit)} isLoading={isLoading}
                            disabled={!!Object.keys(errors).length}>{t(`register:${isLogin ? 'logIn' : 'register'}`)}</Button>
                </form>
            </div>
        </Modal>
    )
}
