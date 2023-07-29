// Initialize a variable to hold the resume data
let currentResumeData = null;

function generateResume() {
  // Get user input values
  const fullName = document.getElementById("fullName").value;
  const email = document.getElementById("email").value;
  const degree = document.getElementById("degree").value;
  const university = document.getElementById("university").value;
  const gradYear = document.getElementById("gradYear").value;
  const jobTitle = document.getElementById("jobTitle").value;
  const company = document.getElementById("company").value;
  const expYear = document.getElementById("expYear").value;
  const skills = document.getElementById("skills").value.split(",").map(skill => skill.trim());

  // Get the profile picture file and convert it to a base64-encoded URL
  const profilePictureInput = document.getElementById("profilePicture");
  const profilePicture = profilePictureInput.files[0];
  let profilePictureURL = '';
  if (profilePicture) {
    const reader = new FileReader();
    reader.onload = function() {
      profilePictureURL = reader.result;
      updateResumeData();
    };
    reader.readAsDataURL(profilePicture);
  } else {
    updateResumeData();
  }

  function updateResumeData() {
    // Generate the resume data
    const resumeData = {
      fullName,
      email,
      degree,
      university,
      gradYear,
      jobTitle,
      company,
      expYear,
      skills,
      profilePictureURL,
    };

    // Store the current resume data
    currentResumeData = resumeData;

    // Display the generated resume
    displayResumePreview(resumeData);
  }
}

function displayResumePreview(resumeData) {
  const { fullName, email, degree, university, gradYear, jobTitle, company, expYear, skills, profilePictureURL } = resumeData;
  // Generate the resume HTML
  let resumeHTML = `
    <h2>${fullName}</h2>
    ${profilePictureURL ? `<img src="${profilePictureURL}" alt="Profile Picture" width="150">` : ''}
    <p>Email: ${email}</p>

    <h2>Education</h2>
    <p>${degree}</p>
    <p>${university}, Graduation Year: ${gradYear}</p>

    <h2>Experience</h2>
    <p>${jobTitle} at ${company}, ${expYear} year(s) of experience</p>

    <h2>Skills</h2>
    <ul>
      ${skills.map(skill => `<li>${skill}</li>`).join("")}
    </ul>
  `;

  // Display the generated resume
  document.getElementById("resumePreview").innerHTML = resumeHTML;
}

// Attach event listeners to the form and buttons
document.getElementById("resumeForm").addEventListener("submit", function(event) {
  event.preventDefault();
  generateResume();
});

document.getElementById("saveAsPDF").addEventListener("click", function() {
  saveAsPDF(currentResumeData);
});

document.getElementById("clearForm").addEventListener("click", function() {
  resetFormFields();
});
