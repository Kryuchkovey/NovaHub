const tg = window.Telegram.WebApp;

tg.ready();
tg.expand();


const user = tg.initDataUnsafe?.user;


function loadUser() {

    if (!user) {
        console.log("Nova Hub открыт не из Telegram");

        return;
    }

    const firstName = user.first_name || "Пользователь";
    const lastName = user.last_name || "";
    const username = user.username
        ? `@${user.username}`
        : "Username не указан";

    const fullName = `${firstName} ${lastName}`.trim();


    // Имя пользователя
    const profileName = document.querySelector(".profile-info strong");

    if (profileName) {
        profileName.textContent = fullName;
    }


    // Username
    const profileUsername = document.querySelector(".profile-info span");

    if (profileUsername) {
        profileUsername.textContent = username;
    }


    // Аватар
    const avatars = document.querySelectorAll(".avatar, .profile-avatar");

    avatars.forEach(avatar => {

        if (user.photo_url) {

            avatar.innerHTML = `
                <img
                    src="${user.photo_url}"
                    alt="Avatar"
                    style="
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        border-radius: 50%;
                    "
                >
            `;

        } else {

            avatar.textContent = firstName.charAt(0).toUpperCase();

        }

    });
}


function showMessage(section) {

    tg.showPopup({
        title: "Nova Hub",
        message: `Раздел «${section}» пока находится в разработке 🚀`,
        buttons: [
            {
                type: "ok"
            }
        ]
    });

}


function startApp() {

    tg.showPopup({
        title: "Добро пожаловать! ✨",
        message: "Nova Hub успешно запущен.",
        buttons: [
            {
                type: "ok"
            }
        ]
    });

}


loadUser();
function openProfile() {

    const profileScreen = document.getElementById("profile-screen");

    profileScreen.classList.add("active");

}


function closeProfile() {

    const profileScreen = document.getElementById("profile-screen");

    profileScreen.classList.remove("active");

}


function loadProfile() {

    if (!user) {
        return;
    }

    const fullName =
        `${user.first_name || ""} ${user.last_name || ""}`.trim();

    const username =
        user.username
            ? `@${user.username}`
            : "Username не указан";


    document.getElementById("profile-name").textContent =
        fullName || "Пользователь";


    document.getElementById("profile-username").textContent =
        username;


    document.getElementById("profile-id").textContent =
        user.id;


    const bigAvatar =
        document.querySelector(".big-avatar");


    if (user.photo_url) {

        bigAvatar.innerHTML = `
            <img
                src="${user.photo_url}"
                alt="Avatar"
            >
        `;

    } else {

        bigAvatar.textContent =
            (user.first_name || "U")
            .charAt(0)
            .toUpperCase();

    }

}


loadProfile();