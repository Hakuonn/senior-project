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

如果是頁面，請在檔名後面加page並且放置在pages相對應的資料夾，ex:StoreOrderPage.js
如果是component，則不用加並放置在components相對應的資料夾，ex:ProductItem.js
### 例如
![命名規則](src/imgs/read-me1.png)
所以要怎麼放呢？
就會像這樣：
└── src
    ├── App.css
    ├── App.js
    ├── components
    │   ├── Component1.js
    │   ├── Component2.js
    │   └── Component3.js
    └── pages
        └── GithubPage.js
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
├── package-lock.json
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
└── src
    ├── App.css
    ├── App.js
    ├── HomePage.js
    ├── components
    │   ├── Axios.js
    │   ├── nav_and_footer
    │   │   ├── Footer.js
    │   │   └── StoreKanBan.js
    │   ├── recipe_C
    │   ├── uberEat_C_C
    │   │   ├── LogIn.js
    │   │   ├── LoginCard.js
    │   │   └── SimpleSlider.js
    │   └── uberEat_C_S
    │       ├── EmptyState.js
    │       ├── ProductItem.js
    │       ├── StatusButton.js
    │       └── StoreCancelOrder.js
    ├── imgs
    │   ├── gps.png
    │   ├── hold300x300.jpg
    │   ├── lee1.png
    │   ├── logo.png
    │   ├── map.png
    │   ├── storelog.png
    │   └── userlog.png
    ├── index.css
    ├── index.js
    └── pages
        ├── NotFoundPage.js
        ├── recipe
        └── uberEat
            ├── customer
            └── store
                ├── StoreAddNewMealPage.js
                ├── StoreCustomerFeedbackPage.js
                ├── StoreIndexPage.js
                ├── StoreLoginPage.js
                ├── StoreMealEdit.js
                ├── StoreOrderHistoryPage.js
                ├── StoreOrderPage.js
                ├── StoreProductPage.js
                └── StoreRegisterPage.js# senior-project
