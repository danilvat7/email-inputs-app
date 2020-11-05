# @danilvat7/emails-input

@danilvat7/emails-input is a JavaScript library for creating multiple emails(chips) input

#### [Demo](https://danilvat7.github.io/emails-input-app/demo/)

## Installation

Use the package manager [npm](https://npmjs.com) to install @danilvat7/emails-input.

```bash
npm i @danilvat7/emails-input
```

## Usage

```
 <div id="emails-input"></div>

 <script src="node_modules/@danilvat7/emails-input/dist/emails-input.js"></script>
 <script>
        var emailsInputContainer = document.getElementById('emails-input');
        var emailsInput = EmailsInput(emailsInputContainer);
 </script>
```

### Settings

| Option               | Type                            | Default            | Description                                                          |
| -------------------- | ------------------------------- | ------------------ | -------------------------------------------------------------------- |
| placeholder          | string                          | add more people... | Enables to add custom placeholder                                    |
| emailValidationRules | RegEx                           | /email regex/      | Allows to set validation rules                                       |
| onEmailAdd           | (emails: IAddedEmail[]) => void |                    | Invokes callback function with array of created email(s) as argument |
| onEmailRemove        | (email: string) => void         |                    | Invokes callback function with the removed email                     |

### Methods

| Method              | Params | Description                                |
| ------------------- | ------ | ------------------------------------------ |
| addEmail            | email  | Adds email to input                        |
| getValidAddedEmails |        | Returns valid added emails (IAddedEmail[]) |

### Interfaces

```
IEmailsInputParams {
  placeholder?: string;
  emailValidationRules?: RegExp;
  onEmailAdd?: (emails: IAddedEmail[]) => void;
  onEmailRemove?: (email: string) => void;
}

IAddedEmail {
  id: string;
  email: string;
  isValid: boolean;
}
```

#### [Developer notes](https://github.com/danilvat7/emails-input-app/tree/master/emails-input)

## Contributing

Contributions are welcome!

## License

[MIT](https://choosealicense.com/licenses/mit/)
