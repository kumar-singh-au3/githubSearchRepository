import React, { useState, useEffect, useMemo, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { FaFileImport } from "react-icons/fa";
import { FaFileExport } from "react-icons/fa";
import { GoRepo } from 'react-icons/go';

import { importFavourite } from "../../actions";
import List from "../List";
import "./index.scss";

const Favourites = () => {
  const inputRef=useRef(null)
  const favouritesList = useSelector((state) => state.favouritesList);
  const [text, setText] = useState("");
  const [filteredList, setFilteredList] = useState(favouritesList);
  const dispatch = useDispatch();

  useEffect(()=>{
    inputRef.current.focus()
  },[])

  useEffect(() => {
    if (text) {
      setFilteredList(
        favouritesList.filter((item) => item.name.match(new RegExp(text, "i")))
      );
    } else {
      setFilteredList(favouritesList);
    }
  }, [favouritesList, text]);

  const dataStr = useMemo(
    () =>
      "data:text/json;charset=utf-8," +
      encodeURIComponent(localStorage.getItem("favourites")),
    [favouritesList]
  );

  function onChangeFile(event) {
    const favFile = event.target.files[0];
    const favFileExtension = favFile.name.split(".").at(-1);
    if (favFileExtension !== "json") {
      alert("Please upload .json file");
      return;
    }
    const reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(favFile);
  }

  function onReaderLoad(event) {
    const favArr = JSON.parse(event.target.result);
    dispatch(importFavourite(favArr));
  }

  return (
    <div className="favouritesPage">
      <div className="topBar">
        <Link to="/">
        <div className="iconLabel">
          <BiArrowBack className="" />
          <p>Back</p>
          </div>
        </Link>
        <a href={dataStr} download="favourites.json">
        <div className="iconLabel">
          <FaFileExport className="" />
          <p>Export</p>
          </div>
        </a>
        <input
          onChange={onChangeFile}
          id="json_file"
          type="file"
          accept="application/JSON"
        />
        <label htmlFor="json_file">
          <div className="iconLabel">
          <FaFileImport className="" />
          <p>Import</p>
          </div>
        </label>
      </div>
      <header>
        <nav>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search Repo"
            onChange={(e) => setText(e.target.value)}
          />
        </nav>
        <GoRepo className="repoIcon"/>
      </header>
      {filteredList.map((item) => (
        <List key={item.id} item={item} isFav={true} />
      ))}
    </div>
  );
};

export default Favourites;
