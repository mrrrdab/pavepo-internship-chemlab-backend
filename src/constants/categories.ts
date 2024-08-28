import { Category } from '@prisma/client';

export const CATEGORIES: Record<string, Category> = {
  'analytical-equipment': Category.ANALYTICAL_EQUIPMENT,
  'biochemistry-biotechnology': Category.BIOCHEMISTRY_BIOTECHNOLOGY,
  suppliers: Category.SUPPLIERS,
  warehouse: Category.WAREHOUSE,
  'reagents-standarts': Category.REAGENTS_STANDARTS,
  'clinic-diagnostics': Category.CLINIC_DIAGNOSTICS,
  cosmeceuticals: Category.COSMECEUTICALS,
  'lab-equipment': Category.LAB_EQUIPMENT,
  'life-science-equipment': Category.LIFE_SCIENCE_EQUIPMENT,
  consumables: Category.CONSUMABLES,
  pharmaceuticals: Category.PHARMACEUTICALS,
  veterinary: Category.VETERINARY,
  microelectronics: Category.MICROELECTRONICS,
};
