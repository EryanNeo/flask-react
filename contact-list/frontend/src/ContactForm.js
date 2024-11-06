import { useState } from "react";

export default function ContactForm({existingContact = {},updateCallBack}){
    const [firstName,setFirstName] = useState(existingContact.firstName || '');
    const [lastName,setLastName] = useState(existingContact.lastName || '');
    const [email,setEmail] = useState(existingContact.email || '');

    const updating = Object.entries(existingContact).length !== 0;

    async function onSubmit(e){
        e.preventDefault();
        const data = {
            firstName,
            lastName,
            email
        }
        const url = 'http://localhost:5000/' + (updating ? `update_contact/${existingContact.id}`:'create_contact');
        const options = {
            method:!updating?'POST':'PATCH',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        }
        const response = await fetch(url,options);
        if(response.status!==201 && response.status!==200){
            const message = await response.json()
            alert(message.Message);
        }
        else{
            updateCallBack();
        }
    }

    return(
        <form onSubmit={onSubmit} className='ContactForm'>
            <div>
                <label htmlFor="firstName">First Name</label>
                <input 
                    type="text" 
                    name="" 
                    id="firstName" 
                    value={firstName} 
                    onChange={(e)=>setFirstName(e.target.value)}
                />
                <label htmlFor="lastName">Last Name</label>
                <input 
                    type="text" 
                    name="" 
                    id="lastName" 
                    value={lastName} 
                    onChange={(e)=>setLastName(e.target.value)}
                />
                <label htmlFor="email">Email</label>
                <input 
                    type="email" 
                    name="" 
                    id="email" 
                    value={email} 
                    onChange={(e)=>setEmail(e.target.value)}
                />
            </div>
            <button type="submit">{updating?'Update Contact':'Create Contact'}</button>
        </form>
    );
}