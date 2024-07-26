import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import useFetch from '../../../hooks/useFetch';
import Axios from '../../../components/Axios';

function MyPreference() {
    const { data: dietaryPreference } = useFetch('http://localhost:8002/foodType');
    const [preferences, setPreferences] = useState([]);
    const [defaultPreferences, setDefaultPreference] = useState([]);
    console.log(preferences)
    console.log(defaultPreferences)


    const datatoback = () => {
        Axios().post('/member/prefer/', JSON.stringify({
            prefer: preferences,
        }))
        .then((res) => {
            alert('修改成功');
        })
        .catch((err) => {
            console.log(err);
        });
    };

    const handleChange = (ft) => {
        const PreferFt = String(ft);
        const updatedPreferSet = new Set([...defaultPreferences, ...preferences]);

        // 将转化后的id添加到集合中
        updatedPreferSet.has(PreferFt) ? updatedPreferSet.delete(PreferFt) : updatedPreferSet.add(PreferFt);

        // Set -> Array
        const updatedAllergenArray = Array.from(updatedPreferSet);
        setPreferences(updatedAllergenArray);
    };

    useEffect(() => {
        Axios().get('/member/account/')
        .then((res) => {
            let data = res.data;
            if (data.prefer === "" || data.prefer == null){
              let prefer = []
              setDefaultPreference(prefer);
            }
            else{
              let prefer = JSON.parse(data.prefer.replace(/'/g, '"'))
              setDefaultPreference(prefer);
            }
            
          })
          .catch((err) => {
            alert("偏好達到上限")
            console.log(err);
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
