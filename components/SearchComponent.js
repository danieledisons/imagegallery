import React, { useState } from "react";
import Image from "next/image";
import { Input, Dropdown, Button } from "antd";
import styles from "@/styles/Searchcomponent.module.css";

const { Search } = Input;

export const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);

  const data = [
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
  ];

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchQuery(value);

    // Filter the data based on the search query
    const filteredResults = data.filter((item) =>
      item.tag.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filteredResults);
    setIsEmpty(false);
    if (value.length === 0) {
      // console.log("No results");
      setIsEmpty(true);
      setFilteredData(["empty"]);
    }

    // console.log("Filtered data: " + filteredData);
  };

  return (
    <div>
      <div>
        {/* <Input
          size="large"
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search for Images..."
        /> */}
        <Search
          value={searchQuery}
          onChange={handleSearch}
          size="large"
          placeholder="Search for Images..."
          allowClear
          onSearch={() => console.log("onsearch")}
        />
      </div>
      {isEmpty ? null : (
        <ul>
          {filteredData?.map((item, index) => (
            <li key={index}>
              <div className={styles.searchContainer}>
                <div className={styles.searchItem}>
                  <Image
                    width={100}
                    height={100}
                    src={`/${item.name}`}
                    placeholder="blur"
                    blurDataURL={`/smallpix/${item?.smallImg}`}
                  />
                  <div>{item.tag}</div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
