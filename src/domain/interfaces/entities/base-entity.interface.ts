export interface IBaseEntity extends ITimeStampsEntity {
  id: string;
}

export interface ITimeStampsEntity {
  createdAt: Date;
  updatedAt: Date;
}
