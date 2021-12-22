import { types } from 'mobx-state-tree';

const App = types
  .model({
    selectedLink: types.string,
    createMode: types.boolean,
    deleteMode: types.boolean,
  })
  .actions(self => ({
    editLink(linkId: string) {
      self.selectedLink = linkId;
      self.createMode = false;
      self.deleteMode = false;
    },
    toggleCreateMode() {
      self.createMode = !self.createMode;
      self.selectedLink = '';
      self.deleteMode = false;
    },
    toggleDeleteMode() {
      self.deleteMode = !self.deleteMode;
      self.createMode = false;
      self.selectedLink = '';
    },
    resetAppState() {
      self.selectedLink = '';
      self.createMode = false;
      self.deleteMode = false;
    }
  }))
  .views(self => ({
    get isMenuOpen() {
      return self.createMode || self.deleteMode || !!self.selectedLink;
    },
  }));

  export default App;