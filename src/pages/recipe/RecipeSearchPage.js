import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Container, Spinner } from 'react-bootstrap'; // Import Spinner
import Axios from '../../components/Axios';
import TagSelector from '../../components/recipe_C/TagSelector';
import SearchResult from '../../components/recipe_C/SearchResult';
import RecipeNav from '../../components/nav_and_footer/RecipeNav';
import '../../css/recipe_search.css'

function RecipeSearchPage() {
  const [inputValue, setInputValue] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false); 

  const handleInputChange = e => {
    setInputValue(e.target.value);
  };

  const handleTagChange = (tag, checked) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter(t => t !== tag);
    setSelectedTags(nextSelectedTags);
  };

  const handleSearch = async () => {
    const searchData = {
      sentence: inputValue,
      user_query: selectedTags
    };
    console.log('Search Data:', searchData);

    setIsLoading(true); 

    try {
      const response = await Axios().post('Recipe/get/', searchData);
      console.log('GET request successful:', response.data);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error making GET request:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await Axios().get('Recipe/get/');
        console.log('GET request successful:', response.data);
        setSearchResults(response.data);
      } catch (error) {
        console.error('Error making GET request:', error);
      } finally {
        setIsLoading(false); 
      }
    };

    fetchData();
  }, []);

  const timeTags = ['15分鐘或更少', '30分鐘或更少', '60分鐘或更少', '60分鐘以上'];
  const cuisineTags = ['日式', '中式', '韓式', '西班牙', '義式', '德式', '墨西哥'];
  const healthTags = ['不含酒精', '低卡路里', '低蛋白', '高蛋白', '無麩質', '低鈉', '低膽固醇'];
  const hotSearches = [
    "有哪些以扁豆和菠菜為特色的菜餚？",
    "您能推薦以菠菜和茄子為主要成分的餐點嗎？",
    "您能建議一個以豆腐、花椰菜和甜椒為主要材料的素食食譜，並且能在25分鐘或更短的時間內烹飪完成嗎？",
    "我該如何做一份美味的時令水果沙拉？",
    "準備帶有檸檬和香草的烤鮭魚有什麼簡單的方法？",
    "一些健康的午餐三明治餡料有哪些？"
  ];

  return (
    <>
      <RecipeNav />
      <Container className="searchpage-container">
        <div className="search-content">
          <Form.Group controlId="searchInput" className="mb-3">
            <Form.Control
              type="text"
              placeholder="輸入你想吃的類型或是食物名稱"
              size="lg"
              value={inputValue}
              onChange={handleInputChange}
            />
          </Form.Group>
          <div className="slogan">
            <p>選擇您想要的種類，讓我們幫你挑選您可能喜愛的料理~</p>
          </div>
          <div className="hot-searches">
            {hotSearches.map((search, index) => (
              <div key={index}>
                {index + 1}.{' '}
                <span onClick={() => setInputValue(search)}>{search}</span>
              </div>
            ))}
          </div>
          <hr />
          <Row className="conditions">
            <Col xs={12} md={4}>
              <p className="tagName">製作時間</p>
              <TagSelector tags={timeTags} selectedTags={selectedTags} handleTagChange={handleTagChange} />
            </Col>
            <Col xs={12} md={4}>
              <p className="tagName">各國料理</p>
              <TagSelector tags={cuisineTags} selectedTags={selectedTags} handleTagChange={handleTagChange} />
            </Col>
            <Col xs={12} md={4}>
              <p className="tagName">健康選擇</p>
              <TagSelector tags={healthTags} selectedTags={selectedTags} handleTagChange={handleTagChange} />
            </Col>
          </Row>
          <div className="search-button text-center mt-3">
            <Button variant="primary" size="lg" onClick={handleSearch}>
              搜索
            </Button>
          </div>
          {isLoading ? (
            <div className="text-center mt-3">
              <Spinner animation="border" />
              <p>正在搜尋食譜，請稍候...</p>
            </div>
          ) : (
            <SearchResult searchResults={searchResults} />
          )}
        </div>
      </Container>
    </>
  );
}

export default RecipeSearchPage;
