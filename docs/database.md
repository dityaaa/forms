## Structure Definition

| property    | description  | required |
|-------------|--------------|----------|
| id          | uuid         | true     |
| title       |              | true     |
| description |              | false    |
| fields      | array of obj | true     |

| property | description | required |
|----------|-------------|----------|
|          |             |          |

## Example

```json5
{
  id: '511ffe31-c660-4456-a60d-d7cf2411024a',
  title: 'Alpaca Form',
  description: '## A simple form\n\n-Made for **humans**\n-**Non-toxic** chemicals\n-Woof woof _kitty kitty_',
  fields: [
    {
      type: 'text',
      title: 'Full name',
      required: true,
    },
    {
      type: 'paragraph',
      title: 'Introduction about yourself',
      required: true,
    },
    {
      type: 'choice',
      title: 'Sex',
      required: true,
      items: [
        'Male',
        'Female',
      ]
    },
    {
      type: 'choice',
      title: 'Preferred activity',
      custom: true,
      items: [
        'Football',
        'Baseball',
        'Basket',
        'Volley',
      ]
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
      ]
    },
  ],
  version: 1,
}
```