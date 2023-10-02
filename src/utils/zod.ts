import { z } from 'zod';

export function uniqueArrayElement<
  T extends z.ZodTypeAny = z.ZodTypeAny,
  Cardinality extends z.ArrayCardinality = z.ArrayCardinality,
  Schema extends z.ZodArray<T, Cardinality> = z.ZodArray<T, Cardinality>,
>(schema: Schema) {
  return schema.superRefine((val, ctx) => {
    if (val.length === new Set(val).size) {
      return;
    }

    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'No duplicates allowed',
    });
  });
}

export function uniqueArray<
  T extends z.ZodTypeAny = z.ZodTypeAny,
  U extends string | number | symbol = any,
  Cardinality extends z.ArrayCardinality = z.ArrayCardinality,
  Schema extends z.ZodArray<T, Cardinality> = z.ZodArray<T, Cardinality>,
>(schema: Schema, uniqueExtractor: (element: z.infer<T>) => U) {
  return schema.superRefine((val, ctx) => {
    const uniqueItems = val.map(value => uniqueExtractor(value));
    if (val.length === new Set(uniqueItems).size) {
      return;
    }

    val.reduce(
      (carry, value, index) => {
        const key = uniqueExtractor(value);
        if (typeof carry[key] === 'undefined') {
          // eslint-disable-next-line no-param-reassign
          carry[key] = [index];
          return carry;
        }

        // eslint-disable-next-line no-param-reassign
        carry[key] = [...carry[key], index];
        carry[key].forEach(duplicatedIndex => {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Duplicate property isn't allowed",
            path: [duplicatedIndex],
          });
        });
        return carry;
      },
      {} as Record<U, number[]>,
    );
  });
}
