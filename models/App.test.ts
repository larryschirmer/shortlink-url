import { getSnapshot } from 'mobx-state-tree';
import App from './App';

const AppModel = {
  selectedLink: '',
  createMode: false,
  editMode: false,
  deleteMode: false,
};

it('should create an instance of AppState', () => {
  const appState = App.create(AppModel);
  expect(appState).toBeTruthy();
});

it('should set link to edit', () => {
  const appState = App.create({
    ...AppModel,
    createMode: true,
    selectedLink: '',
    editMode: false,
  });
  appState.editLink('link-id');
  expect(getSnapshot(appState)).toEqual({
    ...AppModel,
    createMode: false,
    selectedLink: 'link-id',
    editMode: false,
  });
});

it('should toggle create mode', () => {
  const appState = App.create({
    ...AppModel,
    createMode: false,
    selectedLink: 'link-id',
    editMode: false,
  });
  appState.toggleCreateMode();
  expect(getSnapshot(appState)).toEqual({
    ...AppModel,
    createMode: true,
    selectedLink: '',
    editMode: false,
  });
});

it('should toggle edit mode', () => {
  const appState = App.create({
    ...AppModel,
    selectedLink: 'link-id',
  });
  appState.toggleEditMode();
  expect(getSnapshot(appState)).toEqual({
    ...AppModel,
    selectedLink: 'link-id',
    editMode: true,
  });
});

it('should toggle delete mode', () => {
  const appState = App.create(AppModel);
  appState.toggleDeleteMode();
  expect(getSnapshot(appState)).toEqual({
    ...AppModel,
    deleteMode: true,
  });
});

it('should reset state', () => {
  const appState = App.create({
    ...AppModel,
    createMode: false,
    selectedLink: 'link-id',
    editMode: false,
  });
  appState.resetAppState();
  expect(getSnapshot(appState)).toEqual({
    ...AppModel,
    createMode: false,
    selectedLink: '',
    editMode: false,
  });
});

it('should derive menu open state', () => {
  const appState = App.create(AppModel);
  expect(appState.isMenuOpen).toBe(false);

  appState.toggleCreateMode();
  expect(appState.isMenuOpen).toBe(true);
  appState.resetAppState();
  expect(appState.isMenuOpen).toBe(false);

  appState.editLink('link-id');
  expect(appState.isMenuOpen).toBe(true);
  appState.resetAppState();
  expect(appState.isMenuOpen).toBe(false);
});
