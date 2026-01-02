let notes = JSON.parse(localStorage.getItem("notes")) || [];

const noteslist = document.getElementById("notesList");
const noteTitle = document.getElementById("noteTitle");
const noteText = document.getElementById("noteText");
const noteDate = document.getElementById("noteDate");
const noteTime = document.getElementById("noteTime");
const noteFolder = document.getElementById("noteFolder");
const noteFile = document.getElementById("noteFile");
const editIndex = document.getElementById("editIndex");


const saveBtn = document.getElementById("saveBtn");

function displayNotes() {
    noteslist.innerHTML = "";

    notes.forEach((note, i) => {
        noteslist.innerHTML += `
    <div class="col-md-4">
      <div class= "note-card ${note.colors}">
        <div class= "note-actions">
         <i class="bi bi-pencil-square" onclick="editNote(${i})"></i>
           <i class="bi bi-trash" onclick="deleteNote(${i})"></i>
           </div>
           <h6>${note.title}</h6>
           <p>${note.text}</p>

        </div>
        </div>
     `;
    });
}

saveBtn.addEventListener("click", () => {
    const title = noteTitle.value.trim();
    const text = noteText.value.trim();
    const date = noteDate.value.trim();
    const time = noteTime.value.trim();
    const folder = noteFolder.value;
    const file = noteFile.value.trim();
    if (!title || !text) return alert("please fill all fields");

    const colors = ["bg-yellow", "bg-blue", "bg-red"];
    const random = colors[Math.floor(Math.random() * colors.length)]; //0.23

    const idx = editIndex.value;



    if (idx == "") {
    notes.push({
        title,
        text,
        date,
        time,
        folder,
        file,
        colors: random
    });
} else {
    notes[idx] = {
        title,
        text,
        date,
        time,
        folder,
        file,
        colors: random
    };
}

    localStorage.setItem("notes", JSON.stringify(notes));

    noteTitle.value = "";
    noteText.value = "";
    editIndex.value = "";
    noteDate.value = "";
    noteTime.value = "";
    noteFolder.value = "";
    noteFile.value = "";

    document.querySelector(".btn-close").click();
    displayNotes();
});


function editNote(i) {
    noteTitle.value = notes[i].title;
    noteText.value = notes[i].text;
    noteDate.value = notes[i].date;
    noteTime.value = notes[i].time;
    noteFolder.value = notes[i].folder;
    noteFile.value = notes[i].file;
    editIndex.value = i;

    document.getElementById("modalTitle").innerText = "Edit Notes";
     new bootstrap.Modal(document.getElementById("noteModal")).show();


}

function deleteNote(i) {
    notes.splice(i, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    displayNotes();
}
displayNotes();