import '@style/panelAdmin/contentAdmin.css'

import { Select } from '@components/select/Select'
import { New } from '@components/button/New'
import { Search } from '../panelAdmin/search/Search'

export const MenuComponent = (props) => {

    return (
      <>
        <nav className="main__nav">
            {props.add ? <New />: ''}
            {props.search ? <Search /> : ""}
            {props.select ? <Select /> : ""}
        </nav>
      </>
    )
}