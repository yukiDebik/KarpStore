import React, { useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Firebase
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.config";

// CSS
import "../styles/login.css";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const signIn = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            const user = userCredential.user;
            console.log(user);
            setLoading(false);
            toast.success("Вы успешно авторизовались");
            navigate("/checkout");

        } catch (error) {
            setLoading(false);
            toast.error(error.message);
            toast.error("Пользователь с таким именем не найден либо введён неверный пароль");
        }
    }

    return (
        <Helmet title="Авторизация">
            <section>
                <Container>
                    <Row>
                        {
                            loading ? 
                            <Col lg="12" className="text-center">
                                <h5 className="fw-bold">Загрузка...</h5>
                            </Col>
                            :
                            <Col lg="6" className="m-auto text-center">
                                <h3 className="fw-bold mb-4">Авторизация</h3>

                                <Form className="auth__form" onSubmit={signIn}>
                                    <FormGroup className="form__group">
                                        <input type="email" placeholder="Введите электронную почту" 
                                        value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </FormGroup>
                                    <FormGroup className="form__group">
                                        <input type="password" placeholder="Введите пароль" 
                                        value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </FormGroup>

                                    <button className="buy__btn auth__btn" type="submit">
                                        Авторизоваться
                                    </button>
                                    <p>
                                        У Вас нет аккаунта? 
                                        <Link to="/signup"> Регистрация</Link>  
                                    </p>
                                </Form>
                            </Col>
                        }
                    </Row>
                </Container>
            </section>
        </Helmet>
    );
}

export default Login