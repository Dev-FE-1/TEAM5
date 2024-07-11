import classNames from "classnames/bind";
import { fetchCommutesByUserId } from "../../../api/commuteApi";
import styles from "./commute.module.css";
import setCommuteStatus from "./setCommuteStatus";

const cx = classNames.bind(styles);

const loginUser = localStorage.getItem("loginUser") ?? `kimpra2989`;

const render_list_items = async (param = "all", from = "select") => {
  if (window.commuteData.length == 0) {
    window.commuteData = await fetchCommutesByUserId(`${loginUser}`);

    window.commuteData = window.commuteData.map((data) => ({
      ...data,
      status: setCommuteStatus(data.arriveTime, data.leaveTime),
    }));
  }

  const container = document.querySelector(`.${cx("request-item-container")}`);

  const filterd_list =
    from == "select"
      ? window.commuteData.filter((data) =>
          param == "all" ? true : data.status === param
        )
      : window.commuteData.filter((data) =>
          Object.values(data).some((x) => x == param)
        );

  const list_item = filterd_list
    .map(
      ({ status, userId, date, arriveTime, leaveTime }) => `
    <div class="${cx("grid", "request-item")}">
      <div>${status}</div>
      <div>${userId}</div>
      <div>${date}</div>
      <div>${arriveTime}</div>
      <div>${leaveTime}</div>
      <div class="${cx("request-tools")}">
        -
      </div>
    </div>
  `
    )
    .join("");
  if (list_item.length == 0) return (container.innerHTML = "NO DATA");
  container.innerHTML = list_item;
};

export default render_list_items;
