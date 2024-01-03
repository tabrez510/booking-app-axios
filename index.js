const axiosInstance = axios.create({
    baseURL : 'https://crudcrud.com/api/74a2572894ad4d70859eff1648642425'
});
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

    axiosInstance.post('/bookAppointment', obj)
        .then(res => showNewUser(res.data))
        .catch(err => console.error(err));
    
}
window.addEventListener('DOMContentLoaded', () => {
    axiosInstance.get('/bookAppointment')
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
        axiosInstance.delete(`/bookAppointment/${user._id}`)
        .then();
        parent.removeChild(li);
    }

    const edit = document.createElement('input');
    edit.type = 'button';
    edit.value = 'Edit';

    edit.onclick = () => {
        axiosInstance.get(`/bookAppointment/${user._id}`)
        .then(res => {
            document.getElementById('username').value = res.data.name;
            document.getElementById('email').value = res.data.email;
            document.getElementById('phone').value = res.data.phone; 
        });
        axiosInstance.delete(`/bookAppointment/${user._id}`)
        .then();
        parent.removeChild(li);
    }
    li.appendChild(input);
    li.appendChild(edit);
    parent.appendChild(li);
}