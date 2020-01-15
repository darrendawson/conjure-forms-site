import React from 'react';
import logo from './logo.svg';
import './App.css';

// local components
import DropDown from './Components/DropDown/DropDown.js';

// Conjure Forms
import ConjureFormController from 'conjure-form';
import 'conjure-form/build/main.css';

// images
import __img_ConjureLogo from './Images/mc_1200.png';

// =============================================================================
// Constants
// =============================================================================

import __sampleForm_YC from './SampleForms/YC_Form.json';
import __sampleForm_SQLite from './SampleForms/SQLite_Form.json';
import __sampleForm_Twitch from './SampleForms/Twitch_Form.json';

const __formLookup = {
  "YC Application": __sampleForm_YC,
  "SQLite": __sampleForm_SQLite,
  "Twitch": __sampleForm_Twitch
};

let __formOptions = [];
for (let key in __formLookup) {
  __formOptions.push(key);
}

// =============================================================================
// <App/>
// =============================================================================

class App extends React.Component {

  constructor() {
    super();

    let currentFormName = __formOptions[0];
    let currentFormDetails = __formLookup[currentFormName];

    // initialize Conjure Form
    let rerender = function() { this.forceUpdate() }.bind(this);
    let form = new ConjureFormController(currentFormDetails, rerender);

    this.state = {
      selectedForm: currentFormName,
      conjureForm: form
    }
  }

  // Interaction ---------------------------------------------------------------

  onClick_selectForm = (formName) => {
    if (this.state.selectedForm !== formName) {
      this.state.conjureForm.loadForm(__formLookup[formName]);
      this.setState({selectedForm: formName});
    }
  }


  // render --------------------------------------------------------------------

  renderForms = () => {
    return (
      <div id="page_item_form_container">
        <div className="form_container">
          <div className="row_space_between">
            <h1 className="title">Survey</h1>
            <div style={{'width': '200px', 'height': '50px'}}>
              <DropDown
                selected={this.state.selectedForm}
                options={__formOptions}
                onClick_selectOption={this.onClick_selectForm}
              />
            </div>
          </div>
          <div id="output_object_container">
            {this.state.conjureForm.renderForm()}
          </div>

        </div>

        <div className="form_container">
          <h1 className="title">Output</h1>
          <div id="output_object_container">
            {this.state.conjureForm.renderFormResults()}
          </div>
        </div>
      </div>
    );
  }

  renderConjureDescription = () => {
    return (
      <div className="section_container">
        <img id="conjure_logo" src={__img_ConjureLogo}/>
        <h1 id="demo_title">Conjure Forms</h1>
        <p className="demo_description">Powerful and flexible surveys for React.js</p>
        <div className='button_container'>
          <button id="npm_button" className="action_button">NPM</button>
          <button id="get_started_button" className="action_button">Get Started</button>
          <button id="github_button" className="action_button">Github</button>
        </div>
      </div>
    );
  }

  renderFooter = () => {
    return (
      <div>
        {this.renderRainbowBoundaryLine()}
        <p style={{'text-align': 'right', 'margin': '0px 0px 30px 0px', 'font-size': '1.2em'}}>Made by <a href="https://thedarrendawson.com" target="__blank">Darren Dawson</a></p>
      </div>
    );
  }

  renderRainbowBoundaryLine = () => {
    return (
      <div className="boundary_line_container">
        <div className="boundary_line_subsection" style={{'background-color': '#ec1150'}}></div>
        <div className="boundary_line_subsection" style={{'background-color': '#17e573'}}></div>
        <div className="boundary_line_subsection" style={{'background-color': '#19b1ea'}}></div>
      </div>
    );
  }

  render() {
    return (
      <div id="App">
        <div id="content_column">
          {this.renderConjureDescription()}
          <h1 className="section_title">Example Surveys</h1>
          {this.renderForms()}
          {this.renderFooter()}
        </div>
      </div>
    );
  }

}

export default App;
