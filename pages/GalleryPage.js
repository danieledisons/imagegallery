import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Card, Alert, Spin, Input } from "antd";
import { ReactSortable } from "react-sortablejs";
import { useRouter } from "next/router";
import { Spincomponent } from "@/components/Spincomponent";
import styles from "@/styles/gallery.module.css";
import { auth } from "@/pages/api/firebase-config";
import { SearchComponent } from "@/components/SearchComponent";
import ProgressiveImage from "react-progressive-graceful-image";

const { Meta } = Card;
const { Search } = Input;

const GalleryPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const router = useRouter();
  const currentUser = auth.currentUser;
  // console.log(currentUser);
  const [loading, setLoading] = useState(true); // turn back to true
  const [hasError, setHasError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [searching, setSearching] = useState(false);

  const [imgLoading, setImgLoading] = useState(false);
  const [state, setState] = useState([
    {
      id: 1,
      name: "bandwcar1.jpg",
      tag: "black and white car",
      smallImg: "bandwcar1-small.jpg",
    },
    {
      id: 2,
      name: "whitecar1.jpg",
      tag: "white car",
      smallImg: "whitecar1-small.jpg",
    },
    {
      id: 3,
      name: "blackcar1.jpg",
      tag: "black car",
      smallImg: "blackcar1-small.jpg",
    },
    {
      id: 4,
      name: "graycar1.jpg",
      tag: "gray car",
      smallImg: "graycar1-small.jpg",
    },
    {
      id: 5,
      name: "orangecar1.jpg",
      tag: "orange car",
      smallImg: "orangecar1-small.jpg",
    },
    {
      id: 6,
      name: "yellowcar1.jpg",
      tag: "yellow car",
      smallImg: "yellowcar1-small.jpg",
    },
    {
      id: 7,
      name: "sportcar1.jpg",
      tag: "sport car",
      smallImg: "sportcar1-small.jpg",
    },
    {
      id: 8,
      name: "carengine1.jpg",
      tag: "car engine",
      smallImg: "carengine1-small.jpg",
    },
    {
      id: 9,
      name: "minicar1.jpg",
      tag: "mini car",
      smallImg: "minicar1-small.jpg",
    },
    {
      id: 10,
      name: "blackbike.jpg",
      tag: "black bike",
      smallImg: "blackbike-small.jpg",
    },
    {
      id: 11,
      name: "carseats.jpg",
      tag: "car seats",
      smallImg: "carseats-small.jpg",
    },
    {
      id: 12,
      name: "redbike.jpg",
      tag: "red bike",
      smallImg: "redbike-small.jpg",
    },
    {
      id: 13,
      name: "nicebike.jpg",
      tag: "nice bike",
      smallImg: "nicebike-small.jpg",
    },
    {
      id: 14,
      name: "bicycle.jpg",
      tag: "bicycle",
      smallImg: "bicycle-small.jpg",
    },
  ]);

  useEffect(() => {
    if (!currentUser) {
      router.push("/");
    }
  }, []);

  useEffect(() => {
    if (!currentUser && currentUser === null) {
      setHasError(true);
      const pushUrl = () => {
        setInterval(() => {
          router.push("/");
        }, 4000);
      };
      // pushUrl();
      // console.error("You must be logged in");
    }
    // console.log("User is logged in and can access gallery");
  }, [currentUser]);

  const capitalText = (string) => {
    return string.toUpperCase();
  };
  useEffect(() => {
    const loadAfterInterval = () => {
      if (currentUser) {
        setInterval(() => {
          setLoading(false);
        }, 2000);
      }
      // setLoading(false);
    };
    loadAfterInterval();
  }, []);

  // console.log(111, searching);

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchQuery(value);

    const filteredResults = state?.filter((item) =>
      item.tag.toLowerCase().includes(value?.toLowerCase())
    );
    setFilteredData(filteredResults);

    if (event.target.value === "") {
      setState([
        {
          id: 1,
          name: "bandwcar1.jpg",
          tag: "black and white car",
          smallImg: "bandwcar1-small.jpg",
        },
        {
          id: 2,
          name: "whitecar1.jpg",
          tag: "white car",
          smallImg: "whitecar1-small.jpg",
        },
        {
          id: 3,
          name: "blackcar1.jpg",
          tag: "black car",
          smallImg: "blackcar1-small.jpg",
        },
        {
          id: 4,
          name: "graycar1.jpg",
          tag: "gray car",
          smallImg: "graycar1-small.jpg",
        },
        {
          id: 5,
          name: "orangecar1.jpg",
          tag: "orange car",
          smallImg: "orangecar1-small.jpg",
        },
        {
          id: 6,
          name: "yellowcar1.jpg",
          tag: "yellow car",
          smallImg: "yellowcar1-small.jpg",
        },
        {
          id: 7,
          name: "sportcar1.jpg",
          tag: "sport car",
          smallImg: "sportcar1-small.jpg",
        },
        {
          id: 8,
          name: "carengine1.jpg",
          tag: "car engine",
          smallImg: "carengine1-small.jpg",
        },
        {
          id: 9,
          name: "minicar1.jpg",
          tag: "mini car",
          smallImg: "minicar1-small.jpg",
        },
        {
          id: 10,
          name: "blackbike.jpg",
          tag: "black bike",
          smallImg: "blackbike-small.jpg",
        },
        {
          id: 11,
          name: "carseats.jpg",
          tag: "car seats",
          smallImg: "carseats-small.jpg",
        },
        {
          id: 12,
          name: "redbike.jpg",
          tag: "red bike",
          smallImg: "redbike-small.jpg",
        },
        {
          id: 13,
          name: "nicebike.jpg",
          tag: "nice bike",
          smallImg: "nicebike-small.jpg",
        },
        {
          id: 14,
          name: "bicycle.jpg",
          tag: "bicycle",
          smallImg: "bicycle-small.jpg",
        },
      ]);
    }
    // if (searching) {

    // }
    // if (value.length === 0) {
    //   setSearching(false);
    //   setState(filteredResults);
    //   // console.log("No results");
    //   // setState([
    //   //   // {
    //   //   //   id: 1,
    //   //   //   name: "bandwcar1.jpg",
    //   //   //   tag: "black and white car",
    //   //   //   smallImg: "bandwcar1-small.jpg",
    //   //   // },
    //   //   // {
    //   //   //   id: 2,
    //   //   //   name: "whitecar1.jpg",
    //   //   //   tag: "white car",
    //   //   //   smallImg: "whitecar1-small.jpg",
    //   //   // },
    //   //   // {
    //   //   //   id: 3,
    //   //   //   name: "blackcar1.jpg",
    //   //   //   tag: "black car",
    //   //   //   smallImg: "blackcar1-small.jpg",
    //   //   // },
    //   //   // {
    //   //   //   id: 4,
    //   //   //   name: "graycar1.jpg",
    //   //   //   tag: "gray car",
    //   //   //   smallImg: "graycar1-small.jpg",
    //   //   // },
    //   //   // {
    //   //   //   id: 5,
    //   //   //   name: "orangecar1.jpg",
    //   //   //   tag: "orange car",
    //   //   //   smallImg: "orangecar1-small.jpg",
    //   //   // },
    //   //   // {
    //   //   //   id: 6,
    //   //   //   name: "yellowcar1.jpg",
    //   //   //   tag: "yellow car",
    //   //   //   smallImg: "yellowcar1-small.jpg",
    //   //   // },
    //   //   // {
    //   //   //   id: 7,
    //   //   //   name: "sportcar1.jpg",
    //   //   //   tag: "sport car",
    //   //   //   smallImg: "sportcar1-small.jpg",
    //   //   // },
    //   //   // {
    //   //   //   id: 8,
    //   //   //   name: "carengine1.jpg",
    //   //   //   tag: "car engine",
    //   //   //   smallImg: "carengine1-small.jpg",
    //   //   // },
    //   //   // {
    //   //   //   id: 9,
    //   //   //   name: "minicar1.jpg",
    //   //   //   tag: "mini car",
    //   //   //   smallImg: "minicar1-small.jpg",
    //   //   // },
    //   //   // {
    //   //   //   id: 10,
    //   //   //   name: "blackbike.jpg",
    //   //   //   tag: "black bike",
    //   //   //   smallImg: "blackbike-small.jpg",
    //   //   // },
    //   //   // {
    //   //   //   id: 11,
    //   //   //   name: "carseats.jpg",
    //   //   //   tag: "car seats",
    //   //   //   smallImg: "carseats-small.jpg",
    //   //   // },
    //   //   // {
    //   //   //   id: 12,
    //   //   //   name: "redbike.jpg",
    //   //   //   tag: "red bike",
    //   //   //   smallImg: "redbike-small.jpg",
    //   //   // },
    //   //   // {
    //   //   //   id: 13,
    //   //   //   name: "nicebike.jpg",
    //   //   //   tag: "nice bike",
    //   //   //   smallImg: "nicebike-small.jpg",
    //   //   // },
    //   //   // {
    //   //   //   id: 14,
    //   //   //   name: "bicycle.jpg",
    //   //   //   tag: "bicycle",
    //   //   //   smallImg: "bicycle-small.jpg",
    //   //   // },
    //   // ]);
    //   setIsEmpty(true);

    // if (value?.length === 0) {
    // setFilteredData(
    //   {
    //     id: 1,
    //     name: "bandwcar1.jpg",
    //     tag: "black and white car",
    //     smallImg: "bandwcar1-small.jpg",
    //   },
    //   {
    //     id: 2,
    //     name: "whitecar1.jpg",
    //     tag: "white car",
    //     smallImg: "whitecar1-small.jpg",
    //   },
    //   {
    //     id: 3,
    //     name: "blackcar1.jpg",
    //     tag: "black car",
    //     smallImg: "blackcar1-small.jpg",
    //   },
    //   {
    //     id: 4,
    //     name: "graycar1.jpg",
    //     tag: "gray car",
    //     smallImg: "graycar1-small.jpg",
    //   },
    //   {
    //     id: 5,
    //     name: "orangecar1.jpg",
    //     tag: "orange car",
    //     smallImg: "orangecar1-small.jpg",
    //   },
    //   {
    //     id: 6,
    //     name: "yellowcar1.jpg",
    //     tag: "yellow car",
    //     smallImg: "yellowcar1-small.jpg",
    //   },
    //   {
    //     id: 7,
    //     name: "sportcar1.jpg",
    //     tag: "sport car",
    //     smallImg: "sportcar1-small.jpg",
    //   },
    //   {
    //     id: 8,
    //     name: "carengine1.jpg",
    //     tag: "car engine",
    //     smallImg: "carengine1-small.jpg",
    //   },
    //   {
    //     id: 9,
    //     name: "minicar1.jpg",
    //     tag: "mini car",
    //     smallImg: "minicar1-small.jpg",
    //   },
    //   {
    //     id: 10,
    //     name: "blackbike.jpg",
    //     tag: "black bike",
    //     smallImg: "blackbike-small.jpg",
    //   },
    //   {
    //     id: 11,
    //     name: "carseats.jpg",
    //     tag: "car seats",
    //     smallImg: "carseats-small.jpg",
    //   },
    //   {
    //     id: 12,
    //     name: "redbike.jpg",
    //     tag: "red bike",
    //     smallImg: "redbike-small.jpg",
    //   },
    //   {
    //     id: 13,
    //     name: "nicebike.jpg",
    //     tag: "nice bike",
    //     smallImg: "nicebike-small.jpg",
    //   },
    //   {
    //     id: 14,
    //     name: "bicycle.jpg",
    //     tag: "bicycle",
    //     smallImg: "bicycle-small.jpg",
    //   }
    // );
    //   console.log("less than zero");
    // }
  };

  console.log(222, filteredData);

  const handleClick = (event) => {
    setState(filteredData);
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
              <div>
                <a style={{ color: "#7F265B" }} href="/">
                  Click here to Log In
                </a>
              </div>
            )}
          </h3>
        </div>
        <br />
        <Search
          value={searchQuery}
          onChange={handleSearch}
          size="large"
          placeholder="Search for Images..."
          allowClear
          onSearch={handleClick}
        />
        {/* <SearchComponent /> */}
        <br />
        <br />
        <div className={styles.widgetcontainer}>
          {currentUser ? null : <Spincomponent />}
          <ReactSortable list={state} setList={setState}>
            {currentUser &&
              state?.map((item) => (
                <div className={styles.widget} key={item.id}>
                  <Card
                    className={styles.widgetCard}
                    style={{
                      width: "180px",
                      height: "180px",
                      marginBottom: 32,
                    }}
                    hoverable
                    // loading={imgLoading}
                    cover={
                      <div>
                        <Image
                          alt="pictures of cars and bikes"
                          placeholder="blur"
                          blurDataURL={`/smallpix/${item?.smallImg}`}
                          height={160}
                          width={160}
                          src={`/${item?.name}`}
                        />
                      </div>
                    }
                  >
                    <div>
                      <Meta title={item?.tag?.toUpperCase()} />
                    </div>
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
