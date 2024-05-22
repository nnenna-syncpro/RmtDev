const searchInputEl = document.querySelector('.container__header--search');
const jobList = document.querySelector('.jobList__jobs--list');
const jobListItem = document.querySelector('.jobList__jobs--jobItem'); 

let noOfResults = document.querySelector('.jobList__results--results'); 

const jobDetailsSectionEl = document.querySelector('.jobDetails'); 

const sortEl = document.querySelector('.jobList__sort'); 
const sortRelevantButtonEl = document.querySelector('.jobList__sort--relevant'); 
const sortRecentButtonEl = document.querySelector('.jobList__sort--recent'); 


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
        return ` 
        <li class="jobList__jobs--jobItem" id="${company.id}">
            <a href="${company.id}" class="jobItem__link--id">
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
            </a>
        </li>`;
    }).join('');
    //replace existing display with search match
    jobList.innerHTML = jobDisplay;
    // noOfResults.textContent = jobDisplay.length;
}

//listen for change in user input 
searchInputEl.addEventListener("input", () =>{
    displayJobs();
    
})

// END OF SEARCH

const displaySelectedJob = async () => {
    event.preventDefault();
    console.log(event.target);

    const clickedJob = event.target.closest('.jobList__jobs--jobItem');

    jobDetailsSectionEl.innerHTML = "";

    const clickedId = clickedJob.getAttribute('id'); 
    // const clickedId = clickedJob.children[0].getAttribute('href');
    console.log(clickedId);
    
    const jobs = await getJobs();

    let selectedJobDisplay = jobs.jobItems.find((jobData) => jobData.id === +clickedId);
    console.log(selectedJobDisplay);
        const jobDetailsHtmlMarkup = `
            <div class="jobDetails__populated">
                <div class="jobDetails__populated--header">
                    <div class="jobDetails__backgroundImage"></div>
                    <span class="jobDetails__badge">
                        ${selectedJobDisplay.badgeLetters}
                    </span>
                    <div class="jobDetails__header">
                        <span class="jobDetails__title">
                            ${selectedJobDisplay.title}
                        </span>
                        <span class="jobDetails__company">
                            ${selectedJobDisplay.company}
                        </span>
                    </div>
                
                </div>
                <div class="jobDetails__populated--intro">
                    <span class="jobDetails__intro--daysAgo">
                     ${selectedJobDisplay.daysAgo}
                    </span>
                    <span class="jobDetails__intro--bookmark">
                        <i class="fa-solid fa-bookmark jobDetails__intro--bookmarkIcon"></i>
                    </span>
                    <div class="jobDetails__specs">
                        <span class="jobDetails__specs--description">
                            ${selectedJobDisplay.description}
                        </span>
                        <div class="div jobDetails__specsIcons">
                            <span class="jobDetails__specs--duration">
                                <i class="fa-solid fa-clock jobDetails__specs--durationIcon"></i>
                                ${selectedJobDisplay.duration}
                            </span>
                            <span class="jobDetails__specs--salary">
                                <i class="fa-solid fa-money-bill jobDetails__specs--salaryIcon"></i>
                                ${selectedJobDisplay.salary}
                            </span>
                            <span class="jobDetails__specs--location">
                                <i class="fa-solid fa-location-dot jobDetails__specs--locationIcon"></i>
                                ${selectedJobDisplay.location}
                            </span>
                        </div>
                    </div>
                </div>
                <div class="jobDetails__qualifications">
                    <div class="jobDetails__qualifications--placeholder">
                        <span class="jobDetails__qualifications--title">
                            Qualifications
                        </span>
                        <span class="jobDetails__qualifications-text">
                            Other qualifications may apply
                        </span>
                    </div>
                    <ul class="jobDetails__qualifications--list">
                        ${selectedJobDisplay.qualifications.map(qualification => `
                            <li class="jobDetails__qualifications--listItem">
                                ${qualification}
                            </li>`).join('')}
                    </ul>
                </div>
                <div class="jobDetails__reviews">
                    <div class="jobDetails__reviews--placeholder">
                        <span class="jobDetails__reviews--title">
                            Company Reviews
                        </span>
                        <span class="jobDetails__reviews-text">
                            Recent things people are saying
                        </span>
                    </div>
                    <ul class="jobDetails__reviews--list">
                        ${selectedJobDisplay.reviews.map(review => `
                            <li class="jobDetails__reviews--listItem">
                                ${review}
                            </li>`).join('')}
                    </ul>
                </div>
            </div>`;
            jobDetailsSectionEl.innerHTML = jobDetailsHtmlMarkup;
    
}

jobList.addEventListener('click', displaySelectedJob);

const sortRelevantJobs = async () => {
    const jobs = await getJobs();

    let relevantJobs = jobs.jobItems.sort((a,b) => {
        return a.relevanceScore - b.relevanceScore;
    }).map((company) => {
        return ` 
        <li class="jobList__jobs--jobItem" id="${company.id}">
            <a href="${company.id}" class="jobItem__link--id">
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
            </a>
        </li>`;
    }).join('');
    //replace existing display with search match
    jobList.innerHTML = relevantJobs;
}

sortRelevantButtonEl.addEventListener('click', sortRelevantJobs)

const sortRecentJobs = async () => {
    const recent = event.target.className.includes('--recent')? true:false;
    console.log(recent);
    const jobs = await getJobs();

    if (recent){
        let recentJobs = jobs.jobItems.sort((a,b) => {
            return a.daysAgo - b.daysAgo;
        }).map((company) => {
            return ` 
            <li class="jobList__jobs--jobItem" id="${company.id}">
                <a href="${company.id}" class="jobItem__link--id">
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
                </a>
            </li>`;
        }).join('');
        //replace existing display with search match
        jobList.innerHTML = recentJobs;
    }
   
}

sortRecentButtonEl.addEventListener('click', sortRecentJobs)


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
// let dataToSearch1 = fetch('https://bytegrad.com/course-assets/js/2/api/jobs/435243523542435')
//                     .then(response => {return response.json()})
//                     .then(data => {
//                         console.log(data);
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