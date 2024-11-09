// Select Elements 



interface ResumeFormElements extends HTMLFormElement  {
    name: HTMLInputElement;
    email: HTMLInputElement;
    phone: HTMLInputElement;
    address: HTMLInputElement;
    experience: HTMLTextAreaElement;
    skills: HTMLTextAreaElement;
    education: HTMLTextAreaElement;
}

// Use Eventlistener
document.getElementById('resumeForm')?.addEventListener('submit', function (event: Event) {
    event.preventDefault(); 

    // display property use case
    const form = event.currentTarget as ResumeFormElements;
    form.style.display = 'none';
    document.getElementById('display')!.style.display = 'block';

    // show the download button
    document.getElementById('downloadBtn')!.style.display = 'block';

    // user input
    const name: string = form.name.value;
    const email: string = form.email.value;
    const address: string = form.address.value;
    const phone: string = form.phone.value;
    const experience: string = form.experience.value;
    const skills: string = form.skills.value;
    const education: string = form.education.value;


    // left side information
    const leftSide = document.getElementById('left-side')!;
    leftSide.innerHTML = `
        <h1>${name}</h1>
        <p><strong>Email:</strong><br> ${email}</p>
        <p><strong>Contact:</strong><br> ${phone}</p>
        <p><strong>Address:</strong><br> ${address}</p>
    `;

    // right side 
    const rightSide = document.getElementById('right-side')!;

    // expeirence, skill and education convert into list item
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
document.getElementById('downloadBtn')?.addEventListener('click', function () {
    const { jsPDF } = window.jspdf;

    const content = document.getElementById('display')!;

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
