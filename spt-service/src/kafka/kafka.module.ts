
import { Module } from '@nestjs/common'; 
import { KafkaProducer } from './kafka.producer';
import { KafkaConsumer } from './kafka.consumer';
import { ConsumerService } from './kafka.consumer.service';

@Module({
    providers: [ KafkaProducer, KafkaConsumer, ConsumerService], 
    exports: [KafkaProducer],
})
export class KafkaModule {}

