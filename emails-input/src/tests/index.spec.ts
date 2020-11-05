import { IAddedEmail } from './../interfaces';
import { randomString } from '../utils';
import { EmailsInput } from './../index';

jest.mock('./../ui-controller');

const mockEmail = 'test@test.com';
const mockEmails: IAddedEmail[] = [
  { id: randomString(), email: mockEmail, isValid: true },
  { id: randomString(), email: mockEmail, isValid: true },
  { id: randomString(), email: 'invalid.email', isValid: false },
];
describe('Emails Input', () => {
  let emailsInput: EmailsInput;
  let userContainerEl: HTMLElement;
  beforeEach(() => {
    userContainerEl = document.createElement('div');
    emailsInput = new EmailsInput(userContainerEl, {});
  });

  test('should call init methods', () => {
    emailsInput['createComponent'] = jest.fn();
    emailsInput['loadEventListeners'] = jest.fn();
    emailsInput['init']();

    expect(emailsInput['createComponent']).toHaveBeenCalled();
    expect(emailsInput['loadEventListeners']).toHaveBeenCalled();
  });

  test('should call addChips method', () => {
    emailsInput['addChips'] = jest.fn();
    emailsInput['addEmail'](mockEmail);

    expect(emailsInput['addChips']).toHaveBeenCalledWith(mockEmail);
  });

  test('should return valid emails', () => {
    emailsInput['addedEmails'] = mockEmails;
    expect(emailsInput.validAddedEmails).toMatchObject(
      mockEmails.filter((email) => email.isValid)
    );
  });
});
