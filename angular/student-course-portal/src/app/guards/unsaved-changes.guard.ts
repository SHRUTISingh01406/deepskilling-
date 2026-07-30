import { CanDeactivateFn } from '@angular/router';

export interface ComponentWithForm {
  isFormDirty(): boolean;
}

export const unsavedChangesGuard: CanDeactivateFn<ComponentWithForm> = (component) => {
  if (component.isFormDirty && component.isFormDirty()) {
    return window.confirm('You have unsaved changes. Leave?');
  }
  return true;
};
