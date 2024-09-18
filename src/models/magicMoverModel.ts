import { MagicItemModel } from "./magicItemModel";

export interface MagicMoverModel {
  id: string;
  name: string;
  weightLimit: number;
  energy: number;
  questState: "resting" | "on a mission" | "loading" | "end";
  items: MagicItemModel[];
  missionsCount: number;
}
