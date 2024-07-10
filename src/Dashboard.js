import React, { useState, useEffect, useContext } from 'react';
import { Layout, Row, Col, Input, Select, Button, List, Card } from 'antd';
import {useNavigate, Link} from 'react-router-dom';
import {UserContext} from "./UserContext";
import CustomHeader from './CustomHeader';
import TicketListItem from './TicketListItem';
import './Dashboard.css';
// import { Table, Input, Select, Button } from 'antd';

const sampleTickets = [
  {id: 1, name: "testowaNazwa", status: "w toku", user: 45, description: "przykladowy opis"},
  {id: 2, name: "innaNazwa", status: "zakonczone", user: 11, description: "przykladowy inny 1234 opis"},
  {id: 3, name: "testowaNazwa", status: "w toku", user: 45, description: "przykladowy opis"},
  {id: 4, name: "innaNazwa", status: "zakonczone", user: 11, description: "przykladowy inny 1234 opis"},
  {id: 5, name: "testowaNazwa", status: "w toku", user: 45, description: "przykladowy opis"},
  {id: 6, name: "innaNazwa", status: "zakonczone", user: 11, description: "przykladowy inny 1234 opis"}
];


const Dashboard = () => {
  const [ticketsPerRow, setTicketsPerRow] = useState(3);
  const [tickets, setTickets] = useState(sampleTickets); // State for ticket data
  const [filters, setFilters] = useState({ name: '', status: '', user: '' }); // State for filters
  const [sortBy, setSortBy] = useState('id'); // State for sort order
  const {user, logout} = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch tickets data from API
    //fetchTickets().then((data) => setTickets(data));
  }, []);

  const handleTicketsPerRowChange = () => {
    setTicketsPerRow((ticketsPerRow) % 3 + 1);
  };

  const handleFilterChange = (field, value) => {
    setFilters({ ...filters, [field]: value });
  };

  const handleSortChange = (field) => {
    setSortBy(field);
  };

  const filteredTickets = tickets.filter((ticket) => {
    // Apply filters here based on `filters` and `ticket` properties
  }).sort((a, b) => {
    // Apply sorting here based on `sortBy` and `a` and `b` properties
  });

  return (
    <Layout className='dashboard-layout'>
      <CustomHeader/>
      <Layout.Content style={{ padding: '20px', backgroundColor: '#f0f0f0' }}>
        <Row gutter={16} style={{padding:"20px"}}>
          <Col span={8}>
            <div className='filter-container'>
              <h3>Search & Filter</h3>
              <Input.Search
                placeholder="Search by name or description"
                name="name"
                value={filters.name}
                onChange={handleFilterChange}
              />
              <Select
                value={filters.status}
                onChange={handleFilterChange}
                style={{ marginTop: '1rem' }}
              >
                <Select.Option value="">All Statuses</Select.Option>
                {/* Options for each status */}
              </Select>
              <Select
                value={filters.user}
                onChange={handleFilterChange}
                style={{ marginTop: '1rem' }}
              >
                <Select.Option value="">All Users</Select.Option>
                {/* Options for each user */}
              </Select>
              <Button type="primary" block style={{ marginTop: '1rem' }}>
                Apply Filters
              </Button>
            </div>
          </Col>
          <Col span={16}>
            <div className='ticket-list'>
              <h3>Ticket List</h3>
              <Button type="default" style={{ marginTop: '1rem' }} onClick={() => handleTicketsPerRowChange()}>
                Change layout
              </Button>
              <List
                itemLayout="horizontal"
                grid={{ gutter: 16, column: ticketsPerRow }}
                dataSource={tickets}
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

  // return (
  //   <div className="dashboard-container">
  //     <div className="filter-panel">
  //       <input
  //         type="text"
  //         placeholder="Search by name or description"
  //         name="name"
  //         value={filters.name}
  //         onChange={handleFilterChange}
  //       />
  //       <select value={filters.status} name="status" onChange={handleFilterChange}>
  //         <option value="">All Statuses</option>
  //         {/* Options for each status */}
  //       </select>
  //       <select value={filters.user} name="user" onChange={handleFilterChange}>
  //         <option value="">All Users</option>
  //         {/* Options for each user */}
  //       </select>
  //       <button value="id" onClick={handleSortChange}>Sort by ID</button>
  //       <button value="name" onClick={handleSortChange}>Sort by Name</button>
  //       {/* Add more sort buttons as needed */}
  //     </div>
  //     <div className="ticket-list">
  //       <ul>
  //         {tickets.map((ticket) => (
  //           <li key={ticket.id} className="ticket-item">
  //             <div>
  //               <b>ID:</b> {ticket.id}
  //             </div>
  //             <div>
  //               <b>Name:</b> {ticket.name}
  //             </div>
  //             <div>
  //               <b>Status:</b> {ticket.status}
  //             </div>
  //             <div>
  //               <b>Assigned User:</b> {ticket.assignedUser}
  //             </div>
  //             <div>
  //               <b>Description (optional):</b> {ticket.description}
  //             </div>
  //           </li>
  //         ))}
  //       </ul>
  //     </div>
  //   </div>
  // );
};

export default Dashboard;