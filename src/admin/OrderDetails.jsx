import React, { useEffect, useState } from "react";

import { Container, Row, Col, FormGroup } from "reactstrap";
import useGetData from "../custom-hooks/useGetData";
import { db } from "../firebase.config";
import { doc, deleteDoc } from "firebase/firestore";

import Helmet from "../components/Helmet/Helmet";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Firebase
import { addDoc, getDoc, getDocs } from "firebase/firestore";
import { auth } from "../firebase.config";
import { collection } from "firebase/firestore";
import { cartActions } from "../redux/slices/cartSlice";

const OrderDetails = () => {
  //const navigate = useNavigate();

  //   const { data: cartData, loading } = useGetData("cart");

  // const deleteOrder = async(id) => {
  //     await deleteDoc(doc(db, "orders", id));
  //     toast.success("Заказ успешно удалён");
  // };

  // const navigateOrderDetails = () => {
  //     navigate("/dashboard/order-details");
  // };

  const cartItems = useSelector((state) => state.cart.cartItems);

  //const cartRef = db.collection("cart").doc("cart");

  const [cart, setCart] = useState([]);

  //const uid = auth.currentUser.uid;

  useEffect(() => {
    (async () => {
      const cartRef = collection(db, "cart");

      const snapshots = await getDocs(cartRef);

      console.log(snapshots);
    })();
  }, []);

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
                    <th>Удалить</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems?.map((item, index) => (
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
          className="ri-close-circle-line"
        ></motion.i>
      </td>
    </tr>
  );
};

export default OrderDetails;
