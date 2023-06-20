import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { db } from "../firebase.config";
import { doc } from "firebase/firestore";
import Helmet from "../components/Helmet/Helmet";
import { useDispatch } from "react-redux";
import { getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";

const OrderDetails = () => {
  const [orderItems, setOrderItems] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const fetchOrderItems = async () => {
      try {
        const orderSnapshot = await getDoc(doc(db, "orders", id));
        const orderData = orderSnapshot.data();
        const items = orderData.products;
        console.log("Товары:", orderItems);
        setOrderItems(items);
      } catch (error) {
        console.log("Ошибка при получении данных заказа:", error);
      }
    };

    fetchOrderItems();
  }, [id]);

  return (
    <Helmet title="Заказы">
      <section>
        <Container>
          <Row>
            <Col lg="9">
              <table className="table">
                <thead>
                  <tr>
                    <th>Изображение</th>
                    <th>Наименование</th>
                    <th>Стоимость</th>
                    <th>Количество</th>
                  </tr>
                </thead>
                <tbody>
                  {orderItems?.map((item, index) => (
                    <Tr item={item} key={index} />
                  ))}
                </tbody>
              </table>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

const Tr = ({ item }) => {
  const dispatch = useDispatch();

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
};

export default OrderDetails;
