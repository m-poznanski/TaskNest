import React, {useContext} from 'react';
import {Card, List} from 'antd';
import {Link, useNavigation} from 'react-router-dom';
import {UserContext} from "./UserContext";
import './TicketListItem.css';


const TicketListItem = ({ticket}) => {
  const {user} = useContext(UserContext);

  var statusColor = "black";
  var status = "";
  switch(ticket.status){
    case "finished":
      statusColor = "green";
      status = "Finished";
      break;
    case "new":
      statusColor = "red";
      status = "New";
      break;
    case "in_progress":
      statusColor = "goldenrod";
      status = "In Progress";
      break;
  }

  return (
    <List.Item>
        <Link to={'/ticket/' + ticket.id}>
            <Card 
              hoverable 
              style={{
                width: '100%',
                borderColor: user?.id == ticket.user ? "#356c91" : "lightgray",
                borderBottomWidth: 2,
                borderRightWidth: 2
              }}
            >
                <Card.Meta
                title={
                  <div className='ticket-title-container'>
                    <p className='ticket-title'>{ticket.name}</p>
                    <p style={{color: statusColor}}>{status}</p>
                  </div>
                }
                description={
                    <>
                    <b>Assigned User: </b> {ticket.user} <br />
                    <p className='ticket-description'><b>Description: </b>{ticket.description}</p>
                    </>
                }
                />
            </Card>
        </Link>
    </List.Item>
  );
};

export default TicketListItem;