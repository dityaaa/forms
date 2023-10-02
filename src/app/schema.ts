import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';
import { MultipleAnswerSchema, SingleAnswerSchema } from '@/schema/form/submission';

export type SingleAnswerSchemaError = Merge<FieldError, FieldErrorsImpl<NonNullable<SingleAnswerSchema>>>;
export type MultipleAnswerSchemaError = Merge<FieldError, FieldErrorsImpl<NonNullable<MultipleAnswerSchema>>>;
export type AnswerSchemaErrorCollection = NonNullable<SingleAnswerSchemaError | MultipleAnswerSchemaError>;
export type MergedErrorType = Merge<FieldError, FieldErrorsImpl<AnswerSchemaErrorCollection>> | undefined;

export function isSingleAnswerError(error: MergedErrorType): error is SingleAnswerSchemaError {
  return typeof error !== 'undefined' && 'value' in error;
}

export function isMultipleAnswerError(error: MergedErrorType): error is MultipleAnswerSchemaError {
  return typeof error !== 'undefined' && 'values' in error;
}
