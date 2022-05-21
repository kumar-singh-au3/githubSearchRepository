import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";

import { searchedRepos } from "../../actions";
import { useDebouncedAxios } from "../../hook";
import SearchResults from "../SearchResults";
import { Link } from "react-router-dom";
import { GoRepo } from 'react-icons/go';
import  './index.scss';

function HomePage() {
  const inputRef=useRef(null)
  const [searchText, setSearchText] = useState("");
  const [pageNo, setPageNo] = useState(1);
  const { data = {} } = useDebouncedAxios(searchText, 1500, pageNo);
  const { items = [], total_count=0 } = data;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(searchedRepos(items));
  }, [items]);

  useEffect(()=>{
    inputRef.current.focus()
  },[])

  const onChangeSearchText =(val)=>{
    setSearchText(val)
    setPageNo(1)
  }

  const fetchMoreData = ()=>{
    setPageNo(val => val + 1)
  }
  return (
    <div className="homepage">
      <header>
        <nav>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search Repo"
            onChange={(e) => onChangeSearchText(e.target.value)}
          />
        </nav>
        <GoRepo className="repoIcon"/>
      </header>  
      <Link to='/favourite' style={{marginBottom: '12px', display:'block'}} >Favourites</Link>
      <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={items.length!==total_count}
        loader={<h4>Loading...</h4>}
      >
        <SearchResults />
      </InfiniteScroll>
    </div>
  );
}

export default HomePage;
