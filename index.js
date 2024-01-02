function handleFormSubmit(event) {
    event.preventDefault();
    const name = event.target.username.value;
    const email = event.target.email.value;
    const phone = event.target.phone.value;

    const obj = {
        name,
        email,
        phone
    }

    axios.post('https://crudcrud.com/api/a004d8ad7b6a4d528ea1f1e31b685429/bookAppointment', obj)
        .then(res => console.log(res))
        .catch(err => console.error(err));
    showNewUser(obj);
}
window.addEventListener('DOMContentLoaded', () => {
    axios.get('https://crudcrud.com/api/a004d8ad7b6a4d528ea1f1e31b685429/bookAppointment')
    .then(res => {
        console.log(res.data);
        for(let i=0; i<res.data.length; i++){
            showNewUser(res.data[i]);
        }
    })
    .catch(err => console.error(err));
})
function showNewUser(user){
    document.getElementById('username').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';

    const parent = document.getElementById('listOfItems');
    parent.innerHTML += `<li>${user.name} - ${user.email} - ${user.phone}</li>`
}