import React, { Component } from "react";
import {
  Autocomplete,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

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
  inputValue: string;
  options: string[];
}

export default class SearchComponent extends Component<Props, S> {
  constructor(props: Props) {
    super(props);

    this.state = {
      data: null,
      isLoading: true,
      error: null,
      inputValue: "",
      options: [],
    };
  }

  handleInputChange = (event: React.ChangeEvent<{}>, newInputValue: string) => {
    this.setState({
      inputValue: newInputValue,
    });
  };

  componentDidMount() {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const pokemonNames = data.results.map(
          (pokemon: { name: string }) => pokemon.name
        );

        this.setState({
          options: pokemonNames,
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
    const { inputValue, options, isLoading } = this.state;

    return (
      <Autocomplete
        freeSolo
        options={options}
        loading={isLoading}
        onInputChange={this.handleInputChange}
        onChange={(event, value) => {
          window.location.href = `/pokemon/${value}`;
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search Pokémon"
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {isLoading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
    );
  }
}
