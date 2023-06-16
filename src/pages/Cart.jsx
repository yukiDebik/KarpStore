import React from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import { Container, Row, Col } from "reactstrap";

import { motion } from "framer-motion";
import { cartActions } from "../redux/slices/cartSlice";
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";

// CSS
import "../styles/cart.css";

const Cart = () => {

    const cartItems = useSelector((state) => state.cart.cartItems);
    const totalAmount = useSelector((state) => state.cart.totalAmount);

    return (
        <Helmet title="Корзина">
            <CommonSection title="Корзина товаров" />

            <section>
                <Container>
                    <Row>
                        <Col lg="9">
                            {cartItems.length === 0 ? (
                                <h2>Ни один товар не был добавлен в корзину</h2>
                                ) : (
                                <table className="table bordered">
                                    <thead>
                                        <tr>
                                            <th>Изображение</th>
                                            <th>Наименование</th>
                                            <th>Стоимость</th>
                                            <th>Количество</th>
                                            <th>Удалить</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {cartItems.map((item, index) => (
                                            <Tr item={item} key={index} />
                                            ))}
                                    </tbody>
                                </table>
                                )
                            }
                        </Col>

                        <Col lg="3">
                            <div>
                                <h6 className="d-flex align-items-center
                                              justify-content-between">
                                    Итого
                                    <span className="fs-4 fw-bold">₽ {totalAmount}</span>
                                </h6>
                            </div>
                            <p className="fs-6 mt-2">Забрать заказ можно только по адресу: 
                                                    г. Оренбург, ул. Невельская, 3
                            </p>
                            <div>
                                <button className="buy__btn w-100">
                                    <Link to="/checkout">
                                        Оформить заказ
                                    </Link>
                                </button>

                                <button className="buy__btn w-100 mt-4">
                                    <Link to="/shop">
                                        Продолжить покупки
                                    </Link>
                                </button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </Helmet>
    );
}

const Tr = ({ item }) => {

    const dispatch = useDispatch();

    const deleteProduct = () => {
        dispatch(cartActions.deleteItem(item.id));
    };

    return (
        <tr>
            <td>
                <img src={item.imgUrl} alt="img" />
            </td>
            <td>{item.productName}</td>
            <td>₽ {item.price}</td>
            <td>{item.quantity}шт</td>
            <td>
                <motion.i
                    whileTap={{ scale: 1.5 }}
                    onClick={deleteProduct}
                    className="ri-close-circle-line">
                </motion.i>
            </td>
        </tr>
    );
}

export default Cart