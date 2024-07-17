import React, {useContext} from 'react';
import { Layout, Row, Col, Button } from 'antd';
import {useNavigate, Link} from 'react-router-dom';
import {UserContext} from "../Contexts/UserContext";
import {LoginOutlined, LogoutOutlined} from '@ant-design/icons';

const CustomHeader = () => {
    const {user, logout} = useContext(UserContext);
    const navigate = useNavigate();

    return (
        <Layout.Header style={{ backgroundColor: '#fff', padding: '0 20px' }}>
            <Row gutter={16} justify="space-between">
                <Col>
                    <Link to={'/'}>
                        <h1 style={{color: '#356c91', margin: 0}} >Task Nest</h1>
                    </Link>
                </Col>
                <Row gutter={16}>
                    <Col style={{fontWeight: 'bold', color: '#356c91'}}>
                    {user ? "Hello, " + user.name + "!" : "You're browsing as guest!"}
                    </Col>
                    <Col>
                    {user ?
                        <Button type="default" style={{color: '#356c91', fontWeight: 'bold'}} icon={<LogoutOutlined/>} onClick={logout}>Log out</Button>
                    : 
                        <Button type="default" style={{color: '#356c91', fontWeight: 'bold'}} icon={<LoginOutlined/>} onClick={() => navigate('/login')}>Log in</Button>
                    }
                    </Col> 
                </Row>
            </Row>
        </Layout.Header>
    );
};

export default CustomHeader;