import React, { useState, useRef } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from "@/styles/gallery.module.css";
import { Imagelist } from "@/components/Imagelist";

const images = [
  "/bandwcar.jpg",
  "/blackcar1.jpg",import React, { useState } from "react";
import { ReactSortable } from "react-sortablejs";
import styles from "@/styles/gallery.module.css";

const SortableList = () => {
  const [state, setState] = useState([
    { id: 1, name: "bandwcar1.jpg" },
    { id: 2, name: "whitecar1.jpg" },
    { id: 3, name: "blackcar1.jpg" },
    { id: 4, name: "graycar1.jpg" },
    { id: 5, name: "orangecar1.jpg" },
    { id: 6, name: "yellowcar1.jpg" },
  ]);
  //   const [widgets, setWidgets] = useState(["WidgetA", "WidgetB", "WidgetC"]);
  const [widgets, setWidgets] = useState([
    "bandwcar1.jpg",
    "whitecar1.jpg",
    "blackcar1.jpg",
    "graycar1.jpg",
    "orangecar1.jpg",
    "yellowcar1.jpg",
  ]);
  //   const [widgets, setWidgets] = useState([
  //     "whitecar1.jpg",
  //     "blackcar1.jpg",
  //     "graycar1.jpg",
  //   ]);
  const [droppedWidgets, setDroppedWidgets] = useState("");
  const [dropped, setDropped] = useState(false);

  console.log(widgets);
  const handleOnDrag = (e, widgetType) => {
    e.dataTransfer.setData("widgetType", widgetType);

    // Get the widget
    // Get the widget name
    // Get the widget index
    // Delete or splice the widget using its index

    // filter out the widgets that is being dragged
    const result = widgets.filter((widget) => widget === widgetType);

    // const isWidgetType = (element) => element === result;
    const widgetIndex = widgets.indexOf(result[0]);

    console.log("you picked: ", result, "with index: ", widgetIndex);

    // set the dragged widget for onDrop function.

    // What this does is, it takes out the element you dragged from the list.
    const newArr = widgets?.splice(widgetIndex, 1);

    const finalArr = widgets?.splice();

    // Put it back into the list in the new position.

    console.log(newArr);
    // Removes it from the array of widgets
    function arrayRemove(arr, value) {
      return arr.filter(function (ele) {
        return ele != value;
      });
    }

    // Create a new array with the new order
    var newArray = arrayRemove(widgets, result);
  };

  const handleOnDrop = (e, index) => {
    const widgetType = e.dataTransfer.getData("widgetType");
    setWidgets([...widgets, widgetType]);

    console.log(index);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h1>Gallery</h1>
        </div>
        <br />
        <div
          // onDragOver={handleDragOver}
          // onDrop={handleOnDrop}
          // style={{
          //   border: "1px dotted black",
          //   minWidth: 120,
          //   minHeight: 500,
          // }}
          className={styles.widgetcontaine
        >
          <ReactSortable list={state} setList={setState}>
            {state.map((item) => (
              <div className={styles.widget} key={item.id}>
                <img
                  style={{ width: "180px", height: "180px" }}
                  src={`/${item?.name}`}
                />
              </div>
            ))}
          </ReactSortable>
          {/* {widgets?.map((widget, index) => (
              <div
                onDragStart={(e) => handleOnDrag(e, widget)}
                draggable
                className={styles.dropWidget}
                key={index}
              >
                <img
                  style={{ width: "180px", height: "180px" }}
                  src={`/${widget}`}
                />
              </div>
            ))} */}
        </div>
      </div>
    </div>
  );
};

export default SortableList;

  "/graycar1.jpg",
  "/whitecar1.jpg",
  // Add more image URLs as needed
];

const gallery = () => {
  const sortableRef = useRef();
  const itemRef = useRef();

  const [widgets, setWidgets] = useState([]);
  // const sortableList = document.querySelector(".sortable-list");
  // const items = sortableList.querySelectorAll(".item");

  itemRef.forEach((item) => {
    item.addEventListener("dragstart", () => {
      // Adding dragging class to item after a delay
      setTimeout(() => item.classList.add("dragging"), 0);
    });
    // Removing dragging class from item on dragend event
    item.addEventListener("dragend", () => item.classList.remove("dragging"));
  });

  const initSortableList = (e) => {
    e.preventDefault();
    const draggingItem = document.querySelector(".dragging");
    // Getting all items except currently dragging and making array of them
    let siblings = [...sortableList.querySelectorAll(".item:not(.dragging)")];

    // Finding the sibling after which the dragging item should be placed
    let nextSibling = siblings.find((sibling) => {
      return e.clientY <= sibling.offsetTop + sibling.offsetHeight / 2;
    });

    // Inserting the dragging item before the found sibling
    sortableList.insertBefore(draggingItem, nextSibling);
  };

  sortableList.addEventListener("dragover", initSortableList);
  sortableList.addEventListener("dragenter", (e) => e.preventDefault());

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h2>Gallery</h2>
        </div>
        <ul ref={sortableRef} className={styles.sortablelist}>
          <li ref={itemRef} className={styles.item} draggable="true">
            <div className={styles.details}>
              <img
                style={{ width: "120px", height: "120px" }}
                src="/blackcar1.jpg"
                alt="car image"
              />
            </div>
            <i class="uil uil-draggabledots"></i>
          </li>
          <li ref={itemRef} className={styles.item} draggable="true">
            <div className={styles.details}>
              <img
                style={{ width: "120px", height: "120px" }}
                src="/yellowcar1.jpg"
                alt="car image"
              />
            </div>
            <i class="uil uil-draggabledots"></i>
          </li>
          <li ref={itemRef} className={styles.item} draggable="true">
            <div className={styles.details}>
              <img
                style={{ width: "120px", height: "120px" }}
                src="/graycar1.jpg"
                alt="car image"
              />
            </div>
            <i class="uil uil-draggabledots"></i>
          </li>
          <li ref={itemRef} className={styles.item} draggable="true">
            <div className={styles.details}>
              <img
                style={{ width: "120px", height: "120px" }}
                src="/whitecar1.jpg"
                alt="car image"
              />
            </div>
            <i class="uil uil-draggabledots"></i>
          </li>
          <li ref={itemRef} className={styles.item} draggable="true">
            <div className={styles.details}>
              <img
                style={{ width: "120px", height: "120px" }}
                src="/orangecar1.jpg"
                alt="car image"
              />
            </div>
            <i class="uil uil-draggabledots"></i>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default gallery;
