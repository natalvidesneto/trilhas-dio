async function fetchProfileData() {
    const url = 'https://raw.githubusercontent.com/natalvidesneto/dio-trilha-javascript/main/02-Page-portfolio/data/profile.json';
    const response = await fetch(url)
    const profileData = await response.json()
    return profileData
}
