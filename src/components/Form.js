import React from "react";
import { Button, Form, Card } from "react-bootstrap";

const FormView = ({onTitleChange, onUpVoteChange, onDateChange, onSubmit, editMode, title, upVotes, date, onCancel, buttonEnable}) => {
    return (
        <Form onSubmit={onSubmit}>
            <Card>
                <Card.Body>
                    <Card.Title>
                        <Form.Group className="mb-3 text-start">
                            <Card.Title>{editMode === false ? 'Add Record' : 'Edit Record'}</Card.Title>
                        </Form.Group>
                    </Card.Title>
                    { editMode ? 
                        <>
                            <Form.Group className="mb-3">
                                <Form.Control type="text" placeholder="Enter Title" value={editMode ? title :''} onChange={(event)=> onTitleChange(event.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control type="number" placeholder="Enter upvote number between 0 to 100" value={editMode ? upVotes :''}   onChange={(event)=> onUpVoteChange(event.target.value)}/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control type="date" placeholder="Enter Date" value={editMode ? date :''}  onChange={(event)=> onDateChange(event.target.value)}/>
                            </Form.Group>
                        </> : 
                         <>
                            <Form.Group className="mb-3">
                                <Form.Control type="text" placeholder="Enter Title"  value={title} onChange={(event)=> onTitleChange(event.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control type="number" placeholder="Enter upvote number between 0 to 100" value={upVotes}  onChange={(event)=> onUpVoteChange(event.target.value)}/>
                            </Form.Group>
                                <Form.Group className="mb-3">
                                <Form.Control type="date" placeholder="Enter Date" value={date} onChange={(event)=> onDateChange(event.target.value)}/>
                            </Form.Group>
                        </>}

                        {editMode ? (
                            <>
                                <Button variant="success" size="lg" type="submit" disabled={!buttonEnable}>
                                    Save Edits
                                </Button>
                                <Button variant="danger" size="lg" type="button" style={{marginLeft:'5px'}} onClick={onCancel}>
                                    Cancel
                                </Button>
                            </>
                        ):(
                            <Button variant="success" size="lg" type="submit" style={{width:'100%'}} disabled={!buttonEnable}>
                                Add Data
                            </Button>
                        )}
                    </Card.Body>
            </Card>
        </Form>
    );
};

export default FormView;
