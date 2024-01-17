// import '@style/'

import { Header } from "@components/header/Header"
import { Footer } from '@components/footer/Footer'

import BigSlider from "../components/bigSlider/bigSlider"

export const DeliveryPage = () => {

    return(
        <>
            <Header/>
            <div className="container">
                <div className="swiper__header">
                        <BigSlider />
                </div>
                <main className="main">
                    <div className="main__columns">
                        <div className="column_left">
                            <div className="column_left__img">
                                <img src="img/test.jpg" alt="" className="img" />
                            </div>
                        </div>
                        <div className="column_right">
                            <h2 className="column_right__title">Методи оплати</h2>
                            <ul className="column_right__list">
                                <li className="list_item">
                                    Накладений платіж - у відділенні Нова Пошта (за мінусом передоплати)
                                </li>
                                <li className="list_item">
                                    Готівкою - кур'єру при отриманні
                                </li>
                                <li className="list_item">
                                    Безготівковий розрахунок - в будь-якому Банку України згідно номера рахунку (доставка товару можлива після надходження 100% оплати, на розрахунковий рахунок)
                                </li>
                            </ul>
                            <p className="warning">
                                * Обов’язкова предоплата у розмірі 20% від повної вартості замовлення
                            </p>
                        </div>
                    </div>
                </main>
            </div>
            <Footer />
        </>
    )
}