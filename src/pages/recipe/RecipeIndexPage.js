<<<<<<< HEAD
import React from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import RecipeSlider from '../../components/recipe_C/RecipeSlider';
import RecipeNav from '../../components/nav_and_footer/RecipeNav';
import '../../css/recipe_index.css';

// 假資料
const popularRecipes = [
  {
    name: '檸檬香草烤鮭魚',
    description: '簡單的烤鮭魚食譜，搭配檸檬和香草，十分美味。',
    ingredients: ['鮭魚', '檸檬', '香草', '橄欖油', '鹽', '胡椒']
  },
  {
    name: '香煎雞胸肉',
    description: '嫩滑的香煎雞胸肉，搭配新鮮蔬菜和香料。',
    ingredients: ['雞胸肉', '橄欖油', '迷迭香', '大蒜', '鹽', '黑胡椒']
  },
  {
    name: '西班牙海鮮飯',
    description: '充滿海鮮風味的西班牙海鮮飯，色香味俱全。',
    ingredients: ['海鮮混合', '番茄', '洋蔥', '大蒜', '紅椒', '香料', '米']
  },
  {
    name: '健康水果沙拉',
    description: '新鮮水果製作的健康沙拉，口感清爽。',
    ingredients: ['蘋果', '香蕉', '橙子', '葡萄', '蜂蜜', '檸檬汁']
  },
];

const RecipeIndexPage = () => {
=======
import React, { useState, useEffect } from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import RecipeSlider from '../../components/recipe_C/RecipeSlider';
import RecipeNav from '../../components/nav_and_footer/RecipeNav';
import Axios from '../../components/Axios';
import FavoriteButton from '../../components/recipe_C/FavoriteButton';
import '../../css/recipe_index.css';

const RecipeIndexPage = () => {
  const [popularRecipes, setPopularRecipes] = useState([]);

  useEffect(() => {
    Axios().get('/recipe/search/rank/') 
      .then((res) => {
        setPopularRecipes(res.data);
      })
      .catch((err) => {
        console.error('Error fetching popular recipes:', err);
      });
  }, []);

>>>>>>> origin/main
  return (
    <Container>
      <RecipeNav />
      <RecipeSlider />
<<<<<<< HEAD
      <div className="mt-4">
        <h2 className="text-center mb-4">熱門食譜排行榜</h2>
        <Row>
          {popularRecipes.map((recipe, index) => (
              <Col xs={12} md={6} lg={3} key={index} className="mb-3 position-relative">
                <Card className="ranking-card">
                  <Card.Body>
                    <div className="ranking-number">{index + 1}</div>
                    <Card.Title>{recipe.name}</Card.Title>
                    <Card.Text>
                      {recipe.description}
                    </Card.Text>
                    <div className="ingredients">
                      <h6>食材:</h6>
                      <ul>
                        {recipe.ingredients.map((ingredient, idx) => (
                          <li key={idx}>{ingredient}</li>
                        ))}
                      </ul>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
          ))}
        </Row>
      </div>
=======
      <div className="mt-5">
        <h2 className="text-center mb-4">熱門食譜排行榜</h2>
        <Row className="g-4 mb-5">
          {popularRecipes.map((recipe, index) => (
            <Col xs={12} md={6} lg={3} key={index}>
                <Card className="ranking-card d-flex flex-column h-100">
                  <Card.Body className="d-flex flex-column">
                    <div className="ranking-number">{index + 1}</div>
                    <div className="d-flex justify-content-between align-items-center">
                    <Link 
                      to={`/Recipe/result/${recipe.rid}`} 
                      style={{ textDecoration: 'none', color: '#000000', fontWeight: 'bold' }}
                    >
                      <Card.Title>{recipe.name}</Card.Title>
                    </Link>
                    <FavoriteButton rid={recipe.rid} />
                    </div>
                    <hr />
                    <Card.Text>{recipe.description}</Card.Text>
                    <div className="mt-auto">
                  </div>
                  </Card.Body>
                </Card>
            </Col>
          ))}
        </Row>
      </div>              
>>>>>>> origin/main
    </Container>
  );
};

export default RecipeIndexPage;
