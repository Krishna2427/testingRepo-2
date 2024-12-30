document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('userForm');
    const userList = document.getElementById('UserList');

    function getUsers() {
        return JSON.parse(localStorage.getItem('users')) || [];
    }
    function saveUsers(users) {
        localStorage.setItem('users', JSON.stringify(users));
    }
    function addUser(user) {
        const users = getUsers();
        users.push(user);
        saveUsers(users);
        displayUsers()
    }

    function displayUsers() {
        const users = getUsers();
        userList.innerHTML = '';

        users.forEach((user, index) => {
            const li = document.createElement('li');
            li.textContent = `${user.name} ${user.email}`;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'delete';
            deleteButton.onclick = () => deleteUser(index);
            li.appendChild(deleteButton);
            userList.appendChild(li);
        });
    }

    function deleteUser(index) {
        const users = getUsers();
        users.pop(index, 1);
        saveUsers(users);
        displayUsers();
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = form.name.value.trim();
        const email = form.email.value.trim();


        if (name === '' || email === '') {
            alert("plaese fill USer fdata");
            return;
        }
        const user = { name, email }
        addUser(user)
        form.reset()
    });

    displayUsers();

});