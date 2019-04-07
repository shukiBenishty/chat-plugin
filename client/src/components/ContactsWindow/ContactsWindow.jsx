import React, { Component } from 'react';
import { graphql, createFragmentContainer } from 'react-relay';

import ContactItem from './ContactItem'
import Search from './Search'
import closeIcon from '../../assets/close-icon.png';




class ContactList extends Component {
  
    render() {
      var items = this.props.contacts &&
       this.props.contacts.map(
        (contact) => {
          return <ContactItem key={ contact.id }
                    contact={ contact }
                    onClick={ () => {this.props.onClick( contact)} }
                  />
        }
      );
      return <div className="contact-window-contact-list"> {
        items
      } </div>
    }
}

const ContactHeader = props => {
    return (
      <div className="sc-header contacts">
        <div style={{display: "flex"}}>
          <img className="contact-window-img" src="https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png" alt="" />
          <div className="sc-header--team-name"> Contact List </div>
          <div className="sc-header--close-button" onClick={props.onClose}>
            <img src={closeIcon} alt="" />
          </div>
        </div>
        <Search/>
      </div>
    );
}



class ContactsWindow extends Component {
    render() {
      return ( 
            <div className='contact-window'>
                < ContactHeader onClose={this.props.onClose}> Contact List </ContactHeader> 
                < ContactList onClick={this.props.onContactClick} contacts={ this.props.user && this.props.user.contacts} />  
            </div >
        )
    }
}
  
export default createFragmentContainer(ContactsWindow,  
  graphql`
      fragment ContactsWindow_user on User {
        contacts{
          id
          name
          username
          online
          newMessages
          ...ContactItem_contact
        }
      }`);
