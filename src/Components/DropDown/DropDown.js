import React, { Component } from 'react';
import './DropDown.css';

class DropDown extends Component {

  constructor() {
    super();

    this.state = {
      expanded: false
    };
  }


  // onClick -------------------------------------------------------------------

  onClick_selectOption = (newOption) => {
    if (newOption && (newOption !== this.props.selected)) {
      this.props.onClick_selectOption(newOption);
    }
    this.setState({expanded: !this.state.expanded});
  }


  // render --------------------------------------------------------------------


  renderOption = (option) => {
    if (option === this.props.selected) {
      return (
        <div className="option_container_selected" onClick={() => this.onClick_selectOption(option)}>
          <p className="option_text">{option}</p>
        </div>
      );
    } else {
      return (
        <div className="option_container" onClick={() => this.onClick_selectOption(option)}>
          <p className="option_text">{option}</p>
        </div>
      );
    }
  }


  // renders what <DropDown/> looks like when user is selecting a new option
  renderExpanded = () => {
    if (! this.state.expanded) { return; }


    let optionsToRender = [];
    for (let i = 0; i < this.props.options.length; i++) {
      optionsToRender.push(this.renderOption(this.props.options[i]))
    }


    return (
      <div id="expanded_container" onMouseLeave={() => this.setState({'expanded': false})}>
        {optionsToRender}
      </div>
    );
  }


  // renders what <DropDown/> looks like when its retracted
  renderRetracted = () => {
    if (this.state.expanded) { return; }

    return (
      <div className="option_container_retracted" onClick={() => this.onClick_selectOption(false)}>
        <p className="option_text">{this.props.selected}</p>
        <h3 className="dropdown_status_text">v</h3>
      </div>
    );
  }


  // Renders <DropDown/>
  render() {
    return (
      <div id="DropDown">
        {this.renderExpanded()}
        {this.renderRetracted()}
      </div>
    );
  }
}

export default DropDown;
