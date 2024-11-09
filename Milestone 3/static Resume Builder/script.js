"use strict";
// select elemnts
var _a, _b;
// use event listener
(_a = document.getElementById('resumeForm')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (event) {
    event.preventDefault(); 
    
    const form = event.currentTarget;
    form.style.display = 'none';
    document.getElementById('display').style.display = 'block';
    // Show the download button
    document.getElementById('downloadBtn').style.display = 'block';
    // user input
    const name = form.name.value;
    const email = form.email.value;
    const address = form.address.value;
    const phone = form.phone.value;
    const experience = form.experience.value;
    const skills = form.skills.value;
    const education = form.education.value;

    // left side information
    const leftSide = document.getElementById('left-side');
    leftSide.innerHTML = `
        <h1>${name}</h1>
        <p><strong>Email:</strong><br> ${email}</p>
        <p><strong>Contact:</strong><br> ${phone}</p>
        <p><strong>Address:</strong><br> ${address}</p>
    `;
    // right side information
    const rightSide = document.getElementById('right-side');
    // experience , skills, aducation change into list 
    const educationList = education.split("\n").map(item => `<li>${item}</li>`).join("");
    const skillsList = skills.split("\n").map(item => `<li>${item}</li>`).join("");
    const experienceList = experience.split("\n").map(item => `<li>${item}</li>`).join("");
    rightSide.innerHTML = `
        <h1 style="padding:6px; text-align:start;">Objective</h1>
        <p style="padding:6px;">As a motivated and adaptable individual, I aim to contribute my skills and passion for continuous learning to a dynamic and innovative environment. My goal is to grow professionally while delivering high-quality work that aligns with the organization's objectives and values.</p>
        <h2 style="padding:6px;">Education:</h2>
        <ul style="padding:6px;">${educationList}</ul>
        <h2 style="padding:6px;">Skills:</h2>
        <ul style="padding:6px;">${skillsList}</ul>
        <h2 style="padding:6px;">Experience:</h2>
        <ul style="padding:6px;">${experienceList}</ul>
    `;
});
// Add download functionality
(_b = document.getElementById('downloadBtn')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () {
    const { jsPDF } = window.jspdf;

    const content = document.getElementById('display');
   
    html2canvas(content).then(function (canvas) {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        
        const imgWidth = 210;
        const pageHeight = 297; 
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save('resume.pdf');
    });
});
