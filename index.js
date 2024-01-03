const axiosInstance = axios.create({
    baseURL : 'https://crudcrud.com/api/96374143b6a94b12b762146cecc019f9'
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
        parent.removeChild(li);
        document.getElementById('submit').style.display = 'none';
        document.getElementById('edit').style.display = 'inline-block';

        document.getElementById('edit').onclick = () => {
            const name = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
        
            const obj = {
                name,
                email,
                phone
            };
        
            axiosInstance.put(`/bookAppointment/${user._id}`, obj)
                .then((res) => {
                    location.reload();
                });
        }
    }
    li.appendChild(input);
    li.appendChild(edit);
    parent.appendChild(li);
}
