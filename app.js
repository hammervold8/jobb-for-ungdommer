document.addEventListener("DOMContentLoaded", () => {
    const searchForm = document.querySelector(".search-form");
    const searchInput = document.querySelector(".search-input");
    const jobListElement = document.querySelector(".job-list");
  
    function renderJobListings(jobs) {
      jobListElement.innerHTML = "";

      if (jobs && jobs.length > 0) {
        console.log(jobs);
        jobs.forEach((job) => {
          const jobCardElement = document.createElement("div");
          jobCardElement.classList.add("job-card");
  
          const jobDetailsElement = document.createElement("div");
          jobDetailsElement.classList.add("job-details");
  
          const jobTitleElement = document.createElement("h2");
          jobTitleElement.classList.add("job-title");
          jobTitleElement.textContent = job.title;
  
          const jobCompanyElement = document.createElement("p");
          jobCompanyElement.classList.add("job-company");
          jobCompanyElement.textContent = job.employer.name;
  
          const jobLocationElement = document.createElement("p");
          jobLocationElement.classList.add("job-location");
          jobLocationElement.textContent = job.workLocations[0].city;
  
          const jobAddressElement = document.createElement("p");
          jobAddressElement.classList.add("job-address");
          jobAddressElement.textContent = job.workLocations[0].address;
  
          const jobApplicationDueElement = document.createElement("p");
          jobApplicationDueElement.classList.add("job-application-due");
          jobApplicationDueElement.innerHTML = "Søknadsfrist: " + job.applicationDue;
  
          const jobDescriptionElement = document.createElement("div");
          jobDescriptionElement.classList.add("job-description");
          jobDescriptionElement.innerHTML = job.description;
  
          const button = document.createElement('button');
          button.textContent = 'Søk her!';
          button.classList.add('apply-button');
  
          button.addEventListener('click', function () {
            // Retrieve the link from the JSON data
            const link = job.applicationUrl;
  
            // Navigate to the link
            window.location.href = link;
          });
  
          jobDetailsElement.appendChild(jobTitleElement);
          jobDetailsElement.appendChild(jobCompanyElement);
          jobDetailsElement.appendChild(jobLocationElement);
          jobDetailsElement.appendChild(jobAddressElement);
          if (job.applicationDue != null) {
            jobDetailsElement.appendChild(jobApplicationDueElement);
          }
          jobDetailsElement.appendChild(button);
  
          jobCardElement.appendChild(jobDetailsElement);
          jobCardElement.appendChild(jobDescriptionElement);
  
          jobListElement.appendChild(jobCardElement);
        });
      } else {
        const noResultsElement = document.createElement("p");
        noResultsElement.classList.add("no-results");
        noResultsElement.textContent = "No job listings found.";
        jobListElement.appendChild(noResultsElement);
      }
    }
  
    function searchJobs(event) {
      event.preventDefault();
      const searchTerm = searchInput.value.trim().toLowerCase();
  
      fetch("job_ads.json")
        .then((response) => response.json())
        .then((data) => {
          const jsonData = data.content;
          const filteredJobs = jsonData.filter(
            (job) =>
              job.title.toLowerCase().includes(searchTerm) ||
              job.employer.name.toLowerCase().includes(searchTerm) ||
              job.workLocations[0].city.toLowerCase().includes(searchTerm)
          );
          renderJobListings(filteredJobs);
        })
        .catch((error) => {
          console.error("Error fetching JSON data:", error);
        });
    }
  
    fetch("job_ads.json")
      .then((response) => response.json())
      .then((data) => {
        const jsonData = data.content;
        renderJobListings(jsonData);
      })
      .catch((error) => {
        console.error("Error fetching JSON data:", error);
      });
  
    searchForm.addEventListener("submit", searchJobs);
    searchInput.addEventListener("keydown", (event) => {
        if (event.keyCode === 13) {
          searchJobs(event);
        }
    })
  });

  // async function fetchData() {
  //   const api_key = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwdWJsaWMudG9rZW4udjFAbmF2Lm5vIiwiYXVkIjoiZmVlZC1hcGktdjEiLCJpc3MiOiJuYXYubm8iLCJpYXQiOjE1NTc0NzM0MjJ9.jNGlLUF9HxoHo5JrQNMkweLj_91bgk97ZebLdfx3_UQ"
  //   const apiEndpoint = 'https://api.nav.no/jobbfeed/api/v1/ads';
  
  //   const params = new URLSearchParams({
  //     countryCode: 'NO',
  //     language: 'nb',
  //     // Add more parameters as needed
  //   });
  
  //   try {
  //     const response = await fetch(`${apiEndpoint}?${params.toString()}`, {
  //       headers: {
  //         'Authorization': api_key,
  //       },
  //     });
  
  //     if (response.ok) {
  //       const jsonData = await response.json();
  //       return jsonData;
  //     } else {
  //       throw new Error(`Error: ${response.status}`);
  //     }
  //   } catch (error) {
  //     throw new Error(`Error: ${error}`);
  //   }
  // }
  
  // // Example usage:
  // async function fetchDataAndProcess() {
  //   try {
  //     const data = await fetchData();
  //     // Process the data or store it in the desired variable
  //     console.log('Data:', data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
  
  // fetchDataAndProcess();  