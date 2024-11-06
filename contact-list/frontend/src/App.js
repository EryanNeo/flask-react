import './App.css';
import { useState,useEffect } from 'react';
import ContactList from './ContactList';
import ContactForm from './ContactForm';

function App() {
  const [contacts,setContacts] = useState([]);
  const [isModalOpen,setModalOpen] = useState(false);
  const [currentContact,setCurrentContact] = useState({});

  function closeModal(){
    setModalOpen(false);
    setCurrentContact({});
  }
  function openCreateModal(){
    if(!isModalOpen){
      setModalOpen(true);
    }
  }
  function openEditModal(contact){
    if(isModalOpen){
      return
    }
    setCurrentContact(contact);
    setModalOpen(true)
  }
  function onUpdate(){
    closeModal();
    fetchContacts();
  }
  
  useEffect(()=>{
    fetchContacts();
  },[]);

  const fetchContacts = async ()=>{
    const response = await fetch('http://localhost:5000/contacts');
    const data = await response.json();
    setContacts(data.contacts);
  }

  return (
    <div className="App">
      <ContactList contacts={contacts} updateContact={openEditModal} updateCallBack={onUpdate}/>
      <button onClick={openCreateModal}>Create New Contact</button>
      {
        isModalOpen && 
        <div className='modal'>
          <div className="modal-content">
            <span className='close' onClick={closeModal}>&times;</span>
            <ContactForm existingContact={currentContact} updateCallBack={onUpdate}/>
          </div>
        </div>
      }
    </div>
  );
}

export default App;
