import { MagicItemModel } from "./magicItemModel";

export interface magicMoverModel {
  id: number;
  name: string;
  weightLimit: number;
  energy: number;
  questState: "resting" | "on a mission" | "loading" | "end";
  items: MagicItemModel[];
  itemsCarrying: number;
  missionsCount: number;
}
