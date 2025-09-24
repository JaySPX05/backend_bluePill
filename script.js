import { createNewPatientProfile } from './patientService.js';

const patientForm = document.getElementById('patient-form');

patientForm.addEventListener('submit', async (event) => { // Added 'async'
    event.preventDefault();
    
    // Get personal info
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const dob = document.getElementById('dob').value;
    const bloodType = document.getElementById('bloodType').value;
    
    // Process medical conditions...
    const medicalConditions = [];
    const conditionEntries = document.querySelectorAll('.condition-entry');
    conditionEntries.forEach(entry => {
        const condition = entry.querySelector('.condition-name')?.value;
        if (condition) {
            medicalConditions.push({
                condition: condition,
                diagnosedDate: entry.querySelector('.condition-date')?.value || '',
                notes: entry.querySelector('.condition-notes')?.value || ''
            });
        }
    });

    // Process allergies...
    const allergies = [];
    const allergyEntries = document.querySelectorAll('.allergy-entry');
    allergyEntries.forEach(entry => {
        const allergen = entry.querySelector('.allergen-name')?.value;
        if (allergen) {
            allergies.push({
                allergen: allergen,
                severity: entry.querySelector('.allergy-severity')?.value || 'Mild',
                reaction: entry.querySelector('.allergy-reaction')?.value || ''
            });
        }
    });

    // --- NEW: Generate the Custom ID here in the browser ---
    const timestamp = Date.now(); // Gets the current time in milliseconds
    const randomString = Math.random().toString(36).substring(2, 8).toUpperCase(); // Creates a 6-char random string
    const readableId = `PAT-${timestamp}-${randomString}`; // Example: PAT-1758838383000-A4B7C1

    // Structure the data
    const patientData = {
        patientReadableId: readableId, // Add the new ID to the data
        personalInfo: {
            firstName: firstName,
            lastName: lastName,
            dateOfBirth: dob,
            bloodType: bloodType
        },
        medicalConditions: medicalConditions,
        allergies: allergies
    };

    // Call the function to create the profile
    const newDocId = await createNewPatientProfile(patientData);

    if (newDocId) {
        alert(`New patient profile has been saved!\nFirestore ID: ${newDocId}\nCustom ID: ${readableId}`);
        patientForm.reset();
    } else {
        alert("There was an error saving the profile.");
    }
});