import * as React from 'react';
import {Alert, Button,Modal} from 'react-bootstrap';

const AlertView = ({variant, Heading, item, show, isBtnShow, setOnDismiss, onConfirm}) => {
  return (
    <Modal show={show} onClick={setOnDismiss}>
        <Modal.Header closeButton>
          <Modal.Title>{Heading}</Modal.Title>
        </Modal.Header>
        <Modal.Body><p> Title: {item?.title}</p>
      <p> upVotes: {item?.upVotes}</p>
      <p> Date: {item?.date}</p></Modal.Body>
        <Modal.Footer>{ isBtnShow ? 
      <Button variant="danger" onClick={()=>onConfirm(item)}> Confirm </Button> :null }
        </Modal.Footer>
      </Modal>
    
  )
}

export default AlertView;
