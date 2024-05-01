import PlaceHolderItem from "./SummaryListItemPlaceHolder";

function PlaceHolderList() {
  return (
    <>
      <List style={{ borderRadius: "30px" }}>
        {pokeArray.map((pok) => (
          <ListItem key={pok.id} style={{ borderRadius: "30px" }}>
            <ListItemButton
              style={{
                justifyContent: "space-between",
                borderRadius: "30px",
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
