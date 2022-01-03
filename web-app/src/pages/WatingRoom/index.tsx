import { useAuthContext } from "contexts/AuthContext";
import React, { useEffect } from "react";
import { SocketServer } from "services/socket-server";
import { Container } from "./styles";

export default function WaitingRoom() {
  const { user } = useAuthContext();

  useEffect(() => {
    SocketServer.connectTeacher(user!).then(() => {
      SocketServer.openTeacherToLesson(user!);
    });
  }, [user]);

  return (
    <Container>
      <span data-testid="loading-indicator">Conectando-se...</span>
    </Container>
  );
}
