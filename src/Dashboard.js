import React, { useState, useEffect, useContext } from 'react';
import { Layout, Row, Col, Input, Select, Button, List, Card } from 'antd';
import {useNavigate, Link} from 'react-router-dom';
import {FilterOutlined, ScheduleOutlined, TeamOutlined} from '@ant-design/icons';
import {UserContext} from "./UserContext";
import CustomHeader from './CustomHeader';
import TicketListItem from './TicketListItem';
import axios from 'axios';
import { ApiURL } from './ApiConfig';
import './Dashboard.css';
// import { Table, Input, Select, Button } from 'antd';

const sampleTickets = [
  {id: 1, name: "testowaNazwa", status: "finished", user: 45, description: "przykladowy opis"},
  {id: 2, name: "innaNazwa", status: "finished", user: 11, description: "p2222222222222222222222222222222222222222222rzykladowy inny 1234 opis"},
  {id: 3, name: "testowaNazwa", status: "w toku", user: 45, description: "przykladowy opis"},
  {id: 4, name: "innaNazwa", status: "new", user: 11, description: ""},
  {id: 5, name: "testowaNazwa", status: "w toku", user: 45, description: "przykladowy opis"},
  {id: 6, name: "innaNazwa", status: "zakonczone", user: 11, description: "przykladowy inny 1234 opisprzykladowy inny 1234 opisprzykladowy inny 1234 opis"},
  {id: 7, name: "testowaNazwa", status: "new", user: 45, description: "przykladowy opis"},
  {id: 8, name: "innaNazwa", status: "zakonczone", user: 11, description: "przykladowy inny 1234 opis"},
  {id: 9, name: "testowaNazwa", status: "in_progress", user: 45, description: "przykladowy opis"},
  {id: 10, name: "innaNazwa", status: "zakonczone", user: 11, description: "przykladowy inny 1234 opis"}
];

const sampleUsers = [
  {value: 11, label: "ddfdf"},
  {value: 45, label: "123"},
]


const Dashboard = () => {
  const [ticketsPerRow, setTicketsPerRow] = useState(3);
  const [tickets, setTickets] = useState([]); // State for ticket data
  const [filterUsers, setFilterUsers] = useState([]); // State for filter
  const [users, setUsers] = useState([]);
  const [filterStatuses, setFilterStatuses] = useState([]);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState(null); // State for sort order
  const {user, logout} = useContext(UserContext);
  const navigate = useNavigate();

  // Fetch tickets and users data from API
  useEffect(() => {
    fetchTickets().then((data) => setTickets(data));
    fetchUsers().then((data) => setUsers(data));
  }, []);

  const fetchTickets = async () => {
    try {
      const url = ApiURL + 'tickets';
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching tickets:', error);
      // throw error;
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

  const handleTicketsPerRowChange = () => {
    setTicketsPerRow((ticketsPerRow) % 3 + 1);
  };

  const handleFilterStatusesChange = (e) => {
    setFilterStatuses(e);
  };

  const handleFilterUsersChange = (e) => {
    setFilterUsers(e);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };
  
  const searchedTickets = tickets.filter((ticket) => {
    const searchTerm = search.toLowerCase();
    return (
      (ticket.name.toLowerCase().includes(searchTerm) || ticket.description.toLowerCase().includes(searchTerm)) &&
      (!filterStatuses.length || filterStatuses.includes(ticket.status)) &&
      (!filterUsers.length || filterUsers.includes(ticket.user))
    );
  });

  return (
    <Layout className='dashboard-layout'>
      <CustomHeader/>
      <Layout.Content style={{ padding: '20px', backgroundColor: '#f0f0f0'}}>
        <Row gutter={16} style={{padding:"20px"}}>
          <Col span={8}>
            <div className='filter-container'>
              <h3>Search & Filter</h3>
              <Button type="default" style={{marginBottom: '1rem'}} onClick={() => handleTicketsPerRowChange()}>
                Tickets per row: {ticketsPerRow}
              </Button>
              <Input
                placeholder="Search by name or description"
                name="name"
                value={search}
                onChange={handleSearchChange}
              />
              <Row style={{marginTop: '1rem', display: 'flex', justifyContent: 'space-evenly'}}>
                <ScheduleOutlined/>
                <Select 
                  value={filterStatuses} 
                  onChange={handleFilterStatusesChange} 
                  options={[{value: 'new', label: "New"}, {value: 'in_progress', label: "In Progress"}, {value: 'finished', label: "Finished"}]}
                  mode='multiple'
                  placeholder="Select status"
                  style={{width: "40%"}}
                />
                <TeamOutlined style={{marginLeft: 20}}/>
                <Select 
                  value={filterUsers} 
                  onChange={handleFilterUsersChange} 
                  options={users}
                  mode='multiple'
                  placeholder="Select user"
                  style={{width: "40%"}}
                />
              </Row>
              <Row  style={{marginTop: '1rem', display: 'flex', justifyContent: 'center'}}>
                <FilterOutlined/>
                <Select 
                  value={sortBy} 
                  onChange={handleSortChange} 
                  options={[{value: 'id', label: "Default"}]}
                  placeholder="Sort by"
                  style={{width: "40%", marginLeft: 10}}
                />
              </Row>
              {user &&
                <Button
                  type="default" 
                  block 
                  style={{marginTop: '1rem', backgroundColor: '#356c91', color: 'white', fontWeight: '600'}}
                  onClick={() => navigate('/add')}
                >
                  Add ticket
                </Button>
              }
            </div>
          </Col>
          <Col span={16}>
            <div className='ticket-list' style={{overflowY: 'auto'}}>
              <h3>Ticket List</h3>
              <List
                itemLayout="horizontal"
                grid={{ gutter: 16, column: ticketsPerRow }}
                dataSource={searchedTickets}
                renderItem={(ticket) => (
                  <TicketListItem key={ticket.id} ticket={ticket}/>
                )}
              />
            </div>
          </Col>
        </Row>
      </Layout.Content>
    </Layout>
  );
};

export default Dashboard;