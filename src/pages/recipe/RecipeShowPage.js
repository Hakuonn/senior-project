import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { Row, Col, Card, Container, Button } from 'react-bootstrap';
import { BsStar, BsStarFill } from 'react-icons/bs';
import Axios from '../../components/Axios';
import RecipeNav from '../../components/nav_and_footer/RecipeNav';

const RecipePage = () => {
  const [data, setData] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const { rid } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
      Axios().get('recipe/search/id/', { params: { rid } })
      .then((res) => {
        let recipe = res.data[0];

        const modifiedRecipe = { 
          ...recipe, 
          nutrition: recipe.attributes.nutrition,
          ingredients: JSON.parse(recipe.ingredients.replace(/'/g, '"')), 
          steps: JSON.parse(recipe.steps.replace(/'/g, '"')), 
        };
        setData(modifiedRecipe);

      })
      .catch((err) => {
          console.log(err);
          if (err.response && err.response.status === 404) {
            alert("This recipe is not found");
          }
      });
  }, [rid]);


  // 食譜收藏功能，尚未測試
  const handleFavoriteClick = () => {
    if (isFavorite) {
      // 執行取消收藏操作
      Axios().delete('recipe/member/delete/', { data: { rid } })
        .then(() => {
          setIsFavorite(false);
          alert('已取消收藏');
        })
        .catch((err) => {
          console.log(err);
          if (err.response && err.response.status === 404) {
            alert("沒有該收藏紀錄");
          }
        });
    } else {
      // 執行新增收藏操作
      Axios().post('recipe/member/new/', { rid })
        .then(() => {
          setIsFavorite(true);
          alert('成功收藏');
        })
        .catch((err) => {
          console.log(err);
          if (err.response && err.response.status === 404) {
            alert("食譜沒找到呢");
          } else if (err.response && err.response.status === 400) {
            alert("使用者未知");
          }
        });
    }
  };

  return (
    <>
    <RecipeNav/>
    <Container className='recipepage-container mt-5'>
      <Button variant="secondary" onClick={() => navigate(-1)} className="mb-3">
        回上頁
      </Button>
      {data && (
        <Row>
          <Col>
            <Card className="mb-4" style={{ borderRadius: '10px', padding: '20px' }}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <Card.Title>{data.name}</Card.Title>
                  <Button 
                    variant="link" 
                    onClick={handleFavoriteClick}
                    style={{ color: isFavorite ? 'gold' : 'gray' }}
                  >
                    {isFavorite ? <BsStarFill size={24}/> : <BsStar size={24}/>}
                  </Button>
                </div>
                <Card.Text>{data.description}</Card.Text>
                <hr />
                <Row>
                  <Col xs={12} md={6}>
                    <Card.Subtitle className="mb-2">準備材料</Card.Subtitle>
                    <ul>
                      {data.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                      ))}
                    </ul>
                  </Col>
                  <Col xs={12} md={6}>
                    <Card.Subtitle className="mb-2">營養資訊</Card.Subtitle>
                    <ul>
                    {Object.entries(data.nutrition).map(([key, value], index) => {
                        let label, unit;
                        switch (key) {
                          case 'calories':
                            label = "卡路里"; unit = "卡"; break;
                          case 'carbohydrates':
                            label = "碳水化合物"; unit = "克"; break;
                          case 'fat':
                            label = "總脂肪"; unit = "克"; break;
                          case 'protein':
                            label = "蛋白質"; unit = "克"; break;
                          case 'saturated_fat':
                            label = "飽和脂肪"; unit = "克"; break;
                          case 'sodium':
                            label = "鈉"; unit = "毫克"; break;
                          case 'sugar':
                            label = "糖"; unit = "克"; break;
                          default:
                            label = key; unit = "";
                        }
                        return <li key={index}>{label}: {value}{unit}</li>;
                      })}
                    </ul>
                    <p>PDV：每種營養成分相對於每日建議攝取量的百分比</p>
                  </Col>
                </Row>
                <div>
                  <Card.Subtitle className="mb-2">步驟</Card.Subtitle>
                  <ol>
                    {data.steps.map((step, index) => (
                      <div key={index}>
                        <li>{step.trim()}</li>
                        {index !== data.steps.length - 1 && <hr />}
                      </div>
                    ))}
                  </ol>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
    </>
  );
};

export default RecipePage;
