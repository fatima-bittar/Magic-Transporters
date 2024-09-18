import { magicItemModel } from "./magicItemModel";

export interface magicMoverModel {
  id: string;
  name: string;
  weightLimit: number;
  energy: number;
  questState: "resting" | "on a mission" | "loading" | "end";
  items: magicItemModel[];
  missionsCount: number;
}
