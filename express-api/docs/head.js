import { itemDocs } from './itemDocs.js';
import { salaDocs } from './salaDocs.js';
import { authDocs } from './authDocs.js';
import { entidadeDocs } from './entidadeDocs.js';
import { moodScalerDocs } from './moodScalerDocs.js';

// Adicione outros docs aqui se necessário

export const apiDocPaths = {
    ...salaDocs,
    ...itemDocs,
    ...authDocs,
    ...entidadeDocs,
    ...moodScalerDocs
};