//  TODO localStorage Read & Write
//  [x] localStorage 에 데이터를 저장한다.
//  [x] 메뉴 추가
//  [x] 메뉴 수정
//  [x] 메뉴 삭제
//  [x] 새로고침해도 데이터가 남아있다.

//  TODO 카테고리별 메뉴판 관리
//  [] 에스프레소 메뉴판 관리
//  [] 프라푸치노 메뉴판 관리
//  [] 블렌디드 메뉴판 관리
//  [] 티바나 메뉴판 관리
//  [] 디저트 메뉴판 관리

//  TODO 페이지 접근시 최초 데이터 Read & Rendering
//  [] 페이지를 최초로 로딩할 때 localStorage에 에스프레소 메뉴를 읽어온다.
//  [] 에스프레소 메뉴를 페이지에 그려준다.

//  TODO 품절 상태 관리
//  [] 품절 버튼을 추가한다.
//  [] 품절 버튼을 클릭하면 localStorage 에 상태값이 저장된다.
//  [] 클릭 이벤트에서 가장 가까운 li 태그의 class 속성 값에 sold-out 을 추가한다.

const $ = (selector) => document.querySelector(selector);

const store = {
    setLocalStorage(menu) {
        localStorage.setItem("menu", JSON.stringify(menu));
    },
    getLocalStorage() {
        return JSON.parse(localStorage.getItem("menu"));
    },
}
function App() {
    // 상태: 메뉴명
    this.menu = [];
    this.init = () => {
        if (store.getLocalStorage().length > 0) {
            this.menu = store.getLocalStorage();
        }
        render();
    };

    const render = () => {
        const template = this.menu.map((item, index) => {
            return `
                <li data-menu-id="${index}" class="menu-list-item d-flex items-center py-2">
                    <span class="w-100 pl-2 menu-name">${item.name}</span>
                    <button
                        type="button"
                        class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
                >
                    수정
                </button>
                <button
                    type="button"
                    class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
                >
                    삭제
                </button>
            </li>`;
        })
        .join("");

        $("#espresso-menu-list").innerHTML = template;
        updateMenuCount();
    };

    // 총 메뉴 개수를 세는 함수
    const updateMenuCount = () => {
        const menuCount = $("#espresso-menu-list"). querySelectorAll("li").length;
        $(".menu-count").innerText = `총 ${menuCount} 개`
    }

    // 메뉴의 이름을 입력받는 함수
    const addMenuName = () => {
        if ($("#espresso-menu-name").value === "") {
            alert("값을 입력해주세요.");
            return;
        }
        const espressoMenuName = $("#espresso-menu-name").value;
        this.menu.push({ name: espressoMenuName });
        store.setLocalStorage(this.menu);
        render();
        $("#espresso-menu-name").value = "";
    };

    // 메뉴를 수정하는 함수
    const updateMenuName = (e) => {
        const menuId = e.target.closest("li").dataset.menuId;
        const $menuName = e.target.closest("li").querySelector(".menu-name");
        const updatedMenuName = prompt("메뉴명을 수정하세요", $menuName.innerText);
        this.menu[menuId].name = updatedMenuName;
        store.setLocalStorage(this.menu);
        $menuName.innerText = updatedMenuName;
    };

    // 메뉴를 삭제하는 함수
    const removeMenuName = (e) => {
        if (confirm("정말 삭제하시겠습니까?")) {
            const menuId = e.target.closest("li").dataset.menuId;
            this.menu.splice(menuId, 1);
            store.setLocalStorage(this.menu);
            e.target.closest("li").remove();
            updateMenuCount();
        }
    };

    // form 태그가 자동으로 전송되는걸 막아준다. 
    $("#espresso-menu-form").addEventListener("submit", (e) => {
        e.preventDefault();
    })

    // 메뉴의 이름을 '확인' 버튼으로 추가하기
    $("#espresso-menu-submit-button").addEventListener("click", addMenuName);

    // 메뉴의 이름을 '엔터'키로 추가하기
    $("#espresso-menu-name").addEventListener("keypress", (e) => {
        if (e.key !== "Enter") {
            return;
        }
        addMenuName();
    });

    // 메뉴를 수정하고 삭제하기
    $("#espresso-menu-list").addEventListener("click", (e) => {
        if (e.target.classList.contains("menu-edit-button")) {
            updateMenuName(e);
        }

        if (e.target.classList.contains("menu-remove-button")) {
            removeMenuName(e);
        }
    });
}

const app = new App();
app.init();