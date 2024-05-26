import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';

const { Header: AntHeader } = Layout;

const Header: React.FC = () => {
    const location = useLocation()
    return (
        <AntHeader>
            <Menu theme="dark" mode="horizontal" selectedKeys={[location.pathname]}>
                <Menu.Item key="/"><Link to="/">Home</Link></Menu.Item>
                <Menu.Item key="/test"><Link to="/test">Test</Link></Menu.Item>
                <Menu.Item key="/results"><Link to="/results">Results</Link></Menu.Item>
            </Menu>
        </AntHeader>
    );
};

export default Header;
