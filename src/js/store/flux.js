const getState = ({ getStore, getActions, setStore }) => { 
    return {
        store: {
            listContacts: [] 
        },
        actions: {
            createUser: async () => {
                try {
                    const response = await fetch("https://playground.4geeks.com/contact/agendas/lf14", {
                        method: "POST",
                    });
                    const data = await response.json();
                    console.log(data);
                } catch (error) {
                    console.log(error);
                }
            },

            getInfoContacts: async () => {
                try {
                    const response = await fetch("https://playground.4geeks.com/contact/agendas/lf14/contacts", {
                        method: "GET"
                    });
                    if (response.status == 404) {
                        await getActions().createUser();
                    } else if (response.ok) {
                        const data = await response.json();
                        setStore({ listContacts: data.contacts });
                    }
                } catch (error) {
                    console.log(error);
                }
            },

            addContactToList: (contact) => {
                const store = getStore();
                setStore({ ...store, listContacts: [...store.listContacts, contact] });
            },

            createContact: async (payload) => {
                try {
                    const response = await fetch("https://playground.4geeks.com/contact/agendas/lf14/contacts", {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(payload),
                    });
                    const data = await response.json();
                    console.log(data);
                    getActions().addContactToList(data);
                    console.log("Contact added:", data);
                } catch (error) {
                    console.log(error);
                }
            },
         deleteContact: async (id) => {
    try {
        const response = await fetch(`https://playground.4geeks.com/contact/agendas/lf14/contacts/${id}`, {
            method: "DELETE",
        });
        if (response.ok) {
            const store = getStore();
            const updatedContacts = store.listContacts.filter(contact => contact.id !== id);
            setStore({ listContacts: updatedContacts });
            console.log(`Contact with ID ${id} deleted`);
        } else {
            console.log("Error deleting contact");
        }
    } catch (error) {
        console.log(error);
    }
},

editContact: async (id, contact) => {
    try {
        const response = await fetch(`https://playground.4geeks.com/contact/agendas/lf14/contacts/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contact)
        });
        const data = await response.json();
        if (response.ok) {
            const store = getStore();
            const updatedList = store.listContacts.map(item => (item.id == id ? data : item));
            setStore({ listContacts: updatedList });
        } 
    } catch (error) {
        console.log(error);
    }
}
export default getState;