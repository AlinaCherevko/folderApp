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
    renameFolder() {},
    //------resend----------//
    resendFolder() {},
  },
});

// Редюсер слайсу
export const folderReducer = folderSlice.reducer;

//Екшени слайсу
export const { addFolder, deleteFolder, editFolder } = folderSlice.actions;

// addFolder(state, action) {
//   if (state.folders.id === action.payload.parentId) {
//     state.folders.child = [...state.folders.child, action.payload];
//   } else {
//     state.folders.child.map((item) =>
//       item.id === action.payload.parentId
//         ? item.child.push(action.payload)
//         : item
//     );
//   }
//   console.log(action.payload);
// },
