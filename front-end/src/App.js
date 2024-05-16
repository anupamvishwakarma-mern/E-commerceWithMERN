import './App.css';
import { Navbar } from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';

import Shop from './Pages/Shop/Shop';
import { ShopCategory } from './Pages/Shop/ShopCategory';
import { Product } from './Pages/Shop/Product';
import { Cart } from './Pages/cart/Cart';
import { LoginSignup } from './Pages/login_signup/LoginSignup';
import { Footer } from './Components/Footer/Footer';
import men_banner from "./Components/Assets/banner_mens.png";
import women_banner from "./Components/Assets/banner_women.png";
import kid_banner from "./Components/Assets/banner_kids.png";
import { Error404 } from './Components/Error404/Error404';
import { Address } from './Components/Address/Address';
import { AddNewAddress } from './Components/Address/AddNewAddress';
import { PaymentGateway } from './Components/Payment gateway/PaymentGateway';
import { MoreAddress } from './Components/Address/MoreAddress';





function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Shop />} />
        <Route path='/mens' element={<ShopCategory category="men" banner={men_banner} />} />
        <Route path='/womens' element={<ShopCategory category="women" banner={women_banner} />} />
        <Route path='/kids' element={<ShopCategory category="kid" banner={kid_banner} />} />
        <Route path='/product' element={<Product />} >
          <Route path=':productId' element={<Product />} />
        </Route>
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<Address />} >
          <Route path='address' element={<MoreAddress />} />
          <Route path='payment' element={<PaymentGateway />} />
        </Route>

        <Route path='/login' element={<LoginSignup />} />
        <Route path='/signup' element={<LoginSignup />} />
        
        <Route path='*' element={<Error404 />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
