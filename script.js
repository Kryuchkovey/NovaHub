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