import { Teacher } from "models/Teacher";

export class TeachersService {
  static async fetchAvailable(): Promise<Teacher[]> {
    console.log("Fetching teachers...");
    return [];
  }
}
