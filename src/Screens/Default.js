import React, { useEffect, useState } from "react";
import FormView from "../components/Form";
import TableView from "../components/Table";
import AlertView from "../components/Alert";
import { Container, Row, Col} from "react-bootstrap";
import { useList } from "../utils/list";
import Filter from "../components/Filter";
import {v4 as uuid} from 'uuid';
const DefaultView = () =>{
    const listContext = useList();

    const [title,setTitle] = useState('')
    const [upVotes, setupVotes] = useState('');
    const [date, setDate] = useState('');
    const[searchFilter, setSearchFilter] =useState('');
    const [alertHeading, setAlertHeading] = useState('');
    const [alertItem, setAlertItem] = useState('');
    const [alert, setAlert] = useState(false);
    const [editMode, setEditMode]  = useState(false);
    const [id, setId] = useState('');
    const [confirmButton, setConfirmButton] = useState(false);
    const [enable, setEnable] = useState(false);
    var [timer, setTimer] = useState('');
    const [isSearch, setIsSearch] = useState(false);
    //TODO handle form submit
    const handleSubmit  = (e)=>{
        e.preventDefault();
            if(editMode === false){
            listContext.dispatch({
                type: listContext.actions.ADD,
                data: {
                    title:title,
                    upVotes:Number(upVotes),
                    date:date
                },
        
            });
        }
        else{
            listContext.dispatch({
                type:listContext.actions.UPDATE,
                data:{
                    id:id,
                    title:title,
                    upVotes:upVotes,
                    date:date
                }
            });
        }
        clearFields();
    }

    //TODO handle ListItem view
    const viewItem = (item) =>{
        setAlertHeading('Item Details');
        setAlertItem(item);
        setAlert(true);
        setConfirmButton(false);
    } 

    //TODO handle ListItem remove
    const removeItem = (item) =>{
        setConfirmButton(true);
        setAlertHeading('Are you sure to delete?');
        setAlertItem(item);
        setAlert(true);

    } 

    //TODO handle ListItem edit
    const editItem = (item) =>{
        setEditMode(true);
        setId(item.id);
        setTitle(item.title);
        setupVotes(item.upVotes);
        setDate(item.date);
        setAlertItem(item);
    }
    
    const editCancel = ()=>{
        clearFields();
        setId('');
        setAlertItem('');
    }

    const handleRemoveItemConfirmation = (item) =>{
        listContext.dispatch({
            type: listContext.actions.REMOVE,
            data: {
                id:item.id
            },
        });
        handleDismiss();

    }

    const handleDismiss = ()=>{
        setAlert(false)
        setAlertItem('');
    }

    const clearFields = ()=>{
        setTitle('');
        setupVotes('');
        setDate('');
        setEditMode(false);
    }

    const sortBy = (type) =>{
        listContext.dispatch({
            type: listContext.actions.FILTER,
            data: {
                sortBy:type
            },
        });
    }

    const searchByString = (condition)=>{
        setIsSearch(true);
        listContext.dispatch({
            type: listContext.actions.FILTER,
            data: {
                type:condition,
                search:searchFilter
            },
        });
    }

    useEffect(()=>{
        if(searchFilter.length >=3){
            timer = setTimeout(() => {
                searchByString('searchByString');
            }, 1000);
            setTimer(timer);
            return () => clearTimeout(timer);
        }
        if(searchFilter === '' && isSearch){
            searchByString('reset');
        }
    },[searchFilter, isSearch])

   useEffect (() =>{
        if(upVotes > 0 && upVotes <= 100  && title !== '' &&  date !== ''){
            setEnable(true);
        }
        else{
            setEnable(false);
        }
    }, [title, upVotes, date])

    useEffect(() =>{
        if(!localStorage.getItem('items')){
            const inital = [
                {
                    "id":uuid(),
                    "title":"Scalling to 100k users",
                    "upVotes":72,
                    "date": "2019-01-21"
                },{
                  "id":uuid(),
                  "title":"The enum war",
                  "upVotes":24,
                  "date": "2019-10-21"
                },{
                  "id":uuid(),
                  "title":"Alphabets Earnings",
                  "upVotes":22,
                  "date": "2019-11-23"
                },{
                  "id":uuid(),
                  "title":"A message to our customer",
                  "upVotes":12,
                  "date": "2019-01-24"
                }
                ,{
                  "id":uuid(),
                  "title":"Artificial Mountains",
                  "upVotes":2,
                  "date": "2019-11-12"
                }
            ];
            localStorage.setItem('items', JSON.stringify(inital));
        }
    }, [])

    return (
        <>
        <Container className='mt-5'>
            <Filter onSearchFilter={setSearchFilter} sortBy={sortBy}/>
           {alert ? <AlertView Heading={alertHeading} item={alertItem} show={alert} isBtnShow={confirmButton} setOnDismiss={handleDismiss} onConfirm={handleRemoveItemConfirmation}/> : null}
            <Row>
                <Col md={4}>
                <FormView onTitleChange={setTitle} onUpVoteChange={setupVotes} onDateChange={setDate} onSubmit={handleSubmit} editMode={editMode} title={title} upVotes={upVotes} date={date} onCancel={editCancel} buttonEnable={enable}/>
                </Col>
                <Col md={1}></Col>
                <Col md={7}>
                    <TableView itemList={listContext.state} onViewClick={viewItem} onEditClick={editItem} onRemoveClick={removeItem}/>
                </Col>
            </Row>
        </Container>
        </>
    )
}

export default DefaultView;