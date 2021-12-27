import { Teacher } from "models/Teacher";
import { io } from "socket.io-client";
import { EventsLabels } from "./events-labels";

const client = io("http://localhost:3333", {
  autoConnect: false,
});

export class SocketServer {
  static connectTeacher(teacher: Teacher) {
    const socket = client.connect();
    socket.emit(EventsLabels.ConnectTeacher, { teacherId: teacher.id });
  }

  static openTeacherToLesson(teacher: Teacher) {
    const socket = client.connect();
    socket.emit(EventsLabels.TeacherOpenToLesson, { teacherId: teacher.id });
  }
}

export * from "./events-labels";
