import { triggerEvent } from '../utils';
import UICtrl from './../ui-controller';

const mockEmail = 'tes@test.com';

describe('UI Controller', () => {
  let uiCtrl: UICtrl;
  let userContainerEl: HTMLElement;

  beforeEach(() => {
    userContainerEl = document.createElement('div');
    document.body.append(userContainerEl);
    uiCtrl = new UICtrl(userContainerEl, {});
    uiCtrl['createComponent']();
    uiCtrl['loadEventListeners']();
  });

  test('should create ui component and append to user conatiner', () => {
    const createdComponent = userContainerEl.children[0];
    expect(createdComponent).toBeTruthy();
    expect(createdComponent.classList.contains(uiCtrl['selectors'].container));
    expect(createdComponent.childElementCount).toBeGreaterThan(0);
    expect(uiCtrl['mainContainer']).toBe(createdComponent);
  });

  test('should load events listeners', () => {
    uiCtrl['addChips'](mockEmail);

    uiCtrl['removeChip'] = jest.fn();
    uiCtrl['addChips'] = jest.fn();

    (document.querySelector(
      `.${uiCtrl['selectors'].chipRemove}`
    ) as HTMLElement).click();
    expect(uiCtrl['removeChip']).toHaveBeenCalled();

    const input = uiCtrl['inputElement'];
    input.value = mockEmail;
    triggerEvent(input, 'blur');
    expect(uiCtrl['addChips']).toHaveBeenCalled();
  });

  test('should not call eventHandler on input change', () => {
    uiCtrl['addChips'] = jest.fn();

    const input = uiCtrl['inputElement'];
    input.value = '';
    triggerEvent(input, 'blur');

    expect(uiCtrl['addChips']).not.toHaveBeenCalled();
  });

  test('should add chip and call onEmailAdd callback', () => {
    uiCtrl['params'].onEmailAdd = jest.fn();

    const input = uiCtrl['inputElement'];
    input.value = mockEmail;
    triggerEvent(input, 'blur');

    expect(uiCtrl['mainContainer'].children.length).toBeGreaterThan(1);
    expect(uiCtrl['mainContainer'].children[0].innerHTML.split(' ')[0]).toBe(
      mockEmail
    );
    expect(uiCtrl['params'].onEmailAdd).toHaveBeenCalled();
  });

  test('should remove chip', () => {
    uiCtrl['params'].onEmailRemove = jest.fn();

    uiCtrl['addChips'](mockEmail);

    (document.querySelector(
      `.${uiCtrl['selectors'].chipRemove}`
    ) as HTMLElement).click();

    setTimeout(() => {
      expect(uiCtrl['params'].onEmailRemove).toHaveBeenCalled();
      expect(uiCtrl['mainContainer'].children.length).toBe(1);
    });
  });
});
