import { AuthStorage } from "contexts/AuthContext";
import { Teacher } from "models/Teacher";
import { api } from "services/api";

export class TeachersService {
  static async fetchAvailable(): Promise<Teacher[]> {
    const token = AuthStorage.getToken();
    const { data } = await api.get<any>("/teachers/online", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return data.teachers.map((t: any) => new Teacher(t));
  }
}
