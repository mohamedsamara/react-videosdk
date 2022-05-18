import { proxy } from "valtio";
import { meeting, Meeting } from "./meeting";
import { ui, UI } from "./ui";

interface Store {
  meeting: Meeting;
  ui: UI;
}

export const store = proxy<Store>({
  meeting,
  ui,
});
