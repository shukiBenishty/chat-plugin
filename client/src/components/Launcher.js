import PropTypes from 'prop-types';
import React, { Component } from 'react';

import ContactsWindow from "./ContactsWindow";
import ChatWindow from './ChatWindow';
import launcherIcon from './../assets/logo-no-bg.svg';
import incomingMessageSound from './../assets/sounds/notification.mp3';
import launcherIconActive from './../assets/close-icon.png';


class Launcher extends Component {

  constructor() {
    super();
    this.state = {
      visableContacts: {},
      launcherIcon,
      isOpen: false
    };
  }

  // componentWillReceiveProps(nextProps) {
  //   const isIncoming = (nextMessage || {}).author.id !== this.props.me.id;
  //   if (isIncoming && nextProps.messageList.length > this.props.messageList.length) {
  //     this.playIncomingMessageSound()
  //   }
  // }

  playIncomingMessageSound() {
    var audio = new Audio(incomingMessageSound);
    audio.play();
  }

  handleClick(contact) {
    if (this.props.handleClick !== undefined) {
      this.props.handleClick();
    } else {
      this.setState({
        isOpen: !this.state.isOpen,
      });
    }
  }

  onContactClose(contact) {
    this.state.visableContacts[contact.id] = false;
    this.setState({
      visableContacts: this.state.visableContacts
    })
  }

  onContactClick(contact) {
    this.state.visableContacts[contact.id] = true;
    this.setState({
      visableContacts: this.state.visableContacts
    })
  }


  render() {
    const isOpen = this.props.hasOwnProperty('isOpen') ? this.props.isOpen : this.state.isOpen;
    const launcherClassList = [
      'sc-launcher',
      (isOpen ? 'opened' : ''),
    ];
    const areaClassList = [
      'sc-chat-wnidows-area',
      (isOpen ? 'opened' : ''),
    ];
    return (
      <div id="sc-launcher">
        <div className={launcherClassList.join(' ')} onClick={this.handleClick.bind(this)}>
          <MessageCount contacts={this.props.me && this.props.me.contacts || []} isOpen={isOpen} />
          <img className={"sc-open-icon"} src={launcherIconActive} />
          <img className={"sc-closed-icon"} src={launcherIcon} />
        </div>
        <div className={areaClassList.join(' ')}>
          <ContactsWindow onClose={this.handleClick.bind(this)} onContactClick={this.onContactClick.bind(this)} user={this.props.me }/>
          { this.props.me &&
           this.props.me.contacts &&
           this.props.me.contacts.map( (contact ) => {
              return (
                this.state.visableContacts[contact.id] &&
                <ChatWindow 
                  key={contact.id}
                  contact={contact}
                  isOpen={true}
                  onClose={() => {this.onContactClose(contact)} } 
                  showEmoji={this.props.showEmoji}
                />
              )
            })
          }
        </div>
      </div>
    );
  }
}

const MessageCount = (props) => {

  if (props.isOpen === true) return null;
  let count = 0;
  props.contacts.forEach(contact => {
    count += contact.newMessages;
  });
  if (count === 0) return null;
  return (
    <div className={"sc-new-messages-count"}>
      {count}
    </div>
  )
}

export default Launcher;
