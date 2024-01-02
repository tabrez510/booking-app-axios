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
}