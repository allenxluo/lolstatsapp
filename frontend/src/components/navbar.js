import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import './navbar.css';

class NavBar extends React.Component {
    render() {
        return (
            <Navbar bg="primary" variant="dark" className='navbar'>
                <text className='pageName'>A.GG</text>
                <Form inline className='searchBar'>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-light">Search</Button>
                </Form>
            </Navbar>
        );
    }
}

export default NavBar;