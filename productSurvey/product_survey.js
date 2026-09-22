function submitFeedback() {
    const username = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const email = document.getElementById('email').value;
    const job = document.getElementById('job').value;
    const designation = document.getElementById('designation').value;
    const productType = document.getElementById('productType').value;
    const feedback = document.getElementById('feedbackText').value;

    document.getElementById('userInfo').innerHTML = `
        <p>Nom: ${username}</p>
        <p>Âge: ${age}</p>
        <p>Email: ${email}</p>
        <p>Métier: ${job}</p>
        <p>Poste: ${designation}</p>
        <p>Type de produit: ${productType}</p>
        <p>Feedback: ${feedback}</p>
    `;
    document.getElementById('userInfo').style.display = 'block';

    alert('Thank you for your valuable feedback');
}

const submitButton = document.getElementById('submitBtn');
submitButton.onclick = submitFeedback;

document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      submitFeedback();
    }
});