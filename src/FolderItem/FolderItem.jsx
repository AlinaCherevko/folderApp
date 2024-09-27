import { useState } from "react";
import Icon from "../Icon/Icon";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { nanoid } from "nanoid";
import {
  addFolder,
  deleteFolder,
  renameFolder,
  resendFolder,
} from "../store/folderSlice";
import Form from "../Form/Form";
import style from "./FolderItem.module.css";

function FolderItem({
  id,
  name,
  type,
  child,
  owner,
  userRole,
  setIsOpenFolder,
  isOpenFolder,
}) {
  const [fileType, setFileType] = useState("");
  const [value, setValue] = useState("");
  const [newContent, setNewContent] = useState("");
  const [isShownInfoPanel, setIsShownInfoPanel] = useState(false);
  const [isOpenInput, setIsOpenInput] = useState(false);

  const dispatch = useDispatch();

  const showInfoPanel = () => {
    if (userRole === "User" && owner === "Admin") return;

    setIsShownInfoPanel(!isShownInfoPanel);
  };

  const onEditName = () => {
    setIsOpenInput(true);
    setNewContent("newName");
  };

  const onAddFolder = () => {
    setIsOpenInput(true);
    setFileType("folder");
    setNewContent("file");
  };

  const onAddFile = () => {
    setIsOpenInput(true);
    setFileType("file");
    setNewContent("file");
  };

  const onDeleteFolder = () => {
    dispatch(deleteFolder(id));
  };

  const onResendFolder = () => {
    setIsOpenInput(true);
    setNewContent("newFolder");
  };

  const addNewContent = () => {
    if (newContent === "file" && value.trim() !== "") {
      const formData = {
        id: nanoid(),
        parentId: id,
        name: value,
        type: fileType,
        owner: userRole,
        child: fileType === "folder" ? [] : null,
      };

      dispatch(addFolder(formData));
    } else if (newContent === "newName" && value.trim() !== "") {
      dispatch(renameFolder({ id, value }));
    } else if (newContent === "newFolder" && value.trim() !== "") {
      dispatch(resendFolder({ id, value }));
      console.log("я спрацював");
    }
    setValue("");
    setIsOpenInput(false);
    setFileType("");
    setNewContent("");
  };

  const onOpenFolderClick = () => {
    setIsOpenFolder(!isOpenFolder);
  };

  return (
    <div>
      <li>
        <div>
          <div className={style.folderWrapper}>
            {child?.length > 0 ? (
              userRole === "User" && owner === "Admin" ? (
                <Icon
                  id="icon-lock"
                  width="20px"
                  height="20px"
                  fill="black"
                  stroke="black"
                />
              ) : (
                <button onClick={onOpenFolderClick}>
                  <Icon
                    id={isOpenFolder ? "icon-minus" : "icon-plus"}
                    width="20px"
                    height="20px"
                    fill="black"
                    stroke="black"
                  />
                </button>
              )
            ) : (
              <button></button>
            )}
            {/* {child?.length > 0 ? (
              <button onClick={onOpenFolderClick}>
                <Icon
                  id={isOpenFolder ? "icon-minus" : "icon-plus"}
                  width="20px"
                  height="20px"
                  fill="black"
                  stroke="black"
                />
              </button>
            ) : (
              <button></button>
            )} */}
            <Icon
              id={type === "folder" ? "icon-folder" : "icon-file-empty"}
              width="20px"
              height="20px"
            />
            <span className={style.folderName} onClick={showInfoPanel}>
              {name}
            </span>
            {isShownInfoPanel && (
              <>
                <ul className={style.infoPanel}>
                  <li>
                    <button onClick={onEditName}>
                      <Icon id="icon-pencil" width="12px" height="12px" />
                    </button>
                  </li>
                  <li>
                    <button onClick={onAddFolder}>
                      <Icon id="icon-folder-plus" width="12px" height="12px" />
                    </button>
                  </li>
                  <li>
                    <button onClick={onAddFile}>
                      <Icon id="icon-file-plus" width="12px" height="12px" />
                    </button>
                  </li>
                  <li>
                    <button onClick={onDeleteFolder}>
                      <Icon
                        id="icon-bin"
                        fill={name === "main" ? "blue" : ""}
                        width="12px"
                        height="12px"
                      />
                    </button>
                  </li>
                  <li>
                    <button onClick={onResendFolder}>
                      <Icon
                        id="icon-send-to"
                        fill={name === "main" ? "blue" : ""}
                        width="12px"
                        height="12px"
                      />
                    </button>
                  </li>
                </ul>
                {isOpenInput && (
                  <Form setValue={setValue} addNewContent={addNewContent} />
                )}
              </>
            )}
          </div>
        </div>
      </li>
    </div>
  );
}

FolderItem.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string,
  child: PropTypes.array,
  userRole: PropTypes.string,
  setIsOpenFolder: PropTypes.func,
  isOpenFolder: PropTypes.bool,
  owner: PropTypes.string,
};

export default FolderItem;
