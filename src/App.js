import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';

// uberEat - Customer
import AboutMePage from './pages/uberEat/customer/AboutMePage';
import CommonQAPage from './pages/uberEat/customer/CommonQAPage';
import Activity from './pages/uberEat/customer/Activity';
import Store from './pages/uberEat/customer/Store';
import UserProfile from './pages/uberEat/customer/UserProfile'
import UserOrder from './pages/uberEat/customer/UserOrder'


// uberEat - Store
import StoreIndexPage from './pages/uberEat/store/StoreIndexPage';
import StoreLoginPage from './pages/uberEat/store/StoreLoginPage';
import StoreRegisterPage from './pages/uberEat/store/StoreRegisterPage';
import StoreProductPage from './pages/uberEat/store/StoreProductPage';
import StoreAddNewMealPage from './pages/uberEat/store/StoreAddNewMealPage';
import StoreOrderPage from './pages/uberEat/store/StoreOrderPage';
import StoreOrderHistoryPage from './pages/uberEat/store/StoreOrderHistoryPage';
import StoreCustomerFeedbackPage from './pages/uberEat/store/StoreCustomerFeedbackPage';
import CheckOutPage from './pages/uberEat/customer/CheckOutPage';
import ActivityPage from './pages/uberEat/customer/activity/ActivityPage';

import NotFound from './pages/NotFoundPage';
import Footer from './components/nav_and_footer/Footer'
import LoginPage from './pages/uberEat/customer/LoginPage';
import RegisterPage from './pages/uberEat/customer/RegisterPage';
import MenuPage from './pages/uberEat/customer/MenuPage';
import Cart from './pages/uberEat/customer/Cart';

function App() {
  return (
<div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage/>} exact />
          {/* uberEat - customer */}
          <Route path='/LoginPage' element={<LoginPage/>} />
          <Route path='/Register' element={<RegisterPage/>} />
          <Route path='/About' element={<AboutMePage/>} />
          <Route path='/Activity' element={<Activity/>} />
          <Route path='/CommonQA' element={<CommonQAPage/>} />
          <Route path='/Menu' element={<MenuPage/>} />
          <Route path='/store/:sid' element={<Store/>} />
          <Route path='/cart' element={<Cart/>} />
          <Route path='/UserProfile' element={<UserProfile/>} />
          <Route path='/orders' element={<UserOrder/>} />
          <Route path='/checkout' element={<CheckOutPage/>}/>
          <Route path='/activity/:actid' element={<ActivityPage/>}/>
          
          <Route path="/add-new-meal" component={StoreAddNewMealPage} />
          {/* <Route path="/other-page" component={SomeOtherPage} /> */}
          {/* uberEat - store */}
          <Route path='/StoreIndex' element={<StoreIndexPage/>} />
          <Route path='/StoreLogin' element={<StoreLoginPage/>} />
          <Route path='/StoreRegister' element={<StoreRegisterPage/>} />
          <Route path='/StoreProduct' element={<StoreProductPage/>} />
          <Route path='/StoreAddMeal' element={<StoreAddNewMealPage/>} />
          <Route path='/StoreOrder' element={<StoreOrderPage/>} />
          <Route path='/StoreOrderHistory' element={<StoreOrderHistoryPage/>} />
          <Route path='/StoreCustomerFeedback' element={<StoreCustomerFeedbackPage/>} />

          {/* 健康食譜 */}

          {/* 404 */}
          <Route path='*' element={<NotFound/>}/>
        </Routes>
        
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
