import React, { Component } from 'react';
import { graphql, createFragmentContainer } from 'react-relay';

import {UserContext} from '../../UserContext'
import EditGroup from './EditGroup'
import closeIcon from '../../assets/close-icon.png';
import avatar from '../../assets/men_avatar.jpg'

class Header extends Component {
  static contextType = UserContext;

  render() {
    return (
      <div className="sc-header">
        <img className="sc-header--img" src={ this.props.group.picture || avatar } alt="" />
        <div className="sc-header--team-name"> {this.props.group.name} </div>
        {this.context.admin && <EditGroup {...this.props}/>}
        <div className="sc-header--close-button" onClick={this.props.onClose}>
          <img src={closeIcon} alt="" />
        </div>
      </div>
    );
  }
}



export default createFragmentContainer(
  Header,  
  graphql`
      fragment Header_group on Group {
          name
          picture
          ...EditGroup_group
      }`);

