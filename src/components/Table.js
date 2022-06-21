import React, { useMemo } from "react";
import { Table, Card, Button } from "react-bootstrap";

const TableView = ({itemList, onViewClick, onEditClick, onRemoveClick}) =>{
    const todoItems =  useMemo(() =>{
        return [...Object.values(itemList)]
    }, [itemList])
    return(
        <Card>
            <Card.Body>
  <Table responsive="sm">
    <thead>
      <tr className="text-muted" style={{textAlign:"left", fontWeight:400}}>
        <th>Title</th>
        <th>Upvotes</th>
        <th>Date</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
    
     {todoItems.length > 0 ? 
     todoItems.map((item, index) => (
        <tr key={index} style={{textAlign:"left"}}>
            <td>{item?.title}</td>
            <td>{item?.upVotes}</td>
            <td>{item?.date}</td>
            <td>
              <Button size='sm' onClick={()=> onViewClick(item)} variant="success" style={{marginRight:'5px'}}> View </Button>
              <Button size='sm' onClick={() => onEditClick(item)} variant='info' style={{marginRight:'5px', background:'#017ea6', color:'#fff'}}> Edit </Button>
              <Button size='sm' onClick={()=>onRemoveClick(item)} variant='danger'> Delete</Button>
            </td>
        </tr>
     )):
     (<tr><td style={{textAlign:"center", width:'100%'}}>No item exist</td></tr>)}
    </tbody>
  </Table>
  </Card.Body>
</Card>
    );
};

export default TableView;