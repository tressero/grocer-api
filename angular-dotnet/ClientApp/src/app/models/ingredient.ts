export interface Ingredient {
  id: string;
  name: string;
  description: string;
  unit: string;
  storeSectionId: string;
}

export const IngredientColumns = [
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
