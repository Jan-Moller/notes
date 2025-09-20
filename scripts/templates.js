function getNoteTemplate(note, i) {
    return /*html*/`
    <article class="note_card">
        <h3>${notesTitle[i]}</h3>
        <p class="note_content">${note}</p>
        <button class="note_card_btn" onclick="archivNote(${i}, '${note}')">Notiz archivieren</button>
</article>`
}

function getArchivNoteTemplate(archivElement, i) {
    return /*html*/ `
        <div class="archiv_element">
            <h3>${archivNotesTitle[i]}</h3>
            <img onclick="pushNoteBack(${i})" class="note_back_arrow" src="/assets/icons/back.png" alt="Button um Notiz wiederherzustellen">
            <p class="archiv_delete_element">${archivElement}</p>
            <button class="dialog_delete_btn" onclick="deleteArchivNote(${i})">Notiz in den Papierkorb legen</button>
        </div>
    `
}

function getTrashNoteTemplate(trash_element, i) {
    return /*html*/ `
        <div class="trash_element">
            <h3>${trashNotesTitle[i]}</h3>
            <img onclick="pushTrashBack(${i})" class="note_back_arrow" src="/assets/icons/back.png" alt="Button um Notiz wiederherzustellen">
            <p class="archiv_delete_element">${trash_element}</p>
            <button class="dialog_delete_btn" onclick="deleteTrashNote(${i})">Endgültig löschen</button>
        </div>
    `
}