import React from 'react';
import {Card, List} from 'antd';
import {Link, useNavigation} from 'react-router-dom';

const TicketListItem = ({ticket}) => {
  return (
    <List.Item>
        <Link to={'/ticket/' + ticket.id}>
            <Card hoverable style={{ width: '100%' }}>
                <Card.Meta
                title={<b>ID: {ticket.id}</b>}
                description={
                    <>
                    <b>Name:</b> {ticket.name} <br />
                    <b>Status:</b> {ticket.status} <br />
                    <b>Assigned User:</b> {ticket.user} <br />
                    <b>Description (optional):</b> {ticket.description}
                    </>
                }
                />
            </Card>
        </Link>
    </List.Item>
  );
};

export default TicketListItem;