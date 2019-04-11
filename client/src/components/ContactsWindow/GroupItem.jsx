import React, { Component } from 'react';
import { graphql, createFragmentContainer } from 'react-relay';

import avatar from '../../assets/group_avatar.png'





class GroupItem extends Component {
    constructor() {
      super();
      this._handleClick = this._handleClick.bind(this);
    }
  
    _handleClick() {
      if (this.props.onClick) {
        this.props.onClick();
      }
    }
  
    render() {
      var group = this.props.group;
      let edges = group && group.messages && group.messages.edges;
      let edge = edges && edges[edges.length - 1];
      let message = edge && edge.node;


      return ( 
      <div className = 'contact-window-contact'
           onClick = { this._handleClick }
        >
        <div style={{position: 'relative'}}>
          { group.newMessages != 0 && <div className="contact-new-messages-count group">
            { group.newMessages }
          </div>}
          <img className = "contact-window-contact-picture" src={ group.picture || avatar } alt = "picture" />
        </div>
        <div className = "contact-window-contact-info" >
          <span className = "contact-window-contact-name" > { group.name } </span>
          {message && 
            <span className = "contact-window-contact-msg">
              <span >{ message.data.text || message.data.emoji || message.data.fileName }</span>
            </span>
          }
        </div >
      </div>
    );
  }
  }
  
  
  export default createFragmentContainer(
    GroupItem,
    graphql`
      fragment GroupItem_group on Group @argumentDefinitions(
                                                  count: { type: "Int" , defaultValue: 20 }
                                                  cursor: { type: "ID" } 
                                                ){
      id
      name
      newMessages
      picture
      messages(last: $count, before: $cursor)
        @connection(key: "GroupMessageList_messages") {
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
  
  