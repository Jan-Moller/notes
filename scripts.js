let notes = [];
let notesTitle = [];

let trashNotes = [];
let trashNotesTitle = [];


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

function deleteNote(i, note) {
    let trashNote = notes.splice(i, 1);
    let trashNoteTitle = notesTitle.splice(i, 1);
    trashNotes.push(trashNote[0]);
    trashNotesTitle.push(trashNoteTitle[0]);
    saveToLocalStorage('notes', notes);
    saveToLocalStorage('notes_title', notesTitle);
    saveToLocalStorage('trashNotes', trashNotes);
    saveToLocalStorage('trashNotesTitle', trashNotesTitle);
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