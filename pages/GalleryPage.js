import React, { useEffect, useState } from "react";
import { Card, Input, Alert } from "antd";
import { ReactSortable } from "react-sortablejs";
import { useRouter } from "next/router";
import styles from "@/styles/gallery.module.css";
import { auth } from "@/pages/api/firebase-config";
import { SearchComponent } from "@/components/SearchComponent";

const { Meta } = Card;

const GalleryPage = () => {
  const router = useRouter();
  const currentUser = auth.currentUser;
  console.log(currentUser);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [imgLoading, setImgLoading] = useState(false);
  const [state, setState] = useState([
    { id: 1, name: "bandwcar1.jpg", tag: "black and white car" },
    { id: 2, name: "whitecar1.jpg", tag: "white car" },
    { id: 3, name: "blackcar1.jpg", tag: "black car" },
    { id: 4, name: "graycar1.jpg", tag: "gray car" },
    { id: 5, name: "orangecar1.jpg", tag: "orange car" },
    { id: 6, name: "yellowcar1.jpg", tag: "yellow car" },
    { id: 7, name: "sportcar1.jpg", tag: "sport car" },
    { id: 8, name: "carengine1.jpg", tag: "car engine" },
    { id: 9, name: "minicar1.jpg", tag: "mini car" },
    { id: 10, name: "blackbike.jpg", tag: "black bike" },
    { id: 11, name: "carseats.jpg", tag: "car seats" },
    { id: 12, name: "redbike.jpg", tag: "red bike" },
    { id: 13, name: "nicebike.jpg", tag: "nice bike" },
    { id: 14, name: "bicycle.jpg", tag: "bicycle" },
  ]);

  useEffect(() => {
    if (!currentUser && currentUser === null) {
      setHasError(true);
      const pushUrl = () => {
        setInterval(() => {
          router.push("/");
        }, 4000);
      };
      // pushUrl();
      console.error("You must be logged in");
    }
    console.log("User is logged in and can access gallery");
  }, [currentUser]);

  const [droppedWidgets, setDroppedWidgets] = useState("");
  const [dropped, setDropped] = useState(false);

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

  return (
    <div className={styles.container}>
      {hasError ? (
        <Alert
          message="You are not allowed to access this gallery, Log in at the home page"
          banner
          type="error"
          closable
        />
      ) : null}
      <div className={styles.box}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h1>Photo Gallery</h1>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h3>
            {currentUser ? (
              <div>Welcome {currentUser?.email}</div>
            ) : (
              <div>Please Log In</div>
            )}
          </h3>
        </div>
        <br />
        <SearchComponent />
        <br />
        <div className={styles.widgetcontainer}>
          <ReactSortable list={state} setList={setState}>
            {state.map((item) => (
              <div className={styles.widget} key={item.id}>
                <Card
                  style={{
                    width: "180px",
                    height: "180px",
                    marginBottom: 32,
                  }}
                  hoverable
                  loading={imgLoading}
                  cover={
                    <img
                      onLoad={() => setImgLoading(true)}
                      style={{
                        width: "180px",
                        height: "180px",
                      }}
                      src={`/${item?.name}`}
                    />
                  }
                >
                  <Meta title={item?.tag} />
                </Card>
              </div>
            ))}
          </ReactSortable>
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;
