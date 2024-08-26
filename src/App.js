import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';

// uberEat - Customer
import AboutMePage from './pages/uberEat/customer/AboutMePage';
import CommonQAPage from './pages/uberEat/customer/CommonQAPage';
import UserProfile from './pages/uberEat/customer/UserProfilePage'
import StoreDetail from './pages/uberEat/customer/StorePage'
import ShoppingCart from 'pages/uberEat/customer/CartPage';
import CheckOutPage from 'pages/uberEat/customer/CheckOutPage';
// uberEat - Store
import StoreIndexPage from './pages/uberEat/store/StoreIndexPage';
import StoreLoginPage from './pages/uberEat/store/StoreLoginPage';
import StoreRegisterPage from './pages/uberEat/store/StoreRegisterPage';
import StoreProductPage from './pages/uberEat/store/StoreProductPage';
import StoreAddNewMealPage from './pages/uberEat/store/StoreAddNewMealPage';
import StoreOrderPage from './pages/uberEat/store/StoreOrderPage';
import StoreOrderHistoryPage from './pages/uberEat/store/StoreOrderHistoryPage';
import StoreCustomerFeedbackPage from './pages/uberEat/store/StoreCustomerFeedbackPage';

// recipe - 4 times for cook
import RecipeIndexPage from './pages/recipe/RecipeIndexPage';
import RecipeSearchPage from './pages/recipe/RecipeSearchPage';
import RecipeShowPage from './pages/recipe/RecipeShowPage';


import NotFound from './pages/NotFoundPage';
import Footer from './components/nav_and_footer/Footer'
import LoginPage from './pages/uberEat/customer/LoginPage';
import RegisterPage from './pages/uberEat/customer/RegisterPage';
import MenuPage from './pages/uberEat/customer/MenuPage';
import RecipeFavoritePage from './pages/recipe/RecipeFavoritePage';

const baseUrl = "http://140.133.74.162:12345/";

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <div className="content-wrap">
          <Routes>
            <Route path='/' element={<HomePage baseUrl={baseUrl}/>} exact  />
            {/* uberEat - customer */}
            <Route path='/LoginPage' element={<LoginPage/>} />
            <Route path='/Register' element={<RegisterPage/>} />
            <Route path='/About' element={<AboutMePage/>} />
            {/* <Route path='/Activity' element={<Activity/>} /> */}
            <Route path='/CommonQA' element={<CommonQAPage/>} />
            <Route path='/Menu' element={<MenuPage baseUrl={baseUrl}/>} />
            <Route path='/Menu/Store/:id' element={<StoreDetail baseUrl={baseUrl} />} />
            <Route path='/Cart' element={<ShoppingCart />} />
            {/* <Route path='/UserProfile' element={<UserProfile/>} /> */}
            {/* <Route path='/orders' element={<UserOrder/>} /> */}
            <Route path='/Cart/Checkout' element={<CheckOutPage/>}/>
            {/* <Route path='/activity/:actid' element={<ActivityPage/>}/> */}


            {/* uberEat - store */}
            <Route path='/StoreIndex' element={<StoreIndexPage baseUrl={baseUrl}/>} />
            <Route path='/StoreLogin' element={<StoreLoginPage/>} />
            <Route path='/StoreRegister' element={<StoreRegisterPage/>} />
            <Route path='/StoreProduct' element={<StoreProductPage/>} />
            <Route path='/StoreAddMeal' element={<StoreAddNewMealPage/>} />
            <Route path='/StoreOrder' element={<StoreOrderPage/>} />
            <Route path='/StoreOrderHistory' element={<StoreOrderHistoryPage/>} />
            <Route path='/StoreCustomerFeedback' element={<StoreCustomerFeedbackPage/>} />
            {/* 健康食譜 */}
            <Route path='/RecipeIndex' element={<RecipeIndexPage/>} />
            <Route path='/RecipeFavorite' element={<RecipeFavoritePage/>} />
            <Route path='/Recipe/search' element={<RecipeSearchPage/>} />
            <Route path='/Recipe/result/:rid' element={<RecipeShowPage/>} />


            {/* 404 */}
            <Route path='*' element={<NotFound/>}/>
          </Routes>
        </div>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
