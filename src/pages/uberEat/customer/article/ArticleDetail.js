import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const ArticleDetail = ({ title, content, date }) => {
  return (
    <Container className="my-5">
      <Row>
        <Col>
          <Card className="shadow-sm">
            <Card.Body>
              <h1 className="text-primary">{title}</h1>
              <p className="text-muted">發布日期：{date}</p>
              <hr />
              <p style={{ lineHeight: '1.8' }}>{content}</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

const App = () => {
  const articleData = {
    title: '如何正確保持良好的睡眠習慣',
    date: '2024-11-28',
    content: `
      良好的睡眠習慣對於維持身體健康至關重要。以下幾點建議可幫助改善睡眠品質：
      
      1. **固定作息時間**：每天保持固定的睡覺和起床時間，能幫助身體建立穩定的生物鐘。
      2. **避免咖啡因攝取過量**：下午和晚上盡量減少咖啡、茶等含咖啡因飲品的攝取。
      3. **創造舒適的睡眠環境**：保持臥室安靜、陰暗、涼爽，並選擇舒適的床墊和枕頭。
      4. **減少使用電子產品**：睡前一小時避免使用手機、平板等會發出藍光的設備。
      5. **進行放鬆活動**：例如冥想、深呼吸或閱讀書籍，有助於降低壓力，幫助入眠。

      睡眠不僅能恢復體力，還能促進免疫系統健康、改善情緒穩定及提升專注力。培養健康的睡眠習慣是每個人都應該重視的生活目標。
    `,
  };

  return (
    <div>
      <ArticleDetail 
        title={articleData.title} 
        content={articleData.content} 
        date={articleData.date} 
      />
    </div>
  );
};

export default App;
