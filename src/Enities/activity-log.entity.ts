import { BaseEntity } from 'src/Base/entity.base';
import { Entity, Column } from 'typeorm';

@Entity('activity_logs')
export class ActivityLogs extends BaseEntity {
    @Column()
    userId: string;

    @Column()
    action: string;

    @Column({ type: 'json', nullable: true })
    details: any;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    timestamp: Date;
}
