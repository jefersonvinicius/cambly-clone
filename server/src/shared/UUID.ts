import { v4 as uuidV4 } from 'uuid';

export default class UUID {
  static v4() {
    return uuidV4();
  }
}
