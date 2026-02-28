import product from './product';
import category from './category';
import blockContent from './blockContent';
import localeString from './locale/String';
import localeText from './locale/Text';
import localeBlockContent from './locale/BlockContent';
import barcodeType from '../plugins/barcode-input/BarcodeType';
import type { SchemaTypeDefinition } from 'sanity';

export const schemaTypes: SchemaTypeDefinition[] = [
  product,
  category,
  blockContent,
  localeString,
  localeText,
  localeBlockContent,
  barcodeType,
];
