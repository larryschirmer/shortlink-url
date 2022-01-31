import { types } from 'mobx-state-tree';

const App = types
  .model({
    selectedLink: types.string,
    createMode: types.boolean,
    editMode: types.boolean,
    deleteMode: types.boolean,
  })
  .actions(self => ({
    editLink(linkId: string) {
      self.selectedLink = linkId;
      self.createMode = false;
    },
    toggleCreateMode() {
      self.createMode = !self.createMode;
      self.selectedLink = '';
      self.editMode = false;
    },
    toggleEditMode() {
      self.editMode = !self.editMode;
      self.createMode = false;
      self.deleteMode = false;
    },
    toggleDeleteMode() {
      self.deleteMode = !self.deleteMode;
      self.selectedLink = '';
      self.editMode = false;
      self.createMode = false;
    },
    resetAppState() {
      self.selectedLink = '';
      self.createMode = false;
    }
  }))
  .views(self => ({
    get isMenuOpen() {
      return self.createMode || !!self.selectedLink;
    },
  }));

  export default App;