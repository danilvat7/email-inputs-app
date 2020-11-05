/*
 * Root Component
 */
import './styles.scss';
import UICtrl from './ui-controller';
import { IAddedEmail, IEmailsInputParams } from './interfaces';
import { randomEmailGenerator } from './utils';

/**
 * @class EmailsInput
 * @extends {UICtrl}
 */
export class EmailsInput extends UICtrl {
  /**
   * Creates an instance of EmailsInput.
   * @param {HTMLElement} userContainerEl
   * @param {IEmailsInputParams} params
   * @memberof EmailsInput
   */
  constructor(userContainerEl: HTMLElement, params?: IEmailsInputParams) {
    super(userContainerEl, params);
    this.init();
  }

  /**
   * Inits create component and sets listeners
   * @private
   */
  private init(): void {
    // Create Email Inputs compoentns and append to container
    this.createComponent();

    // Register Events Listeners
    this.loadEventListeners();
  }

  /** Public methods */
  /**
   * Adds chip
   * @param {string} [email=randomEmailGenerator()]
   * @memberof EmailsInput
   */
  public addEmail(email: string = randomEmailGenerator()): void {
    this.addChips(email);
  }

  /**
   * Returns valid added emails
   * @readonly
   * @type {IAddedEmail[]}
   * @memberof EmailsInput
   */
  public getValidAddedEmails(): IAddedEmail[] {
    return this.addedEmails.filter((email) => email.isValid);
  }
}

/**
 * Checks input data, inits and returns app instance
 * @param {HTMLElement} container
 * @return {*}  {EmailInputs}
 */
const initApp = (
  container: HTMLElement,
  params: IEmailsInputParams
): EmailsInput => {
  if (!container) {
    throw new Error('Please provide HTML container first');
  }
  return new EmailsInput(container, params);
};

(window as any).EmailsInput = initApp;
