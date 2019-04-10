import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { graphql, createFragmentContainer } from 'react-relay';

import { sendMessageText, sendMessageEmoji, sendMessageFile} from '../mutations'
import ContactMessageList from './ContactMessageList'
import UserInput from './UserInput'
import Header from './Header'


class GroupChatWindow extends Component {
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
          <ContactMessageList
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


export default createFragmentContainer(GroupChatWindow,  
  graphql`
      fragment GroupChatWindow_contact on Group {
          id
          subscribers
          messages
          ...GroupMessageList_list
      }`);