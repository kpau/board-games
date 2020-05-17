export default class ActionResult<T = undefined> {
  constructor(
    public readonly status: number,
    public readonly body?: T,
  ) {}

  static Ok<T = undefined>(body?: T): ActionResult<T> {
    return new ActionResult(200, body);
  }

  static NotFound(): ActionResult {
    return new ActionResult(404);
  }

  static Error<T = undefined>(error?: T): ActionResult<T> {
    return new ActionResult(500, error);
  }
}
