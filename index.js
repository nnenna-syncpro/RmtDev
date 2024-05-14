const searchInputEl = document.querySelector('.container__header--search');
const jobList = document.querySelector('.jobList__jobs--list');
const jobListItem = document.querySelector('.jobList__jobs--jobItem'); 

//Search for jobs and display only searched jobs
//get job data from API
const getJobs = async () => {
    try{
        const response = await fetch('https://bytegrad.com/course-assets/js/2/api/jobs');
        const data = await response.json();
        return data
        
    } catch(error){
        console.log("Error: " + error)
    }

}

const displayJobs = async () => {
    //capture user input
    let searchTerm = searchInputEl.value;
    console.log(searchTerm);

    //get job data from API
    const jobs = await getJobs();

    //filter jobs to match user input
    let jobDisplay = jobs.jobItems.filter((jobData) => {
        if (searchTerm === "") {return jobData}
        else if (jobData.title.toLowerCase().includes(searchTerm.toLowerCase())) {return jobData}
        //create a new array that matches user input
    }).map((company) => {
        return ` <li class="jobList__jobs--jobItem">
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
    }).join('');
    //replace existing display with search match
    jobList.innerHTML = jobDisplay;
}

//listen for change in user input 
searchInputEl.addEventListener("input", () =>{
    displayJobs();
    
})

// END OF SEARCH

jobList.addEventListener('click', function(event) {
    console.log(event.target);
})

// jobListItem.addEventListener('click', function(event) {
//     console.log(event.target);
// })

// //fetch job items data from api and display on console
// let dataToSearch = fetch('https://bytegrad.com/course-assets/js/2/api/jobs')
//                     .then(response => {return response.json()})
//                     .then(data => {
//                         data.jobItems.forEach(console.log(data));
//                     })
//                     .catch(function(error){console.log("Error: " + error)});


// fetch('https://bytegrad.com/course-assets/js/2/api/jobs')
// .then(response => {return response.json();})
// .then(data => {
//     data.jobItems.forEach(company => {
//         const htmlMarkup = ` <li class="jobList__jobs--jobItem">
//         <span class="jobItem__badge">
//             ${company.badgeLetters}
//         </span>
//         <div class="jobItem__details">
//             <span class="jobItem__title">
//                 ${company.title}
//             </span>
//             <span class="jobItem__company">
//                 ${company.company}
//             </span>
//             <div class="jobItem__specs">
//                 <span class="jobItem__specs--duration">
//                     <i class="fa-solid fa-clock jobItem__specs--durationIcon"></i>
//                     ${company.duration}
//                 </span>
//                 <span class="jobItem__specs--salary">
//                     <i class="fa-solid fa-money-bill jobItem__specs--salaryIcon"></i>
//                     ${company.salary}
//                 </span>
//                 <span class="jobItem__specs--location">
//                     <i class="fa-solid fa-location-dot jobItem__specs--locationIcon"></i>
//                     ${company.Global}
//                 </span>
//             </div>
//         </div>
//         <div class="jobItem__post">
//             <span class="jobItem__post--bookmark">
//                 <i class="fa-solid fa-bookmark jobItem__post--bookmarkIcon"></i>
//             </span>
//             <span class="jobItem__post--daysAgo">
//                 ${company.daysAgo}
//             </span>
//         </div>
//     </li>`;
//         document.querySelector('.jobList__jobs--list').insertAdjacentHTML('afterend', htmlMarkup);
//     });
// })
// .catch(function(error){console.log("Error: " + error)});

// searchInputEl.addEventListener("input", input =>{
//     const searchValue = input.target.value
//     console.log(searchValue)
    
// })