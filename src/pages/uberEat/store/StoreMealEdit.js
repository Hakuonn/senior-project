import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Row, Col, Image } from 'react-bootstrap';
import Axios from '../../../components/Axios';

/*** 
 * 商家編輯餐點的彈出視窗 img要修改
 ***/
function StoreMealEdit(props) {
    const [name, setName] = useState(null);
    const [gid, setGid] = useState(null);
    const [price, setPrice] = useState(null);
    const [ingredient, setIngredient] = useState(null);
    const [type, setType] = useState(null);
    const [pic, setPic] = useState(null);
    const [intro, setIntro] = useState(null);
    const [quantity, setQuantity] = useState(0);

    const quantityHandler = (type) =>{
        if(type === 'plus'){
            setQuantity((quantity) => quantity + 1);
        }else{
            setQuantity((quantity) => quantity - 1);
        }
    }

    const submitHandler = () =>{
        Axios().post('/store_data/goods/change/', JSON.stringify({
            gid: gid,
            name: name,
            type: type,
            quantity: quantity,
            food_pic: pic,
            price: price,
            ingredient: ingredient,
        }))
        .then((res) => {
            console.log(res);
            props.onSave();
        })
        .catch((err) => {
            console.log('failure');
        });
    }

    useEffect(()=>{
        if(props.data){
            let data = props.data;
            setGid(data.gid);
            setName(data.name);
            setPrice(data.price);
            setIngredient(data.ingredient);
            setType(data.type);
            setPic(data.food_pic);
            setIntro(data.intro);
            setQuantity(parseInt(data.quantity));            
        }
    },[props.data]);

    return (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
            <Form>
                <Modal.Header closeButton />
                <Modal.Body>
                    <Row>
                        <Col>
                            <Image src={`${pic}`} alt={pic} className='store-meal-edit-card-img'/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div>
                                <h2>{name}</h2>
                            </div>
                            <Form>
                                <Form.Group>
                                    <br />
                                    <Form.Label><h5>產品數量</h5></Form.Label>
                                    <div>
                                        {quantity === 0 ? <Button onClick={() => quantityHandler('minus')} disabled>-</Button> : <Button onClick={() => quantityHandler('minus')}>-</Button>}
                                        <Form.Label className='quantity' name='quantityLabel'>{quantity}</Form.Label>
                                        <Button onClick={() => quantityHandler('plus')}>+</Button>
                                    </div>
                                </Form.Group>
                                <Form.Group>
                                    <br />
                                    <Form.Label><h5>類型</h5></Form.Label>
                                    <Form.Select
                                    name='type'
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                    >
                                        <option value="">選擇產品類型</option>
                                        <option value="速食">速食</option>
                                        <option value="日式">日式</option>
                                        <option value="美式">美式</option>
                                        <option value="中式">中式</option>
                                        <option value="台式">台式</option>
                                        <option value="素食">素食</option>
                                        <option value="手搖飲">手搖飲</option>
                                        <option value="炸物">炸物</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group>
                                    <br />
                                    <Form.Label><h5>價格</h5></Form.Label>
                                    <Form.Control placeholder='填寫價格' value={price} onChange={(e) => setPrice(e.target.value)}/>
                                </Form.Group>
                                <Form.Group>
                                    <br />
                                    <Form.Label><h5>原料</h5></Form.Label>
                                    <Form.Control placeholder='填寫食品原料' value={ingredient} onChange={(e) => setIngredient(e.target.value)}/>
                                </Form.Group>
                                <Form.Group>
                                    <br />
                                    <Form.Label><h5>產品簡介</h5></Form.Label>
                                    <Form.Control as="textarea" placeholder='填寫產品簡介' value={intro} onChange={(e) => setIntro(e.target.value)}/>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button type='button' onClick={() => submitHandler()}>儲存</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default StoreMealEdit;
