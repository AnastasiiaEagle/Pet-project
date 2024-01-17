import '@style/components/menuSearch/menuSearch.css'

export const MenuSearch = () => {
    return(
        <>
            <div className="menu__search">
                <input className='menu__input_search' type="text" placeholder="Пошук..." />
                <button className='menu__search_btn'>Пошук</button>
            </div>
        </>
    )}