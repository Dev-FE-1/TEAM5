import { HOST } from "../constants.js";

const getAllUser = async () => {
  const res = await fetch("http://localhost:8080/api/users", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    const errorData = await res.json();
    console.error("Error:", errorData);
    alert("error : " + errorData.error);
    return;
  }

  const resjson = await res.json();
  console.log(resjson);
};

const getUser = async (userId) => {
  const res = await fetch(`http://localhost:8080/api/users/${userId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    const errorData = await res.json();
    console.error("Error:", errorData);
    alert("error : " + errorData.error);
    return;
  }

  const resjson = await res.json();
  console.log(resjson);
  alert(resjson.message);
};

const postUser = async (userId) => {
  const res = await fetch(`http://localhost:8080/api/users/${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: "test2",
      email: "test2@test.com",
      name: "hoyeon",
      team: "delivery2",
      position: "FE-lead",
      imgUrl: "#",
    }),
  });
  if (!res.ok) {
    const errorData = await res.json();
    console.error("Error:", errorData);
    alert("error : " + errorData.error);
    return;
  }

  const resjson = await res.json();
  console.log(resjson);
  alert(resjson.message);
};

const editUser = async (userId) => {
  const res = await fetch(`http://localhost:8080/api/users/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: "새로운 비번",
      email: "test2@test.com",
      name: "hoyeon",
      team: "delivery2",
      position: "FE-lead",
      imgUrl: "#",
    }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    console.error("Error:", errorData);
    alert("error : " + errorData.error);
    return;
  }

  const resjson = await res.json();
  console.log(resjson);
  alert(resjson.message);
};

const deleteUser = async (userId) => {
  const res = await fetch(`http://localhost:8080/api/users/${userId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    const errorData = await res.json();
    console.error("Error:", errorData);
    alert("error : " + errorData.error);
    return;
  }

  const resjson = await res.json();
  console.log(resjson);
  alert(resjson.message);
};

const login = async () => {
  const body = {
    userId: "lovelace",
    password: "password",
  };

  const res = await fetch(`http://localhost:8080/api/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errorData = await res.json();
    console.error("Error:", errorData);
    alert(errorData.message);
    return;
  }

  const resjson = await res.json();
  console.log(resjson);
  alert(resjson.message);
};

const setProfileImage = async (userId) => {
  const input = document.getElementById("input");
  const profileImage = input.files[0];
  const formData = new FormData();
  formData.append('profile-image', profileImage); 

  const res = await fetch(
    `http://localhost:8080/api/users/${userId}/profile-image`,
    {
      method: "PUT",
      body: formData,
    }
  );

  if (!res.ok) {
    console.log('not ok')
    const responses = await res.json();
    console.error("Error:", responses.message);
    console.log("res", responses);
    alert("error : " + responses.message);
    return;
  }

  const resjson = await res.json();
  console.log(resjson);
  alert(resjson.message);
};

const deleteProfileImage = async (userId) => {
  const res = await fetch(
    `http://localhost:8080/api/users/${userId}/profile-image`,
    {
      method: "DELETE",
    }
  );

  if (!res.ok) {
    console.log('not ok')
    const responses = await res.json();
    console.error("Error:", responses.message);
    console.log("res", responses);
    alert("error : " + responses.message);
    return;
  }

  const resjson = await res.json();
  console.log(resjson);
  alert(resjson.message);
};

document
  .getElementById("req")
  .addEventListener("click", async () => await setProfileImage("kimpra2989"));

document
  .getElementById("fetch-user-info")
  .addEventListener("click", async () => {
    const res = await fetch(`${HOST}/api/users/kimpra2989`);
    const user = await res.json();

    console.log(user);

    const { email, imgUrl, name, position, team, userId } = user.data;

    const profile = document.getElementById("profile-image");
    document.getElementById("name").textContent = name;
    document.getElementById("team").textContent = team;
    document.getElementById("position").textContent = position;
    document.getElementById("email").textContent = email;
    document.getElementById("userId").textContent = userId;

    const placeholder = "https://placehold.co/300x300";
    profile.setAttribute("src", imgUrl ?? placeholder);
  });

const input = document.getElementById("input");
input.addEventListener("change", () => {
  console.log(input.files[0]);
});
