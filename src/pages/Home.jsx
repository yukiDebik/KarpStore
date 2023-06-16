import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import Helmet from "../components/Helmet/Helmet";
import "../styles/home.css";

import { Container, Row, Col } from "reactstrap";
import heroImg from "../assets/images/icons/main-logo.png";

import Services from "../services/Services";
import ProductsList from "../components/UI/ProductsList";

import Clock from "../components/UI/Clock";

import counterImg from "../assets/images/counter-timer-img.png";

import useGetData from "../custom-hooks/useGetData";

const Home = () => {

  const { data: products, loading } = useGetData("products");

  const [trendingProducts, setTrendingProducts] = useState([]);
  const [bestSalesProducts, setBestSalesProducts] = useState([]);
  const [mobileProducts, setMobileProducts] = useState([]);
  const [wirelessProducts, setWirelessProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);

  // Дата в баннере на главной странице сайта
  const year = new Date().getFullYear();

  useEffect(() => {
    const filteredTrendingProducts = products.filter(
      (item) => item.category === "rod"
    );

    const filteredBestTrendingProducts = products.filter(
      (item) => item.category === "reel"
    );

    const filteredMobileProducts = products.filter(
      (item) => item.category === "line"
    );

    const filteredWirelessProducts = products.filter(
      (item) => item.category === "bait"
    );

    const filteredPopularProducts = products.filter(
      (item) => item.category === "boat"
    );

    setTrendingProducts(filteredTrendingProducts);
    setBestSalesProducts(filteredBestTrendingProducts);
    setMobileProducts(filteredMobileProducts);
    setWirelessProducts(filteredWirelessProducts);
    setPopularProducts(filteredPopularProducts);
  }, [products]);

  return (
    <Helmet title={"главная"}>
      <section className="hero__section">
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="hero__content">
                <p className="hero__subtitle">
                  Популярные товары на {year} год
                </p>
                <h2>Множество товаров по низким ценам</h2>
                <p>
                  {" "}
                  Рыболовный магазин Карп предлагает товары для рыбалки, туризма и отдыха.
                </p>

                <motion.button whileTap={{ scale: 1.2 }} className="buy__btn">
                  <Link to="/shop">Купить</Link>
                </motion.button>
              </div>
            </Col>

            <Col lg="6" md="6">
              <div className="hero__img">
                <img src={heroImg} alt="heroImg" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <Services />

      <section className="trending__products">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section__title">Популярные товары</h2>
            </Col>

            {
              loading ? <h5 className="fw-bold">Загрузка...</h5>
              :
              <ProductsList data={trendingProducts} />
            }

          </Row>
        </Container>
      </section>

      <section className="best__sales">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section__title">Бестселлеры</h2>
            </Col>

            {
              loading ? <h5 className="fw-bold">Загрузка...</h5>
              :
              <ProductsList data={bestSalesProducts} />
            }

          </Row>
        </Container>
      </section>

      <section className="timer__count">
        <Container>
          <Row>
            <Col lg="6" md="12" className="count__down-col">
              <div className="clock__top-content">
                <h4 className="text-white fs-6 mb-2">
                  Ограниченное предложение
                </h4>
                <h3 className="text-white fs-5 mb-3">Лески</h3>
              </div>
              <Clock />

              <motion.button
                whileTap={{ scale: 1.1 }}
                className="buy__btn store__btn"
              >
                <Link to="/shop">Посетить магазин</Link>
              </motion.button>
            </Col>

            <Col lg="6" md="12" className="text-end counter__img">
              <img src={counterImg} alt="counter" />
            </Col>
          </Row>
        </Container>
      </section>

      <section className="new__arrivals">
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-5">
              <h2 className="section__title">Новые поступления</h2>
            </Col>
            
            {
              loading ? <h5 className="fw-bold">Загрузка...</h5>
              :
              <ProductsList data={mobileProducts} />
            }

            {
              loading ? <h5 className="fw-bold">Загрузка...</h5>
              :
              <ProductsList data={wirelessProducts} />
            }
          </Row>
        </Container>
      </section>

      <section className="popular__category">
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-5">
              <h2 className="section__title">Популярные категории</h2>
            </Col>
            
            {
              loading ? <h5 className="fw-bold">Загрузка...</h5>
              :
              <ProductsList data={popularProducts} />
            }

          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Home;
