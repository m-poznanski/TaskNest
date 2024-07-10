import React, {useState, useEffect, useContext} from 'react';
import {Layout, Row, Col, Card, Typography, List, Skeleton, Spin, Button} from 'antd';
import {EditOutlined} from '@ant-design/icons';
import {useParams} from 'react-router-dom';
import {UserContext} from "./UserContext";
import CustomHeader from './CustomHeader';

const TicketDetails = ({}) => {
  const [ticketData, setTicketData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const {user} = useContext(UserContext);
  const {id} = useParams();

  useEffect(() => {
    // Fetch ticket details from API based on `ticketId`
    //fetchTicketDetails(ticketId).then((data) => setTicketDetails(data));
    setTicketData({id: id});
  }, [id]);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleCancelEditClick = () => {
    setEditMode(false);
  };

  return (
    <Layout style={{ padding: '20px' }}>
        <CustomHeader/>
        <Row gutter={16} style={{paddingTop: 20}} justify={'center'}>
            <Col span={12}>
            <Card title={'Ticket' + ' ' + ticketData?.id} style={{padding: 10}}>
                
                {!ticketData ?
                    <>
                        <Skeleton/>
                        <Row justify={'center'}>
                            <Spin size='large'/>
                        </Row> 
                    </>
                :
                <Col>
                    <Row gutter={16}  style={{marginTop: '20px'}}>
                        <Col span={8}>
                            <Typography.Text strong>Name:</Typography.Text>
                            {ticketData.name}
                        </Col>
                        <Col span={8}>
                            <Typography.Text strong>Status:</Typography.Text>
                            {ticketData.status}
                        </Col>
                        <Col span={8}>
                            <Typography.Text strong>Assigned User:</Typography.Text>
                            {ticketData.user}
                        </Col>
                    </Row>
                    <Row style={{marginTop: '20px'}}>
                        <Typography.Text strong>Description:</Typography.Text>
                    </Row>
                    {ticketData.description || 'No description provided'} 
                    <Row style={{marginTop: '20px'}}>
                        {user?.type === 'admin' && (
                            <div style={{display: 'flex', justifyContent: 'flex-end' }}>
                                {editMode ? (
                                    <>
                                        <Button type="primary" danger onClick={handleCancelEditClick}>
                                        Cancel Edit
                                        </Button>
                                        <Button type="default" style={{marginLeft: 16, color:"white", backgroundColor: "#2aa31f"}} onClick={() => setEditMode(false)}>
                                        Confirm Edit
                                        </Button>
                                    </>
                                ) : (
                                    <Button type="primary" icon={<EditOutlined />} onClick={handleEditClick}>
                                    Edit Ticket
                                    </Button>
                                )}
                            </div>
                        )}
                    </Row>
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