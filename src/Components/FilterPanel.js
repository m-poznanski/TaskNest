import React, {useContext} from 'react';
import {Row, Col, Input, Select, Button} from 'antd';
import {useNavigate} from 'react-router-dom';
import {FilterOutlined, ScheduleOutlined, TeamOutlined, CloseOutlined} from '@ant-design/icons';
import {UserContext} from "../Contexts/UserContext";
import '../Styles/FilterPanel.css';

const FilterPanel = ({
    search, 
    users,
    ticketsPerRow, 
    filterStatuses, 
    filterUsers, 
    sortBy, 
    handleFilterStatusesChange, 
    handleFilterUsersChange, 
    handleSearchChange, 
    handleSortChange, 
    handleTicketsPerRowChange,
    handleClear
}) => {
    const navigate = useNavigate();
    const {user} = useContext(UserContext);

    return(
        <Col span={8}>
            <div className='filter-container'>
            <h3>Search & Filter</h3>
            <Button type="default" style={{marginBottom: '1rem'}} onClick={() => handleTicketsPerRowChange()}>
                Tickets per row: {ticketsPerRow}
            </Button>
            <Button
                    type='default'
                    style={{marginLeft: 20}}
                    icon={<CloseOutlined/>}
                    onClick={() => handleClear()}
                >
                    Clear
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
                options={[{value: 'id', label: "Default"}, {value: 'name', label: "Name"}]}
                placeholder="Sort by"
                style={{width: "40%", marginLeft: 10}}
                />
            </Row>
            {user &&
                <Button
                    className='add-button'
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
    );
}

export default FilterPanel;