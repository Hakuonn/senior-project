import React from 'react';
import { Container, Form, Row, Col, Card } from 'react-bootstrap';

const KnowledgeSection = () => {
  const articles = [
    {
      title: '如何正確保持良好的睡眠習慣',
      description: '了解睡眠的重要性及幾個簡單的步驟，幫助改善睡眠品質。',
      date: '2024-11-28',
    },
    {
      title: '每日飲水量的重要性',
      description: '探討人體需要的水分補充量以及喝水的最佳時機。',
      date: '2024-11-27',
    },
    {
      title: '運動與心理健康的關聯',
      description: '分析運動如何幫助減壓及提升心理健康。',
      date: '2024-11-26',
    },
  ];

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">健康知識專區</h1>
      <Form className="mb-4">
        <Form.Control type="text" placeholder="搜尋健康文章..." />
      </Form>
      <div className="article-list">
        {articles.map((article, index) => (
          <Card key={index} className="mb-3 shadow-sm">
            <Card.Body>
              <Row>
                <Col md={8}>
                  <h5>{article.title}</h5>
                  <p className="text-muted">{article.description}</p>
                </Col>
                <Col md={4} className="text-md-end text-sm-start">
                  <p className="text-secondary">發布日期：{article.date}</p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ))}
      </div>
      <style>
        {`
          .article-list .card {
            border-left: 4px solid #0d6efd;
            border-radius: 0;
          }
          .article-list h5 {
            color: #0d6efd;
          }
          .article-list .card-body {
            background-color: #f8f9fa;
          }
        `}
      </style>
    </Container>
  );
};

export default KnowledgeSection;
