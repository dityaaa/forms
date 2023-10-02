'use client';

import { FormProvider, SubmitHandler, useFieldArray, useForm, useFormContext } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChoiceQuestionFieldSchema, FormQuestionsSchema, QuestionType } from '@/schema/form/question';
import { cn } from '@/libs/cn';
import { TypeSelector } from '@/app/admin/forms/create/_components/TypeSelector';
import React, { useEffect, useLayoutEffect } from 'react';

const TypeMap: Record<QuestionType, string> = {
  [QuestionType.Text]: 'Text',
  [QuestionType.Paragraph]: 'Paragraph',
  [QuestionType.Number]: 'Number',
  [QuestionType.Choice]: 'Multiple choice',
  [QuestionType.Checkbox]: 'Checkbox',
  [QuestionType.Dropdown]: 'Dropdown',
};

export default function Create() {
  const methods = useForm<FormQuestionsSchema>({
    resolver: zodResolver(FormQuestionsSchema),
  });
  const {
    register,
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = methods;
  const { fields, append, insert, update } = useFieldArray({ control, name: 'questions' });

  const onSubmit: SubmitHandler<FormQuestionsSchema> = formData => console.log(formData);

  if (fields.length === 0) {
    append({
      type: QuestionType.Text,
      label: '',
    });
  }

  useLayoutEffect(() => {
    const subscription = watch((value, { name, type }) => {
      const field = name?.split('.').reduce((carry, item) => {
        if (item === 'type') return carry;

        if (typeof carry === 'undefined' || carry == null) {
          return null;
        }

        if (!Number.isNaN(Number(item))) {
          // @ts-ignore
          return carry[Number(item)];
        }

        // @ts-ignore
        return carry[item];
      }, value);

      if (['choice', 'checkbox', 'dropdown'].includes(field?.type as string) && typeof field?.items === 'undefined') {
        const path = name.replace('.type', '');
        // methods.setValue(`${path}.items.0`, 'Choice');
        update(0, { ...field, items: ['Choice'] });
        console.log(methods.getValues());
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  console.log(watch('questions.0.type'));

  return (
    <div className="min-h-screen">
      <main className="mx-auto flex w-full max-w-[880px] flex-col items-start justify-between gap-y-6 px-6 py-8">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            {fields.map((field, index) => (
              <div
                key={field.label}
                className={cn(
                  'w-full rounded-xl bg-white p-6 pb-8 shadow-gray-100 outline outline-1 outline-gray-200 lg:shadow',
                )}
              >
                <div className="mb-3 grid grid-cols-3">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Question"
                    defaultValue={`Question ${index + 1}`}
                    className="col-span-2 mr-2 font-medium text-gray-700 placeholder-gray-500 outline-none ring-amber-400 focus:border-b-2 focus:border-b-amber-400"
                  />
                  <TypeSelector name={`questions.${index}.type`} types={TypeMap} defaultSelection={QuestionType.Text} />
                </div>
                {
                  (
                    {
                      [QuestionType.Text]: (
                        <div className="w-full border-b border-b-gray-200 sm:w-1/2">
                          <span className="my-auto inline-block text-gray-400">Short answer text</span>
                        </div>
                      ),
                      [QuestionType.Paragraph]: (
                        <div className="w-full sm:w-2/3">
                          <span className="my-auto mb-1.5 block border-b border-b-gray-200 pb-1 text-gray-400">
                            Long answer text
                          </span>
                          <span className="my-auto block border-b border-b-gray-200 pb-1 text-gray-400">
                            With multi line support
                          </span>
                        </div>
                      ),
                      [QuestionType.Number]: (
                        <div className="w-1/2 border-b border-b-gray-200 sm:w-1/4">
                          <span className="my-auto inline-block text-gray-400">Numeric answer</span>
                        </div>
                      ),
                      [QuestionType.Choice]: (
                        <>
                          {(field as ChoiceQuestionFieldSchema)?.items?.map((value, idx) => (
                            <div
                              key={`${value}_${idx}`}
                              className="mb-2 flex w-full gap-x-2 border-b border-b-gray-200 sm:w-1/2"
                            >
                              <input type="radio" disabled />
                              <input
                                {...register(`questions.${index}.items.${idx}`)}
                                className="block w-full"
                                type="text"
                              />
                            </div>
                          ))}
                          <button
                            type="button"
                            className="block w-full text-left sm:w-1/2"
                            onClick={() => update(0, { ...fields[0], ...{ items: [...fields[0].items, 'Choice'] } })}
                          >
                            Add choice
                          </button>
                        </>
                      ),
                      [QuestionType.Checkbox]: (
                        <>
                          {(field as ChoiceQuestionFieldSchema)?.items?.map((value, idx) => (
                            <div
                              key={`${value}_${idx}`}
                              className="mb-2 flex w-full gap-x-2 border-b border-b-gray-200 sm:w-1/2"
                            >
                              <input type="checkbox" disabled />
                              <input
                                {...register(`questions.${index}.items.${idx}`)}
                                className="block w-full"
                                type="text"
                              />
                            </div>
                          ))}
                          <button
                            type="button"
                            className="rounded-md border border-gray-300 px-4 py-0.5 text-left shadow hover:border-amber-500 hover:bg-amber-300 hover:active:border-amber-600 hover:active:bg-amber-500"
                            onClick={() => update(0, { ...fields[0], ...{ items: [...fields[0].items, 'Choice'] } })}
                          >
                            Add choice
                          </button>
                        </>
                      ),
                      [QuestionType.Dropdown]: (
                        <>
                          {(field as ChoiceQuestionFieldSchema)?.items?.map((value, idx) => (
                            <div key={`${value}_${idx}`} className="mb-2 w-full border-b border-b-gray-200 sm:w-1/2">
                              <input
                                {...register(`questions.${index}.items.${idx}`)}
                                className="block w-full"
                                type="text"
                              />
                            </div>
                          ))}
                          <button
                            type="button"
                            className="block w-full text-left sm:w-1/2"
                            onClick={() => update(0, { ...fields[0], ...{ items: [...fields[0].items, 'Choice'] } })}
                          >
                            Add choice
                          </button>
                        </>
                      ),
                    } as Partial<Record<QuestionType, React.ReactNode>>
                  )[watch(`questions.${index}.type`, QuestionType.Text)]
                }
              </div>
            ))}
          </form>
        </FormProvider>
      </main>
    </div>
  );
}
