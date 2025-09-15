function getNoteTemplate(note, i) {
    return /*html*/`
    <div class="list_element">
    <li>${notesTitle[i]}</li>
    <li>${note}</li>
    <button onclick="deleteNote(${i}, '${note}')">Notiz löschen</button>
    </div>`
}

function getTrashNoteTemplate(trash_element, i) {
    return /*html*/ `
        <div class="list_element">
            <li>${trash_element}</li>
            <button onclick="deleteTrashNote(${i})">Endgültig löschen</button>
        </div>
    `
}