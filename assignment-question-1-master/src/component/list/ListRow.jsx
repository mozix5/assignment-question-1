import styles from "./ListRow.module.css";

const ListCell = ({ children,onClick ,row}) => {
  
  return <tr className={styles.cell} onClick={()=>onClick(row)}>{children}</tr>;
};

export default ListCell;
