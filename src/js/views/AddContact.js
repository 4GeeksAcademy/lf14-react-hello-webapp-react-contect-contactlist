// Importando modulos necesarios
import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Context } from "../store/appContext.js"; 

const AddContact = () => {
    const { store, actions } = useContext(Context);
    let navigate = useNavigate(); 
    const { id } = useParams(); 

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");

    
    function saveContact(e) {
        e.preventDefault(); // 
        if (name.trim() === "" || phone.trim() === "" || email.trim() === "" || address.trim() === "") {
            alert("Please complete all fields to continue"); 
            return null;
        }
        const payload = {
            name: name,
            phone: phone,
            email: email,
            address: address
        };
        if (!id) {
            actions.createContact(payload);
            alert("Contact added");
        } else {
            actions.editContact(id, payload);
            alert("Contact edited");
        }
        navigate("/"); 
        setName(""); 
        setPhone("");
        setEmail("");
        setAddress("");
    }


    useEffect(() => {
        if (id && store.listContacts.length > 0) {
            const currentContact = store.listContacts.find(contact => contact.id == id);
            setName(currentContact.name); 
            setPhone(currentContact.phone);
            setEmail(currentContact.email);
            setAddress(currentContact.address);
        }
    }, [id, store.listContacts]);

    return (
        <div className="container">
            <h1 className="text-center">{!id ? "Add a New Contact" : `Editing Contact: ${name}`}</h1>

            <form className="container" onSubmit={saveContact}>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput1" className="form-label">Full Name</label>
                    <input type="text" className="form-control" id="formGroupExampleInput1" placeholder="Full name" onChange={(e) => setName(e.target.value)} value={name} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput2" className="form-label">Email</label>
                    <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} value={email} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput3" className="form-label">Phone</label>
                    <input type="text" className="form-control" id="formGroupExampleInput3" placeholder="Enter phone" onChange={(e) => setPhone(e.target.value)} value={phone} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput4" className="form-label">Address</label>
                    <input type="text" className="form-control" id="formGroupExampleInput4" placeholder="Enter address" onChange={(e) => setAddress(e.target.value)} value={address} required />
                </div>
                <div className="mb-3">
                    <button type="submit" className="btn btn-primary">Save</button>
                </div>
            </form>

            <Link to="/">Back to Contacts</Link> 
        </div>
    );
};

export default AddContact; 