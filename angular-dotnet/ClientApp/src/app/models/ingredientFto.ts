import {RecipeIngredient} from "./recipe-ingredient";

export interface Ingredient {
  id: string;
  name: string;
  description: string;
  unit: string;
  storeSectionId: string;
}
export interface IngredientFto extends Ingredient {
  isEdit: boolean;
  isNew: boolean;
}

export interface IngredientWithQuantityByStoreLocationId {
  [storeLocationName: string] : IngredientWithQuantityAndUses[];
}

export interface IngredientWithQuantityAndUses extends IngredientWithQuantity {
  addedRecipesUsedBy: Array<string>
}
export interface IngredientWithQuantity extends Ingredient {
  quantity: number;
  storeSectionName: string;
}

export interface IngredientMap {
  [id: string] : IngredientFto;
}

export const IngredientFtoColumns = [
  {
    key: 'isSelected',
    type: 'isSelected',
    label: '',
  },
  {
    key: 'name',
    type: 'text',
    label: 'Ingredient Name',
    required: true,
  },
  {
    key: 'description',
    type: 'text',
    label: 'Ingredient Description',
  },
  {
    key: 'unit',
    type: 'email',
    label: 'Unit / Measurement Type',
    required: true,
  },
  {
    key: 'storeSectionId',
    type: 'selector',
    label: 'StoreSectionId',
    required: true,
  },
  {
    key: 'isEdit',
    type: 'isEdit',
    label: '',
  },
];
