import { MagicItemModel } from "../models/magicItemModel";
import { MagicMoverModel } from "../models/magicMoverModel";
import { v4 as uuidv4 } from "uuid";

const items: MagicItemModel[] = [];
const movers: MagicMoverModel[] = [];
export class magicTransporterFunctionalities {
  addMover(weightLimit: number, name: string, energy: number): MagicMoverModel {
    const newMover: MagicMoverModel = {
      weightLimit,
      name,
      energy,
      id: uuidv4(),
      questState: "resting",
      items: [],
      missionsCount: 0,
    };
    movers.push(newMover);
    return newMover;
  }
  getAllMovers(): MagicMoverModel[] {
    return movers;
  }
  getAllItems(): MagicItemModel[] {
    return items;
  }

  addItem(weight: number, name: string): MagicItemModel {
    const newItem: MagicItemModel = {
      weight,
      name,
      id: uuidv4(),
    };
    items.push(newItem);
    return newItem;
  }

  loadMover(itemName: string, moverId: string): MagicMoverModel {
    const mover = movers.find((m) => m.id === moverId);
    const item = items.find((i) => i.name === itemName);

    if (!mover) {
      throw new Error("The mover is not found");
    }
    if (!item) {
      throw new Error("The item is not found");
    }
    if (mover.questState === "on a mission") {
      throw new Error("The mover is on a mission and can't load right now");
    }

    const itemsLoadedCount: number = mover.items.reduce((count, item) => {
      return count + item.weight;
    }, 0);

    const totalWeight = item.weight + itemsLoadedCount;
    if (totalWeight >= mover.weightLimit) {
      throw new Error("Weight limit has been reached");
    }

    mover.items.push(item);
    mover.questState = "loading";
    return mover;
  }

  startMissionMover(moverId: string): string {
    const mover = movers.find((m) => m.id === moverId);
    if (!mover) {
      throw new Error("Mover is not found");
    }
    if (mover.questState === "on a mission" || mover.questState === "end") {
      throw new Error(
        "The mover is already on a mission or no items are loaded"
      );
    }
    if (mover.questState === "loading") {
      mover.questState = "on a mission";
      return "The mover started its mission";
    } else {
      throw new Error("The mover is resting");
    }
  }

  endMissionMover(moverId: string): string {
    const mover = movers.find((m) => m.id === moverId);
    if (!mover) {
      throw new Error("Mover is not found");
    }
    if (mover.questState === "on a mission") {
      mover.questState = "end";
      mover.items = [];
      mover.missionsCount += 1;
      return "The mover completed its mission";
    } else {
      throw new Error("The mover is not on a mission");
    }
  }

  getHighestMoverMissions(): {
    id: string;
    missionsCount: number;
    name: string;
  }[] {
    const sortedMovers = movers
      .sort((a, b) => b.missionsCount - a.missionsCount)
      .map((mover) => ({
        id: mover.id,
        missionsCount: mover.missionsCount,
        name: mover.name,
      }));

    return sortedMovers;
  }
}
