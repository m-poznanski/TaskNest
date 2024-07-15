import React, {useState, useEffect} from 'react';
import {Layout, Row, Col, List} from 'antd';
import CustomHeader from '../Components/CustomHeader';
import TicketListItem from '../Components/TicketListItem';
import axios from 'axios';
import {ApiURL} from '../ApiConfig';
import '../Styles/Dashboard.css';
import FilterPanel from '../Components/FilterPanel';

// const sampleTickets = [
//   {id: 1, name: "testowaNazwa", status: "finished", user: 45, description: "przykladowy opis"},
//   {id: 2, name: "innaNazwa", status: "finished", user: 11, description: "p2222222222222222222222222222222222222222222rzykladowy inny 1234 opis"},
//   {id: 3, name: "testowaNazwa", status: "w toku", user: 45, description: "przykladowy opis"},
//   {id: 4, name: "innaNazwa", status: "new", user: 11, description: ""},
//   {id: 5, name: "testowaNazwa", status: "w toku", user: 45, description: "przykladowy opis"},
//   {id: 6, name: "innaNazwa", status: "zakonczone", user: 11, description: "przykladowy inny 1234 opisprzykladowy inny 1234 opisprzykladowy inny 1234 opis"},
//   {id: 7, name: "testowaNazwa", status: "new", user: 45, description: "przykladowy opis"},
//   {id: 8, name: "innaNazwa", status: "zakonczone", user: 11, description: "przykladowy inny 1234 opis"},
//   {id: 9, name: "testowaNazwa", status: "in_progress", user: 45, description: "przykladowy opis"},
//   {id: 10, name: "innaNazwa", status: "zakonczone", user: 11, description: "przykladowy inny 1234 opis"}
// ];

// const sampleUsers = [
//   {value: 11, label: "ddfdf"},
//   {value: 45, label: "123"},
// ]

const Dashboard = () => {
  const [ticketsPerRow, setTicketsPerRow] = useState(3);
  const [tickets, setTickets] = useState([]); // State for ticket data
  const [filterUsers, setFilterUsers] = useState([]); // State for filtering users
  const [users, setUsers] = useState([]); //State for users list
  const [filterStatuses, setFilterStatuses] = useState([]); //State for filtering statuses
  const [search, setSearch] = useState(''); //State for searching
  const [sortBy, setSortBy] = useState('id'); // State for sort order

  // Fetching tickets and users data from API
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
    setSortBy(e);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleClear = () => {
        setFilterStatuses([]);
        setFilterUsers([]);
        setSearch('');
        setSortBy(null)
  }
  
  const searchedTickets = tickets?.filter((ticket) => {
    const searchTerm = search.toLowerCase();
    return (
      (ticket.name.toLowerCase().includes(searchTerm) || ticket.description.toLowerCase().includes(searchTerm)) &&
      (!filterStatuses.length || filterStatuses.includes(ticket.status)) &&
      (!filterUsers.length || filterUsers.includes(ticket.user))
    );
  })
  .sort((a, b) => {
    if (sortBy === 'id') {
      return a.id - b.id;
    } else if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });

  return (
    <Layout className='dashboard-layout'>
      <CustomHeader/>
      <Layout.Content style={{ padding: '20px', backgroundColor: '#f0f0f0'}}>
        <Row gutter={16} style={{padding:"20px"}}>
          <FilterPanel
            filterStatuses={filterStatuses}
            filterUsers={filterUsers}
            search={search}
            sortBy={sortBy}
            ticketsPerRow={ticketsPerRow}
            users={users}
            handleFilterStatusesChange={handleFilterStatusesChange}
            handleSearchChange={handleSearchChange}
            handleTicketsPerRowChange={handleTicketsPerRowChange}
            handleFilterUsersChange={handleFilterUsersChange}
            handleSortChange={handleSortChange}
            handleClear={handleClear}
          />
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