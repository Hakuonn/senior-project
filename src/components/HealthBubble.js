import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import '../css/healthBubble.css';

// 註冊圖表組件
Chart.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const HealthBubble = () => {
  const [show, setShow] = useState(false); // 控制 Modal 顯示
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 控制按鈕顯示
  const [exercise, setExercise] = useState(60); // 假設的運動數據
  const [water, setWater] = useState(2000);    // 假設的水分數據
  const [calories, setCalories] = useState(1800); // 假設的卡路里數據

  // 檢查使用者是否登入的函數
  useEffect(() => {
    const token = localStorage.getItem('jwt'); 
    console.log(token)
    if (token) {
      setIsLoggedIn(true); // 如果 token 存在，表示已登入
    } else {
      setIsLoggedIn(false); // 沒有 token 表示未登入
    }
  }, []);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const barData = {
    labels: ['運動 (分鐘)', '水分 (ml)', '卡路里 (kcal)'],
    datasets: [
      {
        label: '健康數據',
        data: [exercise, water, calories],
        backgroundColor: ['#4caf50', '#2196f3', '#ff9800'],
      },
    ],
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('運動:', exercise, '水分:', water, '卡路里:', calories);
    handleClose();
  };

  // 如果使用者未登入，不顯示按鈕
  if (!isLoggedIn) {
    return null;
  }

  return (
    <>
      <Button
        variant="primary"
        className="floating-button"
        onClick={handleShow}
      >
        +
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>今日健康數據</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="bar-chart">
            <Bar data={barData} />
          </div>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>運動 (分鐘):</label>
              <input
                type="number"
                value={exercise}
                onChange={(e) => setExercise(e.target.value)}
                placeholder="輸入運動時間"
                required
              />
            </div>
            <div className="input-group">
              <label>水分 (ml):</label>
              <input
                type="number"
                value={water}
                onChange={(e) => setWater(e.target.value)}
                placeholder="輸入水分攝取量"
                required
              />
            </div>
            <div className="input-group">
              <label>卡路里 (kcal):</label>
              <input
                type="number"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                placeholder="輸入卡路里"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary mt-3">
              更新數據
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default HealthBubble;