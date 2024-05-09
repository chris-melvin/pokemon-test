import React, { Component } from "react";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { Box } from "@material-ui/core";

// Props
interface Props {
  match?: {
    params?: {
      gen?: string;
    };
  };
}

// State
interface S {
  data: any | null;
  isLoading: boolean;
  error: Error | null;
}

export default class GenNavigation extends Component<Props, S> {
  constructor(props: Props) {
    super(props);

    this.state = {
      data: null,
      isLoading: true,
      error: null,
    };
  }

  componentDidMount() {
    fetch(`https://pokeapi.co/api/v2/generation/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        this.setState({
          data: data,
          isLoading: false,
        });
      })
      .catch((error) => {
        this.setState({
          error: error,
          isLoading: false,
        });
      });
  }

  render() {
    return (
      <Box>
        <Box display="flex" justifyContent="center">
          {this.state.data &&
            this.state.data.results.map((d: any, index: number) => (
              <Box
                key={index}
                border="1px solid black"
                paddingX="10px"
                paddingY="5px"
              >
                <Link to={`/library/${index + 1}`}>{index + 1}</Link>
              </Box>
            ))}
        </Box>
      </Box>
    );
  }
}
