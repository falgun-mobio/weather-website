const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    document.getElementById('resultSearch').innerHTML = '<p><span>Loading...</span></p>'
    fetch('/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                document.getElementById('resultSearch').innerHTML = '<p class="error-message">' + data.error + '</p>'
            } else {
                const result = '<p><span>Weather:</span> ' + data.weather +'&nbsp<img class="weather_icon" src="'+ data.weather_icon +'"></p><p><span>Temperature:</span> ' + data.temperature + '&#8451;</p><p><span>Location:</span> ' + data.location + '</p>'
                document.getElementById('resultSearch').innerHTML = result
            }
        })
    })
})