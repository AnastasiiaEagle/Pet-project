import '@style/components/header/header.css'

export const Header = () => {
    return(
      <>
        <header className='header'>
                <ul className=" header__box ">
                    <h1 className="logo">ФурнітураUA</h1>
                    <ul className="header__box">
                        <li className="menu__item">
                            <a href="/" className="item_link">
                                Головна
                            </a>
                        </li>
                        <li className="menu__item">
                            <a href="/catalog" className="item_link">
                                Каталог
                            </a>
                        </li>
                        <li className="menu__item">
                            <a href="/material" className="item_link">
                                Матеріали
                            </a>
                        </li>
                        <li className="menu__item">
                            <a href="/delivery" className="item_link">
                                Доставка
                            </a>
                        </li>
                        <li className="menu__item">
                            <a href="/contact" className="item_link">
                                Контакти
                            </a>
                        </li>
                    </ul>
                    <div className="header__basket">
                        <a href="/basket" className="basket__link">
                            <span className='basket__text'>Кошик</span>
                            <img className='basket__img' src="/img/basket.png" alt="Корзина" />
                        </a>
                    </div>
                </ul>
        </header>
      </>
    )
  }