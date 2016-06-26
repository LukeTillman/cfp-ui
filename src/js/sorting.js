import { SortDirectionValues } from './redux-actions';
/**
 * Case insensitive sort alphabetically.
 */
function sortAlphabetically(a, b) {
  let compA = a ? a.trim().toUpperCase() : a;
  let compB = b ? b.trim().toUpperCase() : b;
  if (compA < compB) return -1;
  if (compA > compB) return 1;
  return 0;
};

/**
 * Sort talks by title.
 */
export function sortByTitle(a, b) {
  return sortAlphabetically(a.title, b.title);
};

/**
 * Sort talks by company.
 */
export function sortByCompany(a, b) {
  return sortAlphabetically(a.company, b.company);
};

/**
 * Sort talks by author field.
 */
export function sortByAuthor(a, b) {
  let aAuthors = Object.keys(a.authors).map(email => a.authors[email]);
  let bAuthors = Object.keys(b.authors).map(email => b.authors[email]);

  let i = 0;
  while (true) {
    let aAuthor = i < aAuthors.length ? aAuthors[i] : null;
    let bAuthor = i < bAuthors.length ? bAuthors[i] : null;
    if (aAuthor === null && bAuthor === null) return 0;

    let result = sortAlphabetically(aAuthor, bAuthor);
    if (result !== 0) return result;
    i++;
  }
};

/**
 * Returns a function for sorting by a specific user's scores.
 */
export function getSortByUserRating(userEmail) {
  return function sortByRating(a, b) {
    let aScore = 0;
    if (a.scores_a && a.scores_a[userEmail]) {
      aScore = a.scores_a[userEmail];
    }
    let bScore = 0;
    if (b.scores_a && b.scores_a[userEmail]) {
      bScore = b.scores_a[userEmail];
    }
    
    if (aScore < bScore) return -1;
    if (bScore < aScore) return 1;
    return 0;
  };
};

/**
 * Applies direction to a sorting function.
 */
export function withDirection(direction, sortFn) {
  return direction === SortDirectionValues.ASC
    ? sortFn
    : (a, b) => sortFn(b, a)
};
