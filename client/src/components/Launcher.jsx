import React, {Component} from 'react';
import { graphql, requestSubscription, QueryRenderer } from 'react-relay';
import { ConnectionHandler } from 'relay-runtime';

import { UserContext } from "../UserContext";
import environment from '../../Environment';

import Launcher from './Launcher.js';


const realtimeEventsSubscription = graphql`
  subscription Launcher_Subscription {
    generalInfo {
      online{
        id
        online
      }
      readed {
        id
        readed
        destination {
            ...on Contact {
              id
            }
        }
        received
      }
      newMessage {
        id
        author{
            id
            newMessages
        }
        data{
            ...on Text{
            text
            }
            ...on Emoji {
            emoji
            }
            ...on File {
            url
            fileName
            }
        }
        destination {
            ...on Contact {
              id
            }
        }
        dateSended
        createdAt
        readed
        received
        }
    }
}`;

const query = graphql`
  query Launcher_Query {
    me {
      id
      name
      username
      admin
      contacts(first: 2147483647 # max GraphQLInt
        ) @connection(key: "Launcher_contacts") {
          edges {
            node {
              id
              ...ContactChatWindow_contact
              newMessages
              }
            }
        }
      ...ContactsWindow_user
    }
  }`


class App extends Component {
  
    subscriptionConfig = {
      subscription: realtimeEventsSubscription,
      variables: {},
      updater: (store, data) => {
        if (data.generalInfo.newMessage) {
          const message = store.get( data.generalInfo.newMessage.id);
          const contact = store.get( data.generalInfo.newMessage.author.id);
  
          const messages = ConnectionHandler.getConnection(contact, 'ContactMessageList_messages');
          const edge = ConnectionHandler.createEdge(store, messages, message, 'Message', message.id);

          ConnectionHandler.insertEdgeAfter(messages, edge);
        }
      }
    }

    componentDidMount() {
      this.subscriptionConfig.variables = { contactId: this.props.me && this.props.me.id };
      this.subscription = requestSubscription(
        environment,
        this.subscriptionConfig
      )
  
    }
  
  
    componentWillUnmount() {
      this.subscription.dispose();
      this.subscription = null;
    }
  
    render() {
      let props = this.props;
      return (
        <UserContext.Provider value={props.me}>
            <Launcher {...props} />
        </UserContext.Provider>
        )
         
    }
  }
  
  
export default (args) => {
    return (<QueryRenderer
        environment={environment}
        query={query}
        variables={{}}
        render={({ error, props }) => {
            if (error) {
            return <div>Error: {error}</div>;
            }
            if (props) {
            return <App {...props }{...args}/>;
            } 

            return<div id="sc-launcher">
                    <div className="sc-launcher">
                      <div className="lds-css ng-scope" style={{width: '200px' , height:'200px'}}>
                        <div style={{width: '100%' , height:'100%'}} className="lds-eclipse">
                          <div></div>
                        </div>
                      </div>
                    </div>
                  </div>
        }}/>
    )
}
