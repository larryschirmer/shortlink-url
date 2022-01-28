import { types } from 'mobx-state-tree';

const App = types
  .model({
    selectedLink: types.string,
    createMode: types.boolean,
    editMode: types.boolean,
  })
  .actions(self => ({
    editLink(linkId: string) {
      self.selectedLink = linkId;
      self.createMode = false;
      self.editMode = false;
    },
    toggleCreateMode() {
      self.createMode = !self.createMode;
      self.selectedLink = '';
      self.editMode = false;
    },
    toggleEditMode() {
      self.editMode = !self.editMode;
      self.createMode = false;
      self.selectedLink = '';
    },
    resetAppState() {
      self.selectedLink = '';
      self.createMode = false;
      self.editMode = false;
    }
  }))
  .views(self => ({
    get isMenuOpen() {
      return self.createMode || !!self.selectedLink;
    },
  }));

  export default App;