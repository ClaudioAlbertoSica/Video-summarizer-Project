import { useEffect, useState } from "react";
import apiClient from "../../services/api-client";
import { Avatar, List, ListItem, ListItemButton, Paper } from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useTheme } from "@mui/material";
import PlaceHolderList from "./placeHolderList/PlaceHolderList";

interface type {
  name: string;
}

interface image {
  front_default: string;
}

interface Pokemon {
  id: number;
  name: string;
  types: type[];
  sprites: image;
}

interface MinMaxIds {
  minId: number;
  maxId: number;
}

function ListForAccordion({ minId = 1, maxId = 10 }: MinMaxIds) {
  const myTheme = useTheme();
  const [pokeArray, setPokeArray] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const pokemons: Pokemon[] = [];
    setIsLoading(true);
    const updateArray = async () => {
      for (let index = minId; index <= maxId; index++) {
        const thisPok = await apiClient
          .get(`/pokemon/${index}`)
          .then((res) => {
            return res.data;
          })
          .catch((err) => console.log(`Error: ${err}`));
        pokemons.push(thisPok);
        console.log(pokemons.length);
      }
      setPokeArray(pokemons);
      setIsLoading(false);
    };

    updateArray();
  }, [minId, maxId]);

  return (
    <>
      <h1>Your Pokemon List</h1>
      <p>{maxId - minId + 1} Pokemons are shown</p>
      <p>
        (Min id: {minId} - Max id:{maxId})
      </p>
      <Paper
        elevation={1}
        style={{
          height: "100%",
          width: "100%",
          overflow: "auto",
          borderRadius: "30px",
          backgroundColor: myTheme.palette.my.listHeader,
        }}
      >
        {isLoading ? (
          <PlaceHolderList minId={minId} maxId={maxId} />
        ) : (
          <List style={{ backgroundColor: myTheme.palette.my.list, borderRadius: "30px" }}>
            {pokeArray.map((pok) => (
              <ListItem key={pok.id} style={{ borderRadius: "30px" }}>
                <ListItemButton
                  style={{
                    justifyContent: "space-between",
                    borderRadius: "30px",
                    backgroundColor: myTheme.palette.my.listItem,
                  }}
                >
                  <Avatar src={pok.sprites.front_default}></Avatar>
                  {pok.name} - id: {pok.id} <ArrowRightIcon />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        )}
      </Paper>
    </>
  );
}

export default ListForAccordion;
