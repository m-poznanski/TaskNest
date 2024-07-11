import React, {useState, useEffect, useContext} from 'react';
import {Layout, Row, Col, Card, Typography, List, Skeleton, Spin, Button, Form, Input} from 'antd';
import {EditOutlined, DeleteOutlined, CheckOutlined, CloseOutlined} from '@ant-design/icons';
import {useParams, useNavigate} from 'react-router-dom';
import {UserContext} from "./UserContext";
import CustomHeader from './CustomHeader';
import Paragraph from 'antd/es/typography/Paragraph';

const TicketDetails = ({}) => {
  const [ticketData, setTicketData] = useState(null);
  const [tempData, setTempData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const {user} = useContext(UserContext);
  const {id} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch ticket details from API based on `ticketId`
    //fetchTicketDetails(ticketId).then((data) => setTicketDetails(data));
    setTicketData({id: id});
  }, [id]);

  const handleEditClick = () => {
    setTempData(ticketData);
    setEditMode(true);
  };

  const handleCancelEditClick = () => {
    setTicketData(tempData);
    setEditMode(false);
  };

  const handleConfirmEditClick = () => {
    //put ticketData to api
    setEditMode(false);
  };

  const handleDeleteClick = () => {
    //delete to api
    setEditMode(false);
    navigate("/");
  };

  const handleChange = (event) => {
    setTicketData({ ...ticketData, [event.target.name]: event.target.value });
  };

  return (
    <Layout style={{ padding: '20px' }}>
        <CustomHeader/>
        <Row gutter={16} style={{paddingTop: 20}} justify={'center'}>
            <Col span={12}>
            <Card
                title={
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <p>Ticket id:{ticketData?.id}</p>
                        {editMode ?
                            <Button type="default" style={{color: 'red', fontWeight: 'bold'}} icon={<DeleteOutlined />} onClick={handleDeleteClick}>
                                Delete Ticket
                            </Button>
                        :
                            <></>
                        }
                    </div>
                }
                style={{padding: 10}}
            >
                {!ticketData ?
                    <>
                        <Skeleton/>
                        <Row justify={'center'}>
                            <Spin size='large'/>
                        </Row> 
                    </>
                :
                <Col>
                    {editMode ?
                        <>
                        <Form size='small'>
                        <Row gutter={16}  style={{marginTop: '20px'}}>
                            <Col span={8}>
                                <Form.Item label="Name:" style={{fontWeight: "600"}}>
                                    <Input name="name" value={ticketData.name} onChange={handleChange}/>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="Status:" style={{fontWeight: "600"}}>
                                    <Input name="status" value={ticketData.status} onChange={handleChange}/>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="Assigned User:" style={{fontWeight: "600"}}>
                                    <Input name="user" value={ticketData.user} onChange={handleChange}/>
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
                        </>
                    :
                        <>
                        <Row gutter={16}  style={{marginTop: '20px'}}>
                            <Col span={8}>
                                <Typography.Text strong>Name: </Typography.Text>
                                {ticketData.name}
                            </Col>
                            <Col span={8}>
                                <Typography.Text strong>Status: </Typography.Text>
                                {ticketData.status}
                            </Col>
                            <Col span={8}>
                                <Typography.Text strong>Assigned User: </Typography.Text>
                                {ticketData.user}
                            </Col>
                        </Row>
                        <Row style={{marginTop: '20px'}}>
                            <Typography.Text strong>Description: </Typography.Text>
                        </Row>
                        <Paragraph>
                            {ticketData.description || 'No description provided'} 
                        </Paragraph>
                        </>
                    }
                    {(user?.type === 'admin' || user?.id === ticketData.user) && (
                        <Row style={{marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
                            {editMode ? (
                                <>
                                    <Button type="primary" icon={<CloseOutlined/>} style={{marginLeft: 16, color:"white", backgroundColor: "red"}} onClick={handleCancelEditClick}>
                                    Cancel Edit
                                    </Button>
                                    <Button type="default" icon={<CheckOutlined/>} style={{marginLeft: 16, color:"white", backgroundColor: "#2aa31f"}} onClick={handleConfirmEditClick}>
                                    Confirm Edit
                                    </Button>
                                </>
                            ) : (
                                <Button type="primary" icon={<EditOutlined />} onClick={handleEditClick}>
                                Edit Ticket
                                </Button>
                            )}
                        </Row>
                    )}
                    <Row style={{marginTop: '20px'}}>
                        <Typography.Text strong>Changes:</Typography.Text>
                    </Row>
                    {"List of Changes"}  
                </Col>
                }     
            </Card>
            </Col>
        </Row>
        </Layout>
  );
};

export default TicketDetails;