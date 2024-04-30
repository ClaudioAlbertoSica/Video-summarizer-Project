import { useEffect, useState } from "react";
import { Avatar, List, ListItem, ListItemButton } from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useTheme } from "@mui/material";
import placeHolderImage from "../../../assets/WhoIsThatPokemon.jpg";

interface type {
  name: string;
}

interface image {
  front_default: string;
}

interface Pokemon {
  id: number;
  name: string;
  types?: type[];
  sprites: image;
}

interface MinMaxIds {
  minId: number;
  maxId: number;
}

function PlaceHolderList({ minId = 1, maxId = 10 }: MinMaxIds) {
  const myTheme = useTheme();
  const [pokeArray, setPokeArray] = useState<Pokemon[]>([]);

  useEffect(() => {
    const provisoryArray: Pokemon[] = [];
    for (let index = minId; index <= maxId; index++) {
      provisoryArray.push({
        id: index,
        name: "Who's that Pokemon?!",
        sprites: {
          front_default: placeHolderImage,
        },
      });
    }
    setPokeArray(provisoryArray);
  }, [minId, maxId]);

  return (
    <>
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
    </>
  );
}

export default PlaceHolderList;
