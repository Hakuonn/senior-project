# 版本更新

## date/0717
我已經將img的網址更新了，當Axios Server有變更時記得除了Axios.js外也要去App.js修改。
更新如下（範例）：
當你的頁面需要用到後端儲存的圖片網址：
```react
APP.js
原：
<Route path='/Menu' element={<MenuPage} />
修改成：
<Route path='/Menu' element={<MenuPage baseUrl={baseUrl}/>} />
```
```react
MenuPage.js
原：
最一開始的地方 function MenuPage() 
修改成：
function MenuPage({ baseUrl }) 


在需要圖片的地方修改成：
<Card.Img variant="top" src={`${baseUrl}${pic}`} />
```

### 0717特別說明
在App.js裡面有註解掉的Route是Brian能力不足無法debug也沒時間debug的部份，裡面"極有可能"是有重大錯誤才沒去做修正。<br/><br/>
各位麻煩請依照06/11會議資料裡所分配的工作負責人依照自己的情況去啟用，並且去DC裡面的github連結(也就是ecobaoFront不然就是4timesforcook_lan: ㄚㄚㄚㄚㄚ)抓取原始檔去做修正。<br/><br/>
那些註解並不是壞掉！！就只是沒有去做啟用！！🙂‍↔️🙂‍↔️<br/><br/>以上<br/><br/>
我覺得我打得很清楚了，還有不清楚的地方煩請在群組求解，謝！