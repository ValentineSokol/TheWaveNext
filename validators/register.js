import * as Yup from 'yup';
import {UserApi} from "@/api/UserApi";

const username =
    Yup.string()
        .min(4, 'errUsernameMin')
        .max(20, 'errUsernameMax');

const password = Yup.string().min(8, 'errPasswordMin');
export const loginSchema = Yup.object({ username, password });

export const registerSchema = Yup.object({
    username: username.test(
        'unique',
        'errUsernameUnique',
        async (value) => {
            if (value.length < 4 || value.length > 20) return true;
            try {
                const {available} = await UserApi.checkUsername(value);
                return available;
            } catch (err) {
                return true;
            }
        }
    ),
    password
})
