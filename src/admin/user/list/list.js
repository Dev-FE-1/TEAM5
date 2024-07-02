import axios from "/node_modules/axios/dist/esm/axios.min.js";

document.addEventListener('DOMContentLoaded', async function() {
    const profilesPerPage = 15;
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
        profileCard.className = 'profile-card';
        profileCard.dataset.name = name;
        profileCard.dataset.userid = userId;
        profileCard.dataset.team = team;
        profileCard.dataset.position = position;
        profileCard.dataset.email = email;
        profileCard.dataset.imgurl = imgUrl ?? placeholder;

        profileCard.innerHTML = `
            <button class="close-button" title="Remove">×</button>
            <img src="${imgUrl ?? placeholder}" alt="Profile Picture">
            <div class="info">
                <div class="info-item">
                    <span class="label">이름 :</span>
                    <span class="value">${name}</span>
                </div>
                <div class="info-item">
                    <span class="label">사번 :</span>
                    <span class="value">${userId}</span>
                </div>
                <div class="info-item">
                    <span class="label">팀 :</span>
                    <span class="value">${team}</span>
                </div>
                <div class="info-item">
                    <span class="label">직급 :</span>
                    <span class="value">${position}</span>
                </div>
                <div class="info-item">
                    <span class="label">이메일 :</span>
                    <span class="value">${email}</span>
                </div>
            </div>
        `;

        return profileCard;
    }
    // 프로필 화면에 렌더링
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
        //현재 페이지에 해당하는 프로필만 렌더링
        profileData.forEach((profile, index) => {
            if (index >= (currentPage - 1) * profilesPerPage && index < currentPage * profilesPerPage) {
                const profileCard = createProfileCard(profile);
                profileContainer.appendChild(profileCard);
            }
        });
        //프로필 추가버튼
        const addProfileCard = document.getElementById('add-profile-card');
        if (!addProfileCard) {
            const plusBox = document.createElement('div');
            plusBox.className = 'profile-card plus-box';
            plusBox.id = 'add-profile-card';
            plusBox.innerHTML = '<span class="material-icons">add</span>';
            profileContainer.appendChild(plusBox);
        } else {
            profileContainer.appendChild(addProfileCard);
        }

        renderPagination(totalPages);
    }
    //페이지 네비게이션 렌더링
    function renderPagination(totalPages) {
        const paginationContainer = document.querySelector('.pagination');

        if (!paginationContainer) {
            console.error("Pagination container not found.");
            return;
        }

        paginationContainer.innerHTML = '';

        const prevButton = document.createElement('button');
        prevButton.id = 'prevPage';
        prevButton.textContent = 'Previous';
        prevButton.disabled = currentPage === 1;
        paginationContainer.appendChild(prevButton);

        const startPage = Math.floor((currentPage - 1) / pagesToShow) * pagesToShow + 1;
        const endPage = Math.min(startPage + pagesToShow - 1, totalPages);

        for (let i = startPage; i <= endPage; i++) {
            const pageButton = document.createElement('button');
            pageButton.className = 'page-button';
            pageButton.textContent = i;
            pageButton.disabled = i === currentPage;
            paginationContainer.appendChild(pageButton);
        }

        const nextButton = document.createElement('button');
        nextButton.id = 'nextPage';
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

    // 새로운 프로필 카드 추가
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
                console.log("New Profile Data:", newProfile); //추가
                await saveProfileToServer(newProfile);
                renderProfiles();
                closeModal();
            };
            reader.readAsDataURL(imageInput.files[0]);
        } else {
            const newProfile = { name, userId, team, position, email, password, imgUrl: imageUrl };
            console.log("New Profile Data:", newProfile); //추가
            await saveProfileToServer(newProfile);
            renderProfiles();
            closeModal();
        }
    }
    //프로필 서버에 저장
    async function saveProfileToServer(profile) {
        const response = await axios.post("http://localhost:8080/api/users", profile);
        console.log("Profile saved:", response.data);
    }

    //서버에서 프로필 삭제
    async function deleteProfileFromServer(userId) {
        const response = await axios.delete(`http://localhost:8080/api/users/${userId}`);
        console.log("Profile deleted:", response.data);
    }
    //클릭시 상세페이지로
    document.getElementById('profile-container').addEventListener('click', function(event) {
        const profileCard = event.target.closest('.profile-card');

        if (event.target.classList.contains('close-button')) {
            event.stopPropagation(); // 추가하라는 부분
            const userId = profileCard.dataset.userid;
            deleteProfileFromServer(userId).then(renderProfiles);
            return;
        }

        if (profileCard && !profileCard.classList.contains('plus-box')) {
            const name = profileCard.dataset.name;
            const userId = profileCard.dataset.userid;
            const team = profileCard.dataset.team;
            const position = profileCard.dataset.position;
            const email = profileCard.dataset.email;
            const imgUrl = profileCard.dataset.imgurl;

            console.log({ name, userId, team, position, email, imgUrl });

            const url = `/src/admin/user/profile/index.html?name=${encodeURIComponent(name)}&userId=${encodeURIComponent(userId)}&team=${encodeURIComponent(team)}&position=${encodeURIComponent(position)}&email=${encodeURIComponent(email)}&imgUrl=${encodeURIComponent(imgUrl)}`;
            window.location.href = url;
        } else if (profileCard && profileCard.classList.contains('plus-box')) {
            openModal();
        }
    });

    document.getElementById('modal-save').addEventListener('click', addProfileCard);
    document.querySelector('.modal .close').addEventListener('click', closeModal);

    window.addEventListener('click', function(event) {
        const modal = document.getElementById('modal');
        if (event.target === modal) {
            closeModal();
        }
    });
    //페이지네이션 버튼 클릭
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
        } else if (event.target.className === 'page-button') {
            currentPage = parseInt(event.target.textContent, 10);
            renderProfiles();
        }
    });

    renderProfiles();
});
