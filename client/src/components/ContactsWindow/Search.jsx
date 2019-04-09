import { graphql, requestSubscription, QueryRenderer } from 'react-relay';
import environment from '../../../Environment';

import React from 'react';
import deburr from 'lodash/deburr';
import Downshift from 'downshift';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';

import avatar from '../../assets/men_avatar.jpg'

function renderInput(inputProps) {
  const { InputProps, classes, ref, ...other } = inputProps;

  return (
    <TextField
      InputProps={{
        inputRef: ref,
        classes: {
          root: classes.inputRoot,
          input: classes.inputInput,
        },
        ...InputProps,
      }}
      {...other}
    />
  );
}

function renderSuggestion({ suggestion, index, itemProps, highlightedIndex, selectedItem }) {
  const isHighlighted = highlightedIndex === index;
  const isSelected = (selectedItem || '').indexOf(suggestion.name) > -1;

  return (
    <MenuItem
      {...itemProps}
      key={suggestion.username}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400,
      }}
    >
      <div style={{
          display: "flex",
          flexDirection: "row",
          cursor: "pointer",
          padding: "2px",
          maxWidth: "250px",
          alignItems: "center", 
          overflowX: "hidden"
      }}>
        <img style={{
            borderRadius: "50%",
            height: "40px",
            width: "40px",
            alignSelf: "center",
            padding: "10px"
          }}src={ suggestion.picture || avatar } alt = "picture"
         />
        <div style={{
            justifyContent: "center",
            marginLeft: "15px"
            
          }}
         >
           { suggestion.name } 
        </div >
      </div>
    </MenuItem>
  );
}

function getSuggestions(suggestions, value) {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0
    ? suggestions.slice(0, 5)
    : suggestions.filter(suggestion => {
        const keep =
          count < 5 && suggestion.name.slice(0, inputLength).toLowerCase() === inputValue;

        if (keep) {
          count += 1;
        }

        return keep;
      });
}



const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  container: {
    flexGrow: 1,
    position: 'relative',
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
  },
  inputRoot: {
    flexWrap: 'wrap',
  },
  inputInput: {
    width: 'auto',
    flexGrow: 1,
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
});

function search(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Downshift id="downshift-simple" 
        onChange={props.onSelect}
        itemToString={item => (item ? item.name : '')}>
      
        {({
          getInputProps,
          getItemProps,
          getMenuProps,
          highlightedIndex,
          inputValue,
          isOpen,
          selectedItem,
        }) => (
          <div className={classes.container}>
            {renderInput({
              fullWidth: true,
              classes,
              InputProps: getInputProps({
                placeholder: 'Search New Contact',
              }),
            })
            }
            <div {...getMenuProps()}>
              {isOpen ? (
                <Paper className={classes.paper} square>
                  {getSuggestions(props.contacts, inputValue).map((suggestion, index) =>
                    renderSuggestion({
                      suggestion,
                      index,
                      itemProps: getItemProps({ item: suggestion }),
                      highlightedIndex,
                      selectedItem,
                    }),
                  )}
                </Paper>
              ) : null}
            </div>
          </div>
        )}
      </Downshift>
    </div>
  );
}


const Search = withStyles(styles, { withTheme: true })(search);



const query = graphql`
query Search_Query {
  contacts {
    id
    name
    username
    picture
    ...ChatWindow_contact
    newMessages
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
          return <Search {...props }{...args}/>;
          } 

          return<div >
                </div>
      }}/>
  )
}
