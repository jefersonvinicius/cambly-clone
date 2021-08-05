import { ConnectionOptions } from 'tls';
import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export class Database {
  private static connection: Connection | null = null;

  static async getInstance() {
    if (!this.connection) {
      this.connection = await createConnection();
    }
    return this.connection;
  }

  static async getTestInstance() {
    if (!this.connection) {
      const config = await getConnectionOptions();
      const newConfig = Object.assign(config, { database: 'cambly_clone_test' });
      this.connection = await createConnection(newConfig);
    }
    return this.connection;
  }

  static async disconnectTestInstance() {
    await this.connection?.close();
    this.connection = null;
  }
}
