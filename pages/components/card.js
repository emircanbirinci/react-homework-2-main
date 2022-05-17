import { React, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
function Card(props) {
  let card = props.card;
  let listIndex = props.listIndex;
  let cardIndex = props.cardIndex;
  const [{ isDragging }, dragCard] = useDrag(() => ({
    type: "card",
    item: card,
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();

      if (dropResult && dropResult.index != null) {
        props.moveCardFunction(listIndex, dropResult.index, cardIndex);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));

  return card ? (
    <div
      className="card-container"
      onClick={() =>
        props.handleOpen(props.card, props.cardIndex, props.listIndex)
      }
      style={{ height: "fit-content" }}
      ref={dragCard}
    >
      {props.card.color ? (
        <div style={{ background: props.card.color, height: 14 }}></div>
      ) : null}
      <div>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {card.tags.map((item, i) => (
            <div
              key={item + i}
              style={{ background: item, height: 16, width: 16, margin: 4 }}
            ></div>
          ))}
        </div>

        {card.title}
      </div>
    </div>
  ) : null;
}

export default Card;
