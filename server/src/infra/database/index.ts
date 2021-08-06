import { ConnectionOptions } from 'tls';
import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export class Database {
  private static connection: Connection | null = null;
  private static testConnection: Connection | null = null;

  static async getInstance() {
    if (!this.connection) {
      this.connection = await createConnection();
    }
    return this.connection;
  }

  static async getTestInstance() {
    if (!this.testConnection) {
      const config = await getConnectionOptions();
      const newConfig = Object.assign(config, { database: 'cambly_clone_test' });
      this.testConnection = await createConnection(newConfig);
    }
    return this.testConnection;
  }

  static async disconnectTestInstance() {
    await this.testConnection?.close();
    this.testConnection = null;
  }
}
