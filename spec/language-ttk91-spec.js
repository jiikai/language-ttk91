'use babel';

import LanguageTtk91 from '../lib/language-ttk91';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('LanguageTtk91', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('language-ttk91');
  });

  describe('when the language-ttk91:toggle event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.language-ttk91')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'language-ttk91:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.language-ttk91')).toExist();

        let languageTtk91Element = workspaceElement.querySelector('.language-ttk91');
        expect(languageTtk91Element).toExist();

        let languageTtk91Panel = atom.workspace.panelForItem(languageTtk91Element);
        expect(languageTtk91Panel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'language-ttk91:toggle');
        expect(languageTtk91Panel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.language-ttk91')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'language-ttk91:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let languageTtk91Element = workspaceElement.querySelector('.language-ttk91');
        expect(languageTtk91Element).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'language-ttk91:toggle');
        expect(languageTtk91Element).not.toBeVisible();
      });
    });
  });
});
