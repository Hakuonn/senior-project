import React from 'react';
import { Card, Container } from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import KanBan from '../../../components/nav_and_footer/KanBan';

const consumerQA = [
    {
        id: 1,
        Q: "我是直接跟環飽EcoBǎo購買剩食嗎？",
        A: "環飽EcoBǎo只是個提供買賣家串接的平台，所有剩食商品皆由商家自行管理，平台只提供買賣雙方的媒合，並提供買家一個信任、安全、環保的飲食體驗。"
    },
    {
        id: 2,
        Q: "我要如何下單？",
        A: "選擇您要的剩食產品，加入購物車，在購物車中選擇您要的剩食數量、折價券，再進行結帳，即完成下單。"
    },
    {
        id: 3,
        Q: "我要如何成為環飽EcoBǎo的一份子？",
        A: "透過我們首頁點選點選「使用者登入/註冊按鈕」，進入後再點選「註冊」按鈕，輸入基本資料即可成為我們的一份子！"
    },
    {
        id: 4,
        Q: "綠色飲食",
        A: "「綠色飲食」是一種簡單改變生活飲食習慣的行為，宣導食物適量、優先選用在地、當季及天然食材以及自備環保餐具，進而達到珍惜食物、減少浪費，對人體健康與環保都有助益的飲食方式。 詳見環境部介紹：https://greenlife.epa.gov.tw/about/intro/flipFood"
    }
];

const storeQA = [
    {
        id: 1,
        Q: "我要如何成為環飽EcoBǎo的合作商家？",
        A: "透過我們首頁點選點選「商家登入/註冊按鈕」，進入後再點選「註冊」按鈕，輸入商家基本資料，在經過驗證即可成為商家！減少剩食，也減少剩食所製造的額外成本。"
    },
    {
        id: 2,
        Q: "訂單是否需要開發票給客人？",
        A: "若商家有設立稅籍登記，依台灣稅法相關規定，當商家有銷售行為時，即應主動開立統一發票或收據給消費者喔～"
    },
    {
        id: 3,
        Q: "一定要寫上商家簡介嗎？",
        A: "不一定，不過我們推薦能寫上簡介的話就盡量寫喔～除了讓客人有基本了解商家，也可以提升品牌價值～"
    }
];

function CommonQAPage() {
  return (
    <>
      <KanBan />
        <Container className='QA'>
          <h1>Q & A</h1>
          <Tabs
            defaultActiveKey="消費者"
            id="QA-tab"
            className="mb-3"
            variant="underline"
            justify
          >
            <Tab eventKey="消費者" title="消費者">
              {consumerQA &&
                consumerQA.map((item) => (
                  <div key={item.id} className='QA-div-card mt-5 mb-5'>
                    <Card className='p-3'>
                      <Card.Body>
                        <Card.Title>{item.Q}</Card.Title>
                        <Card.Text>{item.A}</Card.Text>
                      </Card.Body>
                    </Card>
                  </div>
                ))
              }
            </Tab>
            <Tab eventKey="商家" title="商家">
              {storeQA &&
                storeQA.map((item) => (
                  <div key={item.id} className='QA-div-card mt-5 mb-5'>
                    <Card className='p-3'>
                      <Card.Body>
                        <Card.Title>{item.Q}</Card.Title>
                        <Card.Text>{item.A}</Card.Text>
                      </Card.Body>
                    </Card>
                  </div>
                ))
              }
            </Tab>
          </Tabs>
        </Container>
    </>
  );
}

export default CommonQAPage;
