import React from "react";
import { Container, Row, Col } from "reactstrap";

import Helmet from "../components/Helmet/Helmet";

// Yandex Map API
import { YMaps, Map, Placemark, GeoObject } from '@pbe/react-yandex-maps';

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
                            <YMaps>
                                <div className="yandex__map">
                                    <Map
                                        query={{ apikey: "17ee4433-5fdb-4824-ac3b-635c84a5e561" }}
                                        defaultState={{ center: [51.78265382628901, 55.08487558805016], zoom: 13 }} 
                                        width={1024}
                                        height={512}>
                                        
                                        <Placemark geometry={center} />

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