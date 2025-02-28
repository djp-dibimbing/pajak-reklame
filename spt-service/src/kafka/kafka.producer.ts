import { Injectable, Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Module } from '@nestjs/common';

@Injectable()
export class KafkaProducer {
  constructor(@Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka) {}

    async send(topic: string, message: any) {
        this.kafkaClient.emit(topic, JSON.stringify(message));
        console.log(`Message sent to ${topic}: ${JSON.stringify(message)}`);
    }
}

@Module({
  providers: [
    {
      provide: 'KAFKA_PRODUCER',
      useClass: KafkaProducer,
    },
  ],
  exports: ['KAFKA_PRODUCER'],
})
export class KafkaModule {}