import React from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";

import useGetData from "../custom-hooks/useGetData";
import { Link } from "react-router-dom";

// CSS
import "../styles/dashboard.css";

const Dashboard = () => {

    const { data: products } = useGetData("products");
    const { data: users } = useGetData("users");

    return (

        <Helmet title="Админ-панель">
            <>
                <section>
                    <Container>
                        <Row>
                            <Col className="lg-3">
                                <div className="revenue__box">
                                    <h5>Всего продано</h5>
                                    <span>₽ 7800</span>
                                </div>
                            </Col>
                            <Col className="lg-3">
                                <div className="orders__box">
                                    <h5>Заказы</h5>
                                    <span>10</span>
                                </div>
                            </Col>
                            <Col className="lg-3">
                                <div className="products__box">
                                    <h5>Всего товаров</h5>
                                    <span>{products.length}</span>
                                </div>
                            </Col>
                            <Col className="lg-3">
                                <div className="users__box">
                                    <h5>Всего пользователей</h5>
                                    <span>{users.length}</span>
                                </div>
                            </Col>
                            <Col className="lg-3">
                                <div className="action__box text-center">
                                    <h5>Действие</h5>
                                    <Row>
                                        <Link to="/dashboard/add-product"
                                            className="my-3">
                                            Добавить товар
                                        </Link>
                                        <Link to="/signup">
                                            Регистрация пользователя
                                        </Link>
                                    </Row>
                                </div>
                            </Col>
                            
                        </Row>
                    </Container>
                </section>
            </>
        </Helmet>

    );
}

export default Dashboard