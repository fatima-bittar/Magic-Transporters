import { magicItemModel } from "../models/magicItemModel";
import { magicMoverModel } from "../models/magicMoverModel";
import { v4 as uuidv4 } from "uuid";

const items: magicItemModel[] = [];
const movers: magicMoverModel[] = [];
export class magicTransporterFunctionalities {
  addMover(weightLimit: number, name: string, energy: number): magicMoverModel {
    const newMover: magicMoverModel = {
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
  getAllMovers(): magicMoverModel[] {
    return movers;
  }
  getAllItems(): magicItemModel[] {
    return items;
  }

  addItem(weight: number, name: string): magicItemModel {
    const newItem: magicItemModel = {
      weight,
      name,
      id: uuidv4(),
    };
    items.push(newItem);
    return newItem;
  }

  loadMover(itemName: string, moverId: string): magicMoverModel | string {
    const mover = movers.find((m) => m.id === moverId);
    const item = items.find((i) => i.name === itemName);

    if (!mover || !item) {
      return "the mover or item is not found";
    }
    if (mover.questState === "on a mission") {
      return "The mover is on a mission can't load right now";
    }
    const itemsLoadedCount: number = mover.items.reduce((count, item) => {
      return count + item.weight;
    }, 0);
    const totalWeight: number = item.weight + itemsLoadedCount;
    if (totalWeight >= mover.weightLimit) {
      return "weight limit has been reached it's maximum limit";
    }

    mover.items.push(item);
    mover.questState = "loading";
    return mover;
  }

  startMissionMover(moverId: string): string {
    const mover = movers.find((m) => m.id === moverId);
    if (!mover) {
      return "mover is not found";
    }
    if (mover.questState === "on a mission" || mover.questState === "end") {
      return "already the mover is on mission or still there is no items loaded";
    }
    if (mover.questState === "loading") {
      mover.questState = "on a mission";
      return "the mover started its mission";
    } else return "the mover is resting";
  }

  endMissionMover(moverId: string): string {
    const mover = movers.find((m) => m.id === moverId);
    if (!mover) {
      return "mover is not found";
    }
    if (mover.questState === "on a mission") {
      mover.questState = "end";
      mover.items = [];
      mover.missionsCount += 1;
      return "the mover completed its mission";
    } else
      return "the mover is either being loaded or resting or already it's ended";
  }

  getHighestMoverMissions(): magicMoverModel[] {
    const newMover: magicMoverModel[] = movers.sort(
      (a, b) => b.missionsCount - a.missionsCount
    );
    return newMover;
  }
}
