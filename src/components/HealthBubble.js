import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { Chart, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import 'react-circular-progressbar/dist/styles.css';
import '../css/healthBubble.css';

import Axios from './Axios';

// 註冊圖表組件
Chart.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const HealthBubble = () => {
  const [show, setShow] = useState(false); // 控制 Modal 顯示
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 控制按鈕顯示
  const [visibleSection, setVisibleSection] = useState(""); // 控制顯示的區塊

  const [pre_exercise, setPre_Exercise] = useState([0]); // 假設的運動數據
  const [pre_water, setPre_Water] = useState(0);    // 假設的水分數據
  const [pre_calories, setPre_Calories] = useState(0); // 假設的卡路里數據

  const [exercise, setExercise] = useState(0); // 運動時間
  const [exerciseIntensity, setExerciseIntensity] = useState(""); // 運動強度
  const [water, setWater] = useState(0);    // 水分數據
  const [calories, setCalories] = useState(0); // 卡路里數據
  const [foodType, setFoodType] = useState(""); // 飲食型態

  const [waterGoal , setWaterTarget] = useState(0);    // 水分數據
  const [caloriesGoal, setCaloriesTarget] = useState(0); // 卡路里數據
  const [exerciseGoal, setExerciseTarget] = useState(0); // 飲食型態

  const handleSectionClick = (section) => {
    setVisibleSection((prev) => (prev === section ? "" : section));
  };
  // 檢查使用者是否登入的函數
  useEffect(() => {
    const token = window.localStorage.getItem('jwt');
    if (token === "None") {
      setIsLoggedIn(false);
    } else {
      Axios().get("HM/daily/personal/")
        .then((res) => {
          setExercise(res.data.data.exercise.current);
          setCalories(res.data.data.calories.current);
          setWater(res.data.data.water.current);

          setExerciseTarget(res.data.data.exercise.target);
          setCaloriesTarget(res.data.data.calories.target);
          setWaterTarget(res.data.data.water.target);

          setPre_Exercise(res.data.data.exercise.current);
          setPre_Calories(res.data.data.calories.current);
          setPre_Water(res.data.data.water.current);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          if(err.response.status===401){
            setIsLoggedIn(false);
          }
        })

      
    }
  }, []);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const calculatePercentage = (value, goal) => {
    return Math.min((value / goal) * 100, 100); // 百分比上限為 100
  };

  // 顯示模式狀態（百分比/數值）
  const [displayMode, setDisplayMode] = useState({
    exercise: 'percentage',
    water: 'percentage',
    calories: 'percentage',
  });

  const handleToggleDisplay = (key) => {
    setDisplayMode((prev) => ({
      ...prev,
      [key]: prev[key] === 'percentage' ? 'value' : 'percentage',
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (water !== pre_water) {
      Axios().post("HM/daily/input_water/", {
        water: water,
      });
    }
    if (calories !== pre_calories) {
      Axios().post("HM/daily/input_calories/", {
        type: foodType,
        calories: calories,
      });
    }
    if (exercise !== pre_exercise) {
      Axios().post("HM/daily/input_exercise/", {
        strong: exerciseIntensity,
        sport_time: exercise,
      });
    }
    handleClose();
  };

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
        <div className="progress-section">
            <h5 className="mb-3">健康目標達成率(點擊％可查看數值)</h5>
            <div className="progress-bars d-flex justify-content-around">
              <div
                style={{ width: 100, height: 100 }}
                onClick={() => handleToggleDisplay('exercise')}
              >
                <CircularProgressbar
                  value={
                    displayMode.exercise === 'percentage'
                      ? calculatePercentage(exercise, exerciseGoal)
                      : exercise
                  }
                  text={
                    displayMode.exercise === 'percentage'
                      ? `${calculatePercentage(exercise, exerciseGoal).toFixed(0)}%`
                      : `${exercise} 分鐘`
                  }
                  styles={buildStyles({
                    textColor: '#4caf50',
                    pathColor: '#4caf50',
                    trailColor: '#ddd',
                  })}
                />
                <p className="text-center mt-2">運動</p>
              </div>
              <div
                style={{ width: 100, height: 100 }}
                onClick={() => handleToggleDisplay('water')}
              >
                <CircularProgressbar
                  value={
                    displayMode.water === 'percentage'
                      ? calculatePercentage(water, waterGoal)
                      : water
                  }
                  text={
                    displayMode.water === 'percentage'
                      ? `${calculatePercentage(water, waterGoal).toFixed(0)}%`
                      : `${water} ml`
                  }
                  styles={buildStyles({
                    textColor: '#2196f3',
                    pathColor: '#2196f3',
                    trailColor: '#ddd',
                  })}
                />
                <p className="text-center mt-2">水分</p>
              </div>
              <div
                style={{ width: 100, height: 100 }}
                onClick={() => handleToggleDisplay('calories')}
              >
                <CircularProgressbar
                  value={
                    displayMode.calories === 'percentage'
                      ? calculatePercentage(calories, caloriesGoal)
                      : calories
                  }
                  text={
                    displayMode.calories === 'percentage'
                      ? `${calculatePercentage(calories, caloriesGoal).toFixed(0)}%`
                      : `${calories} kcal`
                  }
                  styles={buildStyles({
                    textColor: '#ff9800',
                    pathColor: '#ff9800',
                    trailColor: '#ddd',
                  })}
                />
                <p className="text-center mt-2">卡路里</p>
              </div>
            </div>
          </div>
            <br></br><br></br>
            <div className="section-buttons mb-4 d-flex justify-content-around">
            <Button
              variant={visibleSection === "exercise" ? "success" : "outline-success"}
              onClick={() => handleSectionClick("exercise")}
            >
              運動數據
            </Button>
            <Button
              variant={visibleSection === "water" ? "primary" : "outline-primary"}
              onClick={() => handleSectionClick("water")}
            >
              水分攝取
            </Button>
            <Button
              variant={visibleSection === "calories" ? "warning" : "outline-warning"}
              onClick={() => handleSectionClick("calories")}
            >
              卡路里攝取
            </Button>
          </div>

          <Form onSubmit={handleSubmit}>
            {visibleSection === "exercise" && (
              <div className="exercise-section mb-3">
                <h5 className="mb-3">運動數據</h5>
              
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="exercise">
                      <Form.Label>運動時間 (分鐘)</Form.Label>
                      <Form.Control
                        type="number"
                        value={exercise}
                        onChange={(e) => setExercise(Number(e.target.value))}
                        placeholder="輸入運動時間"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="exerciseIntensity">
                      <Form.Label>運動強度</Form.Label>
                                        
                      <Form.Select
                        value={exerciseIntensity}
                        onChange={(e) => setExerciseIntensity(e.target.value)}
                        required
                      >
            <option value="">選擇強度</option>
            <option value="1">低強度 - 散步、伸展、舉啞鈴</option>
            <option value="2">中強度 - 快步行、水中有氧、雙打網球</option>
            <option value="3">高強度 - 慢跑、快速游泳、單打網球</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                <div className="mt-3">
                  <p><strong>運動強度參考：</strong></p>
                  <ul>
                    <li><strong>低強度運動：</strong>散步、伸展運動、舉啞鈴、站立對牆做掌上壓</li>
                    <li><strong>中強度運動：</strong>快步行、水中有氧運動、雙打網球、平路單車、排球</li>
                    <li><strong>高強度運動：</strong>慢跑、快速游泳、跳舞、跳繩、單打網球、籃球</li>
                  </ul>
                </div>
              </div>
            )}

            {visibleSection === "water" && (
              <div className="water-section mb-3">
                <h5 className="mb-3">水分攝取</h5>
                <Form.Group controlId="water">
                  <Form.Label>水分攝取量 (ml)</Form.Label>
                  <Form.Control
                    type="number"
                    value={water}
                    onChange={(e) => setWater(Number(e.target.value))}
                    placeholder="輸入水分攝取量"
                    required
                  />
                </Form.Group>
              </div>
            )}

            {visibleSection === "calories" && (
              <div className="calories-section mb-3">
                <h5 className="mb-3">卡路里攝取</h5>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="foodType">
                      <Form.Label>飲食型態</Form.Label>
                      <Form.Select
                        value={foodType}
                        onChange={(e) => setFoodType(e.target.value)}
                        required
                      >
          <option value="0">不知道 - 無法分類的飲食</option>
            <option value="1">均衡 - 含適量碳水化合物、蛋白質和脂肪</option>
            <option value="2">比較油 - 油炸或脂肪含量較高的飲食</option>
            <option value="3">飯攝取多 - 米飯或麵食為主的高碳水飲食</option>
            <option value="4">蔬菜多 - 以蔬菜為主，低脂低熱量</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="calories">
                      <Form.Label>卡路里 (kcal)</Form.Label>
                      <Form.Control
                        type="number"
                        value={calories}
                        onChange={(e) => setCalories(Number(e.target.value))}
                        placeholder="輸入卡路里"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </div>
            )}

            <button type="submit" className="btn btn-primary mt-4 w-100">
              更新數據
            </button>
          </Form>        
          </Modal.Body>
      </Modal>
    </>
  );
};

export default HealthBubble;
