import { useSelector } from "react-redux";
import FolderItem from "../FolderItem/FolderItem";
import { foldersSelector } from "../store/selectors";
import PropTypes from "prop-types";
import { useState } from "react";
import style from "./FolderList.module.css";

function FolderList({ userRole, query }) {
  const { folders } = useSelector(foldersSelector);
  const [isOpenFolder, setIsOpenFolder] = useState({});

  const filterFolders = (folder) => {
    if (folder.name.toLowerCase().includes(query.toLowerCase())) {
      return true;
    }
    if (folder.child?.some(filterFolders)) {
      return true;
    }
    return false;
  };

  const renderFolderList = (item) => (
    <div key={item.id}>
      <FolderItem
        id={item.id}
        name={item.name}
        type={item.type}
        child={item.child}
        userRole={userRole}
        owner={item.owner}
        setIsOpenFolder={() =>
          setIsOpenFolder((prev) => ({ ...prev, [item.id]: !prev[item.id] }))
        }
        isOpenFolder={isOpenFolder[item.id]}
      />

      {isOpenFolder[item.id] && item.child?.length > 0 && (
        <div className={style.itemWrapper}>
          {item.child
            .filter(filterFolders)
            .map((childItem) => renderFolderList(childItem))}
        </div>
      )}
    </div>
  );

  return <>{renderFolderList(folders)}</>;
}

FolderList.propTypes = {
  userRole: PropTypes.string,
  query: PropTypes.string,
};

export default FolderList;
