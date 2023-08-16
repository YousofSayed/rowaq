import { CocktailDB } from "./cocktail";
const db = new CocktailDB('Rowaq');
const coll =  db.createCollction('Bookmarks');
export {db , coll}