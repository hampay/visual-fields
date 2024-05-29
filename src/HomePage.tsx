import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography } from 'antd';

const { Title, Paragraph } = Typography;

const HomePage: React.FC = () => {
  return (
    <div>
      <Title>Visual Fields Test</Title>
      <Paragraph>Use this test to test your visual fields from home.</Paragraph>
      <Link to="/test"><Button type="primary">Take the Test</Button></Link>
    </div>
  );
};

export default HomePage;
