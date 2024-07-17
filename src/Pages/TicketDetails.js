import React, {useState, useEffect, useContext} from 'react';
import {Layout, Row, Col, Card, Typography, Skeleton, Spin, Button, Form, Input, Timeline, Select} from 'antd';
import {EditOutlined, DeleteOutlined, CheckOutlined, CloseOutlined} from '@ant-design/icons';
import {useParams, useNavigate, Link} from 'react-router-dom';
import {UserContext} from "../Contexts/UserContext";
import CustomHeader from '../Components/CustomHeader';
import Paragraph from 'antd/es/typography/Paragraph';
import axios from 'axios';
import { ApiURL } from '../ApiConfig';

const TicketDetails = () => {
  const [ticketData, setTicketData] = useState(null);
  const [tempData, setTempData] = useState(null);
  const [ticketChanges, setTicketChanges] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [users, setUsers] = useState([]);
  const {user} = useContext(UserContext);
  const {id} = useParams();
  const navigate = useNavigate();

    // Fetching ticket details from API
  useEffect(() => {
    fetchTicketData(id).then((data) => setTicketData(data));
    fetchTicketChanges(id).then((data) => setTicketChanges(data));
  }, [id]);

  const fetchTicketData = async () => {
    try {
      const url = ApiURL + 'tickets/' + id;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching ticket data:', error);
    //   throw error;
    }
  };

  const fetchTicketChanges = async () => {
    try {
      const url = ApiURL + 'changes/' + id;
      const response = await axios.get(url);
      const tempChanges = [];
      response.data.forEach(element => {
        let tempDate = new Date(element.date);
        tempChanges.push({
            children:
            <div hoverable style={{ width: '100%'}}>
                <b>Date of change:</b> {tempDate.toLocaleString()} <br />
                <b>Previous name:</b> {element.prevName} <br />
                <b>Previous status:</b> {element.prevStatus} <br />
                <b>Previous assigned user:</b> {element.prevUserName} <br />
                <b>Previous description:</b> {element.prevDescription}
            </div>
        })
      })
      return tempChanges;
    } catch (error) {
      console.error('Error fetching ticket changes:', error);
    //   throw error;
    }
  };

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

  const deleteTicket = async () => {
    try {
      const url = ApiURL + 'ticket/';
      const response = await axios.delete(url + ticketData.id);
      navigate('/');
      return response.data;
    } catch (error) {
      console.error('Error deleting ticket:', error);
      alert("Error deleting ticket!");
      // throw error;
    }
  };

  const updateTicket = async () => {
    try {
      const url = ApiURL + 'ticket/';
      const response = await axios.put(url + ticketData.id, ticketData);
      //navigate('/');
      fetchTicketChanges(id).then((data) => setTicketChanges(data));
      return response.data;
    } catch (error) {
      console.error('Error updating ticket:', error);
      alert("Error updating ticket!");
      //throw error;
    }
  };

  const handleEditClick = () => {
    fetchUsers().then((data) => setUsers(data));
    setTempData(ticketData);
    setEditMode(true);
  };

  const handleCancelEditClick = () => {
    setTicketData(tempData);
    setEditMode(false);
  };

  const handleConfirmEditClick = () => {
    setEditMode(false);
    updateTicket().then((data) => console.log("Updated ticket: ", data));
  };

  const handleDeleteClick = () => {
    setEditMode(false);
    deleteTicket().then((data) => console.log("Deleted ticket: ", data));
  };

  const handleChange = (event) => {
    setTicketData({ ...ticketData, [event.target.name]: event.target.value });
  };

  const handleUserChange = (event) => {
    setTicketData({ ...ticketData, user: event });
  };

  const handleStatusChange = (event) => {
    setTicketData({ ...ticketData, status: event });
  };

  return (
    <Layout style={{ padding: '20px' }}>
        <CustomHeader/>
        <Row gutter={16} style={{paddingTop: 20}} justify={'center'}>
            <Col span={12}>
            <Card
                title={
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <p>Ticket details
                            {/* {ticketData?.id} */}
                        </p>
                        {editMode ?
                            <Button type="default" style={{color: 'red', fontWeight: 'bold'}} icon={<DeleteOutlined />} onClick={handleDeleteClick}>
                                Delete Ticket
                            </Button>
                        :
                            <Link to={'/'} style={{color: '#356c91'}}>
                                <u>Return to list</u>
                            </Link>
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
                    {/* Editing form */}
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
                                    {/* <Input name="status" value={ticketData.status} onChange={handleChange}/> */}
                                    <Select 
                                        value={ticketData.status}
                                        onChange={handleStatusChange} 
                                        options={[{value: 'new', label: "New"}, {value: 'finished', label: "Finished"}, {value: 'in_progress', label: "In Progress"}]}
                                        placeholder="Select new status"
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="Assigned User:" style={{fontWeight: "600"}}>
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
                        </>
                        // Standard details display
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
                                {ticketData.userName}
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
                            user &&
                                <Button type="primary" icon={<EditOutlined />} onClick={handleEditClick}>
                                Edit Ticket
                                </Button>
                        )}
                    </Row>
                    <Row style={{marginTop: '20px', marginBottom: '20px'}}>
                        <Typography.Text strong>Changes:</Typography.Text>
                    </Row>
                    {ticketChanges.length ?
                      <Timeline
                          items={ticketChanges}
                          reverse={true}
                      />
                      :
                      <p>No changes history</p>
                    }
                </Col>
                }     
            </Card>
            </Col>
        </Row>
        </Layout>
  );
};

export default TicketDetails;