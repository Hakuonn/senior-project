import React, { useState, useEffect } from 'react';

function App() {
  const [res_allergen, setResAllergen] = useState({});
  const [defaultAllergen, setDefaultAllergen] = useState({});

  useEffect(() => {
    // 使用 fetch 或其他方法从后端获取数据
    fetch('/api/data') // 假设这是你的后端端点
      .then(response => response.json())
      .then(dataFromBackend => {
        setResAllergen(dataFromBackend);
        setDefaultAllergen(dataFromBackend); // 设置表单数据
      })
      .catch(error => console.error('获取数据时出错:', error));
  }, []);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setDefaultAllergen({ ...defaultAllergen, [name]: checked });
  };

  const handleSubmit = () => {
    // 将 defaultAllergen 发送回后端以保存更改
    fetch('/api/save', {
      method: 'POST',
      body: JSON.stringify(defaultAllergen),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(savedData => {
        setResAllergen(savedData);
      })
      .catch(error => console.error('保存数据时出错:', error));
  };

  return (
    <div>
      <h1>表单示例</h1>
      <form>
        <label>
          <input
            type="checkbox"
            name="checkbox1"
            checked={defaultAllergen.checkbox1 || false}
            onChange={handleCheckboxChange}
          />
          复选框1
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            name="checkbox2"
            checked={defaultAllergen.checkbox2 || false}
            onChange={handleCheckboxChange}
          />
          复选框2
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            name="checkbox3"
            checked={defaultAllergen.checkbox3 || false}
            onChange={handleCheckboxChange}
          />
          复选框3
        </label>
        <br />
        <button type="button" onClick={handleSubmit}>保存</button>
      </form>
      <p>从后端获取的数据：</p>
      <pre>{JSON.stringify(res_allergen, null, 2)}</pre>
    </div>
  );
}

export default App;
