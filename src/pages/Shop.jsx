import React, { useState } from "react";

import CommonSection from "../components/UI/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col } from "reactstrap";

import ProductsList from "../components/UI/ProductsList";

import useGetData from "../custom-hooks/useGetData";

// CSS
import "../styles/shop.css";

const Shop = () => {

    const { data: products } = useGetData("products");

    const [productsData, setProductsData] = useState(products);

    // Фильтрация товаров
    const handleFilter = e => {
        const filterValue = e.target.value
        if (filterValue === "rod") {
            const filteredProducts = products.filter(
                (item) => item.category === "rod"
            );

            setProductsData(filteredProducts);
        }

        if (filterValue === "reel") {
            const filteredProducts = products.filter(
                (item) => item.category === "reel"
            );

            setProductsData(filteredProducts);
        }

        if (filterValue === "line") {
            const filteredProducts = products.filter(
                (item) => item.category === "line"
            );

            setProductsData(filteredProducts);
        }

        if (filterValue === "bait") {
            const filteredProducts = products.filter(
                (item) => item.category === "bait"
            );

            setProductsData(filteredProducts);
        }

        if (filterValue === "boat") {
            const filteredProducts = products.filter(
                (item) => item.category === "boat"
            );

            setProductsData(filteredProducts);
        }
    };

    // Поиск товаров
    const handleSearch = e => {

        const searchTerm = e.target.value;

        const searchedProducts = products.filter((item) => 
            item.productName.toLowerCase().includes(searchTerm.toLowerCase()));

        setProductsData(searchedProducts)
    };

    return (
        <Helmet title="Каталог">
            <CommonSection title="Каталог товаров" />

            <section>
                <Container>
                    <Row>
                        <Col lg="3" md="6">
                            <div className="filter__widget">
                                <select onChange={handleFilter}>
                                    <option>Сортировать по категории</option>
                                    <option value="rod">Удилища</option>
                                    <option value="reel">Катушки</option>
                                    <option value="line">Лески</option>
                                    <option value="bait">Приманки</option>
                                    <option value="boat">Лодки</option>
                                </select>
                            </div>
                        </Col>
                        {/* <Col lg="3" md="6" className="text-end">
                            <div className="filter__widget">
                                <select>
                                    <option>Сортировать по</option>
                                    <option value="ascending">По возрастанию</option>
                                    <option value="descending">По убыванию</option>
                                </select>
                            </div>
                        </Col> */}
                        <Col lg="6" md="12">
                            <div className="search__box">
                                <input 
                                    type="text" 
                                    placeholder="Поиск..."
                                    onChange={handleSearch}
                                />
                                <span>
                                    <i className="ri-search-2-line"></i>
                                </span>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            <section className="pt-0">
                <Container>
                    <Row>
                        {productsData.length === 0 ? (
                            <h1 className="text-center fs-4">Товар не найден</h1>
                        ) : (
                            <ProductsList data={productsData} />
                        )}
                    </Row>
                </Container>
            </section>
        </Helmet>
    );
}

export default Shop