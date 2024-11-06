

export default function ContactList({contacts,updateContact,updateCallBack}){
    async function onDelete(id){
        try{
            const options = {
                method:'DELETE'
            }
            const response = await fetch(`http://localhost:5000/delete_contact/${id}`,options);
            if(response.status===200){
                const message = await response.json()
                updateCallBack();
                alert(message.Message);
            }
            else{
                console.log('Failed to delete');
            }
        }
        catch(e){
            alert(e);
        }
    }
    return(
        <div>
            <h2 className="heading">Contacts</h2>
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {   
                        contacts.length!==0 &&
                        contacts.map(contact=>{
                            return(
                                <tr key={contact.id}>
                                    <td>{contact.firstName}</td>
                                    <td>{contact.lastName}</td>
                                    <td>{contact.email}</td>
                                    <td>
                                        <button onClick={()=>updateContact(contact)}>Update</button>
                                        <button onClick={()=>onDelete(contact.id)}>Delete</button>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}