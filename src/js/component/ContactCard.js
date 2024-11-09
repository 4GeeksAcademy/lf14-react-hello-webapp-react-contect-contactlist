import React from "react";
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../store/appContext';
import photo from "../../img/person.png";

const ContactCard = ({ contact }) => {
    const { store, actions } = useContext(Context);

    const handleDelete = () => {
        actions.deleteContact(contact.id);
    };

    return (
        <li className="list-group-item d-flex justify-content-between align-items-center p-3" style={{ maxWidth: '900px', margin: '10px auto', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', height: '200px', overflow: 'hidden' }}>
            <div className="d-flex align-items-center">
                <img
                    className="rounded-circle"
                    src={photo || 'path/to/placeholder.png'}
                    alt="Contact"
                    style={{ width: '70px', height: '70px', marginRight: '20px' }}
                />
                <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    <h5 className="mb-1">{contact.name}</h5>
                    <p className="mb-1 text-muted">{contact.phone}</p>
                    <p className="mb-1 text-muted">{contact.email}</p>
                    <p className="mb-1 text-muted">{contact.address}</p> 
                </div>
            </div>
            <div className="d-flex align-items-center">
                <Link to={"/editContact/" + contact.id} className="btn btn-link p-0 me-3">
                    <i className="fas fa-edit"></i>
                </Link>
                <button type="button" className="btn btn-link p-0 text-danger" data-bs-toggle="modal" data-bs-target={"#delete-contact-" + contact.id}>
                    <i className="fa fa-trash"></i>
                </button>
                <div className="modal fade" id={"delete-contact-" + contact.id} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Are you sure?</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                This will delete this contact permanently, are you sure?
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleDelete}>Yes</button>
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">No</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
};

export default ContactCard;