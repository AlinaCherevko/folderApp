const initialState = {
  folders: {
    id: "main",
    name: "main",
    type: "folder",
    child: [],
  },
};

const addRecursiveFolders = (f, comingF) => {
  if (f.id === comingF.parentId) {
    f.child.push(comingF);
  } else {
    f.child.map((childEl) => addRecursiveFolders(childEl, comingF));
  }
};

const deleteRecursiveFolder = (f, comingId) => {
  if (f.id === comingId) {
    return;
  } else {
    f.child.map((childEl, index) => {
      deleteRecursiveFolder(childEl, comingId);

      if (f.child[index] && f.child[index].id === comingId) {
        f.child.splice(index, 1);
      }
    });
  }
};

const renameRecursiveFolder = (f, comingId, newName) => {
  if (f.id === comingId) {
    f.name = newName;
  } else {
    f.child.map((childEl) => renameRecursiveFolder(childEl, comingId, newName));
  }
};

import { createSlice } from "@reduxjs/toolkit";

const folderSlice = createSlice({
  // Ім'я слайсу
  name: "folder",
  // Початковий стан редюсера слайсу
  initialState,

  reducers: {
    //--------add----------//
    addFolder(state, action) {
      addRecursiveFolders(state.folders, action.payload);
    },
    //--------delete----------//
    deleteFolder(state, action) {
      console.log(action.payload);
      deleteRecursiveFolder(state.folders, action.payload);
    },
    //---------rename---------//
    renameFolder(state, action) {
      renameRecursiveFolder(
        state.folders,
        action.payload.id,
        action.payload.value
      );

      console.log(action.payload);
    },
    //------resend----------//
    resendFolder() {},
  },
});

// Редюсер слайсу
export const folderReducer = folderSlice.reducer;

//Екшени слайсу
export const { addFolder, deleteFolder, renameFolder } = folderSlice.actions;
