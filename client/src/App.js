import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AdminPage } from './pages/AdminPage';
import { AuthPage } from './pages/AuthPage';
import { OrderUserPage } from './pages/panelManager/OrderUserPage';
import { BasketPage } from './pages/shop/BasketPage';
import { ProductPage } from './pages/shop/catalog/ProductPage';
import { CatalogPage } from './pages/shop/CatalogPage';
import { DeliveryPage } from './pages/shop/DeliveryPage';
import { MaterialPage } from './pages/shop/MaterialPage';
import { ShopPage } from './pages/ShopPage';

function App() {
  return (
    <>
    <div className='wrapper'>
      <Routes>
        <Route path='/auth/sign-in' element={<AuthPage />} /> 
        <Route path='/admin' element={<AdminPage />} /> 
        <Route path='/admin/order/:number' element={<OrderUserPage />}></Route>
        <Route path='/' element={<ShopPage />} />
        <Route path='/material' element={<MaterialPage />} /> 
        <Route path='/catalog' element={<CatalogPage />} /> 
        <Route path='/basket' element={<BasketPage />} /> 
        <Route path='/catalog/product/:name/:productId' element={<ProductPage />} /> 
        <Route path='/delivery' element={<DeliveryPage />}/>
        <Route path='/contact' element={<DeliveryPage />}/>
      </Routes>
    </div>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
