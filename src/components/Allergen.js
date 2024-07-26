import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import useFetch from '../hooks/useFetch';
import Axios from '../components/Axios';

function Allergen({ getAllergenURL, putAllergenUrl }) {
  const { data: allergen } = useFetch("http://localhost:8002/foodAllergen");
  const [res_allergen, setResAllergen] = useState([]);
  const [defaultAllergen, setDefaultAllergen] = useState([]);
  console.log(res_allergen);
  console.log(defaultAllergen);

  // 將過敏原傳至後端
  const allergenToBack = () => {
    Axios().post(putAllergenUrl, JSON.stringify({
      allergen: res_allergen,
    }))
      .then((res) => {
        alert('修改成功');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // 更改 allergen 狀態
  const handleAllergenChange = (id) => {
    const allergenId = String(id);
    const updatedAllergenSet = new Set([...defaultAllergen, ...res_allergen]);

    // 将转化后的id添加到集合中
    updatedAllergenSet.has(allergenId) ? updatedAllergenSet.delete(allergenId) : updatedAllergenSet.add(allergenId);

    // Set -> Array
    const updatedAllergenArray = Array.from(updatedAllergenSet);
    setResAllergen(updatedAllergenArray);
  }

  // 從後端抓取 allergen
  useEffect(() => {
    Axios().get(getAllergenURL)
      .then((res) => {
        let data = res.data;
        if (data.allergen === "" || data.allergen == null){
          let allergen = []
          setDefaultAllergen(allergen);
        }
        else{
          let allergen = JSON.parse(data.allergen.replace(/'/g, '"'))
          setDefaultAllergen(allergen);
        }
        
      })
      .catch((err) => {
        alert("過敏原達到上限")
        console.log(err);
      });
  }, []);

  return (
    <Form>
      {allergen &&
        allergen.map((item) => (
          <Form.Check
            type="switch"
            key={item.id}
            id={item.id}
            label={item.label}
            value={item.id}
            checked={defaultAllergen.includes(item.id) || res_allergen.includes(item.id)}
            onChange={() => handleAllergenChange(item.id)}
          />
        ))
      }
      <Button variant="primary" type="button" onClick={() => allergenToBack()}>
        儲存
      </Button>
    </Form>
  )
}

export default Allergen;
