let notes = [];
let notesTitle = [];

let archivNotes = [];
let archivNotesTitle = [];

let trashNotes = [];
let trashNotesTitle = [];

function init() {
    renderNotes();
    renderArchiv();
    renderTrash();
}

function renderNotes() {
    if (getFromLocalStorage('notes') && getFromLocalStorage('notes_title')) {
        notes = getFromLocalStorage('notes');
        notesTitle = getFromLocalStorage('notes_title');
        let contentRef = document.getElementById('note_content');
        contentRef.innerHTML = '';

        for (let indexNote = 0; indexNote < notes.length; indexNote++) {
            const note = notes[indexNote];
            contentRef.innerHTML += getNoteTemplate(note, indexNote)
        }
    }
}

function renderArchiv() {
    if (getFromLocalStorage('archivNotes') && getFromLocalStorage('archivTitle')) {
        archivNotes = getFromLocalStorage('archivNotes');
        archivNotesTitle = getFromLocalStorage('archivTitle');
        renderArchivNote();
        renderAmountArchivNotes();
    }
}

function renderTrash() {
    if (getFromLocalStorage('trashNotes') && getFromLocalStorage('trashNotesTitle')) {
        trashNotes = getFromLocalStorage('trashNotes');
        trashNotesTitle = getFromLocalStorage('trashNotesTitle');
        renderTrashNote();
        renderAmountTrashNotes();
    }
}

function addNote() {
    let noteInputRef = document.getElementById('note_input');
    let noteTitleInputRef = document.getElementById('note_title_input');
    let noteInput = noteInputRef.value;
    let noteTitleInput = noteTitleInputRef.value;

    notes.push(noteInput);
    notesTitle.push(noteTitleInput);
    saveToLocalStorage('notes', notes);
    saveToLocalStorage('notes_title', notesTitle);
    renderNotes();
    noteInputRef.value = '';
    noteTitleInputRef.value = '';

}

function archivNote(i, note) {
    let archivNote = notes.splice(i, 1);
    let archivNoteTitle = notesTitle.splice(i, 1);
    archivNotes.push(archivNote[0]);
    archivNotesTitle.push(archivNoteTitle[0]);
    saveToLocalStorage('notes', notes);
    saveToLocalStorage('notes_title', notesTitle);
    saveToLocalStorage('archivNotes', archivNotes);
    saveToLocalStorage('archivTitle', archivNotesTitle);
    renderNotes();
    renderArchivNote(note);
    renderAmountArchivNotes();
}

function deleteArchivNote(i) {
    let trashNote = archivNotes.splice(i, 1);
    let trashNoteTitle = archivNotesTitle.splice(i, 1);
    trashNotes.push(trashNote[0]);
    trashNotesTitle.push(trashNoteTitle[0]);
    renderArchivNote();
    renderAmountArchivNotes();
    saveToLocalStorage('archivNotes', archivNotes);
    saveToLocalStorage('archivTitle', archivNotesTitle);
    saveToLocalStorage('trashNotes', trashNotes);
    saveToLocalStorage('trashNotesTitle', trashNotesTitle);
    renderTrashNote();
    renderAmountTrashNotes();
}

function deleteTrashNote(i) {
    trashNotes.splice(i, 1);
    trashNotesTitle.splice(i, 1);
    renderTrashNote();
    renderAmountTrashNotes();
    saveToLocalStorage('trashNotes', trashNotes);
    saveToLocalStorage('trashNotesTitle', trashNotesTitle);
}

function renderArchivNote() {
    let archivInputRef = document.getElementById('archiv_content');
    archivInputRef.innerHTML = '';

    for (let y = 0; y < archivNotes.length; y++) {
        const archviv_element = archivNotes[y];
        archivInputRef.innerHTML += getArchivNoteTemplate(archviv_element, y);
    }
}


function renderTrashNote() {
    let trashInputRef = document.getElementById('trash_content');
    trashInputRef.innerHTML = '';

    for (let y = 0; y < trashNotes.length; y++) {
        const trash_element = trashNotes[y];
        trashInputRef.innerHTML += getTrashNoteTemplate(trash_element, y);
    }
}

function renderAmountArchivNotes() {
    let amountArchivNotesRef = document.getElementById('header_archiv');
    let amountArchivNotesHeaderRef = document.getElementById('header_archiv_dialog');
    let amountArchivNotes = archivNotes.length;
    amountArchivNotesRef.innerHTML = `Archiv  (${amountArchivNotes})`
    amountArchivNotesHeaderRef.innerHTML = `Archiv  (${amountArchivNotes})`
}


function renderAmountTrashNotes() {
    let amountTrashNotesRef = document.getElementById('header_trash');
    let amountTrashNotesHeaderRef = document.getElementById('header_trash_dialog');
    let amountTrashNotes = trashNotes.length;
    amountTrashNotesRef.innerHTML = `Papierkorb  (${amountTrashNotes})`
    amountTrashNotesHeaderRef.innerHTML = `Papierkorb  (${amountTrashNotes})`
}

function openArchivDialog() {
    let dialog = document.getElementById('archiv_dialog');
    dialog.showModal();
}

function openTrashDialog() {
    let dialog = document.getElementById('trash_dialog');
    dialog.showModal();
}

document.addEventListener('DOMContentLoaded', () => {
    const archivDialog = document.getElementById('archiv_dialog');
    const trashDialog = document.getElementById('trash_dialog');

    if (archivDialog) {
        archivDialog.addEventListener('click', function(event) {
            if (event.target === archivDialog) {
                archivDialog.close();
            }
        });
    }

    if (trashDialog) {
        trashDialog.addEventListener('click', function(event) {
            if (event.target === trashDialog) {
                trashDialog.close();
            }
        });
    }
});


function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
    console.log(JSON.stringify(value));
}

function getFromLocalStorage(key) {
    let array = JSON.parse(localStorage.getItem(key))
    return array;
}