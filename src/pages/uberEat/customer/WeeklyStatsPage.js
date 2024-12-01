import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend, Title } from 'chart.js';
import KanBan from 'components/nav_and_footer/KanBan';
import { Container } from 'react-bootstrap';
import HealthBubble from '../../../components/HealthBubble.js';
import Axios from 'components/Axios.js';

// 註冊需要的組件
Chart.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend, Title);

const WeeklyStatsPage = () => {
  const [weeklyData, setWeeklyData] = useState({
    water: [],
    calories: [],
    exercise: [],
    days: [],
  });

  useEffect(() => {
    // 從 API 獲取每週數據
    Axios()
      .get("HM/daily/week_record/")
      .then((response) => {
        const data = response.data.data;
        const formattedData = {
          days: data.map((item) => item.date.slice(5)), // 提取日期 MM-DD
          water: data.map((item) => item.total_water || 0), // 預設為 0
          calories: data.map((item) => item.total_calories || 0),
          exercise: data.map((item) => item.total_exercise_time || 0),
        };
        setWeeklyData(formattedData);
      })
      .catch((error) => {
        console.error("獲取每週數據失敗：", error);
      });
  }, []);

  // 水與卡路里的圖表數據
  const waterCaloriesChartData = {
    labels: weeklyData.days,
    datasets: [
      {
        label: '水分攝取 (ml)',
        data: weeklyData.water,
        borderColor: '#2196f3',
        backgroundColor: 'rgba(33, 150, 243, 0.2)',
        fill: true,
      },
      {
        label: '卡路里攝取 (kcal)',
        data: weeklyData.calories,
        borderColor: '#ff9800',
        backgroundColor: 'rgba(255, 152, 0, 0.2)',
        fill: true,
      },
    ],
  };

  // 運動時間的圖表數據
  const exerciseChartData = {
    labels: weeklyData.days,
    datasets: [
      {
        label: '運動時間 (分鐘)',
        data: weeklyData.exercise,
        borderColor: '#4caf50',
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
        fill: true,
      },
    ],
  };

  // 圖表選項配置
  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: '每週健康數據趨勢',
      },
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <KanBan />
      <Container>
        <h2>本週健康狀況</h2>
        {/* 水與卡路里的圖表 */}
        <h3>水與卡路里趨勢</h3>
        <Line data={waterCaloriesChartData} options={chartOptions} />
        {/* 運動時間的圖表 */}
        <h3>運動時間趨勢</h3>
        <Line data={exerciseChartData} options={chartOptions} />
        <HealthBubble /> {/* 確保 HealthBubble 元件存在，支援每日更新 */}
      </Container>
    </div>
  );
};

export default WeeklyStatsPage;
