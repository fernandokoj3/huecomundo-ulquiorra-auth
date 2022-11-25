export interface IRepository<Entity> {
    one(id: number | string): Promise<Entity>
    save(entity: Entity): Promise<Entity>
}