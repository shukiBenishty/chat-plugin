import React, { Component } from "react";
import { QueryRenderer, graphql, createFragmentContainer } from 'react-relay';
import Paper from '@material-ui/core/Paper';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';

import { editGroup } from '../../mutations'
import environment from '../../../Environment';
import editIcon from '../../assets/edit.png'
import checkIcon from '../../assets/check-mark.png';
import closeIcon from '../../assets/close-icon.png';


function getStyles(name, that) {
return {
    fontWeight:
    that.state.name.indexOf(name) === -1
        ? that.props.theme.typography.fontWeightRegular
        : that.props.theme.typography.fontWeightMedium,
};
}
  
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      formControl: {
        margin: theme.spacing.unit,
        minWidth: 192,
        maxWidth: 300,
      },
      chips: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      chip: {
        margin: theme.spacing.unit / 4,
      },
    paper: {
      position: 'absolute',
      zIndex: 1,
      marginTop: theme.spacing.unit,
      maxHeight: ITEM_HEIGHT * 7.5 + ITEM_PADDING_TOP,
      overflow: 'scroll',
      left: 0,
      right: 0,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit
    }
  });
  

class EditGroup extends Component {
    state = {
        open: false,
        unsubscribe: [],
        newSubscribe: []
    };

    onClick(changed){
        if (changed) {
          editGroup.commit(
            this.props.relay.environment,
            { 
              groupId: this.props.group.id, 
              subscribers: this.state.newSubscribe, 
              unsubscribers: this.state.unsubscribe
             }
          )
          this.setState({
            unsubscribe: [],
            newSubscribe: [],
            open: !this.state.open
          });
        } else{
          this.setState({open: !this.state.open})
        }
    }

    onChange(event){
        let id = event.target.value;
        if (event.target.checked) {
            let unIndex = this.state.unsubscribe.indexOf(id);
            ( unIndex !== -1) ?
                this.state.unsubscribe.splice(unIndex, 1) :
                this.state.newSubscribe.push(id);
        } else { 
            let index = this.state.newSubscribe.indexOf(id);
            ( index !== -1) ?
                this.state.newSubscribe.splice(index, 1) :
                this.state.unsubscribe.push(id);
        }
        this.setState({ state: this.state });
    }
  render() {
    const { classes } = this.props;
    let open = this.state.open;
    let subscribers = this.props.group.subscribers.edges.map(({node: {id}}) => id) ;
    let changed = this.state.unsubscribe.length !== 0 || this.state.newSubscribe.length !== 0 ;
    return (
          <div style={{alignSelf: "center"}}>
            <div  className="sc-header--edit-button" onClick={() => {this.onClick(changed)}}>
                 <img src={open ?(changed ? checkIcon : closeIcon) : editIcon } alt="" />
            </div>
            <div >
              {open ? (
                <Paper className={classes.paper} square >
                    {this.props.contacts.map( ({id, name}) => (
                        <MenuItem key={id} value={id}>
                            <Checkbox checked={(subscribers.indexOf(id) !== -1 ) ?
                                                this.state.unsubscribe.indexOf(id) === -1 :
                                                this.state.newSubscribe.indexOf(id) !== -1}
                                value={id}
                                onChange={this.onChange.bind(this)} />
                            <ListItemText primary={name} />
                        </MenuItem>
                    ))}
                </Paper>
              ) : null}
            </div>
          </div>
    );
  }
}



const query = graphql`
query EditGroup_Query {
  contacts(all: true) {
    id
    name
  }
}`

let _EditGroup = (args) => {
  return (<QueryRenderer
                environment={environment}
                query={query}
                variables={{}}
                render={({ error, props }) => {
          if (error) {
          return <div>Error: {error}</div>;
          }
          if (props) {
          return <EditGroup {...props }{...args}/>;
          } 

          return    <div style={{alignSelf: "center"}}>
                        <div  className="sc-header--edit-button" >
                            <img src={ editIcon } alt="" />
                        </div>
                    </div >
      }}/>
  )
}


export default createFragmentContainer(
    withStyles(styles, { withTheme: true })(_EditGroup),  
    graphql`
        fragment EditGroup_group on Group {
            id
            subscribers( first: 2147483647 )@connection(key: "EditGroup_subscribers"){
              edges{
                node{
                    id
                    name
                }
              }
            }
        }`);

