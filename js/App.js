import notesAPI from "./notesAPI.js";
import notesView from "./notesView.js";

export default class App {
  constructor(root) {
    this.notes = [];
    this.activeNote = null;
    this.view = new notesView(root, this._handlers());

    this._refreshNotes()
  }

  _refreshNotes(){
      const notes = notesAPI.getAllNotes()
      this._setNotes(notes)

      if(notes.length > 0){
          //this._setActiveNote(notes[0])
      }
  }

  _setNotes(notes){
      this.notes = notes
      this.view.updateNoteList(notes)
      this.view.updateNotesViewVisibility(0)
  }

  _setActiveNote(note){
      this.activeNote = note
      this.view.updateActiveNote(note)
  }


  _handlers() {
    return {
      onNoteSelect: id => {
        //console.log(this.notes)
         const selected = this.notes.find(note=>note.id == id)
         this._setActiveNote(selected)
         this.view.updateNotesViewVisibility(1)
        console.log("note selected");
      },
      onNoteAdd: () => {
          const newNote = {
              title: "New Note",
              body : "Take note here..."
          }
          notesAPI.saveNote(newNote)
          this._refreshNotes()
        console.log("Note has been added..");
      },

      onNoteEdit: (title, body) => {
        notesAPI.saveNote({
            id: this.activeNote.id,
            title,
            body
        })
        //this._refreshNotes()
        console.log(title, body);
      },
      onNoteDelete: (id) => {
          notesAPI.deleteNote(id)
          this._refreshNotes()
        console.log("note deleted..", id);
      },
    };
  }
}
