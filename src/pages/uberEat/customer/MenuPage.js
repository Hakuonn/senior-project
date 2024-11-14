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

function MenuPage() {
    const [type, setType] = useState(null)
    const [search,setSearch] = useState(null)
    const [webaction , setWebaction] = useState(null)
    const [data, setData] = useState(null)


    // 從後端抓取商家資料
    function get_backdata(webaction = null , type = null , search = null){
        let action = 'store/search/filter_by_type/'
        let params = {
            params:{}
        }
        if (webaction === 'type'){
            action = action + 'type'
            let t = {'type':type}
            params['params'] = t
        }
        else if (webaction === 'search'){
            action = action + 'search'
            let s = {'name':search}
            params['params'] = s
        }
        else if (webaction === null || webaction === 'all'){
            action = action + 'all'
        }
        else{
            console.log('unknown action')
        }

        Axios().get(action,params)
        .then((res)=>{
            // console.log(res.data)
            let data = res.data
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
                <RecommendStore/>
                <hr />
                {/* 食物類別 */}
                <FoodTypeSelect setType={setType} setWebaction={setWebaction} />                
                <hr />
                {/* 商店 */}
                <Container>
                    <Row xs={2} md={3} className="g-4">
                        {data && data.length?
                        data.map((object) => (<MenuStoreList object={object}/>))
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