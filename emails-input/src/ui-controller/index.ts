/*
 * UI Controller
 */
import {
  ADD_CHIP_EVENTS,
  DEFAULT_PLACEHOLDER,
  EMAIL_REGEX,
  REMOVE_ICON_SVG,
} from './../constants';
import { IAddedEmail, IEmailsInputParams } from './../interfaces';
import { fadeIn, fadeOut, isTargetKeyPressed, randomString } from './../utils';

/**
 * @export
 * @class UICtrl
 */
export default class UICtrl {
  protected addedEmails: IAddedEmail[] = [];

  private mainContainer: HTMLElement;
  /**
   * UI selectors
   * @private
   * @type {{ [key: string]: string }}
   */
  private selectors: { [key: string]: string } = {
    container: 'email-inputs',
    input: 'email-inputs--input',
    chip: 'email-inputs--chip',
    chipInvalid: 'email-inputs--chip__invalid',
    chipRemove: 'email-inputs--chip-close',
  };

  /**
   * Returns Input Element
   * @private
   * @readonly
   * @type {HTMLInputElement}
   */
  private get inputElement(): HTMLInputElement {
    return this.mainContainer.querySelector(`.${this.selectors.input}`);
  }

  /**
   * Creates an instance of UICtrl.
   * @param {HTMLElement} userContainerEl
   * @param {IEmailsInputParams} [params]
   */
  constructor(
    private userContainerEl: HTMLElement,
    protected params?: IEmailsInputParams
  ) {}

  /**
   * Creates app HTML element and adds it to user's UI conatiner
   * @protected
   */
  protected createComponent(): void {
    const container = document.createElement('div');
    container.classList.add(this.selectors.container);
    container.innerHTML = `<input type="text" class="${
      this.selectors.input
    }" placeholder="${this.params?.placeholder || DEFAULT_PLACEHOLDER}">`;
    this.mainContainer = container;
    this.userContainerEl.appendChild(container);
  }

  /**
   * Loads all events listeners
   * @protected
   */
  protected loadEventListeners() {
    // On Chip Remove Click event
    this.mainContainer.addEventListener('click', (event: MouseEvent) => {
      const el = event.target as HTMLElement;
      const isChipRemoveClicked = el.classList.contains(
        this.selectors.chipRemove
      );
      if (isChipRemoveClicked) {
        this.removeChip(el.parentElement);
      }
    });

    // On Input press 'Enter', ',' and blur events
    ADD_CHIP_EVENTS.forEach((ev) => {
      this.inputElement.addEventListener(ev, (event: KeyboardEvent) => {
        const el = event.target as HTMLInputElement;
        const { type } = event;

        if (el.value && (isTargetKeyPressed(event) || type === 'blur')) {
          this.addChips(el.value);
        }
      });
    });
  }

  /**
   * Splits, validates and adds new chips
   * @protected
   * @param {string} [emails='']
   * @return {*}  {void}
   */
  protected addChips(emails: string = ''): void {
    const emailsArr = emails.trim().split(',');

    if (!emailsArr.length) {
      return;
    }

    const emailsFragment = document.createDocumentFragment();
    const currentAddedEmails: IAddedEmail[] = [];

    emailsArr.forEach((email) => {
      email = email.trim();
      if (!!email.length) {
        const addedEmail: IAddedEmail = {
          id: randomString(),
          email,
          isValid: (this.params?.emailValidationRules || EMAIL_REGEX).test(
            email
          ),
        };
        const chip = document.createElement('div');
        chip.setAttribute('data-id', addedEmail.id);
        chip.classList.add(this.selectors.chip);

        if (!addedEmail.isValid) {
          chip.classList.add(this.selectors.chipInvalid);
        }
        chip.innerHTML = `${email} <span class="${this.selectors.chipRemove}">${REMOVE_ICON_SVG}</span>`;
        emailsFragment.appendChild(chip);

        currentAddedEmails.push(addedEmail);
      }
    });

    // Animating chips appearance
    for (let i = 0; i < emailsFragment.children?.length; i++) {
      fadeIn(emailsFragment.children[i]);
    }

    // Inserts chips to UI
    this.mainContainer.insertBefore(
      emailsFragment,
      this.mainContainer.children[this.mainContainer.children.length - 1]
    );

    this.inputElement.value = '';

    this.addedEmails = this.addedEmails.concat(currentAddedEmails);

    // Calls user's callback
    this.params?.onEmailAdd && this.params.onEmailAdd(currentAddedEmails);
  }

  /**
   * Removes chip
   * @protected
   * @param {HTMLElement} chip
   */
  protected removeChip(chip: HTMLElement): void {
    const email = chip.innerHTML.split(' ')[0];
    const emailId = chip.getAttribute('data-id');
    this.addedEmails = this.addedEmails.filter(
      (addedEmail) => addedEmail.id !== emailId
    );

    fadeOut(chip, () => this.mainContainer.removeChild(chip));
    // Calls user's callback
    this.params?.onEmailRemove && this.params.onEmailRemove(email);
  }
}
