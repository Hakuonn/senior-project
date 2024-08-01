import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function dealIngrdientValue(Text){
  let text = JSON.parse(Text.replace(/'/g, '"')); 
  let str = "";
  for (let i = 0; i < text.length; i++) {
    if (i === (text.length - 1)) {
      str += text[i];
    } else {
      str += text[i] + "、";
    }
  }
  return str;
}

function SearchResult({ searchResults }) {
  return (
    <Container className="search-results-container mt-3">
      
      <Row>
        {searchResults.map((item, index) => (
          <Col xs={12} className="mb-4" key={index}>
            <Card className="h-100">
              <Card.Body>
              <Card.Title>
                <Link 
                  to={`/Recipe/result/${item.rid}`} 
                  style={{ textDecoration: 'none', color: '#000000', fontWeight: 'bold' }}
                >
                  {item.name}
                </Link>
              </Card.Title>
                <Card.Text>
                  <strong>食譜介紹：</strong><br />
                  {item.description}
                </Card.Text>
                <Card.Text>
                  <strong>有幾個步驟：</strong> {item.attributes.n_steps}
                </Card.Text>
                <Card.Text>
                  <strong>食材的挑選：</strong><br />
                  {dealIngrdientValue(item.ingredients)}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default SearchResult;
