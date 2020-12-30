import { ModelCtor, Model } from 'sequelize';

interface Associate {
  associate?: (models: Models) => void
}

type Models = Record<string, CustomModel<M>>;

export type CustomModel<M extends Model> = ModelCtor<M> & Associate;
