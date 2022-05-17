import { React, useState } from "react";
import Button from "rsuite/Button";

function Addcard(props) {
  const [addCard, setAddCard] = useState(false);
  const [text, setText] = useState("");
  const handleAddCard = () => {
    if (text == "") {
      return;
    }
    props.addCard(text, props.index);
    setText("");
    setAddCard(false);
  };

  return !addCard ? (
    <div className="add-card-container">
      <Button
        onClick={() => setAddCard(!addCard)}
        className="add-card-button-false"
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ width: 20, fontSize: 26 }}>+</div>
          <div>Add Card</div>
        </div>
      </Button>
    </div>
  ) : (
    <div className="add-card-container">
      <textarea
        onChange={(e) => setText(e.target.value)}
        value={text}
        className="add-card-text-area"
      />
      <Button onClick={() => handleAddCard()} appearance="primary">
        Add Card
      </Button>
      <Button onClick={() => setAddCard(!addCard)} appearance="subtle">
        X
      </Button>
    </div>
  );
}

export default Addcard;
