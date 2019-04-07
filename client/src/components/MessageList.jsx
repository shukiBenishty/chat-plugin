import React, { Component } from 'react';
import { graphql, createPaginationContainer } from 'react-relay';

import Message from './Message'

class MessageList extends Component {

  componentDidUpdate(prevProps, prevState) {
    this.scrollList.scrollTop = this.scrollList.scrollHeight;
  }

  onScroll(a , b, c, d) {
    if (this.scrollList.scrollTop < 100) {
      this._loadMore()
    }
  }

  _loadMore() {
    if (!this.props.relay.hasMore() || this.props.relay.isLoading()) {
      return;
    }

    this.props.relay.loadMore(
      20,  // Fetch the next 10 feed items
      error => {
        console.log(error);
      },
    );
  }
  render () {
    return (
      <div className="sc-message-list" onScroll={this.onScroll.bind(this)} ref={el => this.scrollList = el}>
        {this.props.list.messages.edges.map(({node}) => {
          return <Message  key={node.id} message={node} />
        })}
      </div>)
  }
}

 

 export default createPaginationContainer(
  MessageList,
  graphql`
    fragment MessageList_list on Contact

      @argumentDefinitions(
        count: { type: "Int" , defaultValue: 20 }
        cursor: { type: "ID" } 
        contactId: { type: "ID" }
      ) {
        messages(last: $count, before: $cursor)
          @connection(key: "MessageList_messages") {
          edges {
            cursor
            node {
              id
               ...Message_message
              }
            }
          pageInfo{
            endCursor
            startCursor
            hasPreviousPage
          }
          totalCount
        }
      }`,
  {
    direction: 'backward',
    getConnectionFromProps: (props) => {
      return props.list && props.list.messages;
    },
    query: graphql`
      query MessageList_Query($last: Int, $before: ID, $contactId: ID!) {
      list: contact(contactId: $contactId){
        messages(last: $last, before: $before)@connection(key: "MessageList_messages") {
            edges {
              cursor
              node {
                id
                  ...Message_message
                }
              }
            pageInfo{
              endCursor
              startCursor
              hasPreviousPage
            }
            totalCount
          }
        }
    }`,
    getFragmentVariables: (prevVars, totalCount) => {
      return {
        ...prevVars,
        count: totalCount,
      };
    },
    getVariables: (props, {count, cursor}, fragmentVariables) => {
      return {
        contactId: props.contactId,
        last: count,
        before: cursor
      }
    }
  }
);

