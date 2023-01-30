const socket = io()


const urlSearch = new URLSearchParams(window.location.search)
const username = urlSearch.get('nickname')
const room = urlSearch.get('room')

document.getElementById('nameRoom').innerHTML = `Olá ${username} - ${room}`

function logout() {
    window.location.href = '/'
}

socket.emit('selected_room', {
    username,
    room
})

const listMessages = []

function sendMessage() {
    const message = document.getElementById('message').value
    socket.emit('send_new_message', { username, room, message })
    document.getElementById('message').value = ''

}


socket.on('send_new_message', payload => {
    const today = new Date();
    const h = today.getHours() <= 9 ? '0' + today.getHours() : today.getHours();
    const m = today.getMinutes() <= 9 ? '0' + today.getMinutes() : today.getMinutes();
    const day = today.getDate() <= 9 ? '0' + today.getDate() : today.getDate();
    const month = today.getMonth() <= 9 ? '0' + `${new Date().getMonth() +1}` : today.getMonth();
    const year = today.getFullYear();
    listMessages.push(`
        <div class="w-full px-1 rounded-lg text-gray-300 flex flex-col">
            <div class="flex flex-row gap-1">
                <div class="w-max">
                    <span class="text-gray-400 font-bold text-xs">${payload.username}:</span>
                </div>
                <div class="w-max text-xs font-bold text-gray-100 flex items-center justify-start">
                    <p>${payload.text}
                    </p>
                </div>
            </div>
            <div class="w-full flex items-center justify-start">

                <span class="text-gray-400 font-bold text-xs">
                    ${h}:${m} - ${day}/${month}/${year}</span>

            </div>
        </div>`);
    document.getElementById('listMessages').innerHTML = listMessages.join();
})