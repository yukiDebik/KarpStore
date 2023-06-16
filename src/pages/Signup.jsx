import React, { useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { setDoc, doc } from "firebase/firestore";

import { auth } from "../firebase.config";
import { storage } from "../firebase.config";
import { db } from "../firebase.config";

import { toast } from "react-toastify";
import { motion } from "framer-motion";

import { useNavigate } from "react-router-dom";

// CSS
import "../styles/login.css";


const Signup = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const signup = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth, 
                email, 
                password
            );

            const user = userCredential.user;

            const storageRef = ref(storage, `images/${Date.now() + username}`);
            const uploadTask = uploadBytesResumable(storageRef, file);
            
            uploadTask.on(
                (error) => {
                    toast.error(error.message);
                }, 
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
                        // Update user profile
                        await updateProfile(user, {
                            displayName: username,
                            photoURL: downloadURL
                        });
                        
                        // Store user data in firestore databases
                        await setDoc(doc(db, "users", user.uid), {
                            uid: user.uid,
                            displayName: username,
                            email,
                            photoURL: downloadURL,
                        });

                    });
                });

            //console.log(user);
            setLoading(false);
            toast.success("Аккаунт успешно создан");
            navigate("/login");
        } catch (error) {
            setLoading(false);
            toast.error("Неправильно введена электронная почта либо аккаунт с таким именем уже существует");
        }
    };

    return (
        <Helmet title="Регистрация">
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
                                <h3 className="fw-bold mb-4">Регистрация</h3>

                                <Form className="auth__form" onSubmit={signup}>
                                    <FormGroup className="form__group">
                                        <input type="text" placeholder="Введите имя пользователя" 
                                        value={username} onChange={(e) => setUsername(e.target.value)} />
                                    </FormGroup>
                                    <FormGroup className="form__group">
                                        <input type="email" placeholder="Введите электронную почту" 
                                        value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </FormGroup>
                                    <FormGroup className="form__group">
                                        <input type="password" placeholder="Введите пароль" 
                                        value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </FormGroup>

                                    <FormGroup className="form__group">
                                        <input type="file" 
                                        onChange={(e) => setFile(e.target.files[0])} />
                                    </FormGroup>

                                    <motion.button
                                        whileTap={{ scale: 1.2 }}
                                        className="buy__btn auth__btn" 
                                        type="submit">
                                        Создать аккаунт
                                    </motion.button>
                                    <p>
                                        У Вас уже есть аккаунт? 
                                        <Link to="/login"> Авторизация</Link>  
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

export default Signup