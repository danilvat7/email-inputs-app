/**
 * Interfaces
 */
export interface IEmailsInputParams {
  placeholder?: string;
  emailValidationRules?: RegExp;
  onEmailAdd?: (emails: IAddedEmail[]) => void;
  onEmailRemove?: (email: string) => void;
}
export interface IAddedEmail {
  id: string;
  email: string;
  isValid: boolean;
}
