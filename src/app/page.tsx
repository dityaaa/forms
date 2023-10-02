'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormSubmissionSchema } from '@/schema/form/submission';
import { isMultipleAnswerError, isSingleAnswerError } from '@/app/schema';
import { cn } from '@/libs/cn';
import { FormQuestionsSchema, QuestionType } from '@/schema/form/question';

const data: FormQuestionsSchema = {
  id: '511ffe31-c660-4456-a60d-d7cf2411024a',
  title: 'Alpaca Form',
  description: 'A simple survey form demo',
  questions: [
    {
      type: QuestionType.Text,
      label: 'Nama lengkap',
      required: true,
    },
    {
      type: QuestionType.Choice,
      label: 'Berapa 1+1?',
      required: true,
      items: ['1', '2', '3', '4'],
    },
    {
      type: QuestionType.Checkbox,
      label: 'Makanan kesukaan kamu',
      required: true,
      items: ['Bakwan', 'Tempe', 'Tahu'],
    },
    {
      type: QuestionType.Choice,
      label: 'Mau es krim ngga?',
      items: [
        'Mau dongggg Mau dongggg Mau dongggg Mau dongggg Mau dongggg Mau dongggg Mau dongggg Mau dongggg Mau dongggg Mau dongggg Mau dongggg',
        'Males..',
      ],
    },
  ],
};

export default function Home() {
  const defaultValues = {
    idempotencyKey: '511ffe31-c660-4456-a60d-d7cf2411024a',
    submission: data.questions.map(value => ({
      required: Boolean(value.required),
      label: value.label,
      ...(value.type === 'checkbox' && { values: null }),
      ...(['text', 'radio'].includes(value.type) && { value: null }),
    })),
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSubmissionSchema>({
    resolver: zodResolver(FormSubmissionSchema),
    defaultValues,
  });

  const validation = FormQuestionsSchema.safeParse(data);
  if (!validation.success) {
    return (
      <div className="min-h-screen">
        <main className="mx-auto flex w-full max-w-[680px] flex-col items-start justify-between gap-y-6 px-6 py-8">
          <div
            className={cn([
              'w-full rounded-xl bg-white p-6 shadow-gray-100 outline outline-1 outline-gray-200 lg:shadow',
              'outline-red-500',
            ])}
          >
            <h2 className="mb-4 text-lg">Something went wrong :(</h2>
            <div className="grid gap-y-2">
              <p>Please report to the site master</p>
              <p>Form ID: {data.id}</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const onSubmit: SubmitHandler<FormSubmissionSchema> = formData => console.log(formData);

  return (
    <div className="min-h-screen">
      <main className="mx-auto flex w-full max-w-[680px] flex-col items-start justify-between gap-y-6 px-6 py-8">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div>
            <h3>{data.title}</h3>
            <q>{data.description}</q>
          </div>
          <div className="mb-4 grid w-full gap-y-4">
            {data.questions.map((question, index) => {
              let component: any = null;
              const error = errors?.submission?.[index];
              switch (question.type) {
                case 'text':
                  component = (
                    <div className="w-full border-b border-b-gray-200 pb-1 sm:w-1/2">
                      <input
                        {...register(`submission.${index}.value`)}
                        type="text"
                        className="w-full outline-none"
                        placeholder="Jawaban kamu"
                      />
                    </div>
                  );
                  break;
                case 'checkbox':
                case 'choice':
                  component = question.items.map(item => {
                    const id = `${question.label}_${item}`;
                    return (
                      <div className="flex flex-row items-start" key={id}>
                        <span className="inline-flex h-6 items-center">
                          <input
                            type={question.type === 'checkbox' ? 'checkbox' : 'radio'}
                            {...register(`submission.${index}.${question.type === 'checkbox' ? 'values' : 'value'}`)}
                            id={id}
                            className="h-4 w-4"
                            value={item}
                          />
                        </span>
                        <label htmlFor={id} className="pl-3">
                          {item}
                        </label>
                      </div>
                    );
                  });
                  break;
                default:
              }

              return (
                <div
                  className={cn(
                    'w-full rounded-xl bg-white p-6 shadow-gray-100 outline outline-1 outline-gray-200 lg:shadow',
                    error && 'outline-red-500',
                  )}
                  key={question.label}
                >
                  <h2 className="mb-4 text-lg">
                    {question.label}
                    {question.required ? <span className="ml-1 text-red-400">*</span> : null}
                  </h2>
                  <div className="grid gap-y-2">{component}</div>
                  {typeof error !== 'undefined' && error !== null ? (
                    <p role="alert" className="mt-3 text-red-500">
                      {isSingleAnswerError(error) ? error?.value?.message : null}
                      {isMultipleAnswerError(error) ? error?.values?.message : null}
                    </p>
                  ) : null}
                </div>
              );
            })}
          </div>
          <div className="text-right">
            <button
              type="submit"
              className="rounded-lg border border-gray-200 bg-amber-300 px-6 py-2 text-amber-900 shadow hover:bg-amber-400 hover:active:bg-amber-600 hover:active:text-amber-50"
            >
              Submit
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
