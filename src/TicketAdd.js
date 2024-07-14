import React, {useState, useEffect, useContext, Children} from 'react';
import {Layout, Row, Col, Card, Typography, List, Skeleton, Spin, Button, Form, Input, Select, Timeline} from 'antd';
import {EditOutlined, DeleteOutlined, CheckOutlined, CloseOutlined} from '@ant-design/icons';
import {useParams, useNavigate} from 'react-router-dom';
import {UserContext} from "./UserContext";
import CustomHeader from './CustomHeader';
import Paragraph from 'antd/es/typography/Paragraph';
import axios from 'axios';
import { ApiURL } from './ApiConfig';

const TicketAdd = ({}) => {
  const [ticketData, setTicketData] = useState({id: '', name: "", status: "new", user: '', description: ""});
  const [users, setUsers] = useState([]);
  const {user} = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers().then((data) => setUsers(data));
  }, [])

  const fetchUsers = async () => {
    try {
      const url = ApiURL + 'users';
      const response = await axios.get(url);
      const tempUsers = [];
      response.data.forEach(element => {
        tempUsers.push({value: element.id, label: element.name})
      });
      return tempUsers;
    } catch (error) {
      console.error('Error fetching users:', error);
      // throw error;
    }
  };

  const handleCancelClick = () => {
    setTicketData(null);
    navigate('/');
  };

  const handleConfirmClick = () => {
    //post ticketData to api
  };

  const handleChange = (event) => {
    setTicketData({ ...ticketData,  [event.target.name]: event.target.value });
  };

  const handleUserChange = (event) => {
    setTicketData({ ...ticketData, user: event });
  };

  return (
    <Layout style={{ padding: '20px' }}>
        <CustomHeader/>
        <Row gutter={16} style={{paddingTop: 20}} justify={'center'}>
            <Col span={12}>
            <Card
                title={
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <p>New ticket</p>
                    </div>
                }
                style={{padding: 10}}
            >
                <Col>
                        <Form size='small'>
                        <Row gutter={16}  style={{marginTop: '20px'}}>
                            <Col span={8}>
                                <Form.Item label="Name:" style={{fontWeight: "600"}}>
                                    <Input name="name" value={ticketData.name} onChange={handleChange}/>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="Status:" style={{fontWeight: "600"}}>
                                    <Input name="status" disabled={true} value={ticketData.status} onChange={handleChange}/>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="Assigned User:" style={{fontWeight: "600"}}>
                                    {/* <Input name="user" value={ticketData.user} onChange={handleChange}/> */}
                                    <Select 
                                        value={ticketData.user}
                                        defaultValue={user.id}
                                        onChange={handleUserChange} 
                                        options={users}
                                        placeholder="Select user"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row style={{marginBottom: "72px"}}>
                            <Col span={24}>
                                <Form.Item label="Description:" style={{fontWeight: "600"}} layout='vertical'>
                                    <Input.TextArea name="description" value={ticketData.description} onChange={handleChange} />
                                </Form.Item>
                            </Col>
                        </Row>
                        </Form>
                    <Row style={{marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
                        <>
                            <Button type="primary" icon={<CloseOutlined/>} style={{marginLeft: 16, color:"white", backgroundColor: "red"}} onClick={handleCancelClick}>
                            Cancel Edit
                            </Button>
                            <Button type="default" icon={<CheckOutlined/>} style={{marginLeft: 16, color:"white", backgroundColor: "#2aa31f"}} onClick={handleConfirmClick}>
                            Add ticket
                            </Button>
                        </>
                    </Row>
                </Col>     
            </Card>
            </Col>
        </Row>
        </Layout>
  );
};

export default TicketAdd;