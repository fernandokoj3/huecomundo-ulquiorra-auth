export interface Repository<Entity> {
    one(id: number | string): Promise<Entity>
    save(entity: Entity): Promise<Entity>
}
