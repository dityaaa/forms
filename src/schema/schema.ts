import { z } from 'zod';

export const BaseFieldSchema = z.strictObject({
  label: z.string(),
  description: z.string().optional(),
  required: z.boolean().optional(),
});

export const BaseTextInputSchema = z.strictObject({
  type: z.literal('text'),
  validation: z.instanceof(RegExp).optional(),
});

export const TextInputSchema = BaseFieldSchema.merge(BaseTextInputSchema);

export const BaseNumberInputSchema = z.strictObject({
  type: z.literal('number'),
  min: z.number().optional(),
  max: z.number().optional(), // TODO: validate that max is never below min
});

export const NumberInputSchema = BaseFieldSchema.merge(BaseNumberInputSchema);

export const ChoiceSchema = z.union([z.string(), z.number(), z.undefined()]);

export const BaseRadioInputSchema = z.strictObject({
  type: z.literal('radio'),
  items: ChoiceSchema.array(),
  selected: ChoiceSchema.optional(),
});

export const RadioInputSchema = BaseFieldSchema.merge(BaseRadioInputSchema);

export const BaseCheckboxInputSchema = z.strictObject({
  type: z.literal('checkbox'),
  items: ChoiceSchema.array(),
  selected: ChoiceSchema.array().optional(),
});

export const CheckboxInputSchema = BaseFieldSchema.merge(BaseCheckboxInputSchema);

export const FormFieldSchema = z.discriminatedUnion('type', [
  TextInputSchema,
  NumberInputSchema,
  RadioInputSchema,
  CheckboxInputSchema,
]);

export const FormDataSchema = z.strictObject({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string().optional(),
  fields: FormFieldSchema.array(),
});

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type FormDataSchema = z.infer<typeof FormDataSchema>;
