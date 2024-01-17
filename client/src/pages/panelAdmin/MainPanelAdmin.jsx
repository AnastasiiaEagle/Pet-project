import '@style/admin/admin.css'

import { PanelAdmin } from './PanelAdmin'
import { MenuAdmin } from "./MenuAdmin"
import { PopUpType } from './popUpForm/PopUpType'
import { PopUpModel } from './popUpForm/PopUpModel'
import { PopUpProduct } from './popUpForm/PopUpProduct'
import { PopUpAuth } from './popUpForm/PopUpAuth'
import { AdminHeader } from '@components/header/AdminHeader'


export const MainPanelAdmin = () => {
    return (
        <>
            <AdminHeader/>
            <div className="container">
                <div className="main_content">
                <MenuAdmin />
                <PanelAdmin/>
                </div>
            </div>

            <PopUpType />
            <PopUpModel />
            <PopUpProduct />
            <PopUpAuth />
        </>
    )
}