import '@style/admin/admin.css'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { MainPanelAdmin } from './panelAdmin/MainPanelAdmin'
import { MainPanelManager } from './panelManager/MainPanelManager'

import { getMe, checkIsAuth, checkIsRole } from '@redux/features/auth/authSlice'


export const AdminPage = () => {
  const dispatch = useDispatch()
  const isAuth = useSelector(checkIsAuth)
  const isRole = useSelector(checkIsRole)

  useEffect(()=>{
    dispatch(getMe())
  }, [isRole])
  return (
    <>
      {isAuth && isRole==="admin" ? <MainPanelAdmin /> :
       isAuth && isRole==='manager' ? <MainPanelManager /> : ''
      }
    </>
    
  )
}