import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Header from "../../components/Header/Header.js";
import HeaderLinks from "../../components/Header/HeaderLinks.js";
import {
    Form,
    Alert
} from 'antd';
import UserService from '../../service/UserService';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(20),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));
export default function SignUp(props) {
    const classes = useStyles();
    const { ...rest } = props;
    const register = (values) => {
        const jsonBody = {
            "name": values.user.firstName,
		    "surname": values.user.lastName,
		    "email": values.user.email,
		    "password": values.user.password
        }
        UserService.register(jsonBody);
    }

    return (

        <Container component="main" maxWidth="sm">
            <Header
                isMain={false}
                rightLinks={<HeaderLinks />}
                fixed
                color="dark"
                {...rest}>
            </Header>
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography style={{marginBottom: "50px"}} component="h1" variant="h5">
                    Hoşgeldiniz
                </Typography>
                <Form 
                    layout="vertical"
                    name="login"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={register}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Form.Item
                                name={['user', 'firstName']}
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: (<Alert style={{marginTop: "10px"}} message="Lutfen isminizi giriniz" type="error"/>)
                                    },
                                ]}

                            >
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    label="İsim"
                                    autoFocus
                                />
                            </Form.Item>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Form.Item
                                name={['user', 'lastName']}
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: (<Alert style={{marginTop: "10px"}} message="Lutfen soyismizi giriniz" type="error"/>)
                                    },
                                ]}

                            >
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    label="Soyisim"
                                />
                            </Form.Item>

                        </Grid>
                        <Grid item xs={12}>
                            <Form.Item
                                name={['user', 'email']}
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: (<Alert style={{marginTop: "10px"}} message="Lutfen Email adresinizi giriniz" type="error"/>)
                                    },
                                    {
                                        type: "email",
                                        message: (<Alert style={{marginTop: "10px"}} message="Gecerli bir email adresi giriniz" type="error"/>)
                                    },
                                ]}
                            >
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    label="Email Adresi"
                                />
                            </Form.Item>

                        </Grid>
                        <Grid item xs={12}>
                            <Form.Item
                                name={['user', 'password']}
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: (<Alert style={{marginTop: "10px"}} message="Lutfen sifre giriniz" type="error"/>)
                                    },
                                    () => ({
                                        validator(rule, value, callback) {
                                            if (value && value.length < 8) {
                                                callback(
                                                    (<Alert style={{marginTop: "10px"}} message="Sifre en az 8 karakter uzunlugunda olmalidir" type="error"/>)
                                                );
                                            } else if (
                                                value &&
                                                !(
                                                    /\d/.test(value) &&
                                                    /[a-z]/.test(value) &&
                                                    /[A-Z]/.test(value)
                                                )
                                            ) {
                                                callback(
                                                    (<Alert style={{marginTop: "10px"}} message="Sifre en az 1 sayi, 1 kucuk harf ve 1 buyuk harf icermelidir" type="error"/>)
                                                );
                                            } else {
                                                callback();
                                            }
                                        },
                                    }),
                                ]}

                            >
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    label="Şifre"
                                    type="password"
                                />
                            </Form.Item>

                        </Grid>
                        <Grid item xs={12}>
                            <Form.Item
                                name={['user', 'rePassword']}
                                dependencies={["password"]}
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: (<Alert style={{marginTop: "10px"}} message="Lutfen sifrenizi tekrar giriniz" type="error"/>)
                                    },
                                    ({getFieldValue}) => ({
                                        validator(rule, value) {
                                            if (!value || getFieldValue(['user', 'password']) === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(
                                                (<Alert style={{marginTop: "10px"}} message="Girilen sifreler eslesmiyor, Lutfen tekrar deneyin" type="error"/>)
                                            );
                                        },
                                    }),
                                ]}
                                >
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    label="Şifrenizi tekrar giriniz"
                                    type="password"
                                />
                            </Form.Item>

                        </Grid>
                        <Grid item xs={12}>
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        className={classes.submit}
                    >
                        Üye ol
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="/giris" variant="body2">
                                Zaten bir hesabınız var mı? Giriş yapın
                            </Link>
                        </Grid>
                    </Grid>
                </Form>
            </div>
        </Container>
    )

}
