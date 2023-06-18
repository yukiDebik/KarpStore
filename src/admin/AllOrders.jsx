import React from "react";

import { Container, Row, Col, FormGroup } from "reactstrap";
import useGetData from "../custom-hooks/useGetData";
import { db } from "../firebase.config";
import { doc, deleteDoc } from "firebase/firestore";

import Helmet from "../components/Helmet/Helmet";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

import { cartActions } from "../redux/slices/cartSlice";

const AllOrders = () => {

    const { data: ordersData, loading } = useGetData("orders");

    //const cartItems = useSelector((state) => state.cart.cartItems);

    const deleteOrder = async(id) => {
        await deleteDoc(doc(db, "orders", id));
        toast.success("Заказ успешно удалён");
    };

    return (
        
        <Helmet title="Заказы">
            <section>
                <Container>
                    <Row>
                        <Col lg="12">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Код</th>
                                        <th>Имя</th>
                                        <th>Почта</th>
                                        <th>Адрес</th>
                                        <th>Товары</th>
                                        <th>Количество</th>
                                        <th>Итого</th>
                                        <th>
                                            Действие
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        loading ? <p className="py-5 text-center fw-bold">Загрузка...</p>
                                        :
                                        ordersData.map(( item ) => (
                                            <tr key={item.id}>
                                                <td>{item.buyerOrderId}</td>
                                                <td>{item.buyerName}</td>
                                                <td>{item.buyerEmail}</td>
                                                <td>{item.buyerAddress}</td>
                                                <td>
                                                    <motion.button 
                                                        whileTap={{ scale: 1.1 }}
                                                        className="buy__btn my-0">
                                                        Показать
                                                    </motion.button>
                                                </td>
                                                <td>{item.buyerQuantity}</td>
                                                <td>₽ {item.buyerPayment}</td>
                                                <td>
                                                    <motion.button 
                                                        whileTap={{ scale: 1.2 }}
                                                        className="btn btn-danger"
                                                        onClick={() => {
                                                            deleteOrder(item.id);
                                                        }} >
                                                        Удалить
                                                    </motion.button>
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

const Tr = ({ item }) => {

    return (
        <tr>
            <td>
                <img src={item.imgUrl} alt="img" />
            </td>
            <td>{item.productName}</td>
            <td>₽ {item.price}</td>
            <td>{item.quantity}шт</td>
        </tr>
    );
}

export default AllOrders