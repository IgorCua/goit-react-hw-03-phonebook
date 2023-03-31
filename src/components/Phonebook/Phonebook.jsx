import PropTypes from "prop-types";
import { nanoid } from 'nanoid';
import style from "./Phonebook.module.css";
import React, { PureComponent } from "react";
import { PhonebookForm } from "./PhonebookForm/PhonebookForm";
import { ContactsList } from "./ContactsList/ContactsList";

export class Phonebook extends PureComponent {
    constructor(props){
        super(props);
        this.state = {...this.props.state, name: '', number: ''};
        
    }

    componentDidMount(){
        const contactsArr = localStorage.contacts && JSON.parse(localStorage.getItem('contacts'));
        
        if (contactsArr && contactsArr.length !== this.state.contacts.length) this.setState({contacts: [...contactsArr]})
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const currState = this.state;
        
        if(prevState.contacts !== currState.contacts) {
            localStorage.setItem('contacts', JSON.stringify([...this.state.contacts]))
        } 
        if (localStorage.contacts.length === 2) {
            localStorage.removeItem('contacts');
        }
        
    }

    addContact = (nameVal, numVal) => {
        this.setState({contacts: [...this.state.contacts, {id: nanoid(10), name: nameVal, number: numVal}]})
        // console.log('this ', this.state)
    }

    handleSubmit = (evt) => {
        evt.preventDefault();
        const nameVal = evt.target.name.value;
        const numVal = evt.target.number.value;
        const regex = new RegExp(`\\b${nameVal}\\b`, 'i');

        for (let element of this.state.contacts){
            if (regex.test(element.name)) {
                alert(`${element.name} is already in contacts.`)
                return;
            }
        }
        
        this.addContact(nameVal, numVal);
        evt.target.name.value = '';
        evt.target.number.value = '';
    }

    handleFilterChange = (evt) => {
        const name = evt.target.value.toLowerCase();
        this.setState({filter: name})
    }

    searchByName = (evt) => {
        return this.state.contacts.filter((elem) => {
            return elem.name.toLowerCase().includes(this.state.filter)
        })
       
    }

    deleteFromContacts = (evt) => {
        const elemId = evt.target.parentElement.id;
        
        this.setState({contacts: this.state.contacts.filter(elem => {
            return elem.id !== elemId
        })})

        // console.log(evt.target.parentElement.id)
    }

    render() {

        // console.log('Phonebook')
        // console.log(this.state.contacts)

        return <section>
            <h1 className={style.title}>Phonebook</h1>
            <PhonebookForm contacts={this.state.contacts} handleSubmit={this.handleSubmit}/>   
            <ContactsList 
                contacts={this.state.contacts}
                searchByName={this.searchByName}
                handleFilterChange={this.handleFilterChange}
                deleteFromContacts={this.deleteFromContacts}
            >
            </ContactsList >
        </section>
    }
}

Phonebook.propTypes = {
    contacts: PropTypes.array,
    filter: PropTypes.string,
    name: PropTypes.string,
    number: PropTypes.string
}