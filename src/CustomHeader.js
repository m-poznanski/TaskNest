import React, {useContext} from 'react';
import { Layout, Row, Col, Button } from 'antd'; // Import Ant Design components for header
import {useNavigate, Link} from 'react-router-dom';
import {UserContext} from "./UserContext";

const CustomHeader = () => {
    const {user, logout} = useContext(UserContext);
    const navigate = useNavigate();

    return (
        <Layout.Header style={{ backgroundColor: '#fff', padding: '0 20px' }}>
            <Row gutter={16} justify="space-between">
                <Col>
                    <h1 style={{color: '#356c91', margin: 0}}>Task Nest</h1> {/* Replace with your logo if needed */}
                </Col>
                <Row gutter={16}>
                    <Col style={{fontWeight: 'bold', color: '#356c91'}}>
                    {user ? "Hello, " + user.username + "!" : "You're browsing as guest!"}
                    </Col>
                    <Col>
                    {user ?
                        <Button type="primary" onClick={logout}>Log out</Button>
                    : 
                        <Button type="primary" onClick={() => navigate('/login')}>Log in</Button>
                    }
                    </Col> 
                </Row>
            </Row>
        </Layout.Header>
    );
};

export default CustomHeader;