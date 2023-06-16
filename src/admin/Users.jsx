import React from "react";
import { Container, Row, Col } from "reactstrap";
import useGetData from "../custom-hooks/useGetData";
import Helmet from "../components/Helmet/Helmet";
import { toast } from "react-toastify";

import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase.config";

const Users = () => {

    const { data: usersData, loading } = useGetData("users");

    const deleteUser = async (id) => {
        await deleteDoc(doc(db, "users", id));
        toast.success("Пользователь успешно удалён");
    };

    return (

        <Helmet title="Пользователи">
            <section>
                <Container>
                    <Row>
                        <Col lg="12">
                            <h4 className="fw-bold">Пользователи</h4>
                        </Col>
                        <Col lg="12" className="pt-5">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Изображение</th>
                                        <th>Имя</th>
                                        <th>Электронная почта</th>
                                        <th>Действие</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        loading ? <h5 className="pt-5 fw-bold">Загрузка...</h5>
                                        :
                                        usersData?.map((user) => (
                                            <tr key={user.uid}>
                                                <td>
                                                    <img src={user.photoURL} alt="photoURL" />
                                                </td>
                                                <td>{user.displayName}</td>
                                                <td>{user.email}</td>
                                                <td>
                                                    <button 
                                                        className="btn btn-danger"
                                                        onClick={() => {
                                                            deleteUser(user.uid);
                                                        }} >
                                                        Удалить
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </Col>
                    </Row>
                </Container>
            </section>
        </Helmet>

    );
}

export default Users