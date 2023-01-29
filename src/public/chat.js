const socket = io()


const urlSearch = new URLSearchParams(window.location.search)
const username = urlSearch.get('nickname')
const room = urlSearch.get('room')

document.getElementById('nameRoom').innerHTML = `Olá ${username} - ${room}`

function logout(){
    window.location.href = '/'
}

socket.emit('selected_room', {
    username,
    room
})

const listMessages = []

function sendMessage(){
    const message = document.getElementById('message').value
    socket.emit('send_new_message', {username, room, message})
    document.getElementById('message').value = ''

}


socket.on('send_new_message', payload=>{
    listMessages.push(`
        <div class="w-full border border-gray-500 rounded-lg bg-gray-800 text-gray-300 flex flex-col gap-1">
            <div class="w-full p-1 flex items-center justify-start">
                <span class="text-gray-200 font-bold text-sm">${payload.username}</span>
            </div>
            <div class="w-full p-1 flex items-center justify-start">

                <p>${payload.text}
                </p>
            </div>
            <div class="w-full p-1 flex items-center justify-start">

                <span class="text-gray-200 font-bold text-sm">
                    ${payload.createdAt}</span>

            </div>
        </div>`)


    document.getElementById('listMessages').innerHTML = listMessages.join()
})