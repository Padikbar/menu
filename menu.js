document.addEventListener("DOMContentLoaded", function () {
    enableActiveTab();

    fetch("menu-data.json")
        .then(response => response.json())
        .then(data => {
            const menuList = document.querySelector(".list-group");
            const menuItemsByType = getItemsByType(data);

            for (const type in menuItemsByType) {
                if (menuItemsByType.hasOwnProperty(type)) {
                    const typeItems = menuItemsByType[type];
                    menuList.appendChild(createTypeHeadingElement(type));
                    typeItems
                        .forEach(itemData => {
                            const listItem = document.createElement("li");
                            listItem.classList.add("list-group-item", "text-white", "mb-4", "rounded");

                            const cardBody = document.createElement("div");
                            cardBody.classList.add("d-flex", "flex-column", "align-items-start");
                            cardBody.id = "cardBody";

                            createThumbnailElement(itemData, listItem)

                            if (itemData.picture) {
                                listItem.addEventListener("click", function () {
                                    createModal(itemData);
                                });
                            }

                            buildList(cardBody, listItem, menuList, itemData);
                        });
                }
            }
        });
});

function buildList(cardBody, listItem, menuList, itemData) {
    cardBody.appendChild(createTitleElement(itemData));
    cardBody.appendChild(createPriceElement(itemData));
    cardBody.appendChild(createDescriptionElement(itemData));
    cardBody.appendChild(createGramsElement(itemData));
    listItem.appendChild(cardBody);
    menuList.appendChild(listItem);
}


function getItemsByType(data) {
    const menuItemsByType = {};
    data
        .filter(e => window.location.pathname.includes(e.category))
        .forEach(itemData => {
            if (!menuItemsByType[itemData.group]) {
                menuItemsByType[itemData.group] = [];
            }
            menuItemsByType[itemData.group].push(itemData);
        });
    return menuItemsByType;
}

function enableActiveTab() {
    const activeNavLink = {
        kitchen: "ГАРЯЧІ СТРАВИ",
        cocktails: "НАПОЇ",
        wine: "ВИННА КАРТА"
    }
    const path = window.location.pathname.replace(".html", "").replace("/", "");
    document.querySelectorAll(".nav-link").forEach(e => { if (e.textContent === activeNavLink[path]) e.classList.add("active") });
}

function createThumbnailElement(itemData, listItem) {
    if (itemData.small_pic) {
        const img = document.createElement("img");
        img.classList.add("float-left", "mr-3", "img-fluid", "rounded");
        img.src = itemData.small_pic;
        img.alt = itemData.name;
        img.width = 150;
        listItem.appendChild(img);
    }
}

function createTypeHeadingElement(type) {
    const typeHeading = document.createElement("h3");
    typeHeading.classList.add("text-white", "mb-4");
    typeHeading.textContent = type;
    typeHeading.id = type;
    return typeHeading;
}

function createTitleElement(itemData) {
    const title = document.createElement("h5");
    title.classList.add("mb-1", "font-weight-bold");
    title.textContent = itemData.name;
    return title;
}

function createPriceElement(itemData) {
    const price = document.createElement("p");
    price.classList.add("mb-1", "text-success");
    price.innerHTML = `${itemData.price} <i class="fa fa-hryvnia"></i>`;
    return price;
}

function createDescriptionElement(itemData) {
    const description = document.createElement("p");
    if (itemData.category === "cocktails") {
        description.textContent = itemData.ingredients;
    } else {
        description.textContent = itemData.description;
    }
    description.classList.add("desc");
    return description;
}

function createGramsElement(itemData) {
    const grams = document.createElement("small");
    if (itemData.weight) {
        grams.classList.add("text-muted");
        grams.innerHTML = `<i class="fa fa-balance-scale"></i> ${itemData.weight}г`;
    }
    return grams;
}

function createModal(itemData) {
    const modal = document.getElementById("myModal");
    const modalBody = modal.querySelector(".modal-body");

    const buttonClose = document.createElement("button");
    buttonClose.classList.add("close");
    buttonClose.setAttribute("type", "button");
    buttonClose.setAttribute("data-dismiss", "modal");
    buttonClose.setAttribute("aria-label", "Close");

    const spanClose = document.createElement("span");
    spanClose.setAttribute("aria-hidden", "true");
    spanClose.innerHTML = "&times;";

    buttonClose.appendChild(spanClose);
    const content = document.querySelector(".modal-content")
    if (content.firstChild.nodeType === content.lastChild.nodeType) {
        content.append(buttonClose);
    }
    modalBody.innerHTML = `
    <img src="${itemData.picture}" alt="${itemData.name}" class="rounded img-fluid" width="500">
    <p class="text-white m-2">${itemData.description}</p>
    `;
    $('#myModal').modal('show');
}