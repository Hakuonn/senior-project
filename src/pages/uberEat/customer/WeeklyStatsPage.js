import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend, Title } from 'chart.js';
import KanBan from 'components/nav_and_footer/KanBan';
import { Container } from 'react-bootstrap';

// 註冊需要的組件
Chart.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend, Title);

const WeeklyStatsPage = () => {
  const [weeklyData, setWeeklyData] = useState({
    exercise: [30, 60, 45, 50, 90, 70, 80], // 每天的運動數據
    water: [2000, 1800, 2200, 2500, 2300, 2400, 2100], // 每天的水分攝取數據
    calories: [1800, 2000, 2100, 1900, 2000, 2200, 2100], // 每天的卡路里數據
  });

  // X 軸為每週的 7 天
  const daysOfWeek = ['週一', '週二', '週三', '週四', '週五', '週六', '週日'];

  // 使用者的每週健康數據
  const chartData = {
    labels: daysOfWeek,
    datasets: [
      {
        label: '運動 (分鐘)',
        data: weeklyData.exercise,
        borderColor: '#4caf50',
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
        fill: true,
      },
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
    <KanBan/>
        <Container>
            <h2>本週健康狀況</h2>
            <Line data={chartData} options={chartOptions} />
        </Container>
    </div>
  );
};

export default WeeklyStatsPage;
