let notes = [];
let notesTitle = [];

let trashNotes = [];


function renderNotes() {
    if (getFromLocalStorage('notes')) {
        notes = getFromLocalStorage('notes');
        let contentRef = document.getElementById('content');
        contentRef.innerHTML = '';

        for (let indexNote = 0; indexNote < notes.length; indexNote++) {
            const note = notes[indexNote];
            contentRef.innerHTML += getNoteTemplate(note, indexNote)
        }
    }
}


function addNote() {
    let noteInputRef = document.getElementById('note_input');
    let notesTitleInputRef = document.getElementById('note_title_input');
    let noteInput = noteInputRef.value;
    let noteTitleInput = notesTitleInputRef.value; 

    notes.push(noteInput);
    saveToLocalStorage('notes', notes);
    saveToLocalStorage('notes_title', notesTitle);
    renderNotes();
    noteInputRef.value = '';

}

function deleteNote(i, note) {
    let trashNote = notes.splice(i, 1);
    trashNotes.push(trashNote[0]);
    saveToLocalStorage('notes', notes);
    saveToLocalStorage('trashNotes', trashNotes);
    renderNotes();
    renderTrashNote(note);
    renderAmountTrashNotes();

}


function renderTrashNote() {
    let trashInputRef = document.getElementById('trash_dialog');
    trashInputRef.innerHTML = '';

    for (let y = 0; y < trashNotes.length; y++) {
        const trash_element = trashNotes[y];
        trashInputRef.innerHTML += getTrashNoteTemplate(trash_element, y);
    }
}


function renderAmountTrashNotes() {
    let amountTrashNotesRef = document.getElementById('header_trash');
    let amountTrashNotes = trashNotes.length;
    amountTrashNotesRef.innerHTML = `Papierkorb  (${amountTrashNotes})`
}


function openTrashDialog() {
    let dialog = document.getElementById('trash_dialog');
    dialog.showModal();
}

function deleteTrashNote(i) {
    trashNotes.splice(i, 1);
    renderTrashNote();
    renderAmountTrashNotes();
    saveToLocalStorage('trashNotes', trashNotes);
}

function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
    console.log(JSON.stringify(value));
}

function getFromLocalStorage(key) {
    let array = JSON.parse(localStorage.getItem(key))
    return array;
}