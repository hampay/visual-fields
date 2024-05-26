import React from 'react';
import { Typography } from 'antd';
import { useUserContext } from './UserContext';

const { Title, Paragraph } = Typography;

const ResultsPage: React.FC = () => {
  const userContext = useUserContext()

  return (
    <div>
      <Title>Test Results</Title>
      <Paragraph>View your test results here:</Paragraph>
      <pre>{JSON.stringify(userContext?.testResults, null, 2)}</pre>
    </div>
  );
};

export default ResultsPage;
