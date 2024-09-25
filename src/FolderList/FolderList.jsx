import { useSelector } from "react-redux";
import FolderItem from "../FolderItem/FolderItem";
import { foldersSelector } from "../store/selectors";
import PropTypes from "prop-types";
import style from "./FolderList.module.css";
import { useState } from "react";

function FolderList({ userRole }) {
  const { folders } = useSelector(foldersSelector);
  const [isOpenFolder, setIsOpenFolder] = useState(false);

  const renderFolderList = (item) => (
    <div key={item.id}>
      <FolderItem
        id={item.id}
        name={item.name}
        type={item.type}
        child={item.child}
        userRole={userRole}
        setIsOpenFolder={setIsOpenFolder}
        isOpenFolder={isOpenFolder}
      />

      {isOpenFolder && item.child?.length > 0 && (
        <div className={style.itemWrapper}>
          {item.child.map((childItem) => renderFolderList(childItem))}
        </div>
      )}
    </div>
  );

  return <>{renderFolderList(folders)}</>;
}

FolderList.propTypes = {
  setRole: PropTypes.func,
  userRole: PropTypes.string,
};

export default FolderList;
