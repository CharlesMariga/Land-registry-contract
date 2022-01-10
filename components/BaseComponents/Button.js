import React, { Component } from "react";

export default class Button extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button
        type={this.props.type}
        className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        disabled={this.props.loading}
        onClick={this.props.onButtonclick}
      >
        {this.props.text}
      </button>
    );
  }
}
