import {MongoClient, ServerApiVersion} from 'mongodb';
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';

const { MONGO_INITDB_DATABASE, MONGODB_URI } = process.env;

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
    private client: MongoClient;
    private dbUri: string = `${MONGODB_URI}/?authMechanism=DEFAULT`;

    async onModuleInit(): Promise<void> {
        try {
            this.client = new MongoClient(this.dbUri, {
                serverApi: {
                    version: ServerApiVersion.v1,
                    strict: true,
                    deprecationErrors: true,
                },
            });
            await this.client.connect();
            console.log('Connected to the database');
        } catch (error) {
            console.error('Failed to connect to the database', error);
            process.exit(1);
        }
    }

    async onModuleDestroy(): Promise<void> {
        await this.client.close();
        console.log('Disconnected from the database');
    }

    getDb() {
        return this.client.db(MONGO_INITDB_DATABASE || 'test');
    }
}