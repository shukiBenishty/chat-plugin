import React, { Component } from 'react';
import { graphql, createPaginationContainer } from 'react-relay';

import Message from '../Message'

class GroupMessageList extends Component {

  componentDidUpdate(prevProps, prevState) {
    try {
      var currentLastMessage = this.props.list.messages.edges[this.props.list.messages.edges.length - 1].node;
      var prevLastMessage = prevProps.list.messages.edges[prevProps.list.messages.edges.length - 1].node;
      if(currentLastMessage.id !== prevLastMessage.id){
        //new message arived
        this.scrollList.scrollTop = this.scrollList.scrollHeight;
      }    
    } catch (error) {
      
    }
  }

  componentDidMount() {
    this.scrollList.scrollTop = this.scrollList.scrollHeight; 
  }

  onScroll(a ) {
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
        error && console.error(error);
      },
    );
  }
  render () {
    let edges = (this.props.list.messages && this.props.list.messages.edges) || []
    return (
      <div className="sc-message-list" onScroll={this.onScroll.bind(this)} ref={el => this.scrollList = el}>
        {edges.map(({node}) => {
          return <Message  key={node.id} message={node} group={true} />
        })}
      </div>)
  }
}

 

 export default createPaginationContainer(
  GroupMessageList,
  graphql`
    fragment GroupMessageList_list on Group

      @argumentDefinitions(  count: { type: "Int" , defaultValue: 20 } cursor: { type: "ID" } ) {
        messages(last: $count, before: $cursor) @connection(key: "GroupMessageList_messages") {
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
      query GroupMessageList_Query($last: Int, $before: ID, $groupId: ID!) {
      list: group(groupId: $groupId){
        messages(last: $last, before: $before)@connection(key: "GroupMessageList_messages") {
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
        groupId: props.groupId,
        last: count,
        before: cursor
      }
    }
  }
);

