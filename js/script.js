document.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector(".header__burger");
  const menu = document.querySelector(".menu");
  const body = document.querySelector("body");
  const headerMenu = document.querySelector(".header__menu");
  const lk = document.querySelector(".lk__link");
  const lkList = document.querySelector(".lk__list");
  const lkStore = document.querySelector(".lk__store");
  const modalTextarea = document.querySelectorAll(".modal-textarea");
  const textareaLabel = document.querySelectorAll(".textarea-label");

  modalTextarea.forEach((item, i) => {
    item.addEventListener("input", (e) => {
      if (item.value.length != 0) {
        textareaLabel[i].style.opacity = 0;
        textareaLabel[i].style.visibility = hidden;
      } else {
        textareaLabel[i].style.opacity = 1;
        textareaLabel[i].style.visibility = visible;
      }
    });
  });

  document.addEventListener("click", (event) => {
    let target = event.target;
    if (!lkStore.contains(target) && !lk.contains(target)) {
      lkStore.classList.remove("store--show");
    }
  });

  if (lk) {
    lk.removeAttribute("href");
    lk.addEventListener("click", (e) => {
      e.preventDefault();
      if (lkStore.classList.contains("store--show")) {
        lkStore.classList.remove("store--show");
      } else {
        lkStore.classList.add("store--show");
      }
    });
  }

  // if (lkList) {
  //   lk.addEventListener("click", function (e) {
  //     e.preventDefault();
  //   });
  //   lk.removeAttribute("href");
  // 	lk.classList.add("menu__link--innactive");
  // }

  burger.addEventListener("click", (e) => {
    if (menu.classList.contains("menu--active")) {
      menu.classList.remove("menu--active");
      burger.classList.remove("header__burger--active");
      body.classList.remove("open-menu");
      lkStore.classList.remove("store--show");
    } else {
      menu.classList.add("menu--active");
      burger.classList.add("header__burger--active");
      body.classList.add("open-menu");
    }
  });

  headerMenu.addEventListener("click", (e) => {
    let target = e.target;

    if (
      target.classList.contains("menu__link") &&
      !target.classList.contains("lk__link")
    ) {
      menu.classList.remove("menu--active");
      burger.classList.remove("header__burger--active");
      body.classList.remove("open-menu");
    }
  });
});
