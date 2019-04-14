import React, { Component } from "react";
import { graphql, requestSubscription, QueryRenderer } from 'react-relay';
import Downshift from "downshift";
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import ListItemText from '@material-ui/core/ListItemText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';

import environment from '../../../Environment';
import {UserContext} from '../../UserContext'
import {createGroup} from '../../mutations'
import addIcon from '../../assets/add-icon.png';
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
      maxHeight: '225px',
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
  

class CreateGroup extends Component {
    static contextType = UserContext;

    state = {
        name: "",
        picture: "",
        open: false,
        subscribers: []
    };

    onClick(valid){
        if (valid) {
          createGroup.commit(
            environment,
            this.context.id,
            {
              name: this.state.name,
              picture: this.state.picture, 
              subscribers: this.state.subscribers
            }
          )
        }
        this.setState({open: !this.state.open})
    }

  render() {
    const { classes } = this.props;
    let valid = this.state.name && this.state.picture && true;
    let open = this.state.open;
    return (
          <div>
            <div style={{ flexGrow: 2}}  onClick={ () => {this.onClick(valid)}} className="sc-header--close-button">
              <img style={{ padding: '9px'}} src={open ?(valid ? checkIcon : closeIcon) : addIcon } alt="" />
            </div>
            <div >
              {open ? (
                <Paper className={classes.paper} square>
                     <form className={classes.container} noValidate autoComplete="off">
                        <TextField
                            autoFocus={true}
                            onChange={value => { this.setState({ name: event.target.value })}}
                            label="Group Name"
                            placeholder="Enter Name"
                            className={classes.textField}
                            margin="normal"
                        />
                         <TextField 
                            disabled={!this.state.name}
                            onChange={value => { this.setState({ picture: event.target.value })}}
                            label="Picture"
                            value={this.state.picture}
                            placeholder="Enter Picture Url"
                            className={classes.textField}
                            margin="normal"
                        /> 
                        <FormControl disabled={!this.state.picture} className={classes.formControl}>
                            <InputLabel htmlFor="select-multiple-checkbox">Subscribers</InputLabel>
                            <Select
                                multiple
                                value={this.state.subscribers}
                                onChange={event => { 
                                    console.log(event.target.value);
                                    
                                    this.setState({ subscribers: event.target.value })
                                }}
                                input={<Input id="select-multiple-checkbox" />}
                                renderValue={selected => (selected ? "Subscribers Selected": '')}
                                MenuProps={MenuProps}
                            >
                                {this.props.contacts.map( ({id, name}) => (
                                <MenuItem key={id} value={id}>
                                    <Checkbox checked={this.state.subscribers.indexOf(id) > -1} />
                                    <ListItemText primary={name} />
                                </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </form>
                </Paper>
              ) : null}
            </div>
          </div>
    );
  }
}

let _createGroup =withStyles(styles, { withTheme: true })(CreateGroup);

const query = graphql`
query CreateGroup_Query {
  contacts(all:true) {
    id
    name
  }
}`

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
          return <_createGroup {...props }{...args}/>;
          } 

          return  <div style={{ flexGrow: 2}}  className="sc-header--close-button">
                    <img style={{ padding: '9px'}} src={addIcon } alt="" />
                  </div>
      }}/>
  )
}
