import { React, useState, useEffect, memo } from "react";
import Footer from "./components/footer";
import Header from "./components/header";
import List from "./components/list";
import AddList from "./components/addlist";
import { Modal } from "rsuite";
import Button from "rsuite/Button";

let defaultLists = [
  {
    title: "Assigned",
    cards: [
      {
        title: "initial",
        description: "",
        id: 0,
        color: null,
        comments: [],
        tags: [],
      },
    ],
    id: 0,
  },
  {
    title: "In progress",
    cards: [
      {
        title: "initialcard",
        description: "",
        id: 1,
        color: null,
        comments: [],
        tags: [],
      },
    ],
    id: 1,
  },
  {
    title: "Completed",
    cards: [
      {
        title: "card",
        description: "",
        id: 2,
        color: null,
        comments: [],
        tags: [],
      },
    ],
    id: 2,
  },
];
const Container = memo(function Container(props) {
  const [lists, setLists] = useState(defaultLists);
  const [maxListId, setMaxListId] = useState(2);
  const [maxCardId, setMaxCardId] = useState(2);
  const [open, setOpen] = useState(false);
  const [card, setCard] = useState({
    title: "card",
    description: "",
    id: 2,
    color: null,
    comments: [],
    tags: [],
  });
  const [comment, setComment] = useState("");
  const [editComment, setEditComment] = useState(null);
  const [cardIndex, setCardIndex] = useState(null);
  const [listIndex, setListIndex] = useState(null);
  const [tag, setTag] = useState("#000000");
  const [editCommentText, setEditCommentText] = useState("");
  const [openDelete, setOpenDelete] = useState(false);
  const [editTag, setEditTag] = useState(null);
  const [editTagColor, setEditTagColor] = useState("#000000");
  const [list, setList] = useState({ title: null });
  const handleOpen = (card, cardI, listI) => {
    setCardIndex(cardI);
    setListIndex(listI);
    setCard(card);
    setOpen(true);
  };

  const handleClose = () => {
    setEditComment(null);
    setOpen(false);
  };

  const addList = (text) => {
    let temp = [...lists];
    let tempList = { title: text, cards: [], id: maxListId + 1 };
    temp.push(tempList);
    setLists(temp);
    setMaxListId((id) => id + 1);
    props.setCounter(props.counter + 1);
  };

  const changeListName = (text, i) => {
    let tempList = [...lists];
    tempList[i].title = text;
    setLists(tempList);
  };

  const addCard = (text, i) => {
    let temp = [...lists];
    let tempCard = {
      title: text,
      id: maxCardId + 1,
      description: "",
      color: null,
      comments: [],
      tags: [],
    };
    temp[i]["cards"].push(tempCard);
    setLists(temp);
    setMaxCardId((id) => id + 1);
  };

  const changeCardAttribute = (e, attr) => {
    let tempCard = { ...card };
    tempCard[attr] = e;
    setCard(tempCard);
  };

  const handleChangeCard = () => {
    let temp = [...lists];
    temp[listIndex]["cards"][cardIndex] = card;
    setLists(temp);
    setOpen(false);
  };

  const handleDeleteCard = () => {
    let temp = [...lists];
    temp[listIndex].cards.splice(cardIndex, 1);

    setOpen(false);
    setLists(temp);
  };

  const handleAddComment = () => {
    if (comment == "") {
      return;
    }
    let temp = [...lists];
    temp[listIndex]["cards"][cardIndex].comments.push(comment);
    setComment("");
    setLists(temp);
  };

  const handleDeleteComment = (i) => {
    let temp = [...lists];
    temp[listIndex].cards[cardIndex].comments.splice(i, 1);
    setLists(temp);
  };

  const handleEditComment = (i) => {
    let temp = [...lists];
    temp[listIndex].cards[cardIndex].comments[i] = editCommentText;
    setLists(temp);
    setEditComment(null);
  };

  const setEdit = (i, item) => {
    setEditComment(i);
    setEditCommentText(item);
  };

  const handleAddTag = () => {
    let temp = [...lists];
    temp[listIndex].cards[cardIndex].tags.push(tag);
    setLists(temp);
  };

  const handleDeleteTag = (i) => {
    let temp = [...lists];
    temp[listIndex].cards[cardIndex].tags.splice(i, 1);
    setLists(temp);
  };

  const handleMoveList = (first, second) => {
    let temp = [...lists];
    let firstIndex = temp.findIndex((i) => i.id == first);
    let secondIndex = temp.findIndex((i) => i.id == second);
    let firstList = { ...temp[firstIndex] };
    temp.splice(firstIndex, 1);
    temp.splice(secondIndex, 0, firstList);
    setLists(temp);
  };

  const moveCardFunction = (first, second, cardI) => {
    let temp = [...lists];
    let tempCard = { ...lists[first].cards[cardI] };
    temp[first].cards.splice(cardI, 1);
    temp[second].cards.push(tempCard);
    setLists(temp);
  };

  const handleDeleteModal = (index) => {
    setListIndex(index);
    setList(lists[index]);
    setOpenDelete(true);
  };

  const handleDeleteList = () => {
    let temp = [...lists];
    temp.splice(listIndex, 1);
    setLists(temp);
    setOpenDelete(false);
  };

  const handleOpenEditTag = (i, item) => {
    setEditTag(i);
    setEditTagColor(item);
  };

  const handleEditTag = (i) => {
    setEditTag(null);
    let temp = [...lists];
    temp[listIndex].cards[cardIndex].tags[i] = editTagColor;
    setLists(temp);
  };

  return (
    <>
      <div className="main-container">
        <Header />
        <Modal
          size={"sm"}
          open={openDelete}
          onClose={(e) => setOpenDelete(false)}
        >
          <Modal.Body>Are you sure you want to delete {list.title}</Modal.Body>
          <Modal.Footer>
            <Button onClick={(e) => setOpenDelete(false)} appearance="subtle">
              Cancel
            </Button>
            <Button onClick={handleDeleteList} appearance="primary">
              Ok
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal open={open} onClose={handleClose}>
          <Modal.Header>
            <Modal.Title>
              <div
                style={{
                  marginTop: 20,
                  width: "100%",
                  height: 24,
                  background: card.color ? card.color : "none",
                }}
              ></div>
              <div>
                <textarea
                  onChange={(e) => changeCardAttribute(e.target.value, "title")}
                  value={card.title}
                  className="add-card-text-area"
                />
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <div>DESCRIPTION</div>
              <div>
                <textarea
                  onChange={(e) =>
                    changeCardAttribute(e.target.value, "description")
                  }
                  value={card.description}
                  className="add-card-text-area"
                />
              </div>
            </div>
            <div>
              <div>Comments</div>
              <div>
                <textarea
                  onChange={(e) => setComment(e.target.value)}
                  value={comment}
                  className="add-card-text-area"
                />
                <Button appearance="primary" onClick={() => handleAddComment()}>
                  Add Comment
                </Button>
              </div>
              <div className="add-comment-area">
                {card.comments.map((item, i) =>
                  editComment == i ? (
                    <div key={item + i} style={{ marginTop: 10 }}>
                      <div>
                        {
                          <textarea
                            onChange={(e) => setEditCommentText(e.target.value)}
                            value={editCommentText}
                            className="add-card-text-area"
                          />
                        }
                      </div>
                      <div>
                        <Button
                          appearance="primary"
                          onClick={() => handleEditComment(i)}
                        >
                          OK
                        </Button>
                        <Button
                          appearance="primary"
                          onClick={() => setEditComment(null)}
                          color="red"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div key={item + i} style={{ marginTop: 10 }}>
                      <div
                        style={{
                          background: "white",
                          padding: "8px 8px",
                          height: 54,
                          borderRadius: 3,
                        }}
                        onClick={() => setEdit(i, item)}
                      >
                        {item}
                      </div>
                      <div style={{ marginTop: 5 }}>
                        <Button
                          appearance="primary"
                          onClick={() => setEdit(i, item)}
                        >
                          Edit
                        </Button>
                        <Button
                          appearance="primary"
                          onClick={() => handleDeleteComment(i)}
                          color="red"
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
            <div>
              <div>Tags</div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="color"
                  id="head"
                  name="head"
                  value={tag}
                  onChange={(e) => setTag(e.target.value, "color")}
                />
                <Button
                  appearance="primary"
                  style={{ marginLeft: 16 }}
                  onClick={() => handleAddTag()}
                >
                  Add Tag
                </Button>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {card.tags.map((item, i) =>
                  editTag == i ? (
                    <div
                      key={item + i}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <input
                        type="color"
                        id="head"
                        name="head"
                        value={editTagColor}
                        onChange={(e) => setEditTagColor(e.target.value)}
                        style={{
                          height: 50,
                          width: 50,
                          margin: 15,
                        }}
                      />
                      <Button
                        appearance="primary"
                        onClick={() => handleEditTag(i)}
                      >
                        Update Tag
                      </Button>
                    </div>
                  ) : (
                    <div
                      key={item + i}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                      onClick={() => handleOpenEditTag(i, item)}
                    >
                      <div
                        style={{
                          background: item,
                          height: 50,
                          width: 50,
                          margin: 15,
                        }}
                      ></div>
                      <Button
                        onClick={() => handleDeleteTag(i)}
                        appearance="primary"
                        color="red"
                      >
                        X
                      </Button>
                    </div>
                  )
                )}
              </div>
            </div>
            <div>
              <div style={{ marginTop: 16 }}>Color</div>
              <div>
                <input
                  type="color"
                  id="head"
                  name="head"
                  value={card.color}
                  onChange={(e) => changeCardAttribute(e.target.value, "color")}
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="modal-card-delete">
              <Button
                onClick={() => handleDeleteCard()}
                appearance="primary"
                color="red"
              >
                Delete Card
              </Button>
            </div>
            <div className="modal-card-options">
              <Button onClick={() => handleChangeCard()} appearance="primary">
                Ok
              </Button>
              <Button onClick={handleClose} appearance="subtle">
                Cancel
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
        <div className="lists-container">
          {lists.map((list, i) => (
            <div key={list.title + i}>
              <List
                key={list.title}
                title={list.title}
                changeList={changeListName}
                index={i}
                card={list.cards}
                addCard={addCard}
                id={list.id}
                handleOpen={handleOpen}
                list={list}
                moveList={handleMoveList}
                moveCardFunction={moveCardFunction}
                handleDeleteModal={handleDeleteModal}
              />
            </div>
          ))}

          <AddList addList={addList} />
        </div>
      </div>
      <Footer />
    </>
  );
});
export default Container;
