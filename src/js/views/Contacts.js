import React, { useEffect, useContext } from "react";
import { Link } from 'react-router-dom';
import { Context } from "../store/appContext.js";
import ContactCard from "../component/ContactCard.js";

const Contacts = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getInfoContacts();
  }, [actions]);

  const welcomeMessage = "Welcome to your agenda! You don't have contacts yet, let´s create one.";

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-center mb-3">
        <Link to="/AddContact">
          <button className="btn btn-success">Add New Contact</button>
        </Link>
      </div>
      <div className="row">
        {store.listContacts.length === 0 && (
          <div className="col-12">
            <div className="alert alert-info text-center" role="alert">
              {welcomeMessage}
            </div>
          </div>
        )}
        {store.listContacts && store.listContacts.length > 0 && (
          store.listContacts.map((contact, index) => (
            <div className="col-12" key={index}>
              <ContactCard contact={contact} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Contacts;