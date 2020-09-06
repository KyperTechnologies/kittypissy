import React from 'react'
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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignIn(props) {
    const classes = useStyles();
    const { ...rest } = props;
    let form = React.createRef();
    const login = (values) => {
        console.log(values)
        const jsonBody = {
		    "email": values.user.username,
		    "password": values.user.password
        }
        UserService.login(jsonBody);
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
                <Typography style={{ marginBottom: "50px" }} component="h1" variant="h5">
                    Giriş Yapınız
                </Typography>
                <Form
                    layout="vertical"
                    name="login"
                    ref={(ref) => {
                        form = ref;
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={login}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Form.Item
                                name={['user', 'username']}
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message:  (<Alert style={{marginTop: "10px"}} message="Email giriniz" type="error"/>)
                                    },
                                    {
                                        type: "email",
                                        message: (<Alert style={{marginTop: "10px"}} message="Gecerli bir Email giriniz" type="error"/>)
                                    }
                                ]}

                            >
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    label="Email Adresi"
                                    autoFocus
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
                                        message: (<Alert style={{marginTop: "10px"}} message="Sifre giriniz" type="error"/>)
                                    }
                                ]}

                            >
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    label="Şifre"
                                    type="password"
                                /></Form.Item>
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        className={classes.submit}
                    >
                        Giriş Yap
                        </Button>
                    <Grid container spacing={0} >
                        <Grid md={6} style={{textAlign: "left"}}>
                            <Link href="#" variant="body2">
                                Sifrenizi mi unuttunuz?
                             </Link>
                        </Grid>
                        <Grid md={6} style={{textAlign: "right"}}>
                            <Link  href="/uyeol" variant="body2">
                                {"Hesabiniz yok mu? Uye olun"}
                            </Link>
                        </Grid>
                    </Grid>
                </Form>
            </div >
        </Container >
    );
}
