import { Label } from "@mui/icons-material";
import { React, useState } from "react";

function AddList(props) {
  const [listView, setListView] = useState(false);
  const [text, setText] = useState("");
  const addFunction = () => {
    if (text == "") {
      return;
    }
    props.addList(text);
    setListView(false);
    setText("");
  };
  return listView ? (
    <div className="list-container">
      <div className="list-container-add">
        {" "}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="add-list-header-text"
        />{" "}
        <div className="list-button-group">
          <input
            type="button"
            onClick={() => addFunction()}
            value="Add to list"
          />
          <button onClick={() => setListView(!listView)}>x</button>
        </div>
      </div>
    </div>
  ) : (
    <div className="add-list-container" onClick={() => setListView(!listView)}>
      <div className="add-list-header">+ Add Status</div>
    </div>
  );
}

export default AddList;
