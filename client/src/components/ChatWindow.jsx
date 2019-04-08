import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { graphql, createFragmentContainer } from 'react-relay';

import { sendMessageText, sendMessageEmoji, sendMessageFile} from '../mutations'
import MessageList from './MessageList'
import UserInput from './UserInput'
import Header from './Header'


class ChatWindow extends Component {
    constructor(props) {
      super(props);
    }

    onUserInputSubmit(message) {
      if (message.data.text) {
        sendMessageText.commit(
          this.props.relay.environment,
          message.data,
          this.props.contact.id
        )
      } else {
        sendMessageEmoji.commit(
          this.props.relay.environment,
          message.data,
          this.props.contact.id
        )
      }
    }

    onFilesSelected(filesList) {
      const objectURL = window.URL.createObjectURL(filesList[0]);
      const message = {
        url: objectURL,
        fileName: filesList[0].name
      };
      sendMessageFile.commit(
        this.props.relay.environment,
        message,
        this.props.contact.id
      )
    }

    render() {
      let classList = [
        "sc-chat-window",
        (this.props.isOpen ? "opened" : "closed")
      ];
      return (
        <div className={classList.join(' ')}>
          <Header
            teamName={this.props.contact.name}
            imageUrl={this.props.contact.picture}
            onClose={this.props.onClose}
          />
          <MessageList
            list={this.props.contact}
            contactId={this.props.contact.id}
            imageUrl={this.props.contact.picture}
          />
          <UserInput
            onSubmit={this.onUserInputSubmit.bind(this)}
            onFilesSelected={this.onFilesSelected.bind(this)}
            showEmoji={this.props.showEmoji}
          />
        </div>
      );
    }
}


export default createFragmentContainer(ChatWindow,  
  graphql`
      fragment ChatWindow_contact on Contact {
          id
          name
          username
          online
          picture
          newMessages
          ...MessageList_list
      }`);