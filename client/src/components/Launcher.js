import PropTypes from 'prop-types';
import React, { Component } from 'react';

import ContactsWindow from "./ContactsWindow";
import ContactChatWindow from './ContactChatWindow';
import GroupChatWindow from './GroupChatWindow';
import launcherIcon from './../assets/logo-no-bg.svg';
import incomingMessageSound from './../assets/sounds/notification.mp3';
import launcherIconActive from './../assets/close-icon.png';


class Launcher extends Component {

  constructor() {
    super();
    this.state = {
      visableChats: {},
      launcherIcon,
      isOpen: false
    };
  }

  // componentWillReceiveProps(nextProps) {
  //   const isIncoming = (nextMessage || {}).author.id !== this.props.me.id;
  //   if (isIncoming && nextProps.ContactMessageList.length > this.props.ContactMessageList.length) {
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
    this.state.visableChats[contact.id] = false;
    this.setState({
      visableChats: this.state.visableChats
    })
  }

  onContactClick(contact) {
    this.state.visableChats[contact.id] = true;
    this.setState({
      visableChats: this.state.visableChats
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
    let groups = (this.props.me && this.props.me.groups && this.props.me.groups.edges) || [];
    let contacts = (this.props.me && this.props.me.contacts && this.props.me.contacts.edges) || [];

    let edges = groups.concat(contacts);
    return (
      <div id="sc-launcher">
        <div className={launcherClassList.join(' ')} onClick={this.handleClick.bind(this)}>
          <MessageCount contacts={ edges || []} isOpen={isOpen} />
          <img className={"sc-open-icon"} src={launcherIconActive} />
          <img className={"sc-closed-icon"} src={launcherIcon} />
        </div>
        <div className={areaClassList.join(' ')}>
          <ContactsWindow onClose={this.handleClick.bind(this)}
                          onContactClick={this.onContactClick.bind(this)} 
                          user={this.props.me }
          />
          { edges.map( ({node} ) => {
              if(this.state.visableChats[node.id]){
                if (node.username) {
                  return (
                    <ContactChatWindow 
                      key={node.id}
                      contact={node}
                      isOpen={true}
                      onClose={() => {this.onContactClose(node)} } 
                      showEmoji={this.props.showEmoji}
                    />
                  )
                } else {
                  return (
                    <GroupChatWindow 
                      key={node.id}
                      group={node}
                      isOpen={true}
                      onClose={() => {this.onContactClose(node)} } 
                      showEmoji={this.props.showEmoji}
                    />
                  )
                }
              }
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
  props.contacts.forEach(({node}) => {
    count += node.newMessages;
  });
  if (count === 0) return null;
  return (
    <div className={"sc-new-messages-count"}>
      {count}
    </div>
  )
}

export default Launcher;
