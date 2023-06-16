import React from "react";
import "./footer.css";

import logoLight from "../../assets/images/icons/main-logo-light.png";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";

import whatsapp from "../../assets/images/icons/whatsapp-logo.png";
import viber from "../../assets/images/icons/viber-logo.png";

const Footer = () => {
    return (
        <footer className="footer">
            <Container>
                <Row>
                    <Col lg="4" md="6">
                        <div className="logo">
                            <Link to="/home">
                                <img src={logoLight} alt="logo"/>
                            </Link>
                            {/* <div>
                                <h1>Карп</h1>
                                <p>Основан в 2016</p>
                            </div> */}

                        </div>
                        <p className="footer__text mt-4 mb-5 text-white">
                            Рыболовный магазин Карп предлагает товары для рыбалки, 
                            туризма и отдыха
                        </p>
                    </Col>

                    <Col lg="3" md="3">
                        <div className="footer__quick-links">
                            <h4 className="quick__links-title">
                                Ссылки
                            </h4>
                            <ListGroup className="mb-5">
                                <ListGroupItem className="ps-0 border-0">
                                    <Link to="/home">Главная страница</Link>
                                </ListGroupItem>

                                <ListGroupItem className="ps-0 border-0">
                                    <Link to="/shop">Каталог</Link>
                                </ListGroupItem>

                                <ListGroupItem className="ps-0 border-0">
                                    <Link to="/cart">Корзина</Link>
                                </ListGroupItem>

                                <ListGroupItem className="ps-0 border-0">
                                    <Link to="/login">Авторизация</Link>
                                </ListGroupItem>
                            </ListGroup>
                        </div>
                    </Col>

                    <Col lg="2" md="3">
                        <div className="footer__quick-links">
                            <h4 className="quick__links-title">
                                Адрес
                            </h4>
                            <ListGroup className="footer__address mb-5">
                                <ListGroupItem className="ps-0 border-0
                                d-flex align-items-center gap-2">
                                    <span><i className="ri-map-line"></i></span>
                                    <p>Россия, г. Оренбург, ул. Невельская, 3</p>
                                </ListGroupItem>

                                <ListGroupItem className="ps-0 border-0
                                d-flex align-items-center gap-2">
                                    <span><i className="ri-mail-line"></i></span>
                                    <p>karp.fishing@mail.ru</p>
                                </ListGroupItem>

                                <ListGroupItem className="ps-0 border-0
                                d-flex align-items-center gap-2">
                                    <span><i className="ri-phone-line"></i></span>
                                    <p>+7-922-808-03-90</p>
                                </ListGroupItem>
                            </ListGroup>
                        </div>
                    </Col>

                    <Col lg="3" md="4">
                        <div className="footer__quick-links">
                            <h4 className="quick__links-title">
                                Контакты
                            </h4>
                            <ListGroup className="footer__contact">
                                <ListGroupItem className="ps-0 border-0">
                                    <span>
                                        <img src={whatsapp} alt="whatsapp" />
                                    </span>
                                    <p>WhatsApp: +7-922-808-03-90</p>
                                </ListGroupItem>

                                <ListGroupItem className="ps-0 border-0">
                                    <span>
                                        <img src={viber} alt="viber" />
                                    </span>
                                    <p>Viber: +7-922-808-03-90</p>
                                </ListGroupItem>
                            </ListGroup>
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer