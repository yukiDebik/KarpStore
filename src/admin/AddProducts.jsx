import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
//import { useNavigate } from "react-router-dom";

// Firebase
import { db, storage } from "../firebase.config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

const AddProducts = () => {

    const [enterTitle, setEnterTitle] = useState("");
    const [enterShortDesc, setEnterShortDesc] = useState("");
    const [enterDescription, setEnterDescription] = useState("");
    const [enterCategory, setEnterCategory] = useState("");
    const [enterPrice, setEnterPrice] = useState("");
    const [enterProductImg, setEnterProductImg] = useState(null);
    const [loading, setLoading] = useState(false);

    //const navigate = useNavigate();

    const addProduct = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const docRef = collection(db, "products");
      
            const storageRef = ref(
                storage, `productImages/${Date.now() + "_" + enterProductImg.name}`);
      
            const uploadTask = uploadBytesResumable(storageRef, enterProductImg);
      
            uploadTask.on(
              "state_changed",
              null,
              () => {
                toast.error("изображение не загружено!");
              },
              () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadUrl) => {
                    await addDoc(docRef, {
                        productName: enterTitle,
                        shortDesc: enterShortDesc,
                        description: enterDescription,
                        category: enterCategory,
                        price: enterPrice,
                        imgUrl: downloadUrl,
                  });
                });
              }
            );

            //setImageUploaded(true);
            toast.success("Товар успешно добавлен");
            //navigate("/dashboard/all-products");
            setLoading(false);

          } catch (error) {
                setLoading(false);
                toast.error("Не получилось добавить товар");
          }

    };

    return (
        <section>
            <Container>
                <Row>
                    <Col lg="12">
                        {
                            loading ? <h4 className="py-5">Загрузка...</h4>
                            :
                            <>
                                <h4 className="mb-5">Добавить товар</h4>
                                <Form onSubmit={addProduct}>
                                    <FormGroup className="form__group">
                                        <span>Наименование товара</span>
                                        <input type="text" placeholder="Введите наименование товара" 
                                                value={enterTitle} onChange={(e) => setEnterTitle(e.target.value)} 
                                                required />
                                    </FormGroup>

                                    <FormGroup className="form__group">
                                        <span>Короткое описание</span>
                                        <input type="text" placeholder="Введите короткое описание товара" 
                                                value={enterShortDesc} onChange={(e) => setEnterShortDesc(e.target.value)} 
                                                required />
                                    </FormGroup>

                                    <FormGroup className="form__group">
                                        <span>Описание</span>
                                        <input type="text" placeholder="Введите описание товара" 
                                                value={enterDescription} onChange={(e) => setEnterDescription(e.target.value)} 
                                                required />
                                    </FormGroup>

                                    <div className="d-flex align-items-center
                                                    justify-content-between gap-5">
                                        <FormGroup className="form__group w-50">
                                            <span>Стоимость, ₽</span>
                                            <input type="number" placeholder="Стоимость товара" 
                                                    value={enterPrice} onChange={(e) => setEnterPrice(e.target.value)} 
                                                    required />
                                        </FormGroup>

                                        <FormGroup className="form__group w-50">
                                            <span>Категория</span>
                                            <select
                                                className="w-100 p-2"
                                                value={enterCategory} 
                                                onChange={(e) => setEnterCategory(e.target.value)}>
                                                    <option>Выберите категорию</option>
                                                    <option value="rod">Удилища</option>
                                                    <option value="reel">Катушки</option>
                                                    <option value="line">Лески</option>
                                                    <option value="bait">Приманки</option>
                                                    <option value="boat">Лодки</option>
                                            </select>
                                        </FormGroup>
                                    </div>

                                    <div>
                                        <FormGroup className="form__group">
                                            <span>Изображение товара</span>
                                            <input 
                                                type="file" 
                                                onChange={(e) => setEnterProductImg(e.target.files[0])}
                                                required />
                                        </FormGroup>
                                    </div>

                                    <motion.button
                                        whileTap={{ scale: 1.2 }}
                                        className="buy__btn"
                                        type="submit">
                                        Добавить товар
                                    </motion.button>
                                </Form>
                            </>
                        }
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default AddProducts