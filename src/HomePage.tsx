import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography } from 'antd';

const { Title, Paragraph } = Typography;

const HomePage: React.FC = () => {
  return (
    <div>
      <Title>Welcome to the Visual Fields Test</Title>
      <Paragraph>Please follow the instructions to complete the test.</Paragraph>
      <Link to="/test"><Button type="primary">Start Test</Button></Link>
    </div>
  );
};

export default HomePage;
