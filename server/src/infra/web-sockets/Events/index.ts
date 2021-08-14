interface SocketEvent<Params = undefined> {
  handle(params: Params): void;
}
