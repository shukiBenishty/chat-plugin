import React, { Component } from 'react';
import closeIcon from '../../assets/close-icon.png';

import avatar from '../../assets/men_avatar.jpg'

class Header extends Component {

  render() {
    return (
      <div className="sc-header">
        <img className="sc-header--img" src={ this.props.imageUrl || avatar } alt="" />
        <div className="sc-header--team-name"> {this.props.teamName} </div>
        <div className="sc-header--close-button" onClick={this.props.onClose}>
          <img src={closeIcon} alt="" />
        </div>
      </div>
    );
  }
}

export default Header;
