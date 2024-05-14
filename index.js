// searchbar
const searchInputEl = document.querySelector('.container__header--search');

searchInputEl.addEventListener("input", input =>{
    const searchValue = input.target.value
    console.log(searchValue)
})

//fetch job items data from api and display on console
let dataToSearch = fetch('https://bytegrad.com/course-assets/js/2/api/jobs')
                    .then(response => {return response.json()})
                    .then(data => {
                        data.jobItems.forEach(console.log(data));
                    })
                    .catch(function(error){console.log("Error: " + error)});


//forEach dataToSearch = if data includes search input display insertAdjacentHTML

fetch('https://bytegrad.com/course-assets/js/2/api/jobs')
.then(response => {return response.json();})
.then(data => {
    data.jobItems.forEach(company => {
        const htmlMarkup = ` <li class="jobList__jobs--jobItem">
        <span class="jobItem__badge">
            ${company.badgeLetters}
        </span>
        <div class="jobItem__details">
            <span class="jobItem__title">
                ${company.title}
            </span>
            <span class="jobItem__company">
                ${company.company}
            </span>
            <div class="jobItem__specs">
                <span class="jobItem__specs--duration">
                    <i class="fa-solid fa-clock jobItem__specs--durationIcon"></i>
                    ${company.duration}
                </span>
                <span class="jobItem__specs--salary">
                    <i class="fa-solid fa-money-bill jobItem__specs--salaryIcon"></i>
                    ${company.salary}
                </span>
                <span class="jobItem__specs--location">
                    <i class="fa-solid fa-location-dot jobItem__specs--locationIcon"></i>
                    ${company.Global}
                </span>
            </div>
        </div>
        <div class="jobItem__post">
            <span class="jobItem__post--bookmark">
                <i class="fa-solid fa-bookmark jobItem__post--bookmarkIcon"></i>
            </span>
            <span class="jobItem__post--daysAgo">
                ${company.daysAgo}
            </span>
        </div>
    </li>`;
        document.querySelector('.jobList__jobs--list').insertAdjacentHTML('afterend', htmlMarkup);
    });
})
.catch(function(error){console.log("Error: " + error)});