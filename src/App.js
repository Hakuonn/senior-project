import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './HomePage';
import StoreIndexPage from './pages/uberEat/store/StoreIndexPage';
import StoreLoginPage from './pages/uberEat/store/StoreLoginPage';
import StoreRegisterPage from './pages/uberEat/store/StoreRegisterPage';
import StoreProductPage from './pages/uberEat/store/StoreProductPage';
import StoreAddNewMealPage from './pages/uberEat/store/StoreAddNewMealPage';
import StoreOrderPage from './pages/uberEat/store/StoreOrderPage';
import StoreOrderHistoryPage from './pages/uberEat/store/StoreOrderHistoryPage';
import StoreCustomerFeedbackPage from './pages/uberEat/store/StoreCustomerFeedbackPage';
import NotFound from './pages/NotFoundPage';
import Footer from './components/nav_and_footer/Footer'


function App() {
  return (
<div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage/>} exact />
          {/* uberEat - customer */}

          {/* <Route path='/LoginPage' element={<LoginPage/>} />
          <Route path='/Register' element={<Register/>} />
          <Route path='/About' element={<About/>} />
          <Route path='/Activity' element={<Activity/>} />
          <Route path='/CommonQA' element={<CommonQA/>} />
          <Route path='/Menu' element={<Menu/>} />
          <Route path='/store/:sid' element={<Store/>} />
          <Route path='/cart' element={<Cart/>} />
          <Route path='/UserProfile' element={<UserProfile/>} />
          <Route path='/orders' element={<UserOrder/>} />
          <Route path='/checkout' element={<CheckOutPage/>}/>
          <Route path='/activity/:actid' element={<ActivityPage/>}/> */}
          {/* uberEat - store */}
          <Route path='/StoreIndex' element={<StoreIndexPage/>} />
          <Route path='/StoreLogin' element={<StoreLoginPage/>} />
          <Route path='/StoreRegister' element={<StoreRegisterPage/>} />
          <Route path='/StoreProduct' element={<StoreProductPage/>} />
          <Route path='/StoreAddMeal' element={<StoreAddNewMealPage/>} />
          <Route path='/StoreOrder' element={<StoreOrderPage/>} />
          <Route path='/StoreOrderHistory' element={<StoreOrderHistoryPage/>} />
          <Route path='/StoreCustomerFeedback' element={<StoreCustomerFeedbackPage/>} />
          {/* 404 */}
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
