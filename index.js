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

    axios.post('https://crudcrud.com/api/74a2572894ad4d70859eff1648642425/bookAppointment', obj)
        .then(res => showNewUser(res.data))
        .catch(err => console.error(err));
    
}
window.addEventListener('DOMContentLoaded', () => {
    axios.get('https://crudcrud.com/api/74a2572894ad4d70859eff1648642425/bookAppointment')
    .then(res => {
        console.log(res.data);
        for(var i=0; i<res.data.length; i++){
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
    const li = document.createElement('li');
    li.innerText = `${user.name} - ${user.email} - ${user.phone}`

    const input = document.createElement('input');
    input.type = 'button';
    input.value = 'Delete';

    input.onclick = () => {
        axios.delete(`https://crudcrud.com/api/74a2572894ad4d70859eff1648642425/bookAppointment/${user._id}`)
        .then();
        parent.removeChild(li);
    }

    li.appendChild(input);
    parent.appendChild(li);
}