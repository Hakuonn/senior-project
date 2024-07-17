


# 四時煮食食｜剩食x健康食譜

## 純凈版

pages分成兩大類：食譜recipe & 剩食訂購uberEat。需要添加功能請依照資料夾放。
Components：
* nav_and_footer
放置所有navBar跟footer的
* uberEat_C_C(剩食訂購_compnent_Customer)
* uberEat_C_S(剩食訂購_compnent_Store)
* recipe_C(食譜_Component)

## 命名規則

如果是頁面，請在檔名後面加page並且放置在pages相對應的資料夾，ex:StoreOrderPage.js。<br/>
如果是component，則不用加並放置在components相對應的資料夾，ex:ProductItem.js
### 例如
![命名規則](src/imgs/read-me1.png)
所以要怎麼放呢？
就會像這樣：
```python
└── src
    ├── App.css
    ├── App.js
    ├── components
    │   ├── Component1.js
    │   ├── Component2.js
    │   └── Component3.js
    └── pages
        └── GithubPage.js
```
而GithubPage.js裡面會長這樣：

```react
import React from 'react'
import Component1 from '../components/Component1'
import Component2 from '../components/Component2'
import Component3 from '../components/Component3'


function GithubPage() {
  return (
    <>
        <Component1/>
        <Component2/>
        <Component3/>
    </>
  )
}

export default GithubPage

```

## 目前的tree
```python
└── src
    ├── App.css
    ├── App.js
    ├── components
    │   ├── Axios.js
    │   ├── nav_and_footer
    │   │   ├── Footer.js
    │   │   ├── KanBan.js
    │   │   └── StoreKanBan.js
    │   ├── recipe_C
    │   ├── uberEat_C_C
    │   │   ├── AboutBuilder.js
    │   │   ├── LogIn.js
    │   │   ├── LoginCard.js
    │   │   ├── SimpleSlider.js
    │   │   └── menu
    │   │       ├── EmptyState.js
    │   │       ├── FoodTypeSelect.js
    │   │       ├── GetUserLocation.js
    │   │       ├── Map.js
    │   │       ├── MenuStoreList.js
    │   │       ├── RecommendStore.js
    │   │       └── Search.js
    │   └── uberEat_C_S
    │       ├── EmptyState.js
    │       ├── ProductItem.js
    │       ├── StatusButton.js
    │       └── StoreCancelOrder.js
    ├── css
    │   ├── nav_footer.css
    │   ├── uberEat_customer.css
    │   └── uberEat_store.css
    ├── imgs
    │   ├── ZHJ8C7j.png
    │   ├── gps.png
    │   ├── hold300x300.jpg
    │   ├── lee1.png
    │   ├── logo.png
    │   ├── map.png
    │   ├── read-me1.png
    │   ├── sliders
    │   │   ├── slider1.png
    │   │   ├── slider2.png
    │   │   ├── slider3.png
    │   │   └── slider4.png
    │   ├── storelog.png
    │   └── userlog.png
    ├── index.css
    ├── index.js
    └── pages
        ├── HomePage.js
        ├── NotFoundPage.js
        ├── recipe
        └── uberEat
            ├── customer
            │   ├── AboutMePage.js
            │   ├── CommonQAPage.js
            │   ├── LoginPage.js
            │   ├── MenuPage.js
            │   ├── RegisterPage.js
            │   └── aboutPages
            │       ├── AboutEcobao.js
            │       ├── AboutSd.js
            │       └── AboutVision.js
            └── store
                ├── StoreAddNewMealPage.js
                ├── StoreCustomerFeedbackPage.js
                ├── StoreIndexPage.js
                ├── StoreLoginPage.js
                ├── StoreMealEdit.js
                ├── StoreOrderHistoryPage.js
                ├── StoreOrderPage.js
                ├── StoreProductPage.js
                └── StoreRegisterPage.js
```