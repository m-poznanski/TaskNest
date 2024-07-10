import React, { useState, useEffect } from 'react';
// import { Table, Input, Select, Button } from 'antd';

const Dashboard = () => {
  const [tickets, setTickets] = useState([]); // State for ticket data
  const [filters, setFilters] = useState({ name: '', status: '', user: '' }); // State for filters
  const [sortBy, setSortBy] = useState('id'); // State for sort order

  useEffect(() => {
    // Fetch tickets data from API
    fetchTickets().then((data) => setTickets(data));
  }, []);

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
    <div className="dashboard-container">
      <div className="search-sort-panel">
        <Input
          placeholder="Search by name or description"
          onChange={(e) => handleFilterChange('name', e.target.value)}
        />
        <Select
          value={filters.status}
          onChange={(value) => handleFilterChange('status', value)}
        >
          <Option value="">All Statuses</Option>
          {/* Options for each status */}
        </Select>
        <Select
          value={filters.user}
          onChange={(value) => handleFilterChange('user', value)}
        >
          <Option value="">All Users</Option>
          {/* Options for each user */}
        </Select>
        <Button onClick={() => handleSortChange('id')}>Sort by ID</Button>
        <Button onClick={() => handleSortChange('name')}>Sort by Name</Button>
        {/* Add more sort buttons as needed */}
      </div>

      <div className="ticket-list">
        <Table dataSource={filteredTickets}>
          {/* Define table columns for ID, Name, Status, Assigned User, Description */}
        </Table>
      </div>
    </div>
  );
};

export default Dashboard;