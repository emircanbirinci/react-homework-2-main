import { React, useState } from "react";
import Addcard from "./addcard";
import Card from "./card";
import { useDrag, useDrop } from "react-dnd";
import { Button } from "rsuite";
function List(props) {
  const [text, setText] = useState(props.title);
  const [counter, setCounter] = useState(1);
  let list = props.list;
  let index = props.id;
  const [{ canDrop, isOver }, dropCard] = useDrop(() => ({
    accept: "card",
    drop: () => ({
      index,
    }),
  }));

  let moveFunction = (first, second) => {
    setCounter(counter + 1);
    props.moveList(first, second);
  };
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "list",
    item: list,
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (dropResult != null && dropResult.index != null) {
        moveFunction(index, dropResult.index);
      }
    },
  }));
  const [{ canDropList, isOverList }, dropList] = useDrop(() => ({
    accept: "list",
    drop: () => ({
      index,
    }),
  }));

  return (
    <div ref={dropList} key={props.id}>
      <div className="list-container" ref={drag}>
        <div className="list-delete">
          <Button
            onClick={(e) => props.handleDeleteModal(props.index)}
            style={{ background: "#ebecf0" }}
          >
            X
          </Button>
        </div>
        <div className="list-header">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="list-header-text"
          />

          {props.title == text ? null : (
            <Button
              onClick={() => props.changeList(text, props.index)}
              className="list-header-button"
              appearance="primary"
            >
              ok
            </Button>
          )}
        </div>
        <div className="cards-container" ref={dropCard}>
          {props.card
            ? props.card.map((item, i) => (
                <div key={item.title + i}>
                  <Card
                    key={item.title + i}
                    card={item}
                    handleOpen={props.handleOpen}
                    listIndex={props.index}
                    cardIndex={i}
                    moveCardFunction={props.moveCardFunction}
                  />
                </div>
              ))
            : null}
          <Addcard addCard={props.addCard} index={props.index} />
        </div>
      </div>
    </div>
  );
}

export default List;
