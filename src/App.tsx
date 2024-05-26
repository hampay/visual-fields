/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';
import Header from './Header';
import HomePage from './HomePage';
import ResultsPage from './ResultsPage';
import TestPage from './TestPage';
import { UserProvider } from './UserContext';

const { Content, Footer } = Layout;

const App: React.FC = () => {
  return (
    <UserProvider>
      <Router>
        <Layout css={css`height: 100%;`}>
          <Header />
          <Content style={{ padding: '0 50px', marginTop: 64 }}>
            {/* <div style={{ background: '#fff', padding: 24, minHeight: 'calc(100vh - 114px)' }}> */}
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/test" element={<TestPage />} />
                <Route path="/results" element={<ResultsPage />} />
              </Routes>
            {/* </div> */}
          </Content>
          <Footer style={{ textAlign: 'center' }}>Visual Fields Test ©2024</Footer>
        </Layout>
      </Router>
    </UserProvider>
  );
};

export default App;
