import { z } from 'zod';
/**
* Zod is a TypeScript-first schema validation library.
 * It allows you to define and validate the shape of your data easily.
 *
 * @example
 * // Define a schema for a user
 * const userSchema = z.object({
 *   id: z.number().int().positive(),
 *   name: z.string().min(2).max(50),
 *   email: z.string().email(),
 *   age: z.number().int().min(18).optional(),
 *   isActive: z.boolean().default(true),
 * });
 *
 *  @example
 * // Define a schema for a document
 * const documentSchema = z.object({
 *   sections: z.array(
 *     z.object({
 *       title: z.string(),
 *       content: z.string()
 *     })
 *   )
 * });
 */
export const DocumentSchema = z.object({ // Always start with z.object
	sections: z.array(
		z.object({
			title: z.string(),
			content: z.string()
		})
	)
});
