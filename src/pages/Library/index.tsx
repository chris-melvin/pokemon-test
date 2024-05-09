import React, { Component } from "react";
import PokemonCard from "../../components/Card";
import { Grid } from "@mui/material";

// Props
export interface Props {
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

export default class Library extends Component<Props, S> {
  constructor(props: Props) {
    super(props);

    this.state = {
      data: null,
      isLoading: true,
      error: null,
    };
  }

  componentDidMount() {
    // Initial fetch when component mounts
    this.fetchData();
  }

  componentDidUpdate(prevProps: Props) {
    // Check if gen prop has changed
    if (this.props.match?.params?.gen !== prevProps.match?.params?.gen) {
      // Refetch data if gen has changed
      this.fetchData();
    }
  }

  fetchData() {
    // Fetch data based on the current value of gen
    if (this.props.match?.params?.gen) {
      fetch(
        `https://pokeapi.co/api/v2/generation/${this.props.match.params.gen}`
      )
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
  }

  render() {
    if (this.state.isLoading) {
      return <div>Loading...</div>;
    }

    if (this.state.error) {
      return <div>Error: {this.state.error.message}</div>;
    }

    return (
      <Grid container spacing={2} margin="auto">
        {this.state.data &&
          this.state.data.pokemon_species.map((d: any) => (
            <Grid item key={d.name}>
              <PokemonCard pokemon={d} key={d.name} />
            </Grid>
          ))}
      </Grid>
    );
  }
}
