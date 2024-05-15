import React, { Component } from "react";

// Props
interface Props {}

// State
interface S {
  sampleStateNumber: number;
}

export default class Home extends Component<Props, S> {
  constructor(props: Props) {
    super(props);

    this.state = {
      sampleStateNumber: 0,
    };
  }

  render() {
    return <div>Home {this.state.sampleStateNumber} </div>;
  }
}
