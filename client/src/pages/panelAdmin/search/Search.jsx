import '@style/panelAdmin/search/search.css'

export const Search = () => {
    return (
        <div className="search">
            <input className='input_search' type="text" placeholder="Пошук..." />
            <button className='search_btn'><img src="../../../../img/search.png" alt="search" /></button>
        </div>
    )
}