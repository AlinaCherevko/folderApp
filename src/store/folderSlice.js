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

const resendRecursiveFolder = (f, comingId, newParentName) => {
  let folderToMove;

  f.child = f.child.filter((childEl) => {
    if (childEl.id === comingId) {
      folderToMove = childEl;
      return false;
    }
    return true;
  });

  if (folderToMove) {
    const addFolderToNewParent = (parent) => {
      if (parent.name === newParentName) {
        parent.child.push(folderToMove);
        return true;
      }
      return parent.child.some(addFolderToNewParent);
    };

    addFolderToNewParent(f);
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
    resendFolder(state, action) {
      resendRecursiveFolder(
        state.folders,
        action.payload.id,
        action.payload.value
      );
      console.log(action.payload);
    },
  },
});

// Редюсер слайсу
export const folderReducer = folderSlice.reducer;

//Екшени слайсу
export const { addFolder, deleteFolder, renameFolder, resendFolder } =
  folderSlice.actions;
