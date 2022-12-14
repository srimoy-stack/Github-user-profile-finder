const main = document.querySelector('#main');

const APIURL = "https://api.github.com/users/";

const searchBox = document.querySelector("#search")

const getUser = async (username) => {
    //  const text="   LOADING DATA ......";
    //  main.innerHTML = text;

    const response = await fetch(APIURL + username);
    const data = await response.json();
    console.log(data);
    const card = `
    <div class="card">
    <div>
        <img class="avatar" src="${data.avatar_url
        }" alt="Florin Pop">
    </div>
    <div class="user-info">
        <h2>${data.login}</h2>
        <p>${data.bio}</p>

        <ul class="info">
            <li>${data.followers} </li><strong>Followers</strong></li>
            <li>${data.following }<strong>Following</strong></li>
            <li>${data.created_at
            }<strong></strong></li>
        </ul>

        <div id="repos">
            
        </div>
    </div>
</div>
`
    main.innerHTML = card;



    getRepos(username)

}




const getRepos = async (username) => {

    const repos = document.getElementById('repos')
    const data = await fetch(APIURL + username + "/repos");
    const res = await data.json();
    console.log(res)
    res.forEach((item) => {


        const ele = document.createElement('a');
        ele.classList.add("repo");
        ele.target = "_blank";
        ele.href = item.html_url;
        ele.innerText = item.name;
        repos.appendChild(ele);







    })


}

const formSubmit = () => {
    if (searchBox.value != "") {
        getUser(searchBox.value);
        searchBox.value = ""
    }
    return false;
}

formSubmit(searchBox)


searchBox.addEventListener(
    "focusout",
    function () {
        formSubmit()
    }
)