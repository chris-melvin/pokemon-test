import { Component } from "react";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  Typography,
  capitalize,
} from "@mui/material";
import getPokemon from "../../query/getPokemon";

// Props
interface Props {
  match?: {
    params?: {
      pokemon?: string;
    };
  };
}

// State
interface S {
  data: any | null;
  species: any | null;
  isLoading: boolean;
  error: Error | null;
}

export default class Pokemon extends Component<Props, S> {
  constructor(props: Props) {
    super(props);

    this.state = {
      data: null,
      species: null,
      isLoading: true,
      error: null,
    };
  }

  async componentDidMount() {
    // Initial fetch when component mounts
    this.fetchData();
  }

  async componentDidUpdate(prevProps: Props) {
    // Check if gen prop has changed
    if (
      this.props.match?.params?.pokemon !== prevProps.match?.params?.pokemon
    ) {
      // Refetch data if gen has changed
      this.fetchData();
    }
  }
  fetchData = async () => {
    // Fetch data based on the current value of gen
    if (this.props.match?.params?.pokemon) {
      try {
        const pokemonResponse = await getPokemon(
          this.props.match.params.pokemon
        );
        this.setState({
          data: pokemonResponse.data,
          isLoading: false,
        });
      } catch (error: any) {
        this.setState({
          error: error,
          isLoading: false,
        });
      }
    }
  };

  render() {
    const pokemonData = this.state.data;
    // const pokemonSpecies = this.state.species;

    if (this.state.isLoading) {
      return <Typography>Loading...</Typography>;
    }
    if (this.state.error) {
      return <p className="error">Error: {this.state.error.message}</p>;
    }

    return (
      <div>
        {pokemonData && (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Box padding="5px">
                <p className="pokemonName">{pokemonData.name}</p>
                <img
                  src={pokemonData.sprites.other.showdown.front_default}
                  alt={pokemonData.name}
                  width="150"
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card>
                <CardContent>
                  <Typography variant="h5" textAlign="start">
                    Pokemon Type
                  </Typography>
                  <Grid container spacing={2}>
                    {pokemonData.types.map((type: any, index: number) => (
                      <Grid item key={index}>
                        <Chip label={type.type.name} />
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>

                <Card sx={{ margin: "20px" }}>
                  <CardContent>
                    <Grid container spacing={2}>
                      {pokemonData.stats.map((stat: any, index: number) => (
                        <Grid item xs={6} key={index}>
                          <Typography textAlign="start">
                            {stat.stat.name}: {stat.base_stat}
                          </Typography>
                        </Grid>
                      ))}
                    </Grid>
                  </CardContent>
                </Card>
                <Card sx={{ margin: "20px" }}>
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography textAlign="start" className="pokemonHeight">
                          Height: {pokemonData.height}
                        </Typography>
                      </Grid>

                      <Grid item xs={6}>
                        <Typography textAlign="start" className="pokemonWeight">
                          Weight: {pokemonData.weight}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        {/*Category  */}
                        <Typography
                          textAlign="start"
                          className="pokemonSpecies"
                        >
                          Species: {pokemonData.species.name}
                        </Typography>
                      </Grid>

                      <Grid item xs={6}>
                        {/* Generation */}
                        {/* <Typography textAlign="start">
                          Generation: {pokemonSpecies.generation.name}
                        </Typography> */}
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent>
                    <Typography variant="h5">Abilities:</Typography>
                    <Grid container spacing={2}>
                      {pokemonData.abilities.map(
                        (ability: any, index: number) => (
                          <Grid item xs={6} key={index}>
                            <Typography className="pokemonAbility">
                              {ability.ability.name}
                            </Typography>
                          </Grid>
                        )
                      )}
                    </Grid>
                  </CardContent>
                </Card>
              </Card>
            </Grid>
          </Grid>
        )}
      </div>
    );
  }
}
