import {
  ADD_CHIP_EVENTS,
  DEFAULT_PLACEHOLDER,
  EMAIL_REGEX,
  REMOVE_ICON_SVG,
} from './constans';
import { IAddedEmail } from './interfaces';
import './styles.scss';
import { fadeIn, fadeOut } from './utils';

class UICtrl {
  mainContainer: HTMLElement;
  addedEmails: IAddedEmail[] = [];

  private selectors: { [key: string]: string } = {
    container: 'email-inputs',
    input: 'email-inputs--input',
    chip: 'email-inputs--chip',
    chipInvalid: 'email-inputs--chip__invalid',
    chipRemove: 'email-inputs--chip-close',
  };

  get inputElement(): HTMLInputElement {
    return document.querySelector(`.${this.selectors.input}`);
  }

  constructor(
    private userContainerEl: HTMLElement,
    private inputPlaceholder: string = DEFAULT_PLACEHOLDER
  ) {}

  protected createComponent(): void {
    const container = document.createElement('div');
    container.classList.add(this.selectors.container);
    container.innerHTML = `<input type="text" class="${this.selectors.input}" placeholder="${this.inputPlaceholder}">`;
    this.mainContainer = container;
    this.userContainerEl.appendChild(container);
  }

  protected loadEventListeners(
    onChipRemoveFn: (el: HTMLElement) => void,
    onAddChipFn: (el: HTMLElement) => void
  ) {
    // On Chip Remove Click event
    this.mainContainer.addEventListener('click', (event: MouseEvent) => {
      const el = event.target as HTMLElement;
      const isChipRemoveClicked = el.classList.contains(
        this.selectors.chipRemove
      );
      if (isChipRemoveClicked) {
        onChipRemoveFn(el.parentElement);
      }
    });

    // On Input press 'Enter', ',' and blur events
    ADD_CHIP_EVENTS.forEach((ev) => {
      this.inputElement.addEventListener(ev, (event: KeyboardEvent) => {
        const el = event.target as HTMLInputElement;
        const { code, type } = event;

        if (code === 'Enter' || code === 'Comma' || type === 'blur') {
          event.preventDefault();
          onAddChipFn(el);
        }
      });
    });
  }

  public addChips(emails: string = ''): void {
    const emailsArr = emails.trim().split(',');

    if (!emailsArr.length) {
      return;
    }

    const emailsFragment = document.createDocumentFragment();
    emailsArr.forEach((email) => {
      email = email.trim();
      if (!!email.length) {
        const addedEmail: IAddedEmail = {
          email,
          isValid: EMAIL_REGEX.test(email),
        };
        const chip = document.createElement('div');

        chip.classList.add(this.selectors.chip);

        if (!addedEmail.isValid) {
          chip.classList.add(this.selectors.chipInvalid);
        }
        chip.innerHTML = `${email} <span class="${this.selectors.chipRemove}">${REMOVE_ICON_SVG}</span>`;
        emailsFragment.appendChild(chip);

        this.addedEmails.push(addedEmail);
      }
    });

    // Animating chips appearance
    Array.prototype.slice
      .call(emailsFragment.children)
      .forEach((element: HTMLElement) => {
        fadeIn(element);
      });

    this.mainContainer.insertBefore(
      emailsFragment,
      this.mainContainer.children[this.mainContainer.children.length - 1]
    );

    this.inputElement.value = '';
  }

  public removeChip(chip: HTMLElement): void {
    const email = chip.innerHTML.split(' ')[0];
    this.addedEmails = this.addedEmails.filter(
      (addedEmail) => addedEmail.email !== email
    );
    fadeOut(chip, () => this.mainContainer.removeChild(chip));
  }
}

class EmailInputs extends UICtrl {
  constructor(userContainerEl: HTMLElement) {
    super(userContainerEl);
    this.init();
  }

  private init(): void {
    // Create Email Inputs compoentns and append to container
    this.createComponent();

    // Register Events Listeners
    this.loadEventListeners(
      this.onChipRemoveClick.bind(this),
      this.onAddChip.bind(this)
    );
  }

  private onChipRemoveClick(chip: HTMLElement) {
    this.removeChip(chip);
  }

  private onAddChip(input: HTMLInputElement) {
    this.addChips(input.value);
  }
}

const initApp = (container: HTMLElement): EmailInputs => {
  if (!container) {
    throw new Error('Please provide HTML container first');
  }
  return new EmailInputs(container);
};

(window as any).EmailInputs = initApp;
