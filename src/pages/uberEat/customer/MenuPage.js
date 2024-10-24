import React, { useState , useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import FoodTypeSelect from '../../../components/uberEat_C_C/menu/FoodTypeSelect';
import Search from '../../../components/uberEat_C_C/menu/Search';
import KanBan from '../../../components/nav_and_footer/KanBan';
import Map from '../../../components/uberEat_C_C/menu/Map';
import Axios from '../../../components/Axios';
import MenuStoreList from '../../../components/uberEat_C_C/menu/MenuStoreList';
import EmptyState from '../../../components/uberEat_C_C/menu/EmptyState';
import RecommendStore from '../../../components/uberEat_C_C/menu/RecommendStore';

/**
 * 買家端＿店家搜尋頁面
 * 內容為管理頁面的區塊呈現以及串接結果．
 * 
 * @param {string} baseUrl 初始頁面＿後端串接網址
 * @returns null
 */
function MenuPage({ baseUrl }) {
    
    // 取得使用者經緯度
    const [location, setLocation] = useState({ lat: null, lng: null });
    // 一般取得使用者的搜尋參數
    const [type, setType] = useState(null)
    const [search,setSearch] = useState(null)
    const [webaction , setWebaction] = useState(null)
    // 找到的餐廳
    const [data, setData] = useState(null)

    /**
     * 使用瀏覽器內建的位置功能自動取得，目前使用者的位置
     */
    const getLocation = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              setLocation({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              });
            },
            (error) => {
            setLocation({
                lat: 22.67635757482952,
                lng: 120.29753827283504,
            });
            }
          );
        } else {
            // 若瀏覽器無法取得使用者位置，高雄高鐵左營站為默認位置
            // 位置如下：22.67635757482952, 120.29753827283504
            setLocation({
                lat: 22.67635757482952,
                lng: 120.29753827283504,
            });
        }
    };

    /**
     * 透過compoment取得前端的資料並傳送給後端
     * 
     * @param {string} webaction 要使用哪個API
     * @param {string} type  使用者點選的類別
     * @param {string} search 使用者搜尋
     */
    function get_backdata(webaction = null , type = null , search = null){
        let action = 'store/search/'
        getLocation()
        let params = {
            params:{
                'lat':location.lat,
                'lng':location.lng
            }

        }
        if (webaction === 'type'){
            // 若使用者依照類行進行搜尋
            action = action + 'filter_by_type/'
            let t = {'type':type}
            params['params'] = t
        }
        else if (webaction === 'search'){
            // 一般搜尋
            action = action + 'get/'
            let s = {'name':search}
            params['params'] = s
        }
        else if (webaction === null || webaction === 'all'){
            // 直接取得所有商店:)
            action = action + 'get/'
        }
        else{
            console.log('unknown action')
        }

        Axios().get(action,params)
        .then((res)=>{
            // console.log(res.data)
            let data = res.data.results
            return setData(data)
        })
        .catch((err)=>{
            console.log(err)
            return false
        })
    }

    useEffect(()=>{
        get_backdata(webaction,type,search)
    },[type,search])



  return (
    <>
    <KanBan/>
    <Container className='mb-5'>
        <Row>
            <Col>
                {/* 搜尋欄 */}
                <Search setSearch={setSearch} setWebaction={setWebaction} />
                <hr />
                {/* 地圖 */}
                <Map data={data}/>
                <hr />
                <RecommendStore baseUrl={baseUrl}/>
                <hr />
                {/* 食物類別 */}
                <FoodTypeSelect setType={setType} setWebaction={setWebaction} />                
                <hr />
                {/* 商店 */}
                <Container>
                    <Row xs={2} md={3} className="g-4">
                        {data && data.length?
                        data.map((object) => (<MenuStoreList object={object} baseUrl={baseUrl}/>))
                        :
                        <EmptyState src={'https://i.imgur.com/J9QnVAy.png'}/>
                        }
                    </Row>
                </Container>
            </Col>
        </Row>
    </Container>
    </>
  )
}

export default MenuPage