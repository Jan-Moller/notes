function getNoteTemplate(note, i) {
    return /*html*/`
    <article class="note_card">
        <h3>${notesTitle[i]}</h3>
        <p class="note_content">${note}</p>
        <button class="note_card_btn" onclick="deleteNote(${i}, '${note}')">Notiz löschen</button>
</article>`
}

function getTrashNoteTemplate(trash_element, i) {
    return /*html*/ `
        <div class="list_element">
            <li>${trash_element}</li>
            <button onclick="deleteTrashNote(${i})">Endgültig löschen</button>
        </div>
    `
}