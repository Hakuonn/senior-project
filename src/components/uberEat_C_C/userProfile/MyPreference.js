import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

import Axios from '../../Axios';


function MyPreference() {
    // dietaryPreference -> 顯示在前端的使用者偏好選項
    const [dietaryPreference,setPre] = useState(null)
    // preferences -> 新偏好
    const [preferences, setPreferences] = useState([]);
    // defaultPreferences -> 就偏好
    const [defaultPreferences, setDefaultPreference] = useState([]);

    

    const datatoback = () => {
        // 若使用者誤觸
        if (preferences.length === 0){
            alert("沒有偵測到變動呢！要挑選按鈕喔")
            return;
        }
        Axios().put('member/info/change/', JSON.stringify({
            prefer: preferences.toString(),
        }))
        .then((res) => {
            alert('修改成功');
            window.location.reload()
        })
        .catch((err) => {
            alert("伺服器正在維護中，請稍後再試！")
        });
    };

    const handleChange = (ft) => {
        const PreferFt = String(ft);
        const updatedPreferSet = new Set([...defaultPreferences, ...preferences]);

        // 用set的特性（Array無），是否存在該東西，有就刪除，無就添加
        updatedPreferSet.has(PreferFt) ? updatedPreferSet.delete(PreferFt) : updatedPreferSet.add(PreferFt);

        // Set -> Array
        const updatedAllergenArray = Array.from(updatedPreferSet);
        // FIX: 按鈕無法取消
        setDefaultPreference(updatedAllergenArray)
        // 忘記把原本的紀錄刪除！
        setPreferences(updatedAllergenArray);
    };

    useEffect(() => {
        // 取得方便前端將選項輸出的東西
        Axios().get("common/foodTypePic/")
        .then((res) => {
            setPre(res.data)
        })
        .catch((err) => {
            alert("伺服器維護中！")
        })

        // 取得使用者所有資料（除了帳號、密碼）
        Axios().get('member/info/get/')
        .then((res) => {
            let data = res.data;
            if (data.prefer === "" || data.prefer == null){
              let prefer = []
              setDefaultPreference(prefer);
            }
            else{
              let prefer = data.prefer.split(",")
              setDefaultPreference(prefer);
            }   
        })
          .catch((err) => {
            alert("伺服器維護中！請稍後再試")
          });
      }, []);

    return (
        <Container fluid className='myprofile'>
            <Row>
                <Col xs={1} md={1}>
                    {/* <Image src={logo} alt={logo} roundedCircle className='profile-img'/> */}
                </Col>
                <Col xs={8} md={8}>
                    <h2>飲食偏好</h2>
                    <Form>
                        {dietaryPreference &&
                        dietaryPreference.map((item) => (
                            <Form.Check
                                key={item.id}
                                type="checkbox"
                                id={`preference-${item.id}`}
                                label={item.ft}
                                checked={(defaultPreferences && preferences) ? (defaultPreferences.includes(item.ft) || preferences.includes(item.ft)) : false}
                                onChange={() => handleChange(item.ft)}
                            />
                        ))}
                        <Button onClick={()=>datatoback()}>
                            確認
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default MyPreference;