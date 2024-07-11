import render_list_items from "./render-list-item";
import classNames from "classnames/bind";
import styles from "./commute.module.css";

const cx = classNames.bind(styles);

window.commuteData = [];

const init = () => {
  render_list_items();

  //select 값에 따른 필터링
  const select = document.querySelector("select");
  select.addEventListener("change", (e) => {
    render_list_items(e.target.value);
  });

  //검색어에 따른 필터링
  const searchInput = document.querySelector(`.${cx("search")} input`);
  const searchIcon = document.querySelector(`.${cx("search")} svg`);

  searchIcon.addEventListener("click", () => {
    const search_keyword = searchInput.value;
    render_list_items(search_keyword, "search");
    // console.log("word", search_keyword);
  });

};

export default init;
