import List from "./02-List.tsx";
import ListPlaceholder from "./03-ListPlaceholder";

function ListHandler() {
  const isLoading = false;
  return <>{isLoading ? <ListPlaceholder /> : <List />}</>;
}
export default ListHandler;
