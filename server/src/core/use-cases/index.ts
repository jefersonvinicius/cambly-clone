export interface UseCase<Params, Return> {
  perform(params: Params): Promise<Return>;
}
