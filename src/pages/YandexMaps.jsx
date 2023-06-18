import React from "react";
import { Container, Row, Col } from "reactstrap";

import Helmet from "../components/Helmet/Helmet";

// Icons
import placemarkIcon from "../assets/images/icons/placemark-icon.png";

// Yandex Map API
import { YMaps, Map, Placemark, 
    ZoomControl, TypeSelector, 
    SearchControl, GeolocationControl, 
    FullscreenControl, RouteButton } from '@pbe/react-yandex-maps';

// CSS
import "../styles/yandex-map.css";

let center = [51.78265382628901, 55.08487558805016];

const YandexMaps = () => {
    return (
        <Helmet title="Карты">
            <section>
                <Container>
                    <Row>
                        <Col lg="12" md="12">
                            <YMaps
                                query={{ apikey: '17ee4433-5fdb-4824-ac3b-635c84a5e561' }} >
                                <div>
                                    <Map
                                        width="auto"
                                        height="600px"
                                        defaultState={{ center: [51.78265382628901, 55.08487558805016], zoom: 13 }} >

                                        {/* Zoom control */}
                                        <ZoomControl options={{ float: "right" }} />
                                        {/* Type selector */}
                                        <TypeSelector options={{ float: "right" }} />
                                        {/* Search control */}
                                        <SearchControl options={{ float: "right" }} />
                                        {/* Geo location control */}
                                        <GeolocationControl options={{ float: "left" }} />
                                        {/* Fullscreen control */}
                                        <FullscreenControl />
                                        {/* Route button */}
                                        <RouteButton 
                                            options={{ float: "right" }} 
                                            control=""/>

                                        {/* <Placemark 
                                            geometry={center}
                                             /> */}

                                        <Placemark
                                            modules={['geoObject.addon.balloon']}
                                            geometry={center}
                                            properties={{
                                            balloonContentHeader: "Карп",
                                            balloonContentBody: "Рыболовный магазин Карп предоставляет товары для рыбалки, туризма и отдыха.",
                                            balloonContentFooter: "Адрес: г. Оренбург, ул. Невельская, 3.<br>Телефон: +7‒922‒808‒03‒90",
                                            }}
                                            options={{
                                                iconLayout: 'default#image',
                                                iconImageHref: 'https://cdn-icons-png.flaticon.com/512/4090/4090648.png',
                                                iconImageSize: [35, 35],
                                                iconImageOffset: [-15, -25]
                                            }}
                                        />

                                        <Placemark
                                            modules={['geoObject.addon.balloon']}
                                            geometry={[51.849499900314996,55.077284202492415]}
                                            properties={{
                                            balloonContentHeader: "Рыбалка",
                                            balloonContentBody: "Место для рыбалки рядом с озером.",
                                            balloonContentFooter: "Адрес: г. Оренбург, оз. Малахово",
                                            }}
                                            options={{
                                                iconLayout: 'default#image',
                                                iconImageHref: 'https://cdn-icons-png.flaticon.com/512/1834/1834039.png',
                                                iconImageSize: [35, 35],
                                                iconImageOffset: [-20, -25]
                                            }}
                                        />

                                        <Placemark
                                            modules={['geoObject.addon.balloon']}
                                            geometry={[51.83201031627441,55.06555003075011]}
                                            properties={{
                                            balloonContentHeader: "Рыбалка",
                                            balloonContentBody: "Место для рыбалки рядом с рекой.",
                                            balloonContentFooter: "Адрес: г. Оренбург, р. Сакмара",
                                            }}
                                            options={{
                                                iconLayout: 'default#image',
                                                iconImageHref: 'https://cdn-icons-png.flaticon.com/512/1834/1834039.png',
                                                iconImageSize: [35, 35],
                                                iconImageOffset: [-20, -25]
                                            }}
                                        />

                                        <Placemark
                                            modules={['geoObject.addon.balloon']}
                                            geometry={[51.7556311767396,55.12427449818182]}
                                            properties={{
                                            balloonContentHeader: "Рыбалка",
                                            balloonContentBody: "Место для рыбалки рядом с рекой.",
                                            balloonContentFooter: "Адрес: г. Оренбург, р. Урал",
                                            }}
                                            options={{
                                                iconLayout: 'default#image',
                                                iconImageHref: 'https://cdn-icons-png.flaticon.com/512/1834/1834039.png',
                                                iconImageSize: [35, 35],
                                                iconImageOffset: [-20, -15]
                                            }}
                                        />

                                    </Map>
                                </div>
                            </YMaps>
                        </Col>
                    </Row>
                </Container>
            </section>
        </Helmet>
    );
}

export default YandexMaps