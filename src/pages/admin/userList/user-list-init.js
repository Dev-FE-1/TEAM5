import axios from "axios";
import classNames from "classnames/bind";
import styles from "./user-list.module.css";

const cx = classNames.bind(styles);

const init = () => {
  document.addEventListener('DOMContentLoaded', async function() {
      const profilesPerPage = 16;
      let currentPage = 1;
      const pagesToShow = 5;
      let profileData = [];
  
      async function fetchProfiles() {
          const response = await axios.get("http://localhost:8080/api/users");
          console.log("API Response:", response.data);
          return response.data.data;
      }
  
      function createProfileCard(profile) {
          const { imgUrl, name, userId, team, position, email } = profile;
          const placeholder = "https://via.placeholder.com/100";
          const profileCard = document.createElement('div');
          profileCard.className = cx('profile-card');
          profileCard.dataset.name = name;
          profileCard.dataset.userid = userId;
          profileCard.dataset.team = team;
          profileCard.dataset.position = position;
          profileCard.dataset.email = email;
          profileCard.dataset.imgurl = imgUrl ?? placeholder;
  
          profileCard.innerHTML = `
              <button class="${cx('close-button')}" title="Remove">×</button>
              <img src="${imgUrl ?? placeholder}" alt="Profile Picture">
              <div class="${cx('info')}">
                  <div class="${cx('info-item')}">
                      <span class="${cx('label')}">이름 :</span>
                      <span class="${cx('value')}">${name}</span>
                  </div>
                  <div class="${cx('info-item')}">
                      <span class="${cx('label')}">사번 :</span>
                      <span class="${cx('value')}">${userId}</span>
                  </div>
                  <div class="${cx('info-item')}">
                      <span class="${cx('label')}">팀 :</span>
                      <span class="${cx('value')}">${team}</span>
                  </div>
                  <div class="${cx('info-item')}">
                      <span class="${cx('label')}">직급 :</span>
                      <span class="${cx('value')}">${position}</span>
                  </div>
                  <div class="${cx('info-item')}">
                      <span class="${cx('label')}">이메일 :</span>
                      <span class="${cx('value')}">${email}</span>
                  </div>
              </div>
          `;
  
          return profileCard;
      }
  
      async function renderProfiles() {
          profileData = await fetchProfiles();
          const profileContainer = document.getElementById('profile-container');
  
          if (!profileContainer) {
              console.error("Profile container not found.");
              return;
          }
  
          const totalProfiles = profileData.length;
          const totalPages = Math.ceil(totalProfiles / profilesPerPage);
  
          profileContainer.innerHTML = '';
          profileData.forEach((profile, index) => {
              if (index >= (currentPage - 1) * profilesPerPage && index < currentPage * profilesPerPage) {
                  const profileCard = createProfileCard(profile);
                  profileContainer.appendChild(profileCard);
              }
          });
          renderPagination(totalPages);
      }
  
      function renderPagination(totalPages) {
          const paginationContainer = document.querySelector('.pagination');
  
          if (!paginationContainer) {
              console.error("Pagination container not found.");
              return;
          }
  
          paginationContainer.innerHTML = '';
  
          const prevButton = document.createElement('button');
          prevButton.id = 'prevPage';
          prevButton.className = cx('pagination-button');
          prevButton.textContent = 'Previous';
          prevButton.disabled = currentPage === 1;
          paginationContainer.appendChild(prevButton);
  
          const startPage = Math.floor((currentPage - 1) / pagesToShow) * pagesToShow + 1;
          const endPage = Math.min(startPage + pagesToShow - 1, totalPages);
  
          for (let i = startPage; i <= endPage; i++) {
              const pageButton = document.createElement('button');
              pageButton.className = cx('page-button');
              pageButton.textContent = i;
              pageButton.disabled = i === currentPage;
              paginationContainer.appendChild(pageButton);
          }
  
          const nextButton = document.createElement('button');
          nextButton.id = 'nextPage';
          nextButton.className = cx('pagination-button');
          nextButton.textContent = 'Next';
          nextButton.disabled = currentPage === totalPages;
          paginationContainer.appendChild(nextButton);
      }
  
      function openModal() {
          const modal = document.getElementById('modal');
          if (modal) modal.style.display = 'block';
      }
  
      function closeModal() {
          const modal = document.getElementById('modal');
          if (modal) modal.style.display = 'none';
      }
  
      async function addProfileCard() {
          const name = document.getElementById('modal-name').value;
          const userId = document.getElementById('modal-userId').value;
          const team = document.getElementById('modal-team').value;
          const position = document.getElementById('modal-position').value;
          const email = document.getElementById('modal-email').value;
          const password = document.getElementById('modal-password').value;
          const imageInput = document.getElementById('modal-image');
          let imageUrl = 'https://via.placeholder.com/100';
  
          if (imageInput.files && imageInput.files[0]) {
              const reader = new FileReader();
              reader.onload = async function(e) {
                  imageUrl = e.target.result;
                  const newProfile = { name, userId, team, position, email, password, imgUrl: imageUrl };
                  console.log("New Profile Data:", newProfile);
                  await saveProfileToServer(newProfile);
                  renderProfiles();
                  closeModal();
              };
              reader.readAsDataURL(imageInput.files[0]);
          } else {
              const newProfile = { name, userId, team, position, email, password, imgUrl: imageUrl };
              console.log("New Profile Data:", newProfile);
              await saveProfileToServer(newProfile);
              renderProfiles();
              closeModal();
          }
      }
  
      async function saveProfileToServer(profile) {
          const response = await axios.post("http://localhost:8080/api/users", profile);
          console.log("Profile saved:", response.data);
      }
  
      async function deleteProfileFromServer(userId) {
          const response = await axios.delete(`http://localhost:8080/api/users/${userId}`);
          console.log("Profile deleted:", response.data);
      }
  
      document.getElementById('profile-container').addEventListener('click', function(event) {
          const profileCard = event.target.closest('.profile-card');
  
          if (event.target.classList.contains(cx('close-button'))) {
              event.stopPropagation();
              const userId = profileCard.dataset.userid;
              deleteProfileFromServer(userId).then(renderProfiles);
              return;
          }
  
          if (profileCard) {
              const name = profileCard.dataset.name;
              const userId = profileCard.dataset.userid;
              const team = profileCard.dataset.team;
              const position = profileCard.dataset.position;
              const email = profileCard.dataset.email;
              const imgUrl = profileCard.dataset.imgurl;
  
              console.log({ name, userId, team, position, email, imgUrl });
  
              const url = `/src/admin/user/profile/index.html?name=${encodeURIComponent(name)}&userId=${encodeURIComponent(userId)}&team=${encodeURIComponent(team)}&position=${encodeURIComponent(position)}&email=${encodeURIComponent(email)}&imgUrl=${encodeURIComponent(imgUrl)}`;
              window.location.href = url;
          }
      });
  
      document.getElementById('modal-save').addEventListener('click', addProfileCard);
      document.querySelector(`.${cx('modal')} .${cx('close')}`).addEventListener('click', closeModal);
  
      window.addEventListener('click', function(event) {
          const modal = document.getElementById('modal');
          if (event.target === modal) {
              closeModal();
          }
      });
  
      document.querySelector('.pagination').addEventListener('click', function(event) {
          if (event.target.id === 'prevPage' && currentPage > 1) {
              currentPage--;
              renderProfiles();
          } else if (event.target.id === 'nextPage') {
              const totalPages = Math.ceil(profileData.length / profilesPerPage);
              if (currentPage < totalPages) {
                  currentPage++;
                  renderProfiles();
              }
          } else if (event.target.className === cx('page-button')) {
              currentPage = parseInt(event.target.textContent, 10);
              renderProfiles();
          }
      });
  
      document.querySelector(`.${cx('add-button')}`).addEventListener('click', openModal);
  
      renderProfiles();
  });
  
};

export default init;
