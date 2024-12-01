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

  return (
    <Container>
      <RecipeNav />
      <RecipeSlider />
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
    </Container>
  );
};

export default RecipeIndexPage;
