import { z } from 'zod';
import { uniqueArray } from '@/utils/zod';

const BaseAnswerSchema = z.strictObject({
  label: z.string().nonempty(),
});

const OptionalSingleAnswerSchema = BaseAnswerSchema.merge(
  z.strictObject({
    value: z.string().nullable(),
    required: z.literal(false),
  }),
);

const MandatorySingleAnswerSchema = BaseAnswerSchema.merge(
  z.strictObject({
    value: z
      .string()
      .nonempty({ message: 'This is a required question' })
      .nullable()
      .refine(arg => arg !== null, { message: 'This is a required question' }),
    required: z.literal(true),
  }),
);

export const SingleAnswerSchema = z.discriminatedUnion('required', [
  MandatorySingleAnswerSchema,
  OptionalSingleAnswerSchema,
]);

export type SingleAnswerSchema = z.infer<typeof SingleAnswerSchema>;

const OptionalMultipleAnswerSchema = BaseAnswerSchema.merge(
  z.strictObject({
    values: z.array(z.string().nonempty()).nonempty().nullable(),
    required: z.literal(false),
  }),
);

const MandatoryMultipleAnswerSchema = BaseAnswerSchema.merge(
  z.strictObject({
    values: z
      .array(z.string().nonempty())
      .nonempty({ message: 'This is a required question' })
      .nullable()
      .refine(arg => arg !== null && arg.length > 0, { message: 'This is a required question' }),
    required: z.literal(true),
  }),
);

export const MultipleAnswerSchema = z.discriminatedUnion('required', [
  MandatoryMultipleAnswerSchema,
  OptionalMultipleAnswerSchema,
]);

export type MultipleAnswerSchema = z.infer<typeof MultipleAnswerSchema>;

export const AnswerSchema = z.union([SingleAnswerSchema, MultipleAnswerSchema]);

export const FormSubmissionSchema = z.strictObject({
  submission: uniqueArray<typeof AnswerSchema>(z.array(AnswerSchema), obj => obj.label),
});

export type FormSubmissionSchema = z.infer<typeof FormSubmissionSchema>;
