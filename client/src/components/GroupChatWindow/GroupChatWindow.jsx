import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { graphql, createFragmentContainer } from 'react-relay';

import { sendMessageText, sendMessageEmoji, sendMessageFile} from '../../mutations'
import GroupMessageList from './GroupMessageList'
import UserInput from '../UserInput'
import Header from '../GroupChatWindow/Header'


class GroupChatWindow extends Component {
    constructor(props) {
      super(props);
    }

    onUserInputSubmit(message) {
      if (message.data.text) {
        sendMessageText.commit(
          this.props.relay.environment,
          message.data,
          this.props.group.id
        )
      } else {
        sendMessageEmoji.commit(
          this.props.relay.environment,
          message.data,
          this.props.group.id
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
        this.props.group.id
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
            group={this.props.group}
            onClose={this.props.onClose}
          />
          <GroupMessageList
            list={this.props.group}
            groupId={this.props.group.id}
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
      fragment GroupChatWindow_group on Group {
          id
          name
          picture
          ...Header_group
          ...GroupMessageList_list
      }`);