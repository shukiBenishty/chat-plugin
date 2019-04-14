import React, { Component } from 'react';
import { graphql, createFragmentContainer } from 'react-relay';
import Linkify from 'react-linkify';
import {sendComment} from '../../mutations'


const TextMessage = (props) => {

  let sendcomment = (messageId, myVote) => {

    if (myVote !== props.textMessage.comments.myVote) {
      sendComment.commit(
        props.relay.environment,
        messageId,
        myVote
      ) 
    } else {
      sendComment.commit(
        props.relay.environment,
        messageId,
        null
      ) 
    }
  }

  let likeStyle = {
    margin: 'inherit',
  }
  if (props.textMessage.comments && props.textMessage.comments.myVote === "LIKE") {
    likeStyle.color= '#4e8cff'
  }
  let unlikeStyle = {
    margin: 'inherit',
  }
  if (props.textMessage.comments && props.textMessage.comments.myVote === "UNLIKE") {
    unlikeStyle.color= 'red'
  }
  return <div className="sc-message--text">
    <Linkify properties={{ target: '_blank' }}>
      <div>
        {props.textMessage.data.text}
      </div>
    </Linkify>
    {props.group && !props.sendByMe  && 
    <span style={{position:'absolute', bottom: 0, right: 0, margin: '0px 5px 2px 0px'}} >
      <i  className="far fa-thumbs-down"
          style={unlikeStyle} 
          onClick={() => {sendcomment(props.textMessage.id, 'UNLIKE')}}
      >
        {props.textMessage.comments.unlikes}
      </i>
      <i className="far fa-thumbs-up" style={likeStyle} onClick={() => {sendcomment(props.textMessage.id, 'LIKE')}}>{props.textMessage.comments.likes}</i>
    </span>}
  </div>
}

export default createFragmentContainer(
  TextMessage,  
  graphql`
      fragment TextMessage_textMessage on Message {
        id
        data{
          ...on Text{
            text
          }
        }
        comments {
          myVote
          likes
          unlikes
        }
      }`);
