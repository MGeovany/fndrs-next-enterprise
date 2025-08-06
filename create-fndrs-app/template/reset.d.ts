/**
 * This file globally enhances TypeScript's type definitions.
 *
 * 1. @total-typescript/ts-reset:
 *    Replaces and improves unsafe or inaccurate built-in types.
 *    Examples: Object.keys, Array.includes, etc.
 *
 * 2. typed-query-selector/strict:
 *    Enhances type safety for querySelector and querySelectorAll,
 *    returning more precise HTML element types instead of generic Element.
 *
 * This file is included globally via tsconfig.json and should not contain any logic.
 */

import "@total-typescript/ts-reset"
import "typed-query-selector/strict"
