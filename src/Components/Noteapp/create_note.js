const CreateNOte = ({ TextHandel, SaveHandler, inputText }) => {
  const charlimit = 150;
  const charleft = charlimit - inputText.length;

  return (
    <>
      <div className="note">
        <div className="my_note">
          <textarea
            col="10"
            rows="5"
            placeholder="TYpe..."
            maxLength={150}
            value={inputText}
            onChange={TextHandel}
          ></textarea>
          <div className="note_footer">
            <span> {charleft}Left</span>
            <button className="note_save" onClick={SaveHandler}>
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateNOte;
