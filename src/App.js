import classes from "./App.module.css";

import React, { Component } from "react";
import ContactForm from "./ContactForm";
import ContactList from "./ContactList";
import Filter from "./Filter";

class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  };

  componentDidMount() {
    const haveContacts = localStorage.getItem("contacts");
    if (haveContacts) {
      this.setState({
        contacts: JSON.parse(haveContacts),
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  Rename = (e) => {
    const value = e.target.value;
    this.setState({ filter: value });
  };

  addContact = (contact) => {
    const isOldContact = this.state.contacts.some(
      (oldContact) =>
        oldContact.name.toLowerCase() === contact.name.toLowerCase()
    );

    if (isOldContact) {
      alert(`${contact.name} уже есть в контактах!`);
      return;
    } else {
      this.setState((prevState) => ({
        contacts: [...prevState.contacts, contact],
      }));
    }
  };
  deleteContact = (id) => {
    this.setState((state) => ({
      contacts: state.contacts.filter((contact) => contact.id !== id),
    }));
  };
  render() {
    const { contacts, filter } = this.state;
    const filterContacts = contacts.filter(({ name }) => {
      return name.toLowerCase().includes(filter.toLowerCase());
    });
    return (
      <>
        <h1 className={classes.titleName}>Phonebook</h1>
        <ContactForm submitForm={this.addContact}></ContactForm>
        <h2 className={classes.minTitleName}>Contacts</h2>
        <Filter filter={filter} onRename={this.Rename}></Filter>
        <h2 className={classes.minTitleName}>Contacts List</h2>
        <ContactList
          contacts={filterContacts}
          deleteContact={this.deleteContact}
        />
      </>
    );
  }
}

export default App;
