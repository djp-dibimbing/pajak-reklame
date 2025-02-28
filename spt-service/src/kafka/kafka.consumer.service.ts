import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Kafka } from 'kafkajs';

@Injectable()
export class ConsumerService implements OnModuleDestroy {
    private readonly kafka = new Kafka({
        clientId: 'nestjs-consumer',
        brokers: [process.env.KAFKA_BROKER || 'default_broker'],
        ssl: {
            ca : [require('fs').readFileSync('./ca.pem', 'utf-8')],
            cert : require('fs').readFileSync('./service.cert', 'utf-8'),
            key : require('fs').readFileSync('./service.key', 'utf-8'),
        }
    })

    private readonly consumer = this.kafka.consumer({ groupId: 'nestjs-group' });

        async consume(topicConfig: { topic: string; fromBeginning?: boolean }, callback: (message: any) => Promise<void>) {
            await this.consumer.connect();
            await this.consumer.subscribe({ topic: topicConfig.topic, fromBeginning: topicConfig.fromBeginning || false });

            await this.consumer.run({
                eachMessage: async ({ message }) => {
                    await callback(message);
                },
            });
        }

        async onModuleDestroy() {
            await this.consumer.disconnect();
        }
}