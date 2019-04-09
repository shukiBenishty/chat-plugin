import React, { Component } from 'react';
import { graphql, createFragmentContainer, requestSubscription } from 'react-relay';

import avatar from '../../assets/men_avatar.jpg'

import environment from '../../../Environment';

const realtimeEventsSubscription = graphql`
  subscription ContactItem_Subscription($contactId: ID) {
  generalInfo(contactId: $contactId) {
    typing {
      id 
    }
    typingForMe{
      id
    }
  }
}`;


class ContactItem extends Component {
    constructor() {
      super();
      this._handleClick = this._handleClick.bind(this);
      this.  state = {
        typing: false,
        typingForMe: false
      }
    }
  

    subscriptionConfig = {
      subscription: realtimeEventsSubscription,
      variables: { },
      updater: (store, data) => {
        if (data.generalInfo.typing) {
          if (this.typingTimeout) {
            clearTimeout(this.typingTimeout)
          }
          this.setState({typing: true});
          this.typingTimeout = setTimeout(() => {
            this.setState({typing: false});
          }, 5000)
        }
        
        if (data.generalInfo.typingForMe) {
          if (this.typingForMeTimeout) {
            clearTimeout(this.typingForMeTimeout)
          }
          this.setState({typingForMe: true});
          this.typingForMeTimeout = setTimeout(() => {
            this.setState({typingForMe: false});
          }, 5000)
        }
      },
    }
    componentDidMount() {
      this.subscriptionConfig.variables = { contactId: this.props.contact.id };
      this.subscription = requestSubscription(
        environment,
        this.subscriptionConfig
      )
    }
  
    componentWillUnmount() {
      this.subscription.dispose();
      this.subscription = null;
    }

    _handleClick() {
      if (this.props.onClick) {
        this.props.onClick();
      }
    }
  
    render() {
      var contact = this.props.contact;
      let edges = contact && contact.messages && contact.messages.edges;
      let edge = edges && edges[edges.length - 1];
      let message = edge && edge.node;
      let sendToMe = message && contact.id === message.author.id;
      let checkClassList = message && [
        "contact-window-check",
        ( message.received ? (message.readed ? "fas fa-check-double readed" : "fas fa-check-double" ): "fas fa-check" ),
      ];
      let typingClassList = [
        (( this.state.typing || this.state.typingForMe) && "contact-window-contact-typing" ),
        (this.state.typingForMe && "to-me")
      ];
      return ( 
      <div className = 'contact-window-contact'
           onClick = { this._handleClick }
        >
        <div style={{position: 'relative'}}>
          <MessageCount {...contact}/>
          <img className = "contact-window-contact-picture" src={ contact.picture || avatar } alt = "picture" />
        </div>
        <div className = "contact-window-contact-info" >
          <span className = "contact-window-contact-name" > { contact.name } </span>
          {( this.state.typing || this.state.typingForMe) &&
             <span className = {typingClassList.join(" ")} > Typing... </span>
          }
          {message && 
            <span className = "contact-window-contact-msg">
              {!sendToMe && <i className={checkClassList.join(" ")}></i>}
              <span >{ message.data.text || message.data.emoji || message.data.fileName }</span>
            </span>
          }
        </div >
      </div>
    );
  }
  }
  
  const MessageCount = (props) => {
    let messageCountClassList = [
      "contact-new-messages-count",
      (props.online ? "online" : "offline")
    ];
    return (
      <div className={messageCountClassList.join(" ")}>
        {(props.newMessages) ? props.newMessages : null}
      </div>
    )
  }

  export default createFragmentContainer(
    ContactItem,
    graphql`
      fragment ContactItem_contact on Contact @argumentDefinitions(
                                                  count: { type: "Int" , defaultValue: 20 }
                                                  cursor: { type: "ID" } 
                                                )
      {
      id
      name
      newMessages
      online
      picture
      messages(last: $count, before: $cursor)
        @connection(key: "MessageList_messages") {
        edges {
          node {
            id
            author {
              id
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
            readed
            received
          }
        }
      }
    }` 
  );
  
  