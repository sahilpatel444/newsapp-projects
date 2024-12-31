const Note = ({ id, text, deleteHandle }) => {
  return (
    <>
      <div className="note">
        <div>{text}</div>
        <button className="del_btn" onClick={() => deleteHandle(id)}>
          Delete
        </button>
      </div>
    </>
  );
};

export default Note;
