import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import SearchBar from "../components/CategoriesPage/SearchBar/SearchBar";
import CategoriesBar from "../components/CategoriesPage/CategoriesBar/CategoriesBar";
import SearchList from "../components/CategoriesPage/SearchList/SearchList";

const CategoriesPage = () => {
  const [onSearch, setOnSearch] = useState(false);
  const [searchList, setSearchList] = useState([]);
  const [cate, setCate] = useState('book');
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const urlCate = queryParams.get('cate'); 

  const startSearchHandler = (list) => {
    setOnSearch(true);
    setSearchList(list);
  };

  const setCateHandler = (newCate) => {
    if (newCate === cate) {
      setCate(null);
      return;
    }
    setCate(newCate);
  };

  const cancelCateHandler = () => {
    setCate(null);
  };

  useEffect(() => {
    if (cate) {
      setOnSearch(false);
    }
  }, [cate]);

  useEffect(() => {
    if (urlCate) {
      setCate(urlCate);
    }
  }, [urlCate]);

  return (
    <>
      <SearchBar cate={cate} startSearch={startSearchHandler} cancelCate={cancelCateHandler} />
      <CategoriesBar
        cateState={cate}
        setCateHandler={setCateHandler}
      />
      {onSearch && <SearchList list={searchList} />}
    </>
  );
};

export default CategoriesPage;
