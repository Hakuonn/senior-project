import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom'; 
import Axios from '../../components/Axios';
import RecipeNav from '../../components/nav_and_footer/RecipeNav';

function RecipeFavoritePage() {
  const [favorites, setFavorites] = useState([]);
  const [recipeDetails, setRecipeDetails] = useState({}); // 存儲每個食譜的詳細資訊
  const navigate = useNavigate(); 

  useEffect(() => {
    // 獲取收藏列表
    Axios().get('/recipe/member/collection/')
      .then((res) => {
        const favoriteIds = res.data.map(recipe => recipe.recipe_rid);
        setFavorites(res.data);
        fetchRecipeDetails(favoriteIds);
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.status === 401) {
          alert("請先登入以查看收藏的食譜");
        }
      });
  }, []);

  // 獲取食譜詳細資訊
  const fetchRecipeDetails = (ids) => {
    Promise.all(ids.map(rid => 
      Axios().get('recipe/search/id/', { params: { rid } })
    ))
    .then(responses => {
      const details = {};
      responses.forEach((response, index) => {
        details[ids[index]] = response.data[0];
      });
      setRecipeDetails(details);
    })
    .catch((err) => {
      console.log(err);
    });
  };

  // 移除收藏
  const handleRemoveFavorite = (rid) => {
    Axios().delete('/recipe/member/delete/', { params: { rid: rid.toString() } })
      .then(() => {
        setFavorites(prevFavorites => {
          const updatedFavorites = prevFavorites.filter(recipe => recipe.recipe_rid !== rid);
          return updatedFavorites;
        });
        setRecipeDetails(prevDetails => {
          const updatedDetails = { ...prevDetails };
          delete updatedDetails[rid];
          return updatedDetails;
        });
        alert('已取消收藏');
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.status === 404) {
          alert("沒有該收藏紀錄");
        }
      });
  };

  return (
    <>
      <RecipeNav />
      <Container className="mt-5">
        <h1>收藏的食譜</h1>
        <Row className='my-5'>
          {favorites.length > 0 ? (
            favorites.map((recipe) => {
              const details = recipeDetails[recipe.recipe_rid];
              return (
                <Col key={recipe.recipe_rid} xs={12} md={6} lg={4} className="mb-4">
                  <Card className='d-flex flex-column h-100'>
                    <Card.Body className="d-flex flex-column">
                      <div className="flex-grow-1">
                        <Link 
                          to={`/Recipe/result/${recipe.recipe_rid}`} 
                          style={{ textDecoration: 'none', color: '#000000', fontWeight: 'bold' }}
                        >
                        <Card.Title>{details ? details.name : 'Loading...'}</Card.Title>
                        </Link>

                        <hr />
                        <Card.Text>
                          <strong>食譜介紹：</strong> {details ? details.description : 'Loading...'}
                        </Card.Text>
                      </div>
                      <hr />
                      <div>
                        <Button 
                          variant="danger"
                          onClick={() => handleRemoveFavorite(recipe.recipe_rid)}
                          className="ms-2"
                        >
                          取消收藏
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })
          ) : (
            <p>目前沒有收藏的食譜。</p>
          )}
        </Row>
      </Container>
    </>
  );
}

export default RecipeFavoritePage;
