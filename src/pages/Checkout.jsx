import React from "react";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

// CSS
import "../styles/checkout.css";

const Checkout = () => {

    const totalQty = useSelector((state) => state.cart.totalQuantity);
    const totalAmount = useSelector((state) => state.cart.totalAmount);

    return (
        <Helmet title="Оформление заказа">
            <CommonSection title="Оформление заказа"/>

            <section>
                <Container>
                    <Row>
                        <Col lg="8">
                            <h6 className="mb-4 fw-bold">Информация о платеже</h6>
                            <Form className="billing__form">
                                <FormGroup className="form__group">
                                    <input type="text" placeholder="Введите имя" />
                                </FormGroup>

                                <FormGroup className="form__group">
                                    <input type="email" placeholder="Введите электронную почту" />
                                </FormGroup>

                                <FormGroup className="form__group">
                                    <input type="number" placeholder="Введите номер телефона" />
                                </FormGroup>

                                <FormGroup className="form__group">
                                    <input type="text" placeholder="Введите адрес" />
                                </FormGroup>

                                <FormGroup className="form__group">
                                    <input type="text" placeholder="Введите город" />
                                </FormGroup>

                                <FormGroup className="form__group">
                                    <input type="text" placeholder="Введите почтовый индекс" />
                                </FormGroup>

                                <FormGroup className="form__group">
                                    <input type="text" placeholder="Введите страну" />
                                </FormGroup>
                            </Form>
                        </Col>

                        <Col lg="4">
                            <div className="checkout__cart">
                                <h6>
                                    Итоговое количество: 
                                    <span>{totalQty} шт</span>
                                </h6>
                                <h6>
                                    Промежуточный итог: 
                                    <span>₽ {totalAmount}</span>
                                </h6>
                                <h6>
                                    Способ доставки: 
                                    <span> самовывоз</span>
                                </h6>
                                <h4>
                                    Итого: 
                                    <span>₽ {totalAmount}</span>
                                </h4>
                                <motion.button
                                    whileTap={{ scale: 0.9 }}
                                    className="buy__btn auth__btn w-100">
                                    Оформить
                                </motion.button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </Helmet>
    );
}

export default Checkout