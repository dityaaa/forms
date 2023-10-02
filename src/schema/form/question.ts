import { z } from 'zod';
import { uniqueArray, uniqueArrayElement } from '@/utils/zod';

export enum QuestionType {
  Text = 'text',
  Paragraph = 'paragraph',
  Number = 'number',
  Choice = 'choice',
  Checkbox = 'checkbox',
  Dropdown = 'dropdown',
}
export const QuestionTypeEnum = z.nativeEnum(QuestionType);
export type QuestionTypeEnum = z.infer<typeof QuestionTypeEnum>;

const BaseQuestionFieldSchema = z.strictObject({
  label: z.string().nonempty(),
  required: z.boolean().optional(),
});

export const TextQuestionFieldSchema = BaseQuestionFieldSchema.extend({
  type: z.literal(QuestionType.Text),
});

export type TextQuestionFieldSchema = z.infer<typeof TextQuestionFieldSchema>;

export const ParagraphQuestionFieldSchema = BaseQuestionFieldSchema.extend({
  type: z.literal(QuestionType.Paragraph),
});

export const NumberQuestionFieldSchema = BaseQuestionFieldSchema.extend({
  type: z.literal(QuestionType.Number),
});

export const ChoiceQuestionFieldSchema = BaseQuestionFieldSchema.extend({
  type: z.literal(QuestionType.Choice),
  custom: z.boolean().optional(),
  items: uniqueArrayElement<z.ZodString>(z.array(z.string().nonempty()).nonempty()),
});

export type ChoiceQuestionFieldSchema = z.infer<typeof ChoiceQuestionFieldSchema>;

export const DropdownQuestionFieldSchema = ChoiceQuestionFieldSchema.extend({
  type: z.literal(QuestionType.Dropdown),
});

export const CheckboxQuestionFieldSchema = ChoiceQuestionFieldSchema.extend({
  type: z.literal(QuestionType.Checkbox),
  min: z.number().optional(),
  max: z.number().optional(),
});

export type CheckboxQuestionFieldSchema = z.infer<typeof CheckboxQuestionFieldSchema>;

export const QuestionFieldSchema = z.discriminatedUnion('type', [
  TextQuestionFieldSchema,
  ChoiceQuestionFieldSchema,
  CheckboxQuestionFieldSchema,
]);

export type QuestionFieldSchema = z.infer<typeof QuestionFieldSchema>;

export const FormQuestionsSchema = z.strictObject({
  id: z.string().nonempty().uuid(),
  title: z.string().nonempty(),
  description: z.string().nonempty().optional(),
  questions: uniqueArray<typeof QuestionFieldSchema>(
    z.array(QuestionFieldSchema),
    (obj: QuestionFieldSchema) => obj.label,
  ),
});

export type FormQuestionsSchema = z.infer<typeof FormQuestionsSchema>;
