import React from "react";
import { Container, Row, Col } from "reactstrap";
import useGetData from "../custom-hooks/useGetData";
import { db } from "../firebase.config";
import { doc, deleteDoc } from "firebase/firestore";

import Helmet from "../components/Helmet/Helmet";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const AllProducts = () => {
    
    const { data: productsData, loading } = useGetData("products");

    const deleteProduct = async(id) => {
        await deleteDoc(doc(db, "products", id));
        toast.success("Товар успешно удалён");
    };

    return (

        <Helmet title="Товары">
            <section>
                <Container>
                    <Row>
                        <Col lg="12">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Изображение</th>
                                        <th>Наименование</th>
                                        <th>Категория</th>
                                        <th>Стоимость</th>
                                        <th>
                                            Действие
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        loading ? <h4 className="py-5 text-center fw-bold">Загрузка...</h4>
                                        :
                                        productsData.map((item) => (
                                            <tr key={item.id}>
                                                <td>
                                                    <img src={item.imgUrl} alt="productImg" />
                                                </td>
                                                <td>{item.productName}</td>
                                                <td>{item.category}</td>
                                                <td>₽ {item.price}</td>
                                                <td>
                                                    <motion.button 
                                                        whileTap={{ scale: 1.2 }}
                                                        className="btn btn-danger"
                                                        onClick={() => {
                                                            deleteProduct(item.id);
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

export default AllProducts