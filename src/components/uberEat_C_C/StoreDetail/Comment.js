<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { Rating } from '@mui/material';
=======
import React, { useEffect , useState } from 'react'
import { Card } from 'react-bootstrap'
import { Rating } from '@mui/material'
import Axios from 'components/Axios'
>>>>>>> origin/main

/**
 * 關於商家評論的視覺區塊
 * 
 * @param {string} id 商家編號
 * @returns html
 */
<<<<<<< HEAD
function Comment({ id }) {
  const [data, setData] = useState(null);
  const [filter, setFilter] = useState(null); // 用來保存篩選條件
  const [ratingsCount, setRatingsCount] = useState({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }); // 儲存每個評分的數量
  const [averageRating, setAverageRating] = useState(0); // 儲存平均評分
  const [totalReviews, setTotalReviews] = useState(0); // 儲存總評分人數

  // 假資料，增加了 `username` 和 `timestamp` 字段
  const mockData = [
    { id: 1, username: 'user1', title: 'Great store!', comment: 'I love this place!', rating: 5, timestamp: '2024-08-25T10:30:00Z' },
    { id: 2, username: 'user2', title: 'Good service', comment: 'Friendly staff', rating: 4, timestamp: '2024-08-24T08:15:00Z' },
    { id: 3, username: 'user3', title: 'Average', comment: 'It was okay.', rating: 3, timestamp: '2024-08-23T14:45:00Z' },
    { id: 4, username: 'user4', title: 'Not great', comment: 'Not what I expected.', rating: 2, timestamp: '2024-08-22T09:00:00Z' },
    { id: 5, username: 'user5', title: 'Terrible', comment: 'Worst experience ever.', rating: 1, timestamp: '2024-08-21T16:30:00Z' },
    { id: 6, username: 'user6', title: 'Great store!', comment: 'I love this place!', rating: 5, timestamp: '2024-08-25T10:30:00Z' },
    { id: 7, username: 'user7', title: 'Good service', comment: 'Friendly staff', rating: 4, timestamp: '2024-08-24T08:15:00Z' },
    { id: 8, username: 'user8', title: 'Average', comment: 'It was okay.', rating: 3, timestamp: '2024-08-23T14:45:00Z' },
    { id: 9, username: 'user9', title: 'Not great', comment: 'Not what I expected.', rating: 2, timestamp: '2024-08-22T09:00:00Z' },
    { id: 10, username: 'user10', title: 'Terrible', comment: 'Worst experience ever.', rating: 4, timestamp: '2024-08-21T16:30:00Z' },
    { id: 11, username: 'user11', title: 'Great store!', comment: 'I love this place!', rating: 5, timestamp: '2024-08-25T10:30:00Z' },
    { id: 12, username: 'user12', title: 'Good service', comment: 'Friendly staff', rating: 4, timestamp: '2024-08-24T08:15:00Z' },
    { id: 13, username: 'user13', title: 'Average', comment: 'It was okay.', rating: 3, timestamp: '2024-08-23T14:45:00Z' },
    { id: 14, username: 'user14', title: 'Not great', comment: 'Not what I expected.', rating: 5, timestamp: '2024-08-22T09:00:00Z' },
    { id: 15, username: 'user15', title: 'Terrible', comment: 'Worst experience ever.', rating: 5, timestamp: '2024-08-21T16:30:00Z' },
  ];

  useEffect(() => {
    // 模擬後端篩選資料的功能
    const fetchData = () => {
      const filteredData = filter ? mockData.filter(item => item.rating === filter) : mockData;
      setData(filteredData);
    };

    // 計算每個評分的數量和統計數據
    const countRatings = () => {
      const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
      let total = 0;
      let sum = 0;

      mockData.forEach(item => {
        counts[item.rating] += 1;
        sum += item.rating;
        total += 1;
      });

      setRatingsCount(counts);
      setTotalReviews(total);
      setAverageRating(sum / total);
    };

    fetchData();
    countRatings();
  }, [filter]);

  const handleFilterChange = (rating) => {
    setFilter(rating); // 改變篩選條件
  };

  return (
    <div className='customer-feedback'>
      <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '20px' }}>
        {/* 顯示平均評分和總評分人數 */}
        <div style={{ flex: 1, textAlign: 'center', marginRight: '20px' }}>
          <h4>平均評分: {averageRating.toFixed(1)}</h4>
          <h5>總評分人數: {totalReviews}</h5>
        </div>

        {/* 評分橫條圖 */}
        <div style={{ flex: 2, display: 'flex', flexDirection: 'column-reverse', marginRight: '20px' }}>
          {Object.entries(ratingsCount).map(([rating, count]) => (
            <div key={rating} style={{ marginBottom: '5px', display: 'flex', alignItems: 'center' }}>
              <Rating value={Number(rating)} readOnly max={5} size="small" />
              <div 
                style={{
                  height: '10px',
                  width: `${count * 20}%`, // 根據評分數量動態設置寬度
                  backgroundColor: '#ffd700',
                  marginLeft: '10px',
                  transition: 'width 0.3s ease',
                }}
              />
              <span style={{ marginLeft: '10px' }}>{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 按鈕區域 */}
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '20px' }}>
        <button 
          onClick={() => handleFilterChange(5)} 
          style={{ padding: '5px 10px', margin: '5px', fontSize: '16px' }}
        >
          5星
        </button>
        <button 
          onClick={() => handleFilterChange(4)} 
          style={{ padding: '5px 10px', margin: '5px', fontSize: '16px' }}
        >
          4星
        </button>
        <button 
          onClick={() => handleFilterChange(3)} 
          style={{ padding: '5px 10px', margin: '5px', fontSize: '16px' }}
        >
          3星
        </button>
        <button 
          onClick={() => handleFilterChange(2)} 
          style={{ padding: '5px 10px', margin: '5px', fontSize: '16px' }}
        >
          2星
        </button>
        <button 
          onClick={() => handleFilterChange(1)} 
          style={{ padding: '5px 10px', margin: '5px', fontSize: '16px' }}
        >
          1星
        </button>
      </div>

      {/* 渲染評論 */}
      {data && data.length > 0 ? (
        data.map((item, index) => (
          <Card key={index} style={{ margin: '10px 0' }}>
            <Card.Body>
              {/* 顯示帳號名稱 */}
              <Card.Subtitle className="mb-2 text-muted">@{item.username}</Card.Subtitle>
              {/* 顯示對應評分的星星 */}
              <Rating value={item.rating} readOnly />
              <Card.Title>{item.title}</Card.Title>
              <Card.Text>{item.comment}</Card.Text>
              {/* 顯示評論時間 */}
              <Card.Text className="text-muted">
                {new Date(item.timestamp).toLocaleString()}
              </Card.Text>
            </Card.Body>
          </Card>
        ))
      ) : (
        <p>沒有符合的評論</p>
      )}
    </div>
  );
}

export default Comment;
=======
function Comment({id}) {

  const [data,setData] = useState(null)

  useEffect(() => {
    Axios().get("comment/store/id/",{
      params:{"store_id":id}
    })
    .then((res) => {
      let response = res.data
      setData(response)
    })
    .catch((err) => {
      alert("伺服器正在維護中！")
      if (err.response.status === 404){
        console.log("查無資料：）")
      }
    })
  },[])

  return (
    <div className='customer-feedback'>
      {data && data.map((item) => (
        <Card key={item.evaid}>
            <Card.Body>
                {/* <Card.Title>{name}</Card.Title> */}
                <Card.Text>{item.explain}</Card.Text>
                <Rating name="read-only" value={item.star} readOnly size='large'/>
            </Card.Body>
            <Card.Footer>撰寫時間：{item.date}</Card.Footer>
        </Card>
      ))}
    </div>
  )
}

export default Comment
>>>>>>> origin/main
