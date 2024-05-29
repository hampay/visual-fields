/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ConfigProvider, Layout, theme } from 'antd';
import Header from './Header';
import HomePage from './HomePage';
import ResultsPage from './ResultsPage';
import TestPage from './test/TestPage';
import { UserProvider } from './UserContext';
import { TestProvider } from './test/TestContext';

const { Content, Footer } = Layout;

const App: React.FC = () => {
  return (
    <UserProvider>
      <TestProvider>
        <ConfigProvider
          theme={{algorithm: [theme.darkAlgorithm]}}
        >
          <Router>
            <Layout css={css`height: 100%;`}>
              <Header />
              <Content style={{ padding: '0 50px', marginTop: 64 }}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/test" element={<TestPage />} />
                  <Route path="/results" element={<ResultsPage />} />
                </Routes>
              </Content>
              <Footer style={{ textAlign: 'center' }}>Visual Fields Test ©2024</Footer>
            </Layout>
          </Router>
        </ConfigProvider>
      </TestProvider>
    </UserProvider>
  );
};

export default App;
