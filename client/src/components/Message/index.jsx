import React, { Component } from 'react'
import { graphql, createFragmentContainer } from 'react-relay';

import TextMessage from './TextMessage'
import EmojiMessage from './EmojiMessage'
import FileMessage from './FileMessage'
import chatIconUrl from './../../assets/chat-icon.svg'

import {UserContext} from '../../UserContext'
import { readMessage } from "../../mutations";

class Message extends Component {
  static contextType = UserContext;

  componentDidMount() {
    if (!this.props.message.readed && this.props.message.destination.id === this.context.id) {
      readMessage.commit(
        this.props.relay.environment,
        this.props.message.id
      )
    }
  }

  _renderMessageOfType(type) {
    switch(type) {
      case 'Text':
        return <TextMessage {...this.props.message} />
      case 'Emoji':
        return <EmojiMessage {...this.props.message} />
      case 'File':
        return <FileMessage {...this.props.message} />
      default:
        console.error(`Attempting to load message with unsupported file type '${type}'`)
    }
  }

  render () {
    let sendByMe = this.props.message.author.id === this.context.id
    let contentClassList = [
      "sc-message--content",
      (sendByMe ? "sent" : "received")
    ];
    return (
      <div className="sc-message">
        <div className={contentClassList.join(" ")}>
          <div className="sc-message--avatar" style={{ backgroundImage: `url(${this.props.message.author.picture || chatIconUrl})` }}></div>
          {this._renderMessageOfType(this.props.message.data.__typename)}
        </div>
      </div>)
  }
}

export default createFragmentContainer(Message,  
  graphql`
      fragment Message_message on Message {
        id
        author{
          id
          picture
        }
        data{
          ...on Text{
            __typename
            text
          }
          ...on Emoji {
            __typename
            emoji
          }
          ...on File {
            __typename
            url
            fileName
          }
        }
        dateSended
        destination {
          ...on Contact {
            id
          }
        }
        createdAt
        readed
        received
      }`);
