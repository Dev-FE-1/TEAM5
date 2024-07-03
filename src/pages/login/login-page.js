import styles from "./login.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const Login = () => {
    return `
<main>
    <section class=${cx("login-form")}>
        <h1>Intranet</h1>
        <form action="">
            <div class=${cx("int-area")}>
                <input type="text" name="id" id="id" autocomplete="off" required>
                <label for="id">Employee ID</label>
            </div>
            <div class=${cx("int-area")}>
                <input type="password" name="pw" id="pw" autocomplete="off" required>
                <label for="pw">Password</label>
            </div>
            <div class=${cx("btn-area")}>
                <button type="submit">LOGIN</button>
            </div>
        </form>
    </section>
</main>
<!--<footer>-->
<!--    <p>&copy; 2024 Intranet. All rights reserved.</p>-->
<!--</footer>-->
  `;
};


export default Login;
