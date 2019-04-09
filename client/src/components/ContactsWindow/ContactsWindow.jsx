import React, { Component } from 'react';
import { graphql, createFragmentContainer } from 'react-relay';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from "@material-ui/icons/Search";

import ContactItem from './ContactItem'
import Search from './Search'
import { addContact } from '../../mutations'
import {UserContext} from '../../UserContext'

import closeIcon from '../../assets/close-icon.png';




class ContactList extends Component {

    render() {
      var items = this.props.contacts &&
       this.props.contacts.map(
        ({node}) => {
          return <ContactItem key={ node.id }
                    contact={ node }
                    onClick={ () => {this.props.onClick( node)} }
                  />
        }
      );
      return <div className="contact-window-contact-list"> { items } </div>
    }
}

class ContactHeader extends Component {
  static contextType = UserContext;

  state = {
    search: false
  }
  searchClick() {
    this.setState({
      search: !this.state.search
    })
  }

  searchItemSelected( item ) {
    addContact.commit(
      this.props.relay.environment,
      item.id,
      this.context.id
    )
    this.setState({
      search: false
    });
    this.props.onContactClick(item);
  }
  render(){
    return (
      <div className="sc-header contacts">
        <div style={{display: "flex"}}>
          <img className="contact-window-img" src="https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png" alt="" />
          <div className="sc-header--team-name"> Contact List </div>
          <IconButton  onClick={this.searchClick.bind(this)} style={{padding: 0, color: "white"}} aria-label="Search">
            <SearchIcon style={{alignSelf: "center"}}/>
          </IconButton>
          <div className="sc-header--close-button" onClick={this.props.onClose}>
            <img src={closeIcon} alt="" />
          </div>
        </div>
        {this.state.search && <Search style={{
                                        paddingRight: "10px",
                                        paddingLeft: "10px"
                                      }} onSelect={this.searchItemSelected.bind(this)} />}
      </div>
    );  
  }
}



class ContactsWindow extends Component {
    render() {
      return ( 
            <div className='contact-window'>
                < ContactHeader onClose={this.props.onClose}  {...this.props}> Contact List </ContactHeader> 
                < ContactList onClick={this.props.onContactClick} contacts={ this.props.user &&
                                                                             this.props.user.contacts && 
                                                                             this.props.user.contacts.edges} />  
            </div >
        )
    }
}
  
export default createFragmentContainer(ContactsWindow,  
  graphql`
      fragment ContactsWindow_user on User {
        contacts(first: 2147483647 # max GraphQLInt
        ) @connection(key: "Launcher_contacts") {
          edges {
            node {
              id
              name
              username
              online
              newMessages
              ...ContactItem_contact
              }
            }
        }
      }`);
