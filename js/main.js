document.addEventListener("DOMContentLoaded", function () {
  // search
  let searchInput = document.getElementById("searchInput")
  let items = document.querySelectorAll("#itemList li")

  function filterItems() {
    let searchValue = searchInput.value.trim().toLowerCase()

    items.forEach(function (item) {
      if (searchValue === "" || item.textContent.toLowerCase().includes(searchValue)) {
        item.classList.remove("hidden")
      } else {
        item.classList.add("hidden")
      }
    })
  }
  searchInput.addEventListener("focus", function () {
    filterItems()
  })

  searchInput.addEventListener("blur", function () {
    if (!searchInput.matches(":focus")) {
      searchInput.value = ""
      items.forEach(function (item) {
        item.classList.add("hidden")
      })
    }
  })

  searchInput.addEventListener("input", filterItems)
  // /search

  // TABS
  const tabs = document.querySelectorAll(".tabby")
  const tabContents = document.querySelectorAll(".tab-content")

  tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      const tabID = this.getAttribute("data-tab")

      tabs.forEach((tab) => {
        tab.classList.remove("is-active")
      })
      tabContents.forEach((content) => {
        content.classList.remove("is-active")
      })

      this.classList.add("is-active")
      setTimeout(() => {
        document.getElementById(tabID).classList.add("is-active")
      }, 50)
    })
  })
  // /TABS

  // like ( yes-or-no-section)
  let liked = false
  let body = document.getElementsByTagName("body")[0]
  let modal = document.getElementById("commentModal")
  let modalContent = document.getElementById("modalContent")
  let counter = document.getElementById("likesCounter")
  let thankYouMsg = document.getElementById("thankYouMessage")
  let menuButtonTrigger = document.getElementById("menu-trigger")

  function likePost() {
    if (!liked) {
      let count = parseInt(counter.innerText)
      count++
      counter.innerText = count
      liked = true
      showThankYouMessage()
    }
  }
  function showModal() {
    modal.classList.add("is-active")
    body.classList.add("modal-open")
    body.addEventListener("mousedown", closeModalOutside)
  }

  function closeModalOutside(event) {
    if (!modalContent.contains(event.target)) {
      closeModal()
    }
  }

  function closeModal() {
    modal.classList.remove("is-active")
    body.classList.remove("modal-open")
    body.removeEventListener("mousedown", closeModalOutside)
  }

  function showThankYouMessage() {
    thankYouMsg.classList.add("is-active")
  }

  document.getElementById("yesButton").addEventListener("click", likePost)
  document.getElementById("noButton").addEventListener("click", showModal)
  document.getElementById("closeModal").addEventListener("click", closeModal)

  // /like ( yes-or-no-section)

  // menuButtonTrigger
  menuButtonTrigger.addEventListener("click", function () {
    let nav = document.querySelector("nav.aside-navbar")
    menuButtonTrigger.classList.toggle("menu-opened")
    nav.classList.toggle("is-active")
    body.classList.toggle("modal-open")
  })
  // /menuButtonTrigger

  // mobile-header-search
  const searchBox = document.querySelector(".header-search-box")
  const searchIcon = document.querySelector(".header-input-search-icon")
  const mobileBackground = document.querySelector(".mobile-search-background")
  const headerSearchInput = document.getElementById("headerSearchInput")
  const openMobileSearch = () => {
    searchBox.classList.add("mobile-is-active")
    body.classList.add("modal-open")
  }
  const closeMobileSearch = () => {
    searchBox.classList.remove("mobile-is-active")
    body.classList.remove("modal-open")
  }

  if (window.innerWidth < 768) {
    searchIcon.addEventListener("click", openMobileSearch)
    headerSearchInput.addEventListener("click", openMobileSearch)
    mobileBackground.addEventListener("click", closeMobileSearch)
  }
  // /mobile-header-search
})
