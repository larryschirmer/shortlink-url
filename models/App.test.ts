import { getSnapshot } from 'mobx-state-tree';
import App from './App';

const AppModel = {
  selectedLink: '',
  createMode: false,
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
    deleteMode: false,
  });
  appState.editLink('link-id');
  expect(getSnapshot(appState)).toEqual({
    ...AppModel,
    createMode: false,
    selectedLink: 'link-id',
    deleteMode: false,
  });
});

it('should toggle create mode', () => {
  const appState = App.create({
    ...AppModel,
    createMode: false,
    selectedLink: 'link-id',
    deleteMode: false,
  });
  appState.toggleCreateMode();
  expect(getSnapshot(appState)).toEqual({
    ...AppModel,
    createMode: true,
    selectedLink: '',
    deleteMode: false,
  });
});

it('should toggle delete mode', () => {
  const appState = App.create({
    ...AppModel,
    createMode: false,
    selectedLink: 'link-id',
    deleteMode: false,
  });
  appState.toggleDeleteMode();
  expect(getSnapshot(appState)).toEqual({
    ...AppModel,
    createMode: false,
    selectedLink: '',
    deleteMode: true,
  });
});

it('should reset state', () => {
  const appState = App.create({
    ...AppModel,
    createMode: false,
    selectedLink: 'link-id',
    deleteMode: false,
  });
  appState.resetAppState();
  expect(getSnapshot(appState)).toEqual({
    ...AppModel,
    createMode: false,
    selectedLink: '',
    deleteMode: false,
  });
});

it('should derive menu open state', () => {
  const appState = App.create(AppModel);
  expect(appState.isMenuOpen).toBe(false);

  appState.toggleCreateMode();
  expect(appState.isMenuOpen).toBe(true);
  appState.resetAppState();
  expect(appState.isMenuOpen).toBe(false);

  appState.toggleDeleteMode();
  expect(appState.isMenuOpen).toBe(true);
  appState.resetAppState();
  expect(appState.isMenuOpen).toBe(false);

  appState.editLink('link-id');
  expect(appState.isMenuOpen).toBe(true);
  appState.resetAppState();
  expect(appState.isMenuOpen).toBe(false);
});
