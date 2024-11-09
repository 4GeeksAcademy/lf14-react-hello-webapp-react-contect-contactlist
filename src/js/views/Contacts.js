import React, { useState, useEffect, useRef, useContext } from "react";
import { Link } from 'react-router-dom'
import { Context } from "../store/appContext.js";
import ContactCard from "../component/ContactCard.js";

const Contacts = () => {
  const { store, actions } = useContext(Context);

  const welcomeMessage = "Welcome to your agenda! You don't have contacts yet, let´s create one.";

  return (
    <div className="w-55 mx-auto">
      <div className="d-flex justify-content-center">
        <Link to="/AddContact">
          <button className="btn btn-success">Add New Contact</button>
        </Link>
      </div>
      <ul className="list-group mt-3">
        {/* Conditionally render the welcome message if the list is empty */}
        {store.listContacts.length === 0 && (
          <li className="list-group-item text-center" key="welcome">
            {welcomeMessage}
          </li>
        )}

        {/* Then, render the actual contacts from the store, if any */}
        {store.listContacts && store.listContacts.length > 0 && (
          store.listContacts.map((contact, index) => (
            <ContactCard contact={contact} key={index} />
          ))
        )}
      </ul>
    </div>
  );
};

export default Contacts;