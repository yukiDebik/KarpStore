import React from "react";
import { Container, Row } from "reactstrap";
import { Link, NavLink } from "react-router-dom";

import useAuth from "../custom-hooks/useAuth";

import logo from "../assets/images/icons/main-logo-light.png";

// CSS
import "../styles/admin-nav.css";

const admin__nav = [
    {
        display: "Админ",
        path: "/dashboard"
    },
    {
        display: "Товары",
        path: "/dashboard/all-products"
    },
    {
        display: "Заказы",
        path: "/dashboard/all-orders"
    },
    {
        display: "Пользователи",
        path: "/dashboard/users"
    },
]

const AdminNav = () => {

    const { currentUser } = useAuth();

    return (
        <>
            <header className="admin__header">
                <div className="admin__nav-top">
                    <Container>
                        <div className="admin__nav-wrapper-top">
                            <div className="logo">
                                <Link to="/home">
                                    <img src={logo} alt="logoImg" />
                                </Link>
                            </div>

                            <div className="search__box">
                                <input type="text" placeholder="Поиск..." />
                                <span>
                                    <i className="ri-search-2-line"></i>
                                </span>
                            </div>
                            <div className="admin__nav-top-right">
                                <span>
                                    <i className="ri-notification-3-line"></i>
                                </span>
                                <span>
                                    <i className="ri-settings-5-line"></i>
                                </span>
                                <img src={currentUser && currentUser.photoURL} alt="userPhoto" />
                            </div>
                        </div>
                    </Container>
                </div>
            </header>

            <section className="admin__menu p-0">
                <Container>
                    <Row>
                        <div className="admin__navigation">
                            <ul className="admin__menu-list">
                                {
                                    admin__nav.map((item, index) => (
                                        <li className="admin__menu-item" key={index}>
                                            <NavLink 
                                                to={item.path} 
                                                className={
                                                    navClass => navClass.isActive ? "active__admin-menu" : ""
                                                }
                                            >
                                                {item.display}
                                            </NavLink>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </Row>
                </Container>
            </section>
        </>
    );
}

export default AdminNav