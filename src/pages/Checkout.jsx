import React, { useState } from "react";

import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";

import { cartActions } from "../redux/slices/cartSlice";

// Firebase
import { addDoc } from "firebase/firestore";
import { db, auth } from "../firebase.config";
import { collection } from "firebase/firestore";

// CSS
import "../styles/checkout.css";

const Checkout = () => {

    const navigate = useNavigate();

    const cartItems = useSelector((state) => state.cart.cartItems);
    
    const [enterOrderId, setEnterOrderId] = useState(Math.floor(Math.random() * (10000 - 1 + 1)) + 1);
    const [enterName, setEnterName] = useState(auth.currentUser.displayName);
    const [enterEmail, setEnterEmail] = useState(auth.currentUser.email);
    const [enterPhoneNumber, setEnterPhoneNumber] = useState("");
    const [enterAddress, setEnterAddress] = useState("");
    const [enterProduct, setEnterProduct] = useState("");

    const totalQty = useSelector((state) => state.cart.totalQuantity);
    const totalAmount = useSelector((state) => state.cart.totalAmount);

    const addOrder = async (e) => {
        e.preventDefault();
        
        try {

            const uid = auth.currentUser.uid;
            const docRef = collection(db, "orders");
            const cartData = collection(db, "cart" + " " + uid);

            await addDoc(docRef, {
                buyerOrderId: enterOrderId,
                buyerName: enterName,
                buyerEmail: enterEmail,
                buyerAddress: enterAddress,
                buyerQuantity: totalQty,
                buyerPayment: totalAmount,
            });

            await addDoc(cartData, {
                buyerOrderId: enterOrderId,
                buyerProduct: enterProduct,
            });

            toast.success("Заказ успешно оформлен");
            toast.success("Через пару секунд вы перейдёте на главную страницу");

            setTimeout(() => {
                navigate("/home");
                window.location.reload();
            }, 3000);

        } catch (error) {
            toast.error("Не получилось оформить заказ");
        }
    };

    return (
        <Helmet title="Оформление заказа">
            <CommonSection title="Оформление заказа"/>

            <section>
                <Container>
                    <Row>
                        <Col lg="8">
                            <>
                                <h6 className="mb-4 fw-bold">Информация о платеже</h6>
                                <Form className="billing__form" onSubmit={addOrder}>
                                    <FormGroup className="form__group">
                                        <label>Уникальный код Вашего заказа</label>
                                        <input type="number" placeholder="Уникальный код заказа" 
                                        value={enterOrderId} onChange={(e) => setEnterOrderId(e.target.value)} 
                                        required disabled />
                                    </FormGroup>

                                    <FormGroup className="form__group">
                                        <input type="text" placeholder="Введите имя" 
                                        value={enterName} onChange={(e) => setEnterName(e.target.value)} 
                                        required />
                                    </FormGroup>

                                    <FormGroup className="form__group">
                                        <input type="email" placeholder="Введите электронную почту" 
                                        value={enterEmail} onChange={(e) => setEnterEmail(e.target.value)} 
                                        required />
                                    </FormGroup>

                                    <FormGroup className="form__group">
                                        <input type="text" placeholder="Введите номер телефона" 
                                        value={enterPhoneNumber} onChange={(e) => setEnterPhoneNumber(e.target.value)}
                                        required />
                                    </FormGroup>

                                    <FormGroup className="form__group">
                                        <input type="text" placeholder="Введите адрес" 
                                        value={enterAddress} onChange={(e) => setEnterAddress(e.target.value)}
                                        required />
                                    </FormGroup>

                                    <FormGroup className="form__group">
                                        <input type="text" placeholder="Товары" 
                                        value={enterProduct} onChange={(e) => setEnterProduct(e.target.value)}
                                        required >
                                            
                                        </input>
                                    </FormGroup>

                                    <FormGroup className="form__group w-50">
                                        <span>Товары</span>
                                        
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
                                    </FormGroup>

                                    <motion.button
                                        whileTap={{ scale: 0.9 }}
                                        className="ordering__button w-100"
                                        type="submit" >
                                        Оформить
                                    </motion.button>
                                </Form>
                            </>                  
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

export default Checkout