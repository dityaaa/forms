## Create Form

```json5
{
  idempotencyKey: '511ffe31-c660-4456-a60d-d7cf2411024a',
  title: 'Alpaca Form',
  description: '## A simple form\n\n-Made for **humans**\n-**Non-toxic** chemicals\n-Woof woof _kitty kitty_',
  fields: [
    {
      type: 'text',
      title: 'Full name',
      required: true,
    },
    {
      type: 'choice',
      title: 'Sex',
      required: true,
      items: [
        'Male',
        'Female',
      ],
    },
    {
      type: 'checkbox',
      title: 'Favorite dish',
      custom: true,
      items: [
        'Grilled Tuna',
        'Salmon Mentai',
        'Sushi',
        'Beef Bacon',
        'Puffer Fish',
      ],
    },
  ],
}
```

## Submit Answer

```json5
{
  idempotencyKey: 'fadbea78-71e4-4d96-8ba1-83aadc864986',
  submission: [
    {
      title: 'Full name',
      value: 'Aditya Khoirul Anam',
    },
    {
      title: 'Sex',
      value: 'Male',
    },
    {
      title: 'Favorite dish',
      values: [
        'Grilled Tuna',   /* Predefined value */
        'Beef Bacon',     /* Predefined value */
        'Roasted Duck',   /* Custom value     */
      ],
    },
  ],
}
```
