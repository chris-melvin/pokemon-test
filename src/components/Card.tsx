import { InfoSharp } from "@material-ui/icons";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import { Component } from "react";
import { Link } from "react-router-dom";

// Props
interface Props {
  pokemon: {
    name: string;
    url: string;
  };
}

// State
interface S {
  data: any | null;
  isLoading: boolean;
  error: Error | null;
}

export default class PokemonCard extends Component<Props, S> {
  constructor(props: Props) {
    super(props);

    this.state = {
      data: null,
      isLoading: true,
      error: null,
    };
  }

  componentDidMount() {
    if (this.props.pokemon.url) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${this.props.pokemon.name}`)
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
    return (
      <Card>
        {this.state.isLoading ? (
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        ) : (
          this.state.data && (
            <>
              <Box display="flex" justifyContent="space-between" padding="10px">
                <Chip label={`#${this.state.data.id}`} />
                <Link to={`/pokemon/${this.state.data.id}`}>
                  <InfoSharp color="primary" />
                </Link>
              </Box>
              <CardMedia
                component="img"
                height="200"
                image={
                  this.state.data.sprites.other["official-artwork"]
                    .front_default
                }
                alt="Paella dish"
              />
              <CardContent>
                <Typography component="p" textAlign="start">
                  {this.state.data.species.name}
                </Typography>
                <Grid container spacing={2}>
                  {this.state.data.types.map((d: any) => (
                    <Grid item key={d.slot}>
                      <Chip label={d.type.name} />
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </>
          )
        )}
      </Card>
    );
  }
}
