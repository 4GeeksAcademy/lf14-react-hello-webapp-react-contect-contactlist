import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Context } from "../store/appContext.js";

const EditContact = () => {
    const { store, actions } = useContext(Context);
    const { id } = useParams();
    let navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    useEffect(() => {
        if (id && store.listContacts.length > 0) {
            const currentContact = store.listContacts.find(contact => contact.id == id);
            setName(currentContact.name);
            setPhone(currentContact.phone);
            setEmail(currentContact.email);
            setAddress(currentContact.address);
        }
    }, [id, store.listContacts]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = { name, email, phone, address };
        actions.editContact(id, payload);
        alert("Contact edited");
        navigate("/");
    };

    return (
        <div className="container">
            <h1 className="text-center">Update Contact</h1>
            <form className="container" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input type="text" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input type="text" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Update Contact</button>
            </form>
            <Link to="/">Back to Contacts</Link>
        </div>
    );
};

export default EditContact;